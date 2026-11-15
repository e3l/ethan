import { useEffect } from 'react'

// Max growth to fill a row; mirrored in styles/index.module.css.
export const GROW_CAP = 1.6

function toPx(length, root) {
  const value = parseFloat(length)
  return length.trim().endsWith('rem') ? value * root : value
}

// Marks the last row `data-short` when it can't fill the width within
// GROW_CAP, so it stays at row height instead of stretching.
export default function useShortLastRow(ref) {
  useEffect(() => {
    const rows = ref.current
    if (!rows) return

    const mark = () => {
      const photos = [...rows.children]
      if (photos.length === 0) return

      const style = getComputedStyle(rows)
      const root = parseFloat(getComputedStyle(document.documentElement).fontSize)
      const rowHeight = toPx(style.getPropertyValue('--row'), root)
      const gap = parseFloat(style.columnGap) || 0

      const lastTop = Math.max(...photos.map((photo) => photo.offsetTop))
      const last = photos.filter((photo) => photo.offsetTop === lastTop)
      const ratios = last.reduce((sum, photo) => sum + parseFloat(photo.style.getPropertyValue('--ratio')), 0)

      const fillHeight = (rows.clientWidth - gap * (last.length - 1)) / ratios
      const short = fillHeight > rowHeight * GROW_CAP

      photos.forEach((photo) => photo.toggleAttribute('data-short', short && last.includes(photo)))
    }

    const observer = new ResizeObserver(mark)
    observer.observe(rows)
    return () => observer.disconnect()
  }, [ref])
}
