import { useEffect, useState } from 'react'
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


export default function Layout() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      const scrollY = window.scrollY

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150 // offset for navbar height
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute('id')

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // set initial state on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="min-h-screen bg-cover bg-center relative scroll-smooth overflow-x-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Navbar highlights current section */}
        <Navbar activeSection={activeSection} />

        {/* Sections stack one after another */}
        <main className="pt-24"> 
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
    </div>
  )
}
