import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import OverlayScrollbars from 'overlayscrollbars';
import { useIsPresent } from 'framer-motion';

const PIXELS_PER_SECOND = 150;

// Keys that scroll the page. Space isn't included because pressing Space on
// the play button should play the credits, not pause them.
const SCROLL_KEYS = new Set([
    'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End',
]);

// Clicking one of these already does something, so it shouldn't also play or
// pause the credits.
const OWN_CLICKS = 'a, button, input, textarea, select, label, .os-scrollbar';

// Browsers don't run animation frames on hidden tabs, so the credits stop by
// themselves when you switch away. When you come back, the first frame sees a
// long gap in time. Capping the gap stops the credits from jumping ahead.
const MAX_FRAME_MS = 100;

// A click this soon after the window gets focus is you switching back from
// another app, not you trying to play or pause.
const REFOCUS_MS = 100;

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

// The server can't see the user's motion setting, so it assumes motion is
// fine. The browser corrects this once the page loads.
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

// Selected whitespace is invisible, so it doesn't count.
function hasSelection() {
    const selection = document.getSelection();
    return selection !== null
        && !selection.isCollapsed
        && selection.toString().trim() !== '';
}

// Scrolls the page by itself, so the credits roll like at the end of a movie.
//
// The credits move when both of these are true:
// - They're playing. Clicking the page plays or pauses them, and scrolling
//   yourself pauses them. Until you do either, they play unless your system
//   asks for reduced motion.
// - Nothing is holding them. Holding a mouse button down or having text
//   selected stops them, but only until you let go or clear the selection.
//
// Returns `showPlay`, whether to show the play button, and `play()`, which
// starts the credits and clears any selected text. The button shows while the
// credits are paused or text is selected, but not at the bottom of the page,
// where there's nothing left to play. It doesn't show while you hold the
// mouse down, because letting go finishes a click that plays or pauses anyway.
export default function useCrawl() {
    const reducedMotion = useReducedMotion();
    const [choice, setChoice] = useState(null);
    const playing = choice ?? !reducedMotion;
    const [textSelected, setTextSelected] = useState(false);
    const [atEnd, setAtEnd] = useState(false);

    // The frame loop and the event handlers below are set up only once, so
    // they would see an out-of-date `playing`. They read it from this ref.
    const playingRef = useRef(playing);
    useEffect(() => {
        playingRef.current = playing;
    }, [playing]);

    // False while the page fades out after you navigate away.
    const isPresent = useIsPresent();
    const presentRef = useRef(isPresent);
    useEffect(() => {
        presentRef.current = isPresent;
    }, [isPresent]);

    const play = useCallback(() => {
        document.getSelection()?.removeAllRanges();
        setChoice(true);
    }, []);

    useEffect(() => {
        let scroller;
        const getScroller = () => (scroller ??= OverlayScrollbars(document.body));
        const scrollY = () => getScroller()?.scroll().position.y;

        const holds = { mouse: false, selection: false };
        const held = () => holds.mouse || holds.selection;

        // The most recent mouse press, used to decide what the click after it
        // means.
        let press = null;
        let focusedAt = -Infinity;

        // Runs every frame. Speed is based on time passed rather than frames,
        // so it's the same on any screen. The page can only scroll by whole
        // pixels, so leftover fractions are saved for the next frame.
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

            if (!playingRef.current || !presentRef.current || held()) {
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

        // Most clicks on the page play or pause the credits. These don't:
        function isPlayPauseClick(event) {
            // Right or middle clicks, and the second click of a double-click.
            if (event.button !== 0 || event.detail > 1) return false;
            // Clicks on links, buttons, or the scrollbar.
            if (event.target instanceof Element && event.target.closest(OWN_CLICKS)) return false;
            if (press === null) return true;
            // Letting go after dragging the scrollbar.
            if (press.scrolled) return false;
            // Letting go after selecting text, or clicking to clear a selection.
            if (press.hadSelection || hasSelection()) return false;
            // The click that switched back to this window from another app.
            if (focusedAt > press.at - REFOCUS_MS) return false;
            return true;
        }

        function onMouseDown(event) {
            holds.mouse = true;
            // The browser updates the selection after this runs, so
            // `holds.selection` still says whether text was selected before
            // the press.
            press = { at: event.timeStamp, startY: scrollY(), hadSelection: holds.selection, scrolled: false };
        }
        function onMouseUp() {
            holds.mouse = false;
            if (press === null) return;
            // Dragging the scrollbar doesn't fire any of the scroll events we
            // listen for, so check whether the page moved while the mouse was
            // down.
            press.scrolled = scrollY() !== press.startY;
            if (press.scrolled) pause();
        }
        function onContextMenu() {
            // On macOS and Linux the menu opens as soon as you press, and the
            // page never hears the button come back up. Treat the menu
            // opening as letting go.
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

        // All of these listeners share one signal, so a single abort()
        // removes them when you leave the page.
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

        frameId = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(frameId);
            listeners.abort();
        };
    }, []);

    return { showPlay: (!playing || textSelected) && !atEnd, play };
}
