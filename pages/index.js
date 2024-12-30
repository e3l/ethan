import Image from 'next/future/image'
import Head from 'next/head'
import styles from '../styles/index.module.css'

import Spacer from '../components/spacer.js'

import { motion } from 'framer-motion'

import OverlayScrollbars from 'overlayscrollbars'
import { useEffect, useRef } from 'react'
import { grt_imgs, kurio_imgs } from '../components/gallery/gallery_collection.js'

const headlineAnimation = {
  color: ['#000000', '#F00000', '#FFFFFF']
};

function ImageCarousel(props) {
  return (
    <motion.div className={styles.imagesContainer} id="scrollz"
      initial={{ paddingLeft: "100vw" }}
      whileInView={{ paddingLeft: "0vw", transition: { duration: 1.5, type: 'tween' } }}
      viewport={{ once: true }}>
      <div className={styles.images}>
        {
          function () {
            let elems = []
            props.imgs.forEach(function (src, i) {
              elems.push(
                <Image
                  key={src.src}
                  src={src}
                  sizes="30vw"
                  // quality={50}
                  priority={i < 3 ? true : false}
                  alt=""
                  placeholder='blur' />
              )
            })
            return elems;
          }()
        }
        {/* {props.children} */}
      </div>
    </motion.div>)
}

export default function Home() {
  const rendered = useRef(false);

  useEffect(() => {
    if (rendered.current) {
      return;
    }

    let threshold = 0.8;
    let observer_options = {
      threshold: threshold
    }

    let intervals = [];
    document.querySelectorAll("#scrollz").forEach((item) => {
      let scrollTo = null;
      let visible = false;

      let scroller = undefined;

      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > threshold) {
            visible = true;
          } else {
            visible = false;
          }

          if (visible && scrollTo == null) {
            scrollTo = Array.from(item.querySelectorAll("img"));
            scrollTo.shift(); // the first element is already scrolled to

            function scrollNext() {
              if (!visible) {
                return;
              }

              if (scroller === undefined) {
                scroller = OverlayScrollbars(item, { className: "os-theme-light deviant-scrollbars" });
              }
              if (scroller !== undefined) {
                scroller.scroll({
                  el: scrollTo[0],
                  block: "begin"
                }, 1000);
                scrollTo.shift();
              }
            }

            intervals.push(setInterval(scrollNext, 6000));
          }
        });
      }, observer_options);
      observer.observe(item);
    });

    rendered.current = true;

    return () => {
      intervals.forEach((intvl) => {
        clearInterval(intvl);
      });
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ethan Liang</title>
        <meta name="description" content="Ethan Liang: BS CS @ GT '26. Alumni Gunn High School, FRC team 192 'GRT', FTC team 12635 'Kuriosity Robotics'." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.headlineContainer}>
        <div className={styles.headlines}>
          <motion.p
            animate={headlineAnimation}
            transition={{
              duration: 2.5,
              delay: 0
            }}>
            Go Big
          </motion.p>
          <motion.p
            animate={headlineAnimation}
            transition={{
              duration: 2.25,
              delay: 1.4
            }}>
            or Go Home
          </motion.p>
        </div>
        <motion.div
          className={styles.headlineLinks}
          animate={{ opacity: [0, 1] }}
          transition={{
            delay: 2
          }}>
          <a
            href="https://github.com/e3l" target="_blank" rel="noopener noreferrer">
            github ↗
          </a>
          <Spacer />
          <a
            href="https://www.linkedin.com/in/e3l/" target="_blank" rel="noopener noreferrer">
            linkedin ↗
          </a>
        </motion.div>
      </div>

      <motion.div className={styles.banners}
        animate={{ opacity: [0, 1] }}
        transition={{ delay: 2.5 }}>
        <div className={styles.grt}>
          <h1>GRT</h1>
          <ImageCarousel imgs={grt_imgs} />
        </div>
        <div className={styles.kurio}>
          <h1>KURIOSITY</h1>
          <ImageCarousel imgs={kurio_imgs} />
        </div>
      </motion.div>
    </div>
  )
}
