import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

import styles from '../styles/index.module.css'

import Spacer from '../components/spacer.js'

import headshot from '../components/gallery/headshot-home.jpg'
import { experiences } from '../data/experiences'

const eras = experiences.filter((experience) => experience.favorites?.length > 0)

// How many of an era's favourites show before it is expanded: its first row.
const PREVIEW = 4

// PROTOTYPE: three candidate treatments that keep the name legible over the
// photos, picked with `?title=` and the switcher in the corner. One survives;
// the rest go.
//   tab:    the name sits on a black tab notched into the first photo's corner
//   scrim:  a dark gradient spreads from the top-left corner behind the name
//   invert: the name inverts whatever is behind it
const VARIANTS = ['tab', 'scrim', 'invert']

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

// One era: its name set over its first few favourites, which make a single
// row so every era can be passed over at a glance. Expanding it lays the rest
// out in rows beneath.
function Era({ variant, slug, name, favorites }) {
  const [open, setOpen] = useState(false)

  const preview = favorites.slice(0, PREVIEW)
  const rest = favorites.slice(PREVIEW)

  return (
    <section className={`${styles.era} ${styles[variant]}`}>
      <div className={styles.photos}>
        <h2 className={styles.eraName}>
          <Link href={`/portfolio#${slug}`}>{name}</Link>
        </h2>

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

        {rest.length > 0 && (
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              onClick={() => setOpen(!open)}>
              {open ? 'show less ↑' : `all ${favorites.length} photos ↓`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function VariantSwitcher({ current }) {
  return (
    <div className={styles.switcher}>
      <span>title:</span>
      {VARIANTS.map((v) => (
        <Link
          key={v}
          href={{ query: { title: v } }}
          shallow
          scroll={false}
          className={v === current ? styles.switcherCurrent : undefined}>
          {v}
        </Link>
      ))}
    </div>
  )
}

export default function Home() {
  const { query } = useRouter()
  const variant = VARIANTS.includes(query.title) ? query.title : VARIANTS[0]

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
        {eras.map((era) => <Era key={era.slug} variant={variant} {...era} />)}
      </div>

      <VariantSwitcher current={variant} />
    </div>
  )
}
