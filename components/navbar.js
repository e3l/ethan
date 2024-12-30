import { motion } from 'framer-motion'
import Link from 'next/link'

import style from './navbar.module.css'

function HoverLink(props) {
    return (
        <Link href={props.href} scroll={false}>
            <motion.a
                className={props.className}
                whileHover={{ color: 'var(--red)' }}
                transition={{ duration: 0.3 }}
            >{props.children}</motion.a>
        </Link>
    )
}

function NavLink(props) {
    return (
        <div>
            <HoverLink href={props.href}>{props.children}</HoverLink>
        </div>
    )
}

export default function Navbar() {
    return (
        <div className={style.container}>
            <div className={style.navbar}>
                <HoverLink href='/' className={style.home}>ETHAN LIANG</HoverLink>
                <div className={style.links}>
                    <NavLink href='/'>[under construction]</NavLink>
                    <NavLink href='/portfolio'>Portfolio</NavLink>
                    <NavLink href='/credits'>Credits</NavLink>
                </div>
            </div>
        </div>
    )
}