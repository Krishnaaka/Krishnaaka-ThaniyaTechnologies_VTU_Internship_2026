// ══════════════════════════════════════════════════
//  ScrollEffects.jsx — Reusable scroll utilities
//  Parallax · StaggerReveal · SectionDots · Ticker
// ══════════════════════════════════════════════════
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

// ── 1. Parallax wrapper — children move at `speed` relative to scroll ──
export function Parallax({ children, speed = 0.3, style = {} }) {
  const ref   = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0, 1], [`${speed * -120}px`, `${speed * 120}px`])
  const y   = useSpring(raw, { stiffness: 80, damping: 20 })
  return (
    <motion.div ref={ref} style={{ ...style, y }} >
      {children}
    </motion.div>
  )
}

// ── 2. StaggerReveal — reveals children with stagger when in viewport ──
export function StaggerReveal({ children, delay = 0, stagger = 0.1, once = true, style = {} }) {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden:  {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// Child item for StaggerReveal
export function RevealItem({ children, style = {}, direction = 'up' }) {
  const variants = {
    hidden: {
      opacity: 0,
      y:       direction === 'up'    ?  40 : direction === 'down'  ? -40 : 0,
      x:       direction === 'left'  ?  40 : direction === 'right' ? -40 : 0,
      scale:   direction === 'scale' ? 0.85 : 1,
    },
    visible: {
      opacity: 1, y: 0, x: 0, scale: 1,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  }
  return <motion.div variants={variants} style={style}>{children}</motion.div>
}

// ── 3. Section progress dots (right side) ──
const SECTIONS = ['hero', 'about', 'skills', 'experience', 'projects', 'certifications', 'education', 'contact']

export function SectionDots() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const handlers = SECTIONS.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      io.observe(el)
      return io
    })
    return () => handlers.forEach(io => io?.disconnect())
  }, [])

  return (
    <div style={{
      position: 'fixed', right: '1.5rem', top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: '.55rem',
      zIndex: 800,
    }}>
      {SECTIONS.map(id => (
        <motion.button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          title={id.charAt(0).toUpperCase() + id.slice(1)}
          animate={{
            width:      active === id ? 24 : 8,
            background: active === id
              ? 'linear-gradient(135deg,var(--primary),var(--cyan))'
              : 'rgba(255,255,255,0.18)',
          }}
          whileHover={{ scale: 1.4 }}
          style={{
            height: 8, borderRadius: 99,
            border: 'none', cursor: 'none', padding: 0,
            transition: 'background 0.3s',
          }}
        />
      ))}

      <style>{`
        @media(max-width:900px){ .section-dots-wrap{display:none!important} }
      `}</style>
    </div>
  )
}

// ── 4. Horizontal scrolling ticker / marquee ──
export function Ticker({ items, speed = 35, color = 'var(--primary)' }) {
  const doubled = [...items, ...items]           // seamless loop
  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
      {/* fade edges */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(90deg, var(--bg) 0%, transparent 10%, transparent 90%, var(--bg) 100%)',
      }} />
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
        style={{ display: 'flex', gap: '2.5rem', width: 'max-content', alignItems: 'center' }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: '.6rem',
            fontSize: '.78rem', fontWeight: 700,
            color: 'var(--muted)', letterSpacing: '.08em',
            textTransform: 'uppercase', whiteSpace: 'nowrap',
          }}>
            <span style={{ color, fontSize: '.7rem' }}>✦</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ── 5. ScrollRevealText — chars animate in on scroll ──
export function ScrollRevealText({ text, style = {} }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const words  = text.split(' ')

  return (
    <motion.span
      ref={ref}
      style={{ display: 'inline', ...style }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '.28em' }}>
          <motion.span
            display="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.55, delay: wi * 0.06, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

// ── 6. Floating scroll progress bar (top of page) ──
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 3, zIndex: 9999, transformOrigin: '0%',
        background: 'linear-gradient(90deg, var(--primary), var(--cyan), var(--pink))',
        scaleX,
      }}
    />
  )
}
