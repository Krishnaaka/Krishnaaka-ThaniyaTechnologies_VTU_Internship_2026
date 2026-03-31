import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

// ── Splash / Loading screen ──
function Splash({ onDone }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const iv = setInterval(() => {
      setCount(c => {
        if (c >= 100) { clearInterval(iv); setTimeout(onDone, 300); return 100 }
        return c + 4
      })
    }, 30)
    return () => clearInterval(iv)
  }, [onDone])

  return (
    <motion.div exit={{ opacity:0, scale:.97 }} transition={{ duration:.5 }}
      style={{ position:'fixed', inset:0, zIndex:9999, background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2rem' }}>

      {/* Logo animation */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}>
        <div style={{ fontFamily:'var(--font-h)', fontSize:'4rem', fontWeight:800, letterSpacing:'-.04em', background:'linear-gradient(135deg,var(--primary),var(--cyan))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
          KAK<span style={{ color:'var(--cyan)', WebkitTextFillColor:'var(--cyan)' }}>.</span>
        </div>
      </motion.div>

      {/* Progress bar */}
      <div style={{ width:200, height:2, background:'var(--surface)', borderRadius:99, overflow:'hidden' }}>
        <motion.div style={{ height:'100%', borderRadius:99, background:'linear-gradient(90deg,var(--primary),var(--cyan))', width:`${count}%`, transition:'width .05s linear' }}/>
      </div>

      <motion.p initial={{ opacity:0 }} animate={{ opacity:.4 }} style={{ fontSize:'.75rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--muted)' }}>
        Loading portfolio...
      </motion.p>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Lenis smooth scroll
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis')
        const lenis = new Lenis({ lerp: 0.075, smoothWheel: true })
        const raf = t => { lenis.raf(t); requestAnimationFrame(raf) }
        requestAnimationFrame(raf)
      } catch {}
    }
    initLenis()

    // Back to top
    const btn = document.getElementById('backTop')
    const onScroll = () => { if (btn) btn.style.opacity = window.scrollY > 500 ? '1' : '0' }
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Cursor />

      <AnimatePresence>
        {loading && <Splash key="splash" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.5 }}>
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
        </motion.div>
      )}

      {/* Back to top */}
      <button id="backTop" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
        style={{
          position:'fixed', bottom:'2rem', right:'2rem', zIndex:900,
          width:46, height:46, borderRadius:13,
          background:'linear-gradient(135deg,var(--primary),#9b8bff)',
          color:'#fff', border:'none', fontSize:'1.1rem', cursor:'none',
          boxShadow:'0 8px 30px rgba(124,109,255,.4)',
          opacity:0, transition:'opacity .3s, transform .3s',
        }}
        onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
        onMouseLeave={e=>e.currentTarget.style.transform=''}>
        ↑
      </button>

      <style>{`
        body { transition: background .4s, color .4s; }
      `}</style>
    </>
  )
}
