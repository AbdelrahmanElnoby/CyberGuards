import { useEffect, useState, useCallback } from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import Home from '../Home/Home.jsx'
import Services from '../Services/Services.jsx'
import Technology from '../Technology/Technology.jsx'
import About from '../About/About.jsx'
import Features from '../Features/Features.jsx'
import bgImage from '../../assets/screens/1.jpg'
import UseCases from '../UseCases/UseCases.jsx'
import Demo from '../Demo/Demo.jsx'
import Contact from '../Contact/Contact.jsx'
import ScrollToTop from '../Common/ScrollToTop.jsx'


export default function Layout() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  // Throttle function for better performance
  const throttle = useCallback((func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }, [])

  useEffect(() => {
    const handleScroll = throttle(() => {
      const sections = document.querySelectorAll('section')
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Calculate scroll progress
      const progress = (scrollY / (documentHeight - windowHeight)) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))
      
      setIsScrolling(true)
      setTimeout(() => setIsScrolling(false), 150)

      // Find active section
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200 // offset for navbar height
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute('id')

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }, 10) // Throttle to 10ms for smooth updates

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // set initial state on mount
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [throttle])

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative scroll-smooth overflow-x-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-black/30 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Navbar highlights current section */}
        <Navbar activeSection={activeSection} isScrolling={isScrolling} />

        {/* Sections stack one after another */}
        <main className="pt-24 scroll-snap-container"> 
          {/* pt-24 ensures content starts below fixed navbar */}
          <Home />
          <Services />
          <About />
          <Technology />
          <Features />
          <UseCases />
          <Demo />
          <Contact />
        </main>
      </div>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}
