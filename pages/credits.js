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
    const { paused, resume } = useCrawl();

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
                        alt="The comet from Your Name blazes towards the setting sun in the horizon, its tail shining against a star-speckled night sky." />
                    <div className={style.splashCredit}>
                        <a href="https://www.pixiv.net/artworks/59397171" target="_blank" rel="noreferrer">さとう枕 | pixiv</a>
                    </div>
                </motion.div>
            </div>
            <AnimatePresence>
                {paused &&
                    <motion.button
                        className={style.resume}
                        onClick={resume}
                        aria-label="Resume the credits"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M9 6.5 18 12l-9 5.5z" />
                        </svg>
                    </motion.button>
                }
            </AnimatePresence>
        </div>
    )

}
