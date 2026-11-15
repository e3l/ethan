import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import style from '../styles/credits.module.css'
import yourname from '../public/credits.png'
import { AnimatePresence, motion } from 'framer-motion';
import { opensans } from '../util/fonts';
import { rows } from '../data/credits';
import useCrawl from '../util/usecrawl';

// One block of names. The label column stays in the markup even when empty so
// that every block lines up on the same centre seam.
function Block({ label, names }) {
    return (
        <div className={`${style.section} ${label ? style.newsection : ''}`}>
            <div className={style.sectionlabel}>
                <div>{label}</div>
            </div>
            <div className={style.sectionlist}>
                {names.map((name, i) => <div key={i}>{name}</div>)}
            </div>
        </div>
    )
}

// A group's blocks render as siblings: only the first carries the label, and
// the rest sit tight beneath it as continuations of the same list.
function Group({ label, blocks }) {
    return blocks.map((names, i) => (
        <Block key={i} label={i === 0 ? label : undefined} names={names} />
    ))
}

export default function Credits() {
    const [opacity, setOpacity] = useState(0);
    const { showPlay, play } = useCrawl();

    useEffect(() => {
        // The splash art fades in proportion to how much of the placeholder at
        // the foot of the crawl has come into view.
        const splashObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setOpacity(entry.intersectionRatio);
            })
        }, { threshold: Array.from({ length: 101 }, (x, i) => i / 100) });
        splashObserver.observe(document.querySelector("#splashplaceholder"));

        return () => splashObserver.disconnect();
    }, []);

    return (
        <div className={`${style.container} ${opensans.variable}`}>
            <div className={style.credits}>
                {rows.map((columns, row) => (
                    <div key={row} className={style.split}>
                        {columns.map((groups, column) => (
                            <div key={column}>
                                {groups.map((group, i) => <Group key={i} {...group} />)}
                            </div>
                        ))}
                    </div>
                ))}
                <div>
                    <p>my parents, my sister, my family, and family friends</p>
                    <br></br>
                    <p>and all those I&apos;m sorry I forgot, but have made me who I am as much as everyone else. <br></br>Please reach out! I&apos;d love to relive old memories.</p>
                    <br></br>
                    <br></br>
                    <p>thank you all, for everything</p>
                </div>
                <div className={style.splashplaceholder} id="splashplaceholder">

                </div>
            </div>
            <div className={style.bg}>
                <motion.div
                    style={{ opacity: opacity }}>
                    <Image src={yourname}
                        alt="two pieces of a comet break apart as they fall through the night sky -- will they ever see each other again?" />
                    <div className={style.splashCredit}>
                        <a href="https://www.pixiv.net/artworks/59397171" target="_blank" rel="noreferrer">さとう枕 | pixiv</a>
                    </div>
                </motion.div>
            </div>
            <AnimatePresence>
                {showPlay &&
                    <motion.button
                        className={style.play}
                        onClick={play}
                        aria-label="Play the credits"
                        title="Play (or click anywhere)"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.5, scale: 1 }}
                        whileHover={{ opacity: 1 }}
                        whileFocus={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}>
                        {/* The triangle's box sits right of the viewBox centre:
                            a triangle's weight is toward its flat side, so a
                            box-centred one looks shifted left. Icon sets bake
                            in the same offset (Material's play_arrow is
                            M8 5v14l11-7z). */}
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7.5 5v14l11-7z" />
                        </svg>
                    </motion.button>
                }
            </AnimatePresence>
        </div>
    )

}
