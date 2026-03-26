import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const projects = [
  {
    title: 'BrightCity — Smart Urban Development',
    desc: 'A full-stack civic issue reporting platform enabling real-time complaint tracking. Features JWT authentication with role-based dashboards, containerized with Docker, deployed on AWS ECS Fargate with CloudWatch monitoring and IAM-based access control.',
    tags: ['React', 'FastAPI', 'JWT', 'Docker', 'AWS ECS', 'CloudWatch', 'IAM'],
    icon: '🏙',
    color: 'var(--primary)',
    featured: true,
    github: 'https://github.com/Krishnaaka',
  },
  {
    title: 'Mental Health State Detection',
    desc: 'Real-time multimodal emotion detection using computer vision and NLP. Detects facial emotions via OpenCV + YOLOv8 + DeepFace, recognizes speech patterns via Librosa & Vosk, and applies Transformer-based NLP for sentiment analysis — all via a Streamlit UI with local LLM (Ollama).',
    tags: ['OpenCV', 'YOLOv8', 'DeepFace', 'Librosa', 'Vosk', 'Streamlit', 'Ollama'],
    icon: '🧠',
    color: '#a855f7',
    github: 'https://github.com/Krishnaaka',
  },
  {
    title: 'AWS Cloud Architectures',
    desc: 'Implemented both traditional (EC2 + RDS) and fully serverless architectures on AWS. Built custom VPCs, API Gateway, Lambda, DynamoDB stacks, and hosted static websites on S3 with IAM-controlled access.',
    tags: ['EC2', 'RDS', 'Lambda', 'API Gateway', 'DynamoDB', 'VPC', 'S3'],
    icon: '☁',
    color: 'var(--cyan)',
    github: 'https://github.com/Krishnaaka',
  },
  {
    title: 'Student Dashboard — Full Stack',
    desc: 'Premium student management dashboard with full CRUD, live search, sort/filter, grade analytics, dashboard stats, and branch breakdown charts. Built across Day 1–14 of Thaniya Technologies VTU Internship 2026.',
    tags: ['HTML/CSS', 'JavaScript', 'Node.js', 'REST APIs', 'Express'],
    icon: '📊',
    color: '#22c55e',
    github: 'https://github.com/Krishnaaka/Krishnaaka-ThaniyaTechnologies_VTU_Internship_2026',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <div className="section-header">
            <span className="section-tag">What I've Built</span>
            <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          </div>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'1.5rem' }}>
          {projects.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:.6, delay: i * 0.1 }}
              style={{
                background:'var(--card)', border:'1px solid var(--border)',
                borderRadius:'var(--radius)', padding:'2rem',
                position:'relative', overflow:'hidden',
                display:'flex', flexDirection:'column',
              }}
              whileHover={{ y:-8, boxShadow:`0 25px 60px rgba(0,0,0,.5)`, borderColor:`${p.color}44` }}>

              {/* Featured ribbon */}
              {p.featured && (
                <div style={{ position:'absolute', top:18, right:-22, background:'var(--primary)', color:'#fff', fontSize:'.62rem', fontWeight:700, padding:'.2rem 2.5rem', transform:'rotate(45deg)', letterSpacing:'.08em' }}>
                  FEATURED
                </div>
              )}

              {/* Glow blob */}
              <div style={{ position:'absolute', top:-60, right:-60, width:180, height:180, borderRadius:'50%', background:`radial-gradient(circle,${p.color}18,transparent)`, pointerEvents:'none' }} />

              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
                <div style={{ width:52, height:52, borderRadius:14, background:`${p.color}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem' }}>
                  {p.icon}
                </div>
                <div style={{ display:'flex', gap:'.5rem' }}>
                  <a href={p.github} target="_blank"
                    style={{ width:36, height:36, borderRadius:9, background:'var(--surface)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)', fontSize:'1rem', transition:'all .3s' }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor=p.color; e.currentTarget.style.color=p.color }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--muted)' }}>
                    <FiGithub />
                  </a>
                </div>
              </div>

              <h3 style={{ fontFamily:'var(--font-h)', fontSize:'1.05rem', fontWeight:700, marginBottom:'.75rem' }}>{p.title}</h3>
              <p style={{ color:'var(--muted)', fontSize:'.862rem', lineHeight:1.75, flex:1, marginBottom:'1.25rem' }}>{p.desc}</p>

              <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem' }}>
                {p.tags.map((t, j) => (
                  <span key={j} style={{ background:`${p.color}10`, border:`1px solid ${p.color}28`, color: p.color, fontSize:'.7rem', fontWeight:600, padding:'.2rem .65rem', borderRadius:99 }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:.3 }}
          style={{ textAlign:'center', marginTop:'3rem' }}>
          <a href="https://github.com/Krishnaaka" target="_blank" className="btn btn-outline">
            <FiGithub /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
