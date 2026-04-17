import { useEffect, useState, useCallback } from 'react'
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

// ── Toast system ──────────────────────────────
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])
  return (
    <motion.div
      initial={{ opacity:0, y:60, scale:.9 }}
      animate={{ opacity:1, y:0,  scale:1  }}
      exit={{   opacity:0, y:40, scale:.95 }}
      transition={{ type:'spring', stiffness:280, damping:22 }}
      style={{
        position:'fixed', bottom:'2rem', left:'50%', transform:'translateX(-50%)',
        zIndex:8000, background:'var(--surface)',
        border:'1px solid rgba(59,130,246,.35)',
        padding:'.7rem 1.6rem', borderRadius:99,
        fontSize:'.82rem', fontWeight:600, color:'var(--blue)',
        boxShadow:'0 0 40px rgba(59,130,246,.2)',
        whiteSpace:'nowrap', cursor:'pointer',
      }}
      onClick={onClose}>
      {message}
    </motion.div>
  )
}

// ── Loading splash ─────────────────────────────
function Splash({ onDone }) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const iv = setInterval(() => setP(c => { if(c>=100){clearInterval(iv);setTimeout(onDone,250);return 100} return Math.min(c+5,100) }), 28)
    return () => clearInterval(iv)
  }, [onDone])
  return (
    <motion.div exit={{ opacity:0 }} transition={{ duration:.4 }}
      style={{ position:'fixed', inset:0, zIndex:9999, background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2rem' }}>
      <motion.div initial={{ scale:.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:.6, ease:[.22,1,.36,1] }}>
        <div style={{ fontFamily:'var(--font-h)', fontSize:'3.5rem', fontWeight:800 }}>
          <span className="gt-blue">KAK</span><span style={{ color:'var(--orange)' }}>.</span>
        </div>
      </motion.div>
      <div style={{ width:180, height:2, background:'rgba(255,255,255,.06)', borderRadius:99 }}>
        <motion.div style={{ height:'100%', borderRadius:99, background:'linear-gradient(90deg,var(--blue),var(--orange))', width:`${p}%`, transition:'width .03s linear' }}/>
      </div>
      <p style={{ fontSize:'.68rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)' }}>Loading portfolio</p>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const showToast = useCallback(msg => setToast(msg), [])

  // Expose globally for Hero download button
  useEffect(() => { window.showToast = showToast }, [showToast])

  // Lenis + scroll
  useEffect(() => {
    const initLenis = async () => {
      try {
        const { default:Lenis } = await import('lenis')
        const l = new Lenis({ lerp:.075, smoothWheel:true })
        const raf = t => { l.raf(t); requestAnimationFrame(raf) }
        requestAnimationFrame(raf)
      } catch {}
    }
    initLenis()

    const btn = document.getElementById('backTop')
    const onScroll = () => { if(btn) btn.style.opacity = window.scrollY > 500 ? '1' : '0' }
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Cursor />

      <AnimatePresence>
        {loading && <Splash key="splash" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast key={toast} message={toast} onClose={() => setToast(null)} />}
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
        style={{ position:'fixed', bottom:'2rem', right:'2rem', zIndex:900, width:44, height:44, borderRadius:12, background:'linear-gradient(135deg,var(--blue),#6366f1)', color:'#fff', border:'none', fontSize:'1rem', cursor:'none', boxShadow:'0 8px 28px rgba(59,130,246,.4)', opacity:0, transition:'opacity .3s,transform .3s' }}
        onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
        onMouseLeave={e=>e.currentTarget.style.transform=''}>
        ↑
      </button>
    </>
  )
}
