import { useEffect } from 'react'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Certifications from './sections/Certifications'
import Education from './sections/Education'
import Contact from './sections/Contact'

export default function App() {
  useEffect(() => {
    // Lenis smooth scroll
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis')
        const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
        requestAnimationFrame(raf)
      } catch (e) {
        // fallback: native smooth scroll
      }
    }
    initLenis()

    // Back to top btn
    const btn = document.getElementById('backTop')
    const onScroll = () => {
      if (btn) btn.style.opacity = window.scrollY > 400 ? '1' : '0'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />

      {/* Back to top */}
      <button id="backTop" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
        style={{
          position:'fixed', bottom:'2rem', right:'2rem', zIndex:900,
          width:46, height:46, borderRadius:13,
          background:'linear-gradient(135deg,var(--primary),#8b5cf6)',
          color:'#fff', border:'none', fontSize:'1rem', cursor:'none',
          boxShadow:'0 6px 24px rgba(108,99,255,.4)',
          opacity:0, transition:'opacity .3s, transform .3s',
        }}
        onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
        onMouseLeave={e=>e.currentTarget.style.transform=''}>
        ↑
      </button>
    </>
  )
}
