import style from '../styles/palette.module.css'
import { opensans } from '../util/fonts'

// The site's colors from globals.css. `text` is the color the hex label is
// written in, picked so it stays readable on that swatch.
const colors = [
    { name: 'red', hex: '#F00000', text: 'primary' },
    { name: 'back', hex: '#000000', text: 'secondary' },
    { name: 'secondary', hex: '#B8B8B8', text: 'back' },
    { name: 'primary', hex: '#FFFFFF', text: 'back' },
]

export default function Palette() {
    return (
        <div className={`${style.container} ${opensans.variable}`}>
            <p>
                Originally made by hand with Next.js, now in collaboration with Claude, hosted on Vercel.
            </p>
            <div className={style.palette}>
                {colors.map(({ name, hex, text }) => (
                    <div key={name} className={style.swatch}
                        style={{ backgroundColor: `var(--${name})`, color: `var(--${text})` }}>
                        {hex}
                    </div>
                ))}
            </div>
            <p>
                <span style={{ fontFamily: 'var(--font-bebas-neue)' }}>Bebas Neue</span>, <span style={{ fontFamily: 'var(--font-roboto-flex)' }}>Roboto Flex</span>,
                and <span style={{ fontFamily: 'var(--font-open-sans)' }}>Open Sans</span> hosted by Google Fonts.
            </p>
            <p>
                Featuring framer-motion, Overlay Scrollbars, and a lot of IntersectionObserver :&apos;)
            </p>
        </div>
    )
}
