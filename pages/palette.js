import style from '../styles/palette.module.css'
import { opensans } from '../util/fonts'

// Each hex value is written in a shade of its own color: darker on the light
// swatches, lighter on the black one.
const colors = [
    { name: 'red', hex: '#F00000', shade: 'black' },
    { name: 'back', hex: '#000000', shade: 'white' },
    { name: 'secondary', hex: '#B8B8B8', shade: 'black' },
    { name: 'primary', hex: '#FFFFFF', shade: 'black' },
]

export default function Palette() {
    return (
        <div className={`${style.container} ${opensans.variable}`}>
            <p className={style.lead}>
                Originally made by hand with Next.js, now in collaboration with Claude, hosted on Vercel.
            </p>
            <div className={style.palette}>
                {colors.map(({ name, hex, shade }) => (
                    <div key={name} className={style.swatch}
                        style={{
                            backgroundColor: `var(--${name})`,
                            color: `color-mix(in srgb, var(--${name}) 40%, ${shade})`,
                        }}>
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
