import Head from 'next/head'
import styles from '../styles/home.module.css'

import { motion } from 'framer-motion'

const headlineAnimation = {
  opacity: [0, 1, 1],
  color: ['#F00000', '#F00000', '#FFFFFF']
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ethan Liang</title>
        <meta name="description" content="Ethan Liang: senior and site council representative at Gunn High School, member of FRC team 192 'GRT', alumni of FTC team 12635 'Kuriosity Robotics'." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.headline}>
        <motion.p
          animate={headlineAnimation}
          transition={{
            duration: 2
          }}>
            Go Big
        </motion.p>
        <motion.p
          animate={headlineAnimation}
          transition={{
            duration: 2,
            delay: 1
          }}>
            or Go Home
        </motion.p>
      </div>
    </div>
  )
}
