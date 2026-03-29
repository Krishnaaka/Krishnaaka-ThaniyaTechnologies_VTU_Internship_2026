import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { num: 3,    suffix: '+', label: 'Internships',    icon: '💼', color: 'var(--primary)' },
  { num: 5,    suffix: '+', label: 'Certifications', icon: '🏅', color: 'var(--cyan)' },
  { num: 7.67, suffix: '',  label: 'CGPA',           icon: '🎓', color: 'var(--yellow)' },
  { num: 4,    suffix: '+', label: 'Projects',       icon: '🚀', color: 'var(--pink)' },
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
        const step = () => { c = Math.min(c + Math.ceil(num / 40), num); el.textContent = c + suffix; if (c < num) requestAnimationFrame(step) }
        requestAnimationFrame(step)
      } else { el.textContent = num + suffix }
    }, { threshold: .5 })
    io.observe(el)
    return () => io.disconnect()
  }, [num, suffix])
  return <span ref={ref} style={{ fontFamily:'var(--font-h)', fontSize:'2.4rem', fontWeight:800, lineHeight:1, background:`linear-gradient(135deg,${color},${color}aa)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>0{suffix}</span>
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

        <div style={{ display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:'4rem', alignItems:'start' }}>
          {/* Bio */}
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7 }}>
            <p style={{ color:'var(--text-2)', lineHeight:1.9, marginBottom:'1.2rem', fontSize:'.96rem' }}>
              I'm a <strong style={{ color:'var(--text)' }}>Computer Science & Business Systems</strong> undergraduate at{' '}
              <span style={{ color:'var(--primary)' }}>Srinivas Institute of Technology, Mangalore</span> (2022–2026).
              Passionate about building systems that are not just functional — but secure, scalable, and intelligent.
            </p>
            <p style={{ color:'var(--text-2)', lineHeight:1.9, marginBottom:'1.2rem', fontSize:'.96rem' }}>
              I believe in <em style={{ color:'var(--cyan)', fontStyle:'normal', fontWeight:600 }}>learning by building</em> —
              from containerised microservices on AWS to real-time emotion detection with computer vision and NLP.
            </p>
            <p style={{ color:'var(--text-2)', lineHeight:1.9, fontSize:'.96rem' }}>
              Currently interning as a <strong style={{ color:'var(--text)' }}>GenAI & Analytics Intern</strong> at Learners Byte
              while actively seeking internship/full-time roles in cloud, backend, or AI engineering.
            </p>

            <div style={{ display:'flex', flexWrap:'wrap', gap:'.75rem', marginTop:'2rem' }}>
              {[
                { icon:'📍', text:'Udupi, Karnataka' },
                { icon:'🎓', text:'SIT Mangalore' },
                { icon:'💡', text:'Open to Opportunities' },
              ].map((item, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'.5rem', background:'var(--card)', border:'1px solid var(--border)', borderRadius:99, padding:'.4rem 1rem', fontSize:'.82rem', color:'var(--text-2)' }}>
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
                whileHover={{ y:-6, boxShadow:`0 20px 50px rgba(0,0,0,.5), 0 0 0 1px ${s.color}22` }}
                style={{ padding:'1.75rem', textAlign:'center', cursor:'default' }}>
                <div style={{ fontSize:'1.6rem', marginBottom:'.6rem' }}>{s.icon}</div>
                <Counter num={s.num} suffix={s.suffix} color={s.color} />
                <p style={{ color:'var(--muted)', fontSize:'.76rem', marginTop:'.4rem', letterSpacing:'.04em' }}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#about .container>div{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
