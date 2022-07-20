import '../styles/globals.css'
import "overlayscrollbars/css/OverlayScrollbars.css";

import Navbar from '../components/navbar'
import Footer from '../components/footer'

import { motion, AnimatePresence } from 'framer-motion'
import Router from "next/router";

import { fixTimeoutTransition } from '../util/fixTimeoutTransition'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useEffect } from 'react';
import OverlayScrollbars from 'overlayscrollbars';

fixTimeoutTransition(750)

const routeChange = () => {
  // Temporary fix to avoid flash of unstyled content
  // during route transitions. Keep an eye on this
  // issue and remove this code when resolved:
  // https://github.com/vercel/next.js/issues/17464

  const tempFix = () => {
    const allStyleElems = document.querySelectorAll('style[media="x"]');
    allStyleElems.forEach((elem) => {
      elem.removeAttribute("media");
    });
  };
  tempFix();
};

Router.events.on("routeChangeComplete", routeChange);
Router.events.on("routeChangeStart", routeChange);

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

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    OverlayScrollbars(document.querySelectorAll('body'), { className : "os-theme-light deviant-scrollbars" });
    OverlayScrollbars(document.querySelectorAll('#scrollz'), { className : "os-theme-light deviant-scrollbars" });
  }, [])

  return (
    <div>
      <Navbar />
      <OverlayScrollbarsComponent>
        <AnimatePresence exitBeforeEnter
          onExitComplete={() => {
            if (typeof window !== 'undefined') {
              OverlayScrollbars(document.querySelector("body")).scroll({y:0});
            }
          }}>
          <motion.div
            key={router.route + 'yet'}
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{
              type: 'linear',
              duration: 0.5
            }}>
            <main
              className="content">
              <Component {...pageProps} key={router.route} />
            </main>
            <Footer />
          </motion.div>
        </AnimatePresence>
      </OverlayScrollbarsComponent>
    </div>
  )
}

export default MyApp
