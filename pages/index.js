import Head from 'next/head'
import styles from '../styles/index.module.css'
import Image from 'next/future/image'

import { motion, useReducedMotion } from 'framer-motion'

import { useEffect, useRef, useState } from 'react';
import OverlayScrollbars from 'overlayscrollbars';

import grt_a from '../components/index/grt/a.png'
import grt_b from '../components/index/grt/b.png'
import grt_c from '../components/index/grt/c.png'
import grt_d from '../components/index/grt/d.png'
import grt_e from '../components/index/grt/e.png'
import grt_f from '../components/index/grt/f.png'
import grt_g from '../components/index/grt/g.png'

import kurio_a from '../components/index/kurio/a.png'
import kurio_b from '../components/index/kurio/b.png'
import kurio_c from '../components/index/kurio/c.png'
import kurio_d from '../components/index/kurio/d.png'
import kurio_e from '../components/index/kurio/e.png'
import kurio_f from '../components/index/kurio/f.png'
import kurio_g from '../components/index/kurio/g.png'

const headlineAnimation = {
  opacity: [0, 1, 1],
  color: ['#F00000', '#F00000', '#FFFFFF']
};

function ImageCarousel(props) {
  return (
    <div className={styles.imagesContainer} id="scrollz">
        <div className={styles.images}>
          {
            function () {
              let elems = []
              for (let src of props.imgs) {
                elems.push(
                  <Image 
                    key={src.src}
                    src={src}
                    sizes="30vw"
                    // quality={50}
                    alt=""
                    placeholder='blur' />
                )
              }
              return elems;
            }()
          }
          {/* {props.children} */}
        </div>
    </div>)
}

export default function Home() {
  const rendered = useRef(false);

  useEffect(() => {
    if (rendered.current) {
      return;
    }

    let cleanups = [];

    document.querySelectorAll("#scrollz").forEach((item) => {
      let options = {
        threshold: 1.0
      }

      let scrollTo = Array.from(item.querySelectorAll("img"));

      let observer = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio == 1) {
              let scroller = OverlayScrollbars(item);

              function scrollToNext() {
                if (scroller === undefined) {
                  scroller = OverlayScrollbars(item);
                }

                if (scroller === undefined) {
                  return;
                }

                scroller.scroll({
                  el: scrollTo[0],
                  block: "begin"
                }, 1000);
                scrollTo.shift();
              }

              setTimeout(scrollToNext, 500);
              let intID = setInterval(scrollToNext, 6000);
              cleanups.push(intID);
            }
          });
      }, options);
      observer.observe(item);
    });

    rendered.current = true;

    return () => {
      for (let cleanup of cleanups) {
        clearInterval(cleanup);
      }
    }
  }, []);

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
            duration: 2.25,
            delay: 0
          }}>
          Go Big
        </motion.p>
        <motion.p
          animate={headlineAnimation}
          transition={{
            duration: 2.5,
            delay: 1.25
          }}>
          or Go Home
        </motion.p>
      </div>

      <div className={styles.banners}>
        <div className={styles.grt}>
          <h1>GRT</h1>
          <ImageCarousel imgs={[grt_c, grt_b, grt_d, grt_e, grt_f, grt_g, grt_a]} />
        </div>
        <div className={styles.kurio}>
          <h1>KURIOSITY</h1>
          <ImageCarousel imgs={[kurio_c, kurio_a, kurio_b, kurio_d, kurio_e, kurio_f, kurio_g]} />
        </div>
      </div>
    </div>
  )
}
