import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import OverlayScrollbars from 'overlayscrollbars';

const PIXELS_PER_SECOND = 125;

// Keys the browser scrolls with. Space is left out: it reaches this handler
// from the resume button too, where it means "press", not "scroll".
const SCROLL_KEYS = new Set([
    'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End',
]);

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

// The server has no media queries to read, so it renders as if motion were
// welcome and the subscription corrects it on hydration.
function useReducedMotion() {
    return useSyncExternalStore(
        (onChange) => {
            const query = window.matchMedia(REDUCED_MOTION);
            query.addEventListener('change', onChange);
            return () => query.removeEventListener('change', onChange);
        },
        () => window.matchMedia(REDUCED_MOTION).matches,
        () => false,
    );
}

// Clicks on these keep their own meaning instead of toggling the crawl.
const OWN_CLICKS = 'a, button, input, textarea, select, label, .os-scrollbar';

// The longest gap between frames the crawl will make up for, so coming back
// to the page does not jump it forward by however long it was gone.
const MAX_FRAME_MS = 100;

// How close a click has to follow the window regaining focus to count as the
// click that brought it back, rather than one meant for the page.
const REFOCUS_MS = 100;

function hasSelection() {
    // Ranges that render as nothing do not count as a selection.
    const selection = document.getSelection();
    return selection !== null
        && !selection.isCollapsed
        && selection.toString().trim() !== '';
}

// Scrolls the page upward on its own.
//
// Stays paused until resumed: a click on the page, scrolling, or a scrollbar
// drag. A click or resume() starts it again.
// Pauses only while it lasts: a held mouse button, selected text, or the page
// being out of focus or out of view.
//
// Until the first pause or play, reduced motion decides. `paused` drives the
// resume button: true when the crawl is paused or text is selected, but not
// at the foot of the page, where there is nothing left to play. A held mouse
// button and an unfocused page do not count, since the first ends in a click
// that decides for itself and the second is not being looked at.
export default function useCrawl() {
    const [latched, setLatched] = useState(null);
    const [ended, setEnded] = useState(false);
    const [selected, setSelected] = useState(false);
    const reduced = useReducedMotion();

    const stopped = latched ?? reduced;
    const latchedNow = useRef(false);
    useEffect(() => {
        latchedNow.current = stopped;
    }, [stopped]);

    const resume = useCallback(() => {
        document.getSelection()?.removeAllRanges();
        setLatched(false);
    }, []);

    useEffect(() => {
        let locked = false;
        let selecting = false;
        let heldAt = null;
        let dragged = false;
        let clearing = false;
        let focused = document.hasFocus();
        let away = !focused || document.hidden;
        let focusedAt = -Infinity;
        let downAt = -Infinity;
        let wasAtEnd = false;
        let carry = 0;
        let previousFrame = null;
        let frameId;

        let scroller = OverlayScrollbars(document.querySelector("body"));
        const position = () => scroller?.scroll().position.y;
        const atEnd = () => scroller?.scroll().ratio.y >= 1;

        function step(now) {
            frameId = requestAnimationFrame(step);

            const previous = previousFrame;
            previousFrame = now;
            if (previous === null) return;

            // Nothing left to resume once the crawl has run out of page.
            if (atEnd() !== wasAtEnd) {
                wasAtEnd = !wasAtEnd;
                setEnded(wasAtEnd);
            }

            if (latchedNow.current || locked || selecting || away) {
                carry = 0;
                return;
            }

            if (scroller === undefined) {
                scroller = OverlayScrollbars(document.querySelector("body"));
            }

            // Accumulate fractional pixels so speed does not depend on frame
            // rate, and scroll only whole ones.
            carry += (Math.min(now - previous, MAX_FRAME_MS) / 1000) * PIXELS_PER_SECOND;
            const pixels = Math.floor(carry);
            if (pixels >= 1) {
                carry -= pixels;
                scroller.scroll({ y: `+=${pixels}` });
            }
        }

        function onWheel() {
            setLatched(true);
        }
        function onTouchMove() {
            setLatched(true);
        }
        function onKeyDown(event) {
            if (SCROLL_KEYS.has(event.key)) setLatched(true);
        }
        function onMouseDown(event) {
            locked = true;
            heldAt = position() ?? null;
            downAt = event.timeStamp;
            // `selecting` still reflects the selection from before this press,
            // since selectionchange fires after mousedown handlers run.
            clearing = selecting;
        }
        function onMouseUp() {
            locked = false;
            // Dragging the scrollbar moves the page without firing any of the
            // events above, so the position is what gives it away.
            dragged = heldAt !== null && position() !== heldAt;
            if (dragged) setLatched(true);
            heldAt = null;
        }
        function onClick(event) {
            // These clicks are not play/pause: the end of a scrollbar drag or
            // a drag selection, a click that clears a selection, the second
            // click of a double click, and the click that brought the window
            // back into focus.
            if (event.button !== 0 || event.detail > 1) return;
            if (dragged || clearing || hasSelection()) return;
            if (focusedAt > downAt - REFOCUS_MS) return;
            if (event.target instanceof Element && event.target.closest(OWN_CLICKS)) return;
            setLatched(!latchedNow.current);
        }
        function onSelectionChange() {
            selecting = hasSelection();
            setSelected(selecting);
        }
        function onFocus(event) {
            focused = true;
            focusedAt = event.timeStamp;
            away = document.hidden;
        }
        function onBlur() {
            focused = false;
            away = true;
        }
        function onVisibilityChange() {
            away = !focused || document.hidden;
        }

        // Every listener shares one signal, so aborting it detaches them all.
        // This route unmounts on every navigation away, so they have to come
        // back off then.
        const listeners = new AbortController();
        const { signal } = listeners;
        window.addEventListener('wheel', onWheel, { signal });
        window.addEventListener('touchmove', onTouchMove, { signal });
        window.addEventListener('keydown', onKeyDown, { signal });
        window.addEventListener('mousedown', onMouseDown, { signal });
        window.addEventListener('mouseup', onMouseUp, { signal });
        window.addEventListener('click', onClick, { signal });
        window.addEventListener('focus', onFocus, { signal });
        window.addEventListener('blur', onBlur, { signal });
        document.addEventListener('selectionchange', onSelectionChange, { signal });
        document.addEventListener('visibilitychange', onVisibilityChange, { signal });

        frameId = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(frameId);
            listeners.abort();
        };
    }, []);

    return { paused: (stopped || selected) && !ended, resume };
}
