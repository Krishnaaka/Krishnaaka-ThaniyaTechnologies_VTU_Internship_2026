import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ScrollProgressBar, SectionDots } from './components/ScrollEffects'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Certifications from './sections/Certifications'
import Education from './sections/Education'
import Contact from './sections/Contact'

// ── Splash / Loading screen ──
function Splash({ onDone }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const iv = setInterval(() => {
      setCount(c => {
        if (c >= 100) { clearInterval(iv); setTimeout(onDone, 400); return 100 }
        return c + 3
      })
    }, 25)
    return () => clearInterval(iv)
  }, [onDone])

  return (
    <motion.div
      exit={{ opacity: 0, scale: .96, filter: 'blur(8px)' }}
      transition={{ duration: .6, ease: [.22,1,.36,1] }}
      style={{ position:'fixed', inset:0, zIndex:9999, background:'var(--bg)',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2rem' }}>

      {/* Animated logo */}
      <motion.div
        initial={{ opacity:0, y:24, scale:.9 }}
        animate={{ opacity:1, y:0, scale:1 }}
        transition={{ duration:.7, ease:[.22,1,.36,1] }}>
        <div style={{ fontFamily:'var(--font-h)', fontSize:'4.5rem', fontWeight:800,
          letterSpacing:'-.04em',
          background:'linear-gradient(135deg,var(--primary),var(--cyan))',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
          KAK<span style={{ color:'var(--cyan)', WebkitTextFillColor:'var(--cyan)' }}>.</span>
        </div>
      </motion.div>

      {/* Progress track */}
      <div style={{ width:220, height:2, background:'var(--surface)', borderRadius:99, overflow:'hidden' }}>
        <motion.div style={{
          height:'100%', borderRadius:99,
          background:'linear-gradient(90deg,var(--primary),var(--cyan),var(--pink))',
          width:`${count}%`, transition:'width .04s linear',
        }}/>
      </div>

      <motion.p
        initial={{ opacity:0 }} animate={{ opacity:.35 }}
        style={{ fontSize:'.72rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)' }}>
        {count < 100 ? 'Initialising...' : 'Ready ✦'}
      </motion.p>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const handleDone = useCallback(() => setLoading(false), [])

  useEffect(() => {
    // Lenis smooth scroll — tuned for a premium feel
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis')
        const lenis = new Lenis({
          lerp:        0.06,      // lower = smoother
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.2,
        })
        const raf = t => { lenis.raf(t); requestAnimationFrame(raf) }
        requestAnimationFrame(raf)
      } catch {}
    }
    initLenis()

    // Back-to-top visibility
    const btn = document.getElementById('backTop')
    const onScroll = () => {
      if (!btn) return
      btn.style.opacity   = window.scrollY > 500 ? '1' : '0'
      btn.style.transform = window.scrollY > 500 ? 'translateY(0)' : 'translateY(12px)'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Cursor />
      <ScrollProgressBar />

      <AnimatePresence mode="wait">
        {loading && <Splash key="splash" onDone={handleDone} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6, ease: [.22,1,.36,1] }}>

          <Navbar />
          <SectionDots />

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
        </motion.div>
      )}

      {/* Back to top */}
      <button
        id="backTop"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position:'fixed', bottom:'2rem', right:'2rem', zIndex:900,
          width:46, height:46, borderRadius:13,
          background:'linear-gradient(135deg,var(--primary),#9b8bff)',
          color:'#fff', border:'none', fontSize:'1.1rem', cursor:'none',
          boxShadow:'0 8px 30px rgba(124,109,255,.4)',
          opacity:0, transform:'translateY(12px)',
          transition:'opacity .35s, transform .35s',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}
        onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
        onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
        ↑
      </button>

      <style>{`
        body { transition: background .4s, color .4s; }
        html { scroll-behavior: auto; }  /* Lenis handles smooth scroll */
      `}</style>
    </>
  )
}
