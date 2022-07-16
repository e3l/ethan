import Layout from '../components/layout'
import '../styles/globals.css'

import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

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
            key={router.route}
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{
                type: 'linear',
                duration: 0.75
            }}
            className="content">
              <Component {...pageProps} />
          </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default MyApp
