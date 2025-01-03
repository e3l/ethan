import * as style from '../styles/palette.module.css'

export default function Palette() {
    return (
        <div className={style.container}>
            <p>
                Made by hand with Next.js, hosted on Vercel.
            </p>
            <div>
                <div className={style.palette}>
                    {
                        function generatepalette() {
                            let palette=[];
                            for (let color of ['red', 'back', 'secondary', 'primary']) {
                                palette.push(<div key={`${color}`} style={{ backgroundColor: `var(--${color})` }}></div>);
                            }
                            return palette;
                        }()
                    }
                </div>
                <p>
                    <span style={{ fontFamily: 'var(--font-bebas-neue)' }}>Bebas Neueu</span>, <span style={{ fontFamily: 'var(--font-open-sans)' }}>Open Sans</span>, 
                    and Roboto hosted by Google Fonts.
                </p>
            </div>
            <p>
                Featuring framer-motion, Overlay Scrollbars, and a lot of IntersectionObserver :&apos;)
            </p>
        </div>
    )
}