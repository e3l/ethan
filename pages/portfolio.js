import Image from "next/image"
import Link from "next/link"

import styles from "../styles/portfolio.module.css"

import Spacer from "../components/spacer"

import headshot from '../components/gallery/headshot.JPEG'
import tesla from '../components/portfolio/tesla.png'
import rapyuta from '../components/portfolio/rapyuta.png'
import gtri from '../components/portfolio/gtri.png'
import mitre from '../components/portfolio/mitre.png'
import grt from '../components/portfolio/grt.png'
import kurio from '../components/portfolio/kurio.png'

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
                    <p>I&apos;ve architected tons of software solutions, led many teams, and prototyped many robots.</p>
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
                <div id={styles.tesla}>
                    <div className={styles.logo}>
                        <Image src={tesla} />
                    </div>
                    <h1>Tesla</h1>
                    <h2>Computer Vision & Data</h2>
                    <p>AWS S3, SQL, Kakfa, Kubernetes, C#/.NET</p>
                </div>

                <div id={styles.rapyuta}>
                    <div className={styles.logo}>
                        <Image src={rapyuta} />
                    </div>
                    <h1>Rapyuta Robotics</h1>
                    <h2>Robotics Perception & Systems</h2>
                    <p>Python, PyTorch, GStreamer, OpenCV, TensorRT, Transformer Object Detection, ROS/ROS 2, C++, Docker Compose, Linux, Networking, Ansible, Grafana</p>
                </div>

                <div id={styles.gtri}>
                    <div className={styles.logo}>
                        <Image src={gtri} />
                    </div>
                    <h1>Georgia Tech Research Institute</h1>
                    <h2>Robotics Simulation</h2>
                    <p>ROS, catkin, Gazebo, SLAM</p>
                </div>

                <div id={styles.mitre}>
                    <div className={styles.logo}>
                        <Image src={mitre} />
                    </div>
                    <h1>MITRE Corporation</h1>
                    <h2>Deep Learning Research</h2>
                    <p>Cybersecurity, Computer Vision, Generative Adversarial Networks</p>
                </div>

                <div id={styles.grt}>
                    <div className={styles.logo}>
                        <Image src={grt} />
                    </div>
                    <h1>Gunn Robotics Team</h1>
                    <h2>Controls Team Lead</h2>
                    <p>Jetson Nano, GStreamer H254 streaming, Electronics, Soldering, Java, Recruiting & Mentorship, Design/Systems Integration, Logistics & Purchasing & Coordination</p>
                </div>

                <div id={styles.kurio}>
                    <div className={styles.logo}>
                        <Image src={kurio} />
                    </div>
                    <h1>Kuriosity Robotics</h1>
                    <h2>Software Team Lead</h2>
                    <p>Multi-threaded software architecture, SLAM, Kalman Filter Sensor Fusion, Path Planning, Control Systems, TensorFlow, Java, Mentorship & Leadership</p>
                </div>
            </div>
        </div>
    )
}