import style from '../styles/palette.module.css'
import { opensans } from '../util/fonts'

const colors = [
    { name: 'red', hex: '#F00000' },
    { name: 'back', hex: '#000000' },
    { name: 'secondary', hex: '#B8B8B8' },
    { name: 'primary', hex: '#FFFFFF' },
]

// Each hex value is written in the inverse of its own color, e.g. red's in cyan.
function invert(hex) {
    const inverse = 0xFFFFFF ^ parseInt(hex.slice(1), 16);
    return '#' + inverse.toString(16).padStart(6, '0');
}

export default function Palette() {
    return (
        <div className={`${style.container} ${opensans.variable}`}>
            <p className={style.lead}>
                Originally made by hand with Next.js, now in collaboration with Claude, hosted on Vercel.
            </p>
            <section className={style.row}>
                <h2>palette</h2>
                <div className={style.palette}>
                    {colors.map(({ name, hex }) => (
                        <div key={name} className={style.swatch}
                            style={{ backgroundColor: `var(--${name})`, color: invert(hex) }}>
                            {hex}
                        </div>
                    ))}
                </div>
            </section>
            <section className={style.row}>
                <h2>type</h2>
                <p>
                    <span style={{ fontFamily: 'var(--font-bebas-neue)' }}>Bebas Neue</span>, <span style={{ fontFamily: 'var(--font-roboto-flex)' }}>Roboto Flex</span>,
                    and <span style={{ fontFamily: 'var(--font-open-sans)' }}>Open Sans</span> hosted by Google Fonts.
                </p>
            </section>
            <section className={style.row}>
                <h2>also</h2>
                <p>Featuring framer-motion, Overlay Scrollbars, and a lot of IntersectionObserver :&apos;)</p>
            </section>
        </div>
    )
}
