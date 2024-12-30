import Image from "next/image"
import Link from "next/link"

import styles from "../styles/portfolio.module.css"

import Spacer from "../components/spacer"
import headshot from '../components/gallery/headshot.JPEG'

export default function Portfolio() {
    return (
        <div id={styles.container}>
            <div id={styles.intro}>
                <div id={styles.headshot}>
                    <Image
                        src={headshot}
                        alt="headshot of ethan"
                        sizes="30vh" />
                </div>
                <div>
                    <h2>BS CS @ Georgia Tech, &apos;26</h2>
                    <p>I love working on robots, but have experience throughout the modern tech stack. </p>
                    <p>I learn quickly and ask good questions that dig at &apos;why&apos;.</p>
                    <p>I&apos;ve architected tons of software solutions, led many development teams, and prototyped many robots.</p>
                </div>
            </div>

            <div id={styles.resources}>
                <a
                    href="https://www.linkedin.com/in/e3l/" target="_blank" rel="noopener noreferrer">
                    linkedin ↗
                </a>
                <Spacer />
                <Link
                    href="/resume">
                    resume
                </Link>
                <Spacer />
                <a href='mailto:e3lcool@gmail.com'>e3lcool@gmail.com</a>
            </div>

            <div id={styles.banners}>
            </div>
        </div>
    )
}