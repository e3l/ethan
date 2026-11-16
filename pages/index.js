import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useRef, useState } from 'react'

import styles from '../styles/index.module.css'

import Spacer from '../components/spacer.js'
import { scrollPageBy, useScrollbarsFollow } from '../util/scroll.js'
import useShortLastRow from '../util/useShortLastRow.js'

import headshot from '../components/gallery/headshot-home.jpg'
import { experiences } from '../data/experiences'
import { lifePhotos } from '../data/lifePhotos'

const eras = experiences.filter(({ slug }) => lifePhotos[slug])

// Photos shown before an era is expanded.
const PREVIEW = 4

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

// Opening scrolls the era to the top; closing scrolls back if its top is
// off screen. The animation itself is CSS on the `open` class.
function Era({ slug, name, photos }) {
  const [open, setOpen] = useState(false)
  const section = useRef(null)
  const frame = useRef(null)
  const rows = useRef(null)
  useShortLastRow(rows)

  const preview = photos.slice(0, PREVIEW)
  const rest = photos.slice(PREVIEW)

  const toggle = () => {
    const margin = parseFloat(getComputedStyle(section.current).scrollMarginTop)
    const top = section.current.getBoundingClientRect().top
    // The scroll runs alongside the CSS transition, so it takes its duration.
    const duration = parseFloat(getComputedStyle(frame.current).transitionDuration) * 1000

    if (!open || top < margin) scrollPageBy(top - margin, duration)
    setOpen((was) => !was)
  }

  return (
    <section ref={section} className={`${styles.era} ${open ? styles.open : ''}`}>
      <div ref={frame} className={styles.photos}>
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
              {open ? 'show less ↑' : `all ${photos.length} photos ↓`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
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

          <p className={styles.motto}>
            <span>Go big</span> <span>or go home.</span>
          </p>

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
        {eras.map(({ slug, name }) => (
          <Era key={slug} slug={slug} name={name} photos={lifePhotos[slug]} />
        ))}
      </div>
    </div>
  )
}
