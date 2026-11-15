import { useEffect } from 'react'

// How much taller than the row height a photo may grow to fill its row. The
// same factor caps photo width in styles/index.module.css.
export const GROW_CAP = 1.6

function toPx(length, root) {
  const value = parseFloat(length)
  return length.trim().endsWith('rem') ? value * root : value
}

// Justified rows stretch their photos to the full measure. The last row of an
// era often holds too few photos to do that without growing far taller than
// the rest; such a row is better left at the ordinary row height, centred.
// Which photos end up on the last row depends on the width, so it is worked
// out after layout, again whenever the rows resize, and marked on those photos
// with `data-short`. Marking them changes how they grow, never where the rows
// break, so it cannot feed back into which photos are on the last row.
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

      // The height the last row would need to span the full width.
      const fillHeight = (rows.clientWidth - gap * (last.length - 1)) / ratios
      const short = fillHeight > rowHeight * GROW_CAP

      photos.forEach((photo) => photo.toggleAttribute('data-short', short && last.includes(photo)))
    }

    const observer = new ResizeObserver(mark)
    observer.observe(rows)
    return () => observer.disconnect()
  }, [ref])
}
