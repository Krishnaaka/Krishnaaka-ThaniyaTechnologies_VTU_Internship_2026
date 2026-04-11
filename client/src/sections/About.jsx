import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { num: 3,    suffix: '+', label: 'Internships',      icon: '💼', color: 'var(--primary)' },
  { num: 8,    suffix: '+', label: 'Certifications',   icon: '🏅', color: 'var(--cyan)'    },
  { num: 7.67, suffix: '',  label: 'CGPA',             icon: '🎓', color: 'var(--yellow)'  },
  { num: 10,   suffix: '+', label: 'Projects Built',   icon: '🚀', color: 'var(--pink)'    },
]

const highlights = [
  { icon: '☁', label: 'AWS Certified',         color: 'var(--yellow)' },
  { icon: '🤖', label: 'GenAI Intern',         color: 'var(--cyan)'   },
  { icon: '🔐', label: 'Cloud Security Focus', color: 'var(--primary)' },
  { icon: '🌐', label: 'Full Stack Dev',        color: 'var(--green)'  },
]

function Counter({ num, suffix, color }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      if (Number.isInteger(num)) {
        let c = 0
        const step = () => {
          c = Math.min(c + Math.ceil(num / 45), num)
          el.textContent = c + suffix
          if (c < num) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      } else { el.textContent = num + suffix }
    }, { threshold: .5 })
    io.observe(el)
    return () => io.disconnect()
  }, [num, suffix])
  return (
    <span ref={ref}
      style={{ fontFamily:'var(--font-h)', fontSize:'2.6rem', fontWeight:800, lineHeight:1,
        background:`linear-gradient(135deg,${color},${color}99)`,
        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
      0{suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <div className="section-header">
            <span className="section-tag">✦ Who I Am</span>
            <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
            <div className="section-divider" />
          </div>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:'4.5rem', alignItems:'start' }}>

          {/* Bio column */}
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7 }}>
            <p style={{ color:'var(--text-2)', lineHeight:2, marginBottom:'1.2rem', fontSize:'.96rem' }}>
              I'm a <strong style={{ color:'var(--text)' }}>Computer Science &amp; Business Systems</strong> undergraduate at{' '}
              <span style={{ color:'var(--primary)' }}>Srinivas Institute of Technology, Mangalore</span> (2022–2026), with a passion for systems that are secure, scalable, and intelligent.
            </p>
            <p style={{ color:'var(--text-2)', lineHeight:2, marginBottom:'1.2rem', fontSize:'.96rem' }}>
              I believe in <em style={{ color:'var(--cyan)', fontStyle:'normal', fontWeight:600 }}>learning by building</em> —
              from containerised microservices on AWS to real-time emotion detection with computer vision and NLP. Every
              project is a chance to go deeper.
            </p>
            <p style={{ color:'var(--text-2)', lineHeight:2, marginBottom:'2rem', fontSize:'.96rem' }}>
              Currently working as a <strong style={{ color:'var(--text)' }}>GenAI &amp; Analytics Intern</strong> at Learners Byte,
              actively exploring LLM fine-tuning, Zero Trust Security, and Kubernetes while seeking roles in cloud, backend, or AI engineering.
            </p>

            {/* Highlight pills */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.6rem', marginBottom:'2rem' }}>
              {highlights.map((h, i) => (
                <motion.div key={i}
                  whileHover={{ y:-3, scale:1.04 }}
                  style={{ display:'flex', alignItems:'center', gap:'.45rem',
                    background:`${h.color}0d`, border:`1px solid ${h.color}28`,
                    borderRadius:99, padding:'.4rem 1rem',
                    fontSize:'.8rem', fontWeight:600, color:h.color }}>
                  <span>{h.icon}</span> {h.label}
                </motion.div>
              ))}
            </div>

            {/* Info tags */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.65rem' }}>
              {[
                { icon:'📍', text:'Udupi, Karnataka' },
                { icon:'🎓', text:'SIT Mangalore · 2022–2026' },
                { icon:'💡', text:'Open to Opportunities' },
                { icon:'🕐', text:'Available Immediately' },
              ].map((item, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'.5rem',
                  background:'var(--card)', border:'1px solid var(--border)',
                  borderRadius:99, padding:'.38rem .95rem', fontSize:'.8rem', color:'var(--text-2)' }}>
                  <span>{item.icon}</span> {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7, delay:.1 }}
            style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            {stats.map((s, i) => (
              <motion.div key={i} className="glass-card"
                whileHover={{ y:-7, boxShadow:`0 24px 55px rgba(0,0,0,.55), 0 0 0 1px ${s.color}22` }}
                style={{ padding:'1.9rem 1.5rem', textAlign:'center', cursor:'default' }}>
                <div style={{ fontSize:'1.75rem', marginBottom:'.65rem' }}>{s.icon}</div>
                <Counter num={s.num} suffix={s.suffix} color={s.color} />
                <p style={{ color:'var(--muted)', fontSize:'.73rem', marginTop:'.45rem', letterSpacing:'.05em' }}>{s.label}</p>
              </motion.div>
            ))}

            {/* Resume CTA */}
            <motion.div className="glass-card"
              whileHover={{ y:-5 }}
              style={{ gridColumn:'1/-1', padding:'1.4rem 1.5rem',
                background:'linear-gradient(135deg,rgba(124,109,255,0.07),rgba(0,232,204,0.04))',
                borderColor:'rgba(124,109,255,0.22)', display:'flex', alignItems:'center',
                justifyContent:'space-between', gap:'1rem', flexWrap:'wrap' }}>
              <div>
                <p style={{ fontFamily:'var(--font-h)', fontSize:'.92rem', fontWeight:700, color:'var(--text)', marginBottom:'.25rem' }}>
                  📄 Download Resume
                </p>
                <p style={{ fontSize:'.76rem', color:'var(--muted)' }}>PDF · Updated April 2026</p>
              </div>
              <a href="/resume.pdf" target="_blank" className="btn btn-outline" style={{ fontSize:'.8rem', padding:'.6rem 1.4rem' }}>
                View / Download ↗
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#about .container>div{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
