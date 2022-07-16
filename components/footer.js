import * as style from '../styles/footer.module.css'

function Spacer() {
    return (
        <span className={style.spacer}>-</span>
    )
}

export default function Footer() {
    return (
        <div className={style.container}>
            <div className={style.footer}>
                <div>
                    <a href='/palette'>about this site</a>
                    <Spacer/>
                    <a href='https://open.spotify.com/user/n0tjyxgsgs?si=d3217a5cd07842f1' target="_blank" rel="noopener noreferrer">my spotify</a>
                    <Spacer/>
                    <a href='mailto:e3lcool@gmail.com'>e3lcool@gmail.com</a>
                </div>
                <div>© 2022</div>
            </div>
        </div>
    )
}