import { motion } from 'framer-motion'

const education = [
  {
    degree: 'B.E. — Computer Science & Business Systems',
    inst: 'Srinivas Institute of Technology, Mangalore',
    period: '2022 – 2026', grade: 'CGPA: 7.67',
    icon: '🎓', color: 'var(--primary)',
  },
  {
    degree: 'Pre-University — PCMC (Science)',
    inst: 'Govt PU College, Udupi',
    period: '2020 – 2022', grade: '73%',
    icon: '🏫', color: 'var(--cyan)',
  },
  {
    degree: 'SSLC — Secondary School',
    inst: 'Christian High School, Udupi',
    period: '2018 – 2020', grade: '76.16%',
    icon: '📚', color: '#a855f7',
  },
]

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <div className="section-header">
            <span className="section-tag">Academic Background</span>
            <h2 className="section-title">My <span className="gradient-text">Education</span></h2>
          </div>
        </motion.div>

        <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem', maxWidth:740, margin:'0 auto' }}>
          {education.map((e, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:.6, delay: i * 0.1 }}
              style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.5rem', display:'flex', alignItems:'center', gap:'1.5rem', transition:'all .3s' }}
              whileHover={{ x:8, borderColor:`${e.color}44`, boxShadow:`0 10px 30px rgba(0,0,0,.3)` }}>
              <div style={{ width:54, height:54, borderRadius:14, background:`${e.color}14`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', flexShrink:0 }}>
                {e.icon}
              </div>
              <div style={{ flex:1 }}>
                <h3 style={{ fontFamily:'var(--font-h)', fontSize:'1rem', fontWeight:700, marginBottom:'.3rem' }}>{e.degree}</h3>
                <p style={{ color:'var(--muted)', fontSize:'.83rem', marginBottom:'.4rem' }}>{e.inst}</p>
                <div style={{ display:'flex', gap:'1rem' }}>
                  <span style={{ fontSize:'.76rem', color:'var(--muted)' }}>{e.period}</span>
                  <span style={{ fontSize:'.76rem', color: e.color, fontWeight:700 }}>{e.grade}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
