import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'GenAI & Analytics Intern',
    company: 'Learners Byte',
    period: 'Jan 2026 – Present',
    badge: 'Current',
    badgeColor: '#22c55e',
    color: '#22c55e',
    points: [
      'Building Python-based data analysis and AI-driven analytics solutions.',
      'Evaluating generative AI models for real-world business use cases.',
      'Implementing data visualization dashboards and automated pipelines.',
    ],
    tags: ['Python', 'GenAI', 'Data Analysis', 'NLP'],
  },
  {
    role: 'Data Engineering Virtual Intern',
    company: 'AWS Academy',
    period: 'Jun 2025 – Sep 2025',
    badge: 'AWS',
    badgeColor: 'var(--yellow)',
    color: 'var(--yellow)',
    points: [
      'Built and managed data workflows using AWS S3, EC2, and IAM.',
      'Designed scalable data handling and optimized cloud storage processes.',
      'Supported pipeline development ensuring efficient data processing.',
    ],
    tags: ['AWS S3', 'EC2', 'IAM', 'Data Pipelines', 'Cloud'],
  },
  {
    role: 'Full Stack Development Intern',
    company: 'Thaniya Technologies',
    period: 'Jun 2024 – Aug 2024',
    badge: 'Internship',
    badgeColor: 'var(--primary)',
    color: 'var(--primary)',
    points: [
      'Developed web applications with HTML, CSS, JavaScript, Python, and SQL.',
      'Designed REST APIs and implemented frontend–backend integration.',
      'Debugged issues and improved application performance and UX.',
    ],
    tags: ['HTML/CSS', 'JavaScript', 'Python', 'REST APIs', 'SQL'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <div className="section-header">
            <span className="section-tag">My Journey</span>
            <h2 className="section-title">Work <span className="gradient-text">Experience</span></h2>
          </div>
        </motion.div>

        <div style={{ position:'relative', paddingLeft:'2.5rem' }}>
          {/* Vertical line */}
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:2, background:'linear-gradient(to bottom,var(--primary),var(--cyan),transparent)', borderRadius:99 }} />

          {experiences.map((e, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:.6, delay: i * 0.12 }}
              style={{ position:'relative', marginBottom:'2rem' }}>

              {/* Dot */}
              <div style={{
                position:'absolute', left:'-2.75rem', top:'1.5rem',
                width:14, height:14, borderRadius:'50%',
                background: e.color, border:'2px solid var(--bg)',
                boxShadow:`0 0 14px ${e.color}`,
              }} />

              <motion.div
                style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.75rem', transition:'all .35s' }}
                whileHover={{ x:6, borderColor:`${e.color}44`, boxShadow:`0 10px 40px rgba(0,0,0,.4)` }}>

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'.6rem', flexWrap:'wrap', gap:'.5rem' }}>
                  <div>
                    <h3 style={{ fontFamily:'var(--font-h)', fontSize:'1.05rem', fontWeight:700, marginBottom:'.25rem' }}>{e.role}</h3>
                    <p style={{ color:'var(--muted)', fontSize:'.83rem' }}>🏢 {e.company}</p>
                  </div>
                  <span style={{ fontSize:'.7rem', fontWeight:700, padding:'.25rem .8rem', borderRadius:99, background:`${e.badgeColor}18`, color:e.badgeColor, border:`1px solid ${e.badgeColor}33` }}>
                    {e.badge}
                  </span>
                </div>

                <p style={{ color: e.color, fontSize:'.78rem', marginBottom:'.9rem', display:'flex', alignItems:'center', gap:'.35rem' }}>
                  📅 {e.period}
                </p>

                <ul style={{ color:'var(--muted)', fontSize:'.875rem', lineHeight:1.75, marginBottom:'1rem' }}>
                  {e.points.map((p, j) => (
                    <li key={j} style={{ paddingLeft:'1rem', position:'relative' }}>
                      <span style={{ position:'absolute', left:0, color: e.color }}>▸</span>{p}
                    </li>
                  ))}
                </ul>

                <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem' }}>
                  {e.tags.map((t, j) => (
                    <span key={j} style={{ background:`${e.color}12`, color: e.color, fontSize:'.7rem', fontWeight:600, padding:'.2rem .7rem', borderRadius:99 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
