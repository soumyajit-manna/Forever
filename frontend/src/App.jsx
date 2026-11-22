import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'

const App = () => {
  const location = useLocation()
  const pageRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.classList.add('site-is-loading')
    const timer = window.setTimeout(() => {
      document.body.classList.remove('site-is-loading')
      setIsLoading(false)
    }, prefersReducedMotion ? 0 : 1550)

    return () => {
      window.clearTimeout(timer)
      document.body.classList.remove('site-is-loading')
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const pageSections = pageRef.current?.querySelectorAll(':scope > * > *')
    if (!pageSections?.length) return

    if (!('IntersectionObserver' in window)) {
      pageSections.forEach((section) => section.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' },
    )

    pageSections.forEach((section, index) => {
      section.classList.add('scroll-reveal')
      section.style.setProperty('--reveal-delay', `${Math.min(index * 70, 210)}ms`)
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [location.pathname])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className='fashion-loader'
            role='status'
            aria-label='Loading Forever fashion store'
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          >
            <div className='fashion-loader-content'>
              <p className='fashion-loader-eyebrow'>THE FOREVER EDIT · 01</p>
              <div className='fashion-loader-wordmark' aria-label='Forever'>
                <span>FOR</span>
                <em>EVER</em>
                <i>.</i>
              </div>
              <p className='fashion-loader-tagline'>A MORE PERSONAL WAY TO SHOP</p>
              <div className='fashion-loader-progress' aria-hidden='true'>
                <span />
              </div>
              <div className='fashion-loader-footer' aria-hidden='true'>
                <span>CURATING YOUR NEXT LOOK</span>
                <span>01 — 04</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className='site-shell' aria-busy={isLoading}>
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <div className='route-content' ref={pageRef} key={location.pathname}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/verify' element={<Verify />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
