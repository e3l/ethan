import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

import styles from '../styles/index.module.css'

import Spacer from '../components/spacer.js'

import headshot from '../components/gallery/headshot.jpeg'
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

// One era: its name in the rail on the left, and on the right its first few
// favourites as a single row, so every era can be passed over at a glance.
// Expanding it lays the rest out in rows beneath.
function Era({ slug, name, years, favorites }) {
  const [open, setOpen] = useState(false)

  const preview = favorites.slice(0, PREVIEW)
  const rest = favorites.slice(PREVIEW)

  return (
    <section className={styles.era}>
      <div className={styles.rail}>
        <h2 className={styles.eraName}>
          <Link href={`/portfolio#${slug}`}>{name}</Link>
        </h2>
        {years && <p className={styles.eraYears}>{years}</p>}
        {rest.length > 0 && (
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            onClick={() => setOpen(!open)}>
            {open ? 'show less ↑' : `+${rest.length} more ↓`}
          </button>
        )}
      </div>

      <div className={styles.photos}>
        <div className={styles.row}>
          {preview.map((photo) => <Photo key={photo.src} photo={photo} />)}
        </div>

        {open && (
          <motion.div
            className={styles.rows}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}>
            {rest.map((photo) => <Photo key={photo.src} photo={photo} />)}
          </motion.div>
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
        <div className={styles.headshotColumn}>
          <div className={styles.headshot}>
            <Image src={headshot} alt="Ethan Liang" sizes="(max-width: 48rem) 60vw, 18rem" priority />
          </div>
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
