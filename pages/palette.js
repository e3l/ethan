import style from '../styles/palette.module.css'
import { opensans } from '../util/fonts'

const colors = ['red', 'back', 'secondary', 'primary']

export default function Palette() {
    return (
        <div className={`${style.container} ${opensans.variable}`}>
            <p>
                Originally made by hand with Next.js, now in collaboration with Claude, hosted on Vercel.
            </p>
            <div className={style.palette}>
                {colors.map(color => (
                    <div key={color} title={`--${color}`} style={{ backgroundColor: `var(--${color})` }} />
                ))}
            </div>
            <p>
                <span style={{ fontFamily: 'var(--font-bebas-neue)' }}>Bebas Neue</span>, <span style={{ fontFamily: 'var(--font-roboto-flex)' }}>Roboto Flex</span>,
                and <span style={{ fontFamily: 'var(--font-open-sans)' }}>Open Sans</span> hosted by Google Fonts.
            </p>
            <p className={style.aside}>
                Featuring framer-motion, Overlay Scrollbars, and a lot of IntersectionObserver :&apos;)
            </p>
        </div>
    )
}
