import OverlayScrollbars from 'overlayscrollbars'
import { useEffect } from 'react'

// The page scrolls inside OverlayScrollbars' viewport (set up in
// pages/_app.js), not the document, so page scrolling goes through here.
function pageScroller() {
  return OverlayScrollbars(document.body)?.getElements('viewport') ?? document.scrollingElement
}

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

let cancelRunning = () => {}

// Scrolls the page by `distance` px over `duration` ms, replacing any scroll
// still running. Stepped per frame rather than OverlayScrollbars' own scroll(),
// which stops at the page height measured when it starts, so it can't follow a
// page that grows mid-scroll. Any wheel, touch or key press cancels it.
export function scrollPageBy(distance, duration) {
  cancelRunning()
  const scroller = pageScroller()
  const from = scroller.scrollTop
  if (duration <= 0) {
    scroller.scrollTop = from + distance
    return
  }

  let cancelled = false
  const interrupts = ['wheel', 'touchstart', 'keydown']
  const cancel = () => {
    cancelled = true
    interrupts.forEach((type) => window.removeEventListener(type, cancel))
  }
  interrupts.forEach((type) => window.addEventListener(type, cancel, { passive: true }))
  cancelRunning = cancel

  const start = performance.now()
  const step = (now) => {
    if (cancelled) return
    const t = Math.min((now - start) / duration, 1)
    scroller.scrollTop = from + distance * easeInOut(t)
    if (t < 1) requestAnimationFrame(step)
    else cancel()
  }
  requestAnimationFrame(step)
}

// OverlayScrollbars misses size changes from CSS transitions, so re-measure it
// whenever `ref` resizes.
export function useScrollbarsFollow(ref) {
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      document.querySelectorAll('.os-host').forEach((host) => OverlayScrollbars(host)?.update(true))
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
}
