import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import styles from "../styles/portfolio.module.css"

import Spacer from "../components/spacer"

import headshot from '../components/gallery/headshot.jpeg'
import { experiences } from '../data/portfolio'

// One experience. The accent rides down as a custom property so that the rule
// on the leading edge and the wash the row takes on hover both draw from the
// same colour, and the row needs no per-organisation rule of its own.
function Experience({ name, role, logo, accent, years, stack }) {
    return (
        <li className={styles.experience} style={{ '--accent': accent }}>
            <div className={styles.chip}>
                <Image src={logo} alt="" sizes="64px" />
            </div>

            <div className={styles.detail}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.role}>{role}</p>
                <ul className={styles.stack}>
                    {stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
            </div>

            {years && <div className={styles.years}>{years}</div>}
        </li>
    )
}

export default function Portfolio() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Portfolio | Ethan Liang</title>
            </Head>

            <div className={styles.intro}>
                <div className={styles.headshot}>
                    <Image
                        src={headshot}
                        alt="headshot of ethan"
                        sizes="224px" />
                </div>
                <div>
                    <h1 className={styles.headline}>BS CS @ Georgia Tech, &apos;26</h1>
                    <p>I love working on robots, but have experience throughout the modern tech stack. </p>
                    <p>I learn quickly and ask good questions that dig at &apos;why&apos;.</p>
                    <p>I&apos;ve architected tons of software solutions, led many teams, and prototyped many robots.</p>
                </div>
            </div>

            <div className={styles.resources}>
                <a
                    href="https://www.linkedin.com/in/e3l/" target="_blank" rel="noopener noreferrer">
                    linkedin ↗
                </a>
                {/* <Spacer />
                <Link
                    href="/resume">
                    resume
                </Link> */}
                <Spacer />
                <span>e3liang [at] stanford [dot] edu</span>
            </div>

            <ul className={styles.experiences}>
                {experiences.map((experience) => (
                    <Experience key={experience.name} {...experience} />
                ))}
            </ul>
        </div>
    )
}
