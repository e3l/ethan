import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'

import styles from '../styles/index.module.css'

import Spacer from '../components/spacer.js'

import headshot from '../components/gallery/headshot-home.jpg'
import { experiences } from '../data/experiences'

const eras = experiences.filter((experience) => experience.favorites?.length > 0)

// How many of an era's favourites show before it is expanded: its first row.
const PREVIEW = 4

// The motto rises out of the black canvas and settles red, the second half a
// beat behind the first. It plays once; with reduced motion it is simply drawn
// red.
function Motto() {
  const still = useReducedMotion()

  const sweep = (delay) => still ? {} : {
    initial: { color: '#000000' },
    animate: { color: ['#000000', '#ffffff', '#f00000'] },
    transition: { duration: 1.6, delay, times: [0, 0.4, 1] },
  }

  return (
    <p className={styles.motto}>
      <motion.span {...sweep(0.4)}>Go big</motion.span>{' '}
      <motion.span {...sweep(1.0)}>or go home.</motion.span>
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

// Resolves once the element's scroll container stops scrolling. The page
// scrolls inside OverlayScrollbars' viewport rather than the document, so the
// container is found by walking up. Browsers without `scrollend` fall back to
// a timeout about as long as a smooth scroll takes.
function scrollSettled(el) {
  let scroller = el.parentElement
  while (scroller && !/auto|scroll/.test(getComputedStyle(scroller).overflowY)) {
    scroller = scroller.parentElement
  }
  const target = scroller ?? window

  return new Promise((resolve) => {
    const done = () => {
      clearTimeout(timer)
      target.removeEventListener('scrollend', done)
      resolve()
    }
    const timer = setTimeout(done, 800)
    target.addEventListener('scrollend', done)
  })
}

// One era: its name set over its first few favourites, which make a single
// row so every era can be passed over at a glance. Expanding it lifts the name
// above the row, so no photo is covered while the era is being looked through,
// and opens the rest out in rows beneath.
function Era({ slug, name, favorites }) {
  const [open, setOpen] = useState(false)
  const section = useRef(null)
  const still = useReducedMotion()

  const preview = favorites.slice(0, PREVIEW)
  const rest = favorites.slice(PREVIEW)

  const ease = { duration: still ? 0 : 0.45, ease: [0.4, 0, 0.2, 1] }

  // The control sits under the last row, so collapsing a long era from it
  // would leave the reader several eras further down the page. When the era's
  // top has scrolled out of view, collapsing first scrolls back to it and only
  // then folds the rest away: shrinking the page under a smooth scroll cuts
  // the scroll short.
  const toggle = async () => {
    if (open) {
      const el = section.current
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
      if (el.getBoundingClientRect().top < margin) {
        const settled = scrollSettled(el)
        el.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' })
        await settled
      }
    }
    setOpen(!open)
  }

  return (
    <section ref={section} className={`${styles.era} ${open ? styles.open : ''}`}>
      <div className={styles.photos}>
        <motion.h2 layout="position" transition={ease} className={styles.eraName}>
          <Link href={`/portfolio#${slug}`}>{name}</Link>
        </motion.h2>

        <motion.div layout="position" transition={ease} className={styles.row}>
          {preview.map((photo) => <Photo key={photo.src} photo={photo} />)}
        </motion.div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className={styles.more}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={ease}>
              <div className={styles.rows}>
                {rest.map((photo) => <Photo key={photo.src} photo={photo} />)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

export default function Home() {
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

      <div className={styles.gallery}>
        {eras.map((era) => <Era key={era.slug} {...era} />)}
      </div>
    </div>
  )
}
