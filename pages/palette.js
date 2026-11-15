import Head from 'next/head'
import { motion } from 'framer-motion'

import style from '../styles/palette.module.css'
import { opensans } from '../util/fonts'

// Each swatch shows a CSS variable from globals.css next to its hex value.
const colors = [
    { name: 'red', hex: '#F00000' },
    { name: 'back', hex: '#000000' },
    { name: 'secondary', hex: '#B8B8B8' },
    { name: 'primary', hex: '#FFFFFF' },
]

const fonts = [
    { name: 'Bebas Neue', variable: '--font-bebas-neue', use: 'headlines' },
    { name: 'Roboto Flex', variable: '--font-roboto-flex', use: 'body text' },
    { name: 'Open Sans', variable: '--font-open-sans', use: 'the credits' },
]

const tools = [
    ['Next.js', 'framework'],
    ['Vercel', 'hosting'],
    ['framer-motion', 'animation'],
    ['OverlayScrollbars', 'scrollbars'],
    ['Google Fonts', 'type'],
    ['IntersectionObserver', 'a lot of it :\')'],
]

// Each section fades up a little once it scrolls into view.
const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: 'easeOut' },
}

export default function Palette() {
    return (
        <div className={`${style.container} ${opensans.variable}`}>
            <Head>
                <title>about this site</title>
            </Head>

            <motion.header className={style.intro} {...reveal}>
                <h1 className={style.title}>about this site</h1>
                <p className={style.tagline}>
                    Originally made by hand with Next.js, now in collaboration
                    with Claude, hosted on Vercel.
                </p>
            </motion.header>

            <motion.section className={style.section} {...reveal}>
                <h2 className={style.label}>palette</h2>
                <div className={style.swatches}>
                    {colors.map(({ name, hex }) => (
                        <figure key={name} className={style.swatch}>
                            <div style={{ backgroundColor: `var(--${name})` }} />
                            <figcaption>
                                <span>--{name}</span>
                                <span className={style.muted}>{hex}</span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </motion.section>

            <motion.section className={style.section} {...reveal}>
                <h2 className={style.label}>type</h2>
                <div className={style.fonts}>
                    {fonts.map(({ name, variable, use }) => (
                        <div key={name} className={style.font}
                            style={{ fontFamily: `var(${variable}), sans-serif` }}>
                            <span className={style.specimen}>Aa</span>
                            <span className={style.fontname}>{name}</span>
                            <span className={style.muted}>{use}</span>
                        </div>
                    ))}
                </div>
            </motion.section>

            <motion.section className={style.section} {...reveal}>
                <h2 className={style.label}>built with</h2>
                <ul className={style.tools}>
                    {tools.map(([tool, role]) => (
                        <li key={tool}>
                            <span>{tool}</span>
                            <span className={style.muted}>{role}</span>
                        </li>
                    ))}
                </ul>
            </motion.section>
        </div>
    )
}
