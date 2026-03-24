import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['About','Skills','Experience','Projects','Certifications','Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress]  = useState(0)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const total = document.body.scrollHeight - window.innerHeight
      setProgress((window.scrollY / total) * 100)

      // active section
      links.forEach(l => {
        const el = document.getElementById(l.toLowerCase())
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) setActive(l.toLowerCase())
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    background: scrolled ? 'rgba(5,5,8,0.92)' : 'transparent',
    backdropFilter: scrolled ? 'blur(24px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
    transition: 'all 0.4s ease',
  }

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth:1180, margin:'0 auto', padding:'.9rem 2rem', display:'flex', alignItems:'center', gap:'2rem' }}>
        {/* Logo */}
        <a href="#hero" style={{ fontFamily:'var(--font-h)', fontSize:'1.4rem', fontWeight:800, background:'linear-gradient(135deg,var(--primary),var(--cyan))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', flex:1 }}>
          KAK<span style={{ color:'var(--cyan)', WebkitTextFillColor:'var(--cyan)' }}>.</span>
        </a>

        {/* Desktop Links */}
        <ul style={{ display:'flex', gap:'2rem', alignItems:'center' }} className="desktop-nav">
          {links.map(l => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                style={{
                  fontFamily:'var(--font)', fontSize:'.875rem', fontWeight:500,
                  color: active === l.toLowerCase() ? 'var(--cyan)' : 'var(--muted)',
                  transition:'color .3s', position:'relative', paddingBottom:4,
                  cursor: 'none',
                }}
              >
                {l}
                {active === l.toLowerCase() && (
                  <motion.span layoutId="underline" style={{
                    position:'absolute', bottom:0, left:0, right:0, height:2,
                    background:'var(--cyan)', borderRadius:99,
                  }} />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Hire Me */}
        <a href="mailto:krishnak1391@gmail.com" className="btn btn-primary" style={{ fontSize:'.82rem', padding:'.5rem 1.4rem' }}>
          Hire Me ✦
        </a>

        {/* Hamburger */}
        <button onClick={() => setOpen(o => !o)} style={{ background:'none', border:'none', color:'var(--text)', fontSize:'1.3rem', cursor:'none', display:'none' }} className="hamburger-btn">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ height:2, background:'linear-gradient(90deg,var(--primary),var(--cyan))', width:`${progress}%`, transition:'width .1s linear' }} />

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
            style={{ position:'absolute', top:'100%', left:0, right:0, background:'rgba(5,5,8,0.98)', padding:'2rem', display:'flex', flexDirection:'column', gap:'1.5rem', alignItems:'center' }}>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                style={{ fontSize:'1.1rem', fontWeight:600, color: active === l.toLowerCase() ? 'var(--cyan)' : 'var(--text)' }}>
                {l}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){
          .desktop-nav{display:none!important}
          .hamburger-btn{display:block!important}
        }
      `}</style>
    </nav>
  )
}
