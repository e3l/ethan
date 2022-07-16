import Footer from "./footer";
import Navbar from "./navbar";

import { motion, AnimatePresence } from 'framer-motion'

const container = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1
    },
    exit: {
        opacity: 0
    }
}

export default function Layout({ children }) {
    return (
        <div>
            <Navbar></Navbar>
            <AnimatePresence exitBeforeEnter>
            <motion.main
                key='asdf' 
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
                transition={{
                    type: 'linear',
                    duration: 2
                }}
                className="content">
                {children}
            </motion.main>
            </AnimatePresence>
            <Footer></Footer>
        </div>
    )
}