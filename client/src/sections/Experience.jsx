import { motion } from 'framer-motion'
import { StaggerReveal, RevealItem } from '../components/ScrollEffects'

const experiences = [
  {
    role: 'GenAI & Analytics Intern',
    company: 'Learners Byte',
    period: 'Jan 2026 – Present',
    badge: 'Current',
    badgeColor: '#22c55e',
    color: '#22c55e',
    points: [
      'Building Python-based data analysis pipelines and AI-driven analytics solutions for business clients.',
      'Evaluating and fine-tuning generative AI models (LLMs) for real-world business automation use cases.',
      'Implementing interactive data visualization dashboards and automated data workflows.',
      'Researching NLP techniques including summarization, classification, and sentiment analysis.',
    ],
    tags: ['Python', 'GenAI', 'LLMs', 'Data Analysis', 'NLP', 'Pandas'],
  },
  {
    role: 'Data Engineering Virtual Intern',
    company: 'AWS Academy',
    period: 'Jun 2025 – Sep 2025',
    badge: 'AWS',
    badgeColor: '#ffd166',
    color: '#ffd166',
    points: [
      'Built and managed scalable data workflows using AWS S3, EC2, IAM, and RDS.',
      'Designed serverless data handling pipelines with Lambda and API Gateway.',
      'Optimized cloud storage processes ensuring efficient, cost-effective data processing.',
      'Implemented IAM policies and VPC security configurations for secure data access.',
    ],
    tags: ['AWS S3', 'EC2', 'IAM', 'Lambda', 'RDS', 'Data Pipelines'],
  },
  {
    role: 'Full Stack Development Intern',
    company: 'Thaniya Technologies',
    period: 'Jun 2024 – Aug 2024',
    badge: 'Internship',
    badgeColor: 'var(--primary)',
    color: 'var(--primary)',
    points: [
      'Developed full-stack web applications using HTML, CSS, JavaScript, Python, and SQL over 14 days.',
      'Designed and implemented REST APIs with Node.js/Express and frontend–backend integration.',
      'Built a premium student management dashboard with CRUD, search, filter, and analytics features.',
      'Debugged issues, optimized performance, and improved UX across multiple modules.',
    ],
    tags: ['HTML/CSS', 'JavaScript', 'Node.js', 'Python', 'REST APIs', 'SQL'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <div className="section-header">
            <span className="section-tag">✦ My Journey</span>
            <h2 className="section-title">Work <span className="gradient-text">Experience</span></h2>
            <div className="section-divider" />
            <p style={{ color:'var(--muted)', maxWidth:500, fontSize:'.92rem' }}>
              Hands-on internships solving real-world problems across cloud, AI, and full-stack development.
            </p>
          </div>
        </motion.div>

        <div style={{ position:'relative', paddingLeft:'2.5rem' }}>
          {/* Vertical timeline line */}
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:2, background:'linear-gradient(to bottom,var(--primary),var(--cyan),transparent)', borderRadius:99 }} />

          <StaggerReveal stagger={0.15}>
          {experiences.map((e, i) => (
            <RevealItem key={i} direction="left">
              initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:.6, delay: i * 0.12 }}
              style={{ position:'relative', marginBottom:'2.25rem' }}>

              {/* Timeline dot */}
              <div style={{
                position:'absolute', left:'-2.75rem', top:'1.6rem',
                width:14, height:14, borderRadius:'50%',
                background: e.color, border:'2.5px solid var(--bg)',
                boxShadow:`0 0 16px ${e.color}`,
              }} />

              <motion.div
                style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'2rem', transition:'all .35s' }}
                whileHover={{ x:8, borderColor:`${e.color}44`, boxShadow:`0 14px 50px rgba(0,0,0,.45)` }}>

                {/* Top row */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'.75rem', flexWrap:'wrap', gap:'.5rem' }}>
                  <div>
                    <h3 style={{ fontFamily:'var(--font-h)', fontSize:'1.05rem', fontWeight:700, marginBottom:'.2rem' }}>{e.role}</h3>
                    <p style={{ color:'var(--muted)', fontSize:'.83rem', display:'flex', alignItems:'center', gap:'.35rem' }}>
                      <span>🏢</span> {e.company}
                    </p>
                  </div>
                  <span style={{ fontSize:'.7rem', fontWeight:700, padding:'.28rem .85rem', borderRadius:99,
                    background:`${e.badgeColor}18`, color:e.badgeColor, border:`1px solid ${e.badgeColor}33` }}>
                    {e.badge}
                  </span>
                </div>

                {/* Period */}
                <p style={{ color: e.color, fontSize:'.78rem', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'.35rem', fontWeight:600 }}>
                  📅 {e.period}
                </p>

                {/* Bullet points */}
                <ul style={{ color:'var(--muted)', fontSize:'.875rem', lineHeight:1.8, marginBottom:'1.1rem' }}>
                  {e.points.map((p, j) => (
                    <li key={j} style={{ paddingLeft:'1.1rem', position:'relative', marginBottom:'.25rem' }}>
                      <span style={{ position:'absolute', left:0, color: e.color, fontWeight:700 }}>▸</span>{p}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem' }}>
                  {e.tags.map((t, j) => (
                    <span key={j} style={{ background:`${e.color}11`, color: e.color,
                      fontSize:'.7rem', fontWeight:600, padding:'.22rem .75rem', borderRadius:99,
                      border:`1px solid ${e.color}28` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
              </motion.div>
            </RevealItem>
          ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  )
}
