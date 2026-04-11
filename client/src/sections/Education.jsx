import { motion } from 'framer-motion'

const education = [
  {
    degree: 'B.E. — Computer Science & Business Systems',
    inst: 'Srinivas Institute of Technology, Mangalore',
    period: '2022 – 2026',
    grade: 'CGPA: 7.67',
    icon: '🎓',
    color: 'var(--primary)',
    detail: 'Affiliated to VTU · Focus on Cloud, AI/ML, and Full Stack Development',
  },
  {
    degree: 'Pre-University — PCMC (Science)',
    inst: 'Government PU College, Udupi',
    period: '2020 – 2022',
    grade: '73%',
    icon: '🏫',
    color: 'var(--cyan)',
    detail: 'Physics, Chemistry, Mathematics & Computer Science',
  },
  {
    degree: 'SSLC — Secondary School',
    inst: 'Christian High School, Udupi',
    period: '2018 – 2020',
    grade: '76.16%',
    icon: '📚',
    color: '#a855f7',
    detail: 'Karnataka State Board',
  },
]

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <div className="section-header">
            <span className="section-tag">✦ Academic Background</span>
            <h2 className="section-title">My <span className="gradient-text">Education</span></h2>
            <div className="section-divider" />
            <p style={{ color:'var(--muted)', maxWidth:480, fontSize:'.92rem' }}>
              A foundation built on curiosity, consistency, and a drive to keep learning.
            </p>
          </div>
        </motion.div>

        <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem', maxWidth:760, margin:'0 auto' }}>
          {education.map((e, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:.6, delay: i * 0.1 }}
              whileHover={{ x:10, borderColor:`${e.color}50`, boxShadow:`0 14px 40px rgba(0,0,0,.35)` }}
              style={{ background:'var(--card)', border:'1px solid var(--border)',
                borderRadius:'var(--radius)', padding:'1.6rem 1.75rem',
                display:'grid', gridTemplateColumns:'auto 1fr auto', alignItems:'center',
                gap:'1.5rem', transition:'all .3s' }}>

              {/* Icon */}
              <div style={{ width:58, height:58, borderRadius:16,
                background:`${e.color}12`, border:`1px solid ${e.color}25`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.5rem', flexShrink:0 }}>
                {e.icon}
              </div>

              {/* Text */}
              <div>
                <h3 style={{ fontFamily:'var(--font-h)', fontSize:'1.02rem', fontWeight:700, marginBottom:'.25rem' }}>
                  {e.degree}
                </h3>
                <p style={{ color:'var(--muted)', fontSize:'.82rem', marginBottom:'.3rem' }}>{e.inst}</p>
                <p style={{ color:'var(--muted)', fontSize:'.75rem', opacity:.7 }}>{e.detail}</p>
              </div>

              {/* Right */}
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontFamily:'var(--font-h)', fontSize:'1.1rem', fontWeight:800, color: e.color }}>{e.grade}</div>
                <div style={{ fontSize:'.72rem', color:'var(--muted)', marginTop:'.25rem' }}>{e.period}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
