import style from '../styles/palette.module.css'
import { opensans } from '../util/fonts'

// Each swatch shows a CSS variable from globals.css next to its hex value.
const colors = [
    { name: 'red', hex: '#F00000' },
    { name: 'back', hex: '#000000' },
    { name: 'secondary', hex: '#B8B8B8' },
    { name: 'primary', hex: '#FFFFFF' },
]

export default function Palette() {
    return (
        <div className={`${style.container} ${opensans.variable}`}>
            <p>
                Originally made by hand with Next.js, now in collaboration with Claude, hosted on Vercel.
            </p>
            <div className={style.palette}>
                {colors.map(({ name, hex }) => (
                    <figure key={name} className={style.swatch}>
                        <div style={{ backgroundColor: `var(--${name})` }} />
                        <figcaption>
                            <span>--{name}</span>
                            <span className={style.hex}>{hex}</span>
                        </figcaption>
                    </figure>
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
