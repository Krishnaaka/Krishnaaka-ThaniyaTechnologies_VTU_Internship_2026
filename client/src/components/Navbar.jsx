import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const links = ['About','Skills','Experience','Projects','Certifications','Education','Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [theme, setTheme] = useState(() => localStorage.getItem('pf-theme') || 'dark')

  useEffect(() => {
    document.documentElement.style.setProperty('--bg', theme === 'light' ? '#f8fafc' : '#070c18')
    document.documentElement.style.setProperty('--bg2', theme === 'light' ? '#f1f5f9' : '#0a1020')
    document.documentElement.style.setProperty('--card', theme === 'light' ? '#ffffff' : '#0d1424')
    document.documentElement.style.setProperty('--surface', theme === 'light' ? '#e2e8f0' : '#161d2f')
    document.documentElement.style.setProperty('--border', theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)')
    document.documentElement.style.setProperty('--text', theme === 'light' ? '#0f172a' : '#f1f5f9')
    document.documentElement.style.setProperty('--text-2', theme === 'light' ? '#475569' : '#94a3b8')
    document.documentElement.style.setProperty('--muted', theme === 'light' ? '#94a3b8' : '#475569')
    localStorage.setItem('pf-theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      setProgress((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      links.forEach(l => {
        const el = document.getElementById(l.toLowerCase())
        if (el) { const r = el.getBoundingClientRect(); if (r.top <= 110 && r.bottom >= 110) setActive(l.toLowerCase()) }
      })
    }
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, background: scrolled ? 'rgba(7,12,24,0.88)' : 'transparent', backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none', borderBottom: scrolled ? '1px solid var(--border)' : 'none', transition:'all .35s ease' }}>
      <div style={{ maxWidth:1180, margin:'0 auto', padding:'.85rem 2rem', display:'flex', alignItems:'center', gap:'1.5rem' }}>

        <a href="#hero" style={{ fontFamily:'var(--font-h)', fontSize:'1.35rem', fontWeight:800, flex:1 }}>
          <span className="gt-blue">KAK</span><span style={{ color:'var(--orange)' }}>.</span>
        </a>

        {/* Desktop nav */}
        <ul style={{ display:'flex', gap:'1.75rem', alignItems:'center' }} className="desk-nav">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}
                style={{ fontSize:'.82rem', fontWeight:500, color: active === l.toLowerCase() ? 'var(--blue)' : 'var(--muted)', transition:'color .25s', position:'relative', paddingBottom:3, cursor:'none' }}>
                {l}
                {active === l.toLowerCase() && (
                  <motion.span layoutId="nav-ul" style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'var(--blue)', borderRadius:99 }}/>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme */}
        <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          style={{ width:36, height:36, borderRadius:9, background:'var(--card)', border:'1px solid var(--border)', color:'var(--text-2)', cursor:'none', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.95rem', transition:'var(--tr)' }}
          onMouseEnter={e => e.currentTarget.style.borderColor='var(--blue)'}
          onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}>
          {theme === 'dark' ? '☀' : '🌙'}
        </button>

        <a href="mailto:krishnak1391@gmail.com" className="btn btn-blue" style={{ padding:'.5rem 1.3rem', fontSize:'.8rem' }}>
          Hire Me ✦
        </a>

        <button onClick={() => setOpen(o => !o)} className="mob-menu"
          style={{ display:'none', background:'none', border:'none', color:'var(--text)', cursor:'none', fontSize:'1.2rem' }}>
          {open ? <FiX/> : <FiMenu/>}
        </button>
      </div>

      {/* Progress */}
      <div style={{ height:2, background:'linear-gradient(90deg,var(--blue),var(--orange))', width:`${progress}%`, transition:'width .1s linear' }}/>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
            style={{ background:'rgba(7,12,24,.97)', padding:'2rem', display:'flex', flexDirection:'column', gap:'1.5rem', alignItems:'center' }}>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                style={{ fontSize:'1rem', fontWeight:600, color: active === l.toLowerCase() ? 'var(--blue)' : 'var(--text)' }}>
                {l}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){.desk-nav{display:none!important}.mob-menu{display:flex!important}}
      `}</style>
    </nav>
  )
}
