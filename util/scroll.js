import OverlayScrollbars from 'overlayscrollbars'
import { useEffect } from 'react'

// The page scrolls inside OverlayScrollbars (pages/_app.js), not the document,
// so page scrolling goes through here.

function scrollerOf(el) {
  let scroller = el.parentElement
  while (scroller && !(
    /auto|scroll/.test(getComputedStyle(scroller).overflowY) &&
    scroller.scrollHeight > scroller.clientHeight
  )) {
    scroller = scroller.parentElement
  }
  return scroller ?? document.scrollingElement
}

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

// Scrolls the page containing `el` by `distance` px over `duration` ms.
// Stepped per frame because native smooth scroll stops if the page resizes
// mid-scroll. Any wheel, touch or key press cancels it.
export function scrollPageBy(el, distance, duration) {
  const scroller = scrollerOf(el)
  const from = scroller.scrollTop
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    scroller.scrollTop = from + distance
    return
  }

  let cancelled = false
  const interrupts = ['wheel', 'touchstart', 'keydown']
  const cancel = () => { cancelled = true }
  interrupts.forEach((type) => window.addEventListener(type, cancel, { once: true, passive: true }))

  const start = performance.now()
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1)
    if (!cancelled) scroller.scrollTop = from + distance * easeInOut(t)
    if (t < 1 && !cancelled) {
      requestAnimationFrame(step)
    } else {
      interrupts.forEach((type) => window.removeEventListener(type, cancel))
    }
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
