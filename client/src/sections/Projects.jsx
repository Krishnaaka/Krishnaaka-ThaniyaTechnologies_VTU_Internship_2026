import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const projects = [
  {
    title: 'BrightCity',
    sub: 'Smart Urban Development Platform',
    desc: 'Full-stack civic issue reporting platform with JWT auth, role-based dashboards, containerized with Docker & deployed on AWS ECS Fargate. Features CloudWatch monitoring, IAM-based access control and real-time complaint tracking.',
    tags: ['React', 'FastAPI', 'JWT', 'Docker', 'AWS ECS', 'CloudWatch', 'IAM'],
    icon: '🏙', color: 'var(--primary)', featured: true,
    github: 'https://github.com/Krishnaaka',
  },
  {
    title: 'Mental Health AI',
    sub: 'State Detection using Vision & NLP',
    desc: 'Real-time multimodal emotion analysis — facial detection via OpenCV + YOLOv8 + DeepFace, speech patterns via Librosa & Vosk, and transformer-based sentiment NLP, all powered by a local Ollama LLM through a Streamlit UI.',
    tags: ['OpenCV', 'YOLOv8', 'DeepFace', 'Librosa', 'Vosk', 'Streamlit', 'Ollama'],
    icon: '🧠', color: '#a78bfa',
    github: 'https://github.com/Krishnaaka',
  },
  {
    title: 'AWS Cloud Architectures',
    sub: 'Traditional & Serverless Patterns',
    desc: 'Implemented both EC2+RDS traditional and fully serverless stacks on AWS — custom VPCs, API Gateway, Lambda, DynamoDB, IAM-controlled S3 static hosting and multi-tier production architecture.',
    tags: ['EC2', 'RDS', 'Lambda', 'API Gateway', 'DynamoDB', 'S3', 'VPC'],
    icon: '☁', color: 'var(--cyan)',
    github: 'https://github.com/Krishnaaka',
  },
  {
    title: 'Student Dashboard',
    sub: 'Full Stack CRUD Application',
    desc: 'Premium student management dashboard built across 14 days of VTU internship — full CRUD, live search, analytics, grade charts, filters and branch breakdown. Demonstrates complete full-stack skill.',
    tags: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express', 'REST APIs'],
    icon: '📊', color: 'var(--green)',
    github: 'https://github.com/Krishnaaka/Krishnaaka-ThaniyaTechnologies_VTU_Internship_2026',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <div className="section-header">
            <span className="section-tag">✦ What I've Built</span>
            <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
            <div className="section-divider" />
            <p style={{ color:'var(--muted)', maxWidth:500, fontSize:'.92rem' }}>
              Real-world projects combining cloud, AI, and full-stack engineering.
            </p>
          </div>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:'1.5rem' }}>
          {projects.map((p, i) => (
            <motion.div key={i} className="glass-card"
              initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:.6, delay: i * 0.1 }}
              style={{ padding:'0', overflow:'hidden', display:'flex', flexDirection:'column' }}>

              {/* Card top bar */}
              <div style={{ height:4, background:`linear-gradient(90deg,${p.color},${p.color}66)`, borderRadius:'var(--radius) var(--radius) 0 0' }} />

              <div style={{ padding:'1.75rem', flex:1, display:'flex', flexDirection:'column' }}>
                {/* Header row */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
                    <div className="icon-box" style={{ background:`${p.color}12`, border:`1px solid ${p.color}28`, fontSize:'1.5rem' }}>
                      {p.icon}
                    </div>
                    <div>
                      <h3 style={{ fontFamily:'var(--font-h)', fontSize:'1rem', fontWeight:700, color:'var(--text)' }}>{p.title}</h3>
                      <p style={{ fontSize:'.72rem', color: p.color, marginTop:'.1rem' }}>{p.sub}</p>
                    </div>
                  </div>

                  <div style={{ display:'flex', gap:'.4rem' }}>
                    {p.featured && (
                      <span className="badge" style={{ background:`${p.color}14`, color:p.color, border:`1px solid ${p.color}30`, fontSize:'.62rem' }}>★ Featured</span>
                    )}
                    <motion.a href={p.github} target="_blank" whileHover={{ y:-2, scale:1.08 }}
                      style={{ width:34, height:34, borderRadius:9, background:'var(--surface)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)', fontSize:'.95rem', transition:'all .3s' }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=p.color;e.currentTarget.style.color=p.color}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)'}}>
                      <FiGithub size={15} />
                    </motion.a>
                  </div>
                </div>

                <p style={{ color:'var(--text-2)', fontSize:'.875rem', lineHeight:1.75, flex:1, marginBottom:'1.25rem' }}>{p.desc}</p>

                {/* Tags */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem' }}>
                  {p.tags.map((t, j) => (
                    <span key={j} className="skill-tag" style={{ background:`${p.color}0c`, borderColor:`${p.color}28`, color:p.color, fontSize:'.7rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Glow blob */}
              <div style={{ position:'absolute', bottom:-40, right:-40, width:150, height:150, borderRadius:'50%', background:`radial-gradient(circle,${p.color}12,transparent)`, pointerEvents:'none' }} />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:.4 }}
          style={{ textAlign:'center', marginTop:'3.5rem' }}>
          <a href="https://github.com/Krishnaaka" target="_blank" className="btn btn-ghost">
            <FiGithub size={16} /> View All Projects on GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}
