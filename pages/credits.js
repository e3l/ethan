import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import style from '../styles/credits.module.css'
import yourname from '../public/credits.png'
import { motion } from 'framer-motion';
import OverlayScrollbars from 'overlayscrollbars';
import { opensans } from '../util/fonts';
import { rows } from '../data/credits';

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

    useEffect(() => {
        // The splash art fades in proportion to how much of the placeholder at
        // the foot of the crawl has come into view.
        const splashObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setOpacity(entry.intersectionRatio);
            })
        }, { threshold: Array.from({ length: 101 }, (x, i) => i / 100) });
        splashObserver.observe(document.querySelector("#splashplaceholder"));

        // The credits crawl upward on their own, pausing for a second after any
        // user scroll, for as long as a mouse button is held, and for as long
        // as any text stays selected.
        //
        // Driven off the frame clock, with each step derived from elapsed time:
        // that keeps the on-screen speed independent of frame rate, costs one
        // callback per painted frame, and stops the crawl automatically while
        // the tab is backgrounded.
        const PIXELS_PER_SECOND = 100;

        let lastScrollAt = Number.NEGATIVE_INFINITY; // so the crawl starts at once
        let locked = false;
        let selecting = false;
        let carry = 0;
        let previousFrame = null;
        let frameId;

        let scroller = OverlayScrollbars(document.querySelector("body"));

        function step(now) {
            frameId = requestAnimationFrame(step);

            const previous = previousFrame;
            previousFrame = now;
            if (previous === null) return;

            if (locked || selecting || now - lastScrollAt <= 1000) {
                carry = 0;
                return;
            }

            if (scroller === undefined) {
                scroller = OverlayScrollbars(document.querySelector("body"));
            }

            // Accumulate fractional pixels so speed does not depend on frame
            // rate, and scroll only whole ones.
            carry += ((now - previous) / 1000) * PIXELS_PER_SECOND;
            const pixels = Math.floor(carry);
            if (pixels >= 1) {
                carry -= pixels;
                scroller.scroll({ y: `+=${pixels}` });
            }
        }

        function noteUserScroll() {
            lastScrollAt = performance.now();
        }
        function onMouseDown() {
            locked = true;
        }
        function onMouseUp() {
            locked = false;
            noteUserScroll();
        }
        function onSelectionChange() {
            // Ranges that render as nothing do not count as a selection.
            const selection = document.getSelection();
            selecting = selection !== null
                && !selection.isCollapsed
                && selection.toString().trim() !== '';
        }

        window.addEventListener('wheel', noteUserScroll);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        document.addEventListener('selectionchange', onSelectionChange);

        frameId = requestAnimationFrame(step);

        // This route unmounts on every navigation away, so everything attached
        // to window or observing a node has to come back off here.
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('wheel', noteUserScroll);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('selectionchange', onSelectionChange);
            splashObserver.disconnect();
        };
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
        </div>
    )

}
