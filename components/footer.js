import Link from 'next/link'

import Spacer from './spacer.js'

import * as style from './footer.module.css'

export default function Footer() {
    return (
        <div className={style.container}>
            <div className={style.footer}>
                <div>
                    <Link href='/palette' scroll={false}>
                        <a>about this site</a>
                    </Link>
                    <Spacer />
                    <a href='https://open.spotify.com/user/n0tjyxgsgs?si=d3217a5cd07842f1' target="_blank" rel="noopener noreferrer">my spotify</a>
                    <Spacer />
                    <a href='mailto:e3lcool@gmail.com'>e3lcool@gmail.com</a>
                </div>
                <div>c 2024</div>
            </div>
        </div>
    )
}