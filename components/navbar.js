import Link from 'next/link'

import style from './navbar.module.css'

function NavLink(props) {
    return (
        <div>
            <Link href={props.href}>{props.children}</Link>
        </div>
    )
}

export default function Navbar() {
    return (
        <div className={style.container}>
            <div className={style.navbar}>
                <Link href='/' className={style.home}>ETHAN LIANG</Link>
                <div className={style.links}>
                    <NavLink href='/'>[under construction]</NavLink>
                    <NavLink href='/portfolio'>Portfolio</NavLink>
                    <NavLink href='/credits'>Credits</NavLink>
                </div>
            </div>
        </div>
    )
}