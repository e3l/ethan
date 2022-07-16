import { motion } from 'framer-motion'

import * as style from '../styles/navbar.module.css'

function HoverLink(props) {
    return (
        <motion.a
            className={props.className}
            whileHover={{ color: 'var(--red)' }}
            transition={{ duration: 0.3 }}
            href={props.href}>{props.children}</motion.a>
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
                <HoverLink href='/' className={style.home}>Ethan Liang</HoverLink>
                <div className={style.links}>
                    <NavLink href='/resume'>[Under Construction]</NavLink>
                    <NavLink href='/credits'>[Under Construction]</NavLink>
                    <NavLink href='/blog'>[Under Construction]</NavLink>
                </div>
            </div>
        </div>
    )
}