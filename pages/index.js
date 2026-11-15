import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { motion, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'

import styles from '../styles/index.module.css'

import Spacer from '../components/spacer.js'
import useShortLastRow from '../components/gallery/useShortLastRow.js'
import { scrollPageBy, useScrollbarsFollow } from '../util/scroll.js'

import headshot from '../components/gallery/headshot-home.jpg'
import { experiences } from '../data/experiences'

const eras = experiences.filter((experience) => experience.gallery?.length > 0)

// Photos shown before an era is expanded.
const PREVIEW = 4

// Fades from black to red once; static under reduced motion.
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

// Matches --ease in styles/index.module.css.
const EASE_MS = 450

// Opening scrolls the era to the top; closing scrolls back if its top is
// off screen. The animation itself is CSS on the `open` class.
function Era({ slug, name, gallery }) {
  const [open, setOpen] = useState(false)
  const section = useRef(null)
  const rows = useRef(null)
  useShortLastRow(rows)

  const preview = gallery.slice(0, PREVIEW)
  const rest = gallery.slice(PREVIEW)

  const toggle = () => {
    const el = section.current
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
    const top = el.getBoundingClientRect().top

    if (!open || top < margin) scrollPageBy(el, top - margin, EASE_MS)
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
              {open ? 'show less ↑' : `all ${gallery.length} photos ↓`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// Fades in as the motto settles, so attention starts on the intro.
const GALLERY_FADE = { duration: 0.8, delay: 1.6, ease: 'easeOut' }

export default function Home() {
  const gallery = useRef(null)
  useScrollbarsFollow(gallery)
  const still = useReducedMotion()

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
          <h1 className={styles.name}>Hi, I&apos;m Ethan!</h1>
          <p className={styles.tagline}>BS CS @ Georgia Tech &apos;26</p>

          <div className={styles.blurb}>
            <p>
              I&apos;m excited to apply robotics to tackle our hardest challenges, whether it be
              in logistics, recycling, or beyond.
              I love the interdisciplinary nature of scrappily prototyping robots.
            </p>
            <p>
              I&apos;m particularly hopeful that we&apos;ll harness Connected Autonomous Vehicle
              technology (imagine intersections without signals!) within this lifetime!
            </p>
            <p>
              I love playing the piano, biking, and eating good food :)
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

      <motion.div
        ref={gallery}
        className={styles.gallery}
        {...(!still && {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: GALLERY_FADE,
        })}>
        {eras.map((era) => <Era key={era.slug} {...era} />)}
      </motion.div>
    </div>
  )
}
