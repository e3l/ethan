import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import OverlayScrollbars from 'overlayscrollbars';

const PIXELS_PER_SECOND = 150;

// Keys the browser scrolls with. Space is left out: it also presses the play
// button, where it means "press", not "scroll".
const SCROLL_KEYS = new Set([
    'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End',
]);

// Clicks on these already do something, so they do not also play or pause.
const OWN_CLICKS = 'a, button, input, textarea, select, label, .os-scrollbar';

// The longest gap between frames the crawl makes up for, so coming back to
// the page does not jump it forward by however long it was gone.
const MAX_FRAME_MS = 100;

// A click this soon after the window regains focus is the click that brought
// it back, not one meant for the page.
const REFOCUS_MS = 100;

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

// Selected whitespace renders as nothing, so it does not count.
function hasSelection() {
    const selection = document.getSelection();
    return selection !== null
        && !selection.isCollapsed
        && selection.toString().trim() !== '';
}

// Scrolls the page upward on its own, like film credits.
//
// Two things decide whether it moves:
// - Playing or paused, which the visitor chooses. A click on the page toggles
//   it and scrolling by hand pauses it. Until the visitor chooses, reduced
//   motion decides.
// - Holds, which stop it only while they last: a held mouse button, selected
//   text, or the page being hidden (another tab, or a minimised window). A
//   page that is visible but unfocused, say on a second monitor, keeps
//   playing, since it can still be watched.
// It moves while playing and not held.
//
// `showPlay` is true while paused or while text is selected, except at the
// foot of the page, where there is nothing left to play. The other holds do
// not show it: a held mouse button ends in a click that decides for itself,
// and a hidden page cannot be seen. `play()` plays and clears any selection.
export default function useCrawl() {
    const reducedMotion = useReducedMotion();
    const [choice, setChoice] = useState(null);
    const playing = choice ?? !reducedMotion;
    const [textSelected, setTextSelected] = useState(false);
    const [atEnd, setAtEnd] = useState(false);

    // The frame loop and the listeners are set up once, so they read
    // `playing` through a ref.
    const playingRef = useRef(playing);
    useEffect(() => {
        playingRef.current = playing;
    }, [playing]);

    const play = useCallback(() => {
        document.getSelection()?.removeAllRanges();
        setChoice(true);
    }, []);

    useEffect(() => {
        let scroller;
        const getScroller = () => (scroller ??= OverlayScrollbars(document.body));
        const scrollY = () => getScroller()?.scroll().position.y;

        const holds = {
            mouse: false,
            selection: false,
            hidden: document.hidden,
        };
        const held = () => holds.mouse || holds.selection || holds.hidden;

        // The latest mouse press, kept until the click that follows it.
        let press = null;
        let focusedAt = -Infinity;

        // Frame loop. Speed comes from elapsed time rather than frame count,
        // and fractional pixels carry over so only whole ones are scrolled.
        let frameId;
        let lastFrame = null;
        let carry = 0;
        let wasAtEnd = false;
        function step(now) {
            frameId = requestAnimationFrame(step);
            const elapsed = lastFrame === null ? 0 : Math.min(now - lastFrame, MAX_FRAME_MS);
            lastFrame = now;

            const s = getScroller();
            if (s === undefined) return;

            const isAtEnd = s.scroll().ratio.y >= 1;
            if (isAtEnd !== wasAtEnd) {
                wasAtEnd = isAtEnd;
                setAtEnd(isAtEnd);
            }

            if (!playingRef.current || held()) {
                carry = 0;
                return;
            }
            carry += (elapsed / 1000) * PIXELS_PER_SECOND;
            const pixels = Math.floor(carry);
            if (pixels >= 1) {
                carry -= pixels;
                s.scroll({ y: `+=${pixels}` });
            }
        }

        function pause() {
            setChoice(false);
        }

        // Whether a click is a plain click on the page, as opposed to one that
        // finishes or belongs to something else.
        function isPlayPauseClick(event) {
            // Not a left click, or the second click of a double click.
            if (event.button !== 0 || event.detail > 1) return false;
            // A link, a button, or the scrollbar.
            if (event.target instanceof Element && event.target.closest(OWN_CLICKS)) return false;
            if (press === null) return true;
            // The end of a scrollbar drag.
            if (press.scrolled) return false;
            // The end of selecting text, or a click that cleared a selection.
            if (press.hadSelection || hasSelection()) return false;
            // The click that brought the window back into focus.
            if (focusedAt > press.at - REFOCUS_MS) return false;
            return true;
        }

        function onMouseDown(event) {
            holds.mouse = true;
            // selectionchange fires after this, so `holds.selection` still
            // describes the selection from before the press.
            press = { at: event.timeStamp, startY: scrollY(), hadSelection: holds.selection, scrolled: false };
        }
        function onMouseUp() {
            holds.mouse = false;
            if (press === null) return;
            // Dragging the scrollbar fires no scroll input, so a page that
            // moved during the press is what gives it away.
            press.scrolled = scrollY() !== press.startY;
            if (press.scrolled) pause();
        }
        function onContextMenu() {
            // Where the menu opens on press (macOS, Linux, and Ctrl+click on
            // a Mac), it takes the mouse and the page never sees the release.
            holds.mouse = false;
            press = null;
        }
        function onClick(event) {
            if (isPlayPauseClick(event)) setChoice(!playingRef.current);
        }
        function onKeyDown(event) {
            if (SCROLL_KEYS.has(event.key)) pause();
        }
        function onSelectionChange() {
            holds.selection = hasSelection();
            setTextSelected(holds.selection);
        }
        function onFocus(event) {
            focusedAt = event.timeStamp;
        }
        function onVisibilityChange() {
            holds.hidden = document.hidden;
        }

        // One signal detaches every listener. This route unmounts on every
        // navigation away, so they have to come off then.
        const listeners = new AbortController();
        const { signal } = listeners;
        window.addEventListener('wheel', pause, { signal });
        window.addEventListener('touchmove', pause, { signal });
        window.addEventListener('keydown', onKeyDown, { signal });
        window.addEventListener('mousedown', onMouseDown, { signal });
        window.addEventListener('mouseup', onMouseUp, { signal });
        window.addEventListener('contextmenu', onContextMenu, { signal });
        window.addEventListener('click', onClick, { signal });
        window.addEventListener('focus', onFocus, { signal });
        document.addEventListener('selectionchange', onSelectionChange, { signal });
        document.addEventListener('visibilitychange', onVisibilityChange, { signal });

        frameId = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(frameId);
            listeners.abort();
        };
    }, []);

    return { showPlay: (!playing || textSelected) && !atEnd, play };
}
