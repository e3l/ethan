import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { motion, useReducedMotion } from 'framer-motion'
import OverlayScrollbars from 'overlayscrollbars'
import { useEffect, useRef, useState } from 'react'

import styles from '../styles/index.module.css'

import Spacer from '../components/spacer.js'
import useShortLastRow from '../components/gallery/useShortLastRow.js'

import headshot from '../components/gallery/headshot-home.jpg'
import { experiences } from '../data/experiences'

const eras = experiences.filter((experience) => experience.favorites?.length > 0)

// How many of an era's favourites show before it is expanded: its first row.
const PREVIEW = 4

// The motto rises out of the black canvas into red, the second half a beat
// behind the first. It plays once; with reduced motion it is simply drawn red.
function Motto() {
  const still = useReducedMotion()

  const sweep = (delay) => still ? {} : {
    initial: { color: '#000000' },
    animate: { color: '#f00000' },
    transition: { duration: 1.2, delay, ease: 'easeOut' },
  }

  return (
    <p className={styles.motto}>
      <motion.span {...sweep(0.4)}>Go big</motion.span>{' '}
      <motion.span {...sweep(0.9)}>or go home.</motion.span>
    </p>
  )
}

function Photo({ photo }) {
  return (
    <div className={styles.photo} style={{ '--ratio': photo.width / photo.height }}>
      <Image
        src={photo}
        alt=""
        fill
        sizes="(max-width: 48rem) 50vw, 25vw"
        placeholder="blur" />
    </div>
  )
}

// Matches the timing of an era's CSS transitions (0.45s, ease-in-out).
const SCROLL_MS = 450
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

// Scrolls the page by `distance` over the same time the era takes to open or
// close. The browser's own smooth scroll is cut short when the page changes
// height under it, which is exactly what an era does while it closes, so the
// scroll is stepped here instead, one frame at a time. The page scrolls inside
// OverlayScrollbars' viewport rather than the document, so that is found by
// walking up. Any wheel, touch or key from the reader hands the scroll back.
function scrollToTop(el, distance) {
  let scroller = el.parentElement
  while (scroller && !(
    /auto|scroll/.test(getComputedStyle(scroller).overflowY) &&
    scroller.scrollHeight > scroller.clientHeight
  )) {
    scroller = scroller.parentElement
  }
  scroller ??= document.scrollingElement

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
    const t = Math.min((now - start) / SCROLL_MS, 1)
    if (!cancelled) scroller.scrollTop = from + distance * easeInOut(t)
    if (t < 1 && !cancelled) {
      requestAnimationFrame(step)
    } else {
      interrupts.forEach((type) => window.removeEventListener(type, cancel))
    }
  }
  requestAnimationFrame(step)
}

// One era: its name set over its first few favourites, which make a single
// row so every era can be passed over at a glance.
//
// Opening it moves the photos rather than the name: the name stays where it
// is, and the photos slide down to clear it, so no photo is covered while the
// era is looked through. The rest open out in rows beneath. Both are CSS
// transitions on the `open` class, so a click part-way through simply turns
// them around.
//
// Either way the era's top is brought into view at the same time: opening
// scrolls it to the top of the screen, and closing from the control under a
// long era scrolls back up to it rather than leaving the reader several eras
// further down.
function Era({ slug, name, favorites }) {
  const [open, setOpen] = useState(false)
  const section = useRef(null)
  const rows = useRef(null)
  useShortLastRow(rows)

  const preview = favorites.slice(0, PREVIEW)
  const rest = favorites.slice(PREVIEW)

  const toggle = () => {
    const el = section.current
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
    const top = el.getBoundingClientRect().top

    if (!open || top < margin) scrollToTop(el, top - margin)
    setOpen((was) => !was)
  }

  return (
    <section ref={section} className={`${styles.era} ${open ? styles.open : ''}`}>
      <div className={styles.photos}>
        <h2 className={styles.eraName}>
          <Link href={`/portfolio#${slug}`}>{name}</Link>
        </h2>

        <div className={styles.row}>
          {preview.map((photo) => <Photo key={photo.src} photo={photo} />)}
        </div>

        {rest.length > 0 && (
          <div className={styles.more} {...(!open && { inert: '' })}>
            <div className={styles.clip}>
              <div ref={rows} className={styles.rows}>
                {rest.map((photo) => <Photo key={photo.src} photo={photo} />)}
              </div>
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              onClick={toggle}>
              {open ? 'show less ↑' : `all ${favorites.length} photos ↓`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// The page scrolls inside OverlayScrollbars, which re-measures its content
// only when its own box resizes or the DOM changes. An era opening is neither:
// it grows by a CSS transition, so without a nudge the scrollable height stays
// at what it was and the rest of the page cannot be scrolled to. Every change
// in the gallery's size asks each instance to measure again.
function useScrollbarsFollow(ref) {
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      document.querySelectorAll('.os-host').forEach((host) => OverlayScrollbars(host)?.update(true))
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
}

export default function Home() {
  const gallery = useRef(null)
  useScrollbarsFollow(gallery)

  return (
    <div className={styles.container}>
      <Head>
        <title>Ethan Liang</title>
        <meta name="description" content="Ethan Liang: BS CS @ Georgia Tech '26, building robots." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.intro}>
        <div className={styles.headshot}>
          <Image src={headshot} alt="Ethan Liang" sizes="(max-width: 48rem) 60vw, 18rem" priority placeholder="blur" />
        </div>

        <div className={styles.copy}>
          <h1 className={styles.name}>Ethan Liang</h1>
          <p className={styles.tagline}>BS CS @ Georgia Tech &apos;26</p>

          <div className={styles.blurb}>
            <p>
              I&apos;m excited to apply robotics to tackle our hardest challenges, whether it be
              in logistics, recycling, or beyond. I&apos;ve built both classical and learned
              robotics software stacks, and I particularly love the interdisciplinary nature of
              scrappily prototyping robots.
            </p>
            <p>
              I&apos;m particularly hopeful that we&apos;ll harness Connected Autonomous Vehicle
              technology (imagine intersections without signals!) within this lifetime, a
              challenge which sits at the intersection of multi-agent planning under
              mixed-autonomy, mesh networking, and societal policy.
            </p>
          </div>

          <Motto />

          <div className={styles.links}>
            <a href="https://github.com/e3l" target="_blank" rel="noopener noreferrer">github ↗</a>
            <Spacer />
            <a href="https://www.linkedin.com/in/e3l/" target="_blank" rel="noopener noreferrer">linkedin ↗</a>
            <Spacer />
            <Link href="/portfolio">portfolio →</Link>
          </div>
        </div>
      </div>

      <div ref={gallery} className={styles.gallery}>
        {eras.map((era) => <Era key={era.slug} {...era} />)}
      </div>
    </div>
  )
}
