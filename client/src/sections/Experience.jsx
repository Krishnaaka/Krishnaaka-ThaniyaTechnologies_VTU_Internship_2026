import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'GenAI & Analytics Intern',
    company: 'Learners Byte',
    period: 'Jan 2026 – Present',
    badge: '● Current',
    color: '#22c55e',
    points: [
      'Building Python-based data analysis pipelines and AI-driven analytics solutions.',
      'Evaluating and fine-tuning generative AI models (LLMs) for business automation.',
      'Implementing interactive data visualization dashboards and automated workflows.',
      'Researching NLP techniques: summarization, classification, sentiment analysis.',
    ],
    tags: ['Python', 'GenAI', 'LLMs', 'Data Analysis', 'NLP', 'Pandas'],
  },
  {
    role: 'Data Engineering Virtual Intern',
    company: 'AWS Academy',
    period: 'Jun 2025 – Sep 2025',
    badge: 'AWS',
    color: '#eab308',
    points: [
      'Built scalable data workflows using AWS S3, EC2, IAM, and RDS.',
      'Designed serverless pipelines with Lambda and API Gateway.',
      'Optimized cloud storage for cost-effective data processing.',
      'Implemented IAM policies and VPC security configurations.',
    ],
    tags: ['AWS S3', 'EC2', 'IAM', 'Lambda', 'RDS', 'Data Pipelines'],
  },
  {
    role: 'Full Stack Development Intern',
    company: 'Thaniya Technologies',
    period: 'Jun 2024 – Aug 2024',
    badge: 'Internship',
    color: '#3b82f6',
    points: [
      'Developed full-stack apps using HTML, CSS, JavaScript, Python, and SQL over 14 days.',
      'Designed REST APIs with Node.js/Express and complete frontend–backend integration.',
      'Built a premium student dashboard with CRUD, search, filter, and analytics.',
      'Debugged, optimized performance, and improved UX across multiple modules.',
    ],
    tags: ['HTML/CSS', 'JavaScript', 'Node.js', 'Python', 'REST APIs', 'SQL'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.div initial={{ opacity:0, y:25 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <span className="pill">✦ My Journey</span>
          <h2 className="h-xl">Work <span className="gt-blue">Experience</span></h2>
          <div className="rule"/>
          <p className="section-sub" style={{ marginBottom:'3rem' }}>
            Hands-on internships solving real problems across cloud, AI, and full-stack.
          </p>
        </motion.div>

        <div style={{ position:'relative', paddingLeft:'2.5rem' }}>
          {/* Timeline line */}
          <div style={{ position:'absolute', left:0, top:16, bottom:0, width:2, background:`linear-gradient(to bottom,var(--blue),var(--orange),transparent)`, borderRadius:99 }}/>

          {experiences.map((e, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:.6, delay:i*.1 }}
              style={{ position:'relative', marginBottom:'2rem' }}>

              {/* Dot */}
              <div style={{ position:'absolute', left:'-2.72rem', top:'1.7rem', width:14, height:14, borderRadius:'50%', background:e.color, border:'2.5px solid var(--bg)', boxShadow:`0 0 14px ${e.color}88` }}/>

              <motion.div className="card"
                style={{ padding:'1.75rem' }}
                whileHover={{ x:7, borderColor:`${e.color}44`, boxShadow:`0 20px 55px rgba(0,0,0,.45)` }}>

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'.5rem', marginBottom:'.6rem' }}>
                  <div>
                    <h3 style={{ fontFamily:'var(--font-h)', fontSize:'1.02rem', fontWeight:800, marginBottom:'.2rem' }}>{e.role}</h3>
                    <p style={{ color:'var(--muted)', fontSize:'.82rem' }}>🏢 {e.company}</p>
                  </div>
                  <span style={{ fontSize:'.68rem', fontWeight:700, padding:'.25rem .85rem', borderRadius:99, background:`${e.color}14`, color:e.color, border:`1px solid ${e.color}30` }}>
                    {e.badge}
                  </span>
                </div>

                <p style={{ color:e.color, fontSize:'.76rem', fontWeight:600, marginBottom:'.9rem' }}>📅 {e.period}</p>

                <ul style={{ color:'var(--text-2)', fontSize:'.875rem', lineHeight:1.8, marginBottom:'1rem' }}>
                  {e.points.map((p,j) => (
                    <li key={j} style={{ paddingLeft:'1.1rem', position:'relative', marginBottom:'.2rem' }}>
                      <span style={{ position:'absolute', left:0, color:e.color, fontWeight:700 }}>▸</span>{p}
                    </li>
                  ))}
                </ul>

                <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem' }}>
                  {e.tags.map((t,j) => (
                    <span key={j} className="chip" style={{ background:`${e.color}0d`, borderColor:`${e.color}28`, color:e.color, fontSize:'.7rem' }}>{t}</span>
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
