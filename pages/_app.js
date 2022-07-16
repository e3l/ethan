import Layout from '../components/layout'
import '../styles/globals.css'

import Navbar from '../components/navbar'
import Footer from '../components/footer'

import { motion, AnimatePresence } from 'framer-motion'
import Router from "next/router";

import { fixTimeoutTransition } from '../util/fixTimeoutTransition'

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

Router.events.on("routeChangeComplete", routeChange );
Router.events.on("routeChangeStart", routeChange );

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
  return (
    // <AnimatePresence exitBeforeEnter>
    //     <Layout key='help'>
    //       <Component {...pageProps} />
    //     </Layout>
    // </AnimatePresence>
    <div>
      <Navbar />
      <AnimatePresence exitBeforeEnter 
        onExitComplete={() => {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0 })
          }
        }}
        >
          <motion.main
            key={router.route + 'yet'}
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{
                type: 'linear',
                duration: 0.5
            }}
            className="content">
              <Component {...pageProps} key={router.route} />
          </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default MyApp
