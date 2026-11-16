import { useEffect } from 'react'

// CSS can't tell which photos wrapped onto the last row, so this marks them
// `data-short` when that row can't reach the right edge (its photos hit their
// max-width first). Marked photos stay at row height instead of growing.
export default function useShortLastRow(ref) {
  useEffect(() => {
    const rows = ref.current
    if (!rows) return

    const mark = () => {
      const photos = [...rows.children]
      photos.forEach((photo) => photo.removeAttribute('data-short'))

      const last = photos.at(-1)
      if (!last) return
      const short = last.getBoundingClientRect().right < rows.getBoundingClientRect().right - 1
      if (!short) return

      photos
        .filter((photo) => photo.offsetTop === last.offsetTop)
        .forEach((photo) => photo.setAttribute('data-short', ''))
    }

    const observer = new ResizeObserver(mark)
    observer.observe(rows)
    return () => observer.disconnect()
  }, [ref])
}
