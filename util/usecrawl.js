import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import OverlayScrollbars from 'overlayscrollbars';

const PIXELS_PER_SECOND = 100;

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

// Scrolls the page upward on its own. Scroll input, a scrollbar drag, or
// leaving the tab latch it off until resume(); a held mouse button or a live
// selection stop it only while they last. Until the first latch, reduced
// motion decides. `paused` reports the latch, minus the foot of the page,
// where there is nothing left to resume.
export default function useCrawl() {
    const [latched, setLatched] = useState(null);
    const [ended, setEnded] = useState(false);
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

            if (latchedNow.current || locked || selecting) {
                carry = 0;
                return;
            }

            if (scroller === undefined) {
                scroller = OverlayScrollbars(document.querySelector("body"));
            }

            // Accumulate fractional pixels so speed does not depend on frame
            // rate, and scroll only whole ones.
            carry += ((now - previous) / 1000) * PIXELS_PER_SECOND;
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
        function onMouseDown() {
            locked = true;
            heldAt = position() ?? null;
        }
        function onMouseUp() {
            locked = false;
            // Dragging the scrollbar moves the page without firing any of the
            // events above, so the position is what gives it away.
            if (heldAt !== null && position() !== heldAt) setLatched(true);
            heldAt = null;
        }
        function onSelectionChange() {
            // Ranges that render as nothing do not count as a selection.
            const selection = document.getSelection();
            selecting = selection !== null
                && !selection.isCollapsed
                && selection.toString().trim() !== '';
        }
        function onLeave() {
            setLatched(true);
        }

        window.addEventListener('wheel', onWheel);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('blur', onLeave);
        document.addEventListener('selectionchange', onSelectionChange);
        document.addEventListener('visibilitychange', onLeave);

        frameId = requestAnimationFrame(step);

        // This route unmounts on every navigation away, so everything attached
        // to window or document has to come back off here.
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('blur', onLeave);
            document.removeEventListener('selectionchange', onSelectionChange);
            document.removeEventListener('visibilitychange', onLeave);
        };
    }, []);

    return { paused: stopped && !ended, resume };
}
