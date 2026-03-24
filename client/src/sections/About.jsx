import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { num: 3, suffix: '+', label: 'Internships' },
  { num: 5, suffix: '+', label: 'Certifications' },
  { num: 7.67, suffix: '', label: 'CGPA' },
  { num: 4, suffix: '+', label: 'Projects' },
]

function Counter({ num, suffix }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      if (Number.isInteger(num)) {
        let c = 0
        const step = () => {
          c = Math.min(c + Math.ceil(num / 40), num)
          el.textContent = c + suffix
          if (c < num) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      } else {
        el.textContent = num + suffix
      }
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [num, suffix])
  return <span ref={ref} style={{ fontSize:'2.6rem', fontWeight:800, fontFamily:'var(--font-h)', background:'linear-gradient(135deg,var(--primary),var(--cyan))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>0{suffix}</span>
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.7 }}>
          <div className="section-header">
            <span className="section-tag">Who I Am</span>
            <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
          </div>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'start' }}>
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7 }}>
            <p style={{ color:'var(--muted)', lineHeight:1.85, marginBottom:'1.2rem', fontSize:'.97rem' }}>
              I'm a <strong style={{ color:'var(--text)' }}>Computer Science & Business Systems</strong> undergraduate at Srinivas Institute of Technology, Mangalore. I believe in <em style={{ color:'var(--cyan)' }}>"learning by building"</em> — turning academic knowledge into real-world, production-ready software.
            </p>
            <p style={{ color:'var(--muted)', lineHeight:1.85, marginBottom:'1.2rem', fontSize:'.97rem' }}>
              I have hands-on experience in <strong style={{ color:'var(--text)' }}>full-stack development</strong>, <strong style={{ color:'var(--text)' }}>cloud engineering (AWS, OCI)</strong>, and <strong style={{ color:'var(--text)' }}>AI/ML</strong> — building everything from ZeroTrust security systems to real-time emotion detection.
            </p>
            <p style={{ color:'var(--muted)', lineHeight:1.85, fontSize:'.97rem' }}>
              Actively seeking roles where I can contribute to building practical, secure, AI-integrated backend systems.
            </p>
            <div style={{ marginTop:'1.5rem', display:'flex', alignItems:'center', gap:'.5rem', color:'var(--muted)', fontSize:'.85rem' }}>
              <span style={{ color:'var(--primary)' }}>📍</span> Udupi, Karnataka, India
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7, delay:.15 }}
            style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                background:'var(--card)', border:'1px solid var(--border)',
                borderRadius:'var(--radius)', padding:'1.75rem 1.5rem', textAlign:'center',
                transition:'all .3s', cursor:'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(108,99,255,0.4)'; e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='var(--glow-p)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}>
                <Counter num={s.num} suffix={s.suffix} />
                <p style={{ color:'var(--muted)', fontSize:'.8rem', marginTop:'.4rem' }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ #about .container > div { grid-template-columns:1fr!important; } }`}</style>
    </section>
  )
}
