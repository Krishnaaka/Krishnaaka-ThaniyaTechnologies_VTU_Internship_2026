import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FiGithub } from 'react-icons/fi'

const projects = [
  {
    title: 'BrightCity',
    sub: 'Smart Urban Development Platform',
    desc: 'Full-stack civic issue reporting platform with JWT auth, role-based dashboards, Docker containerization & AWS ECS Fargate deployment. Features real-time tracking, CloudWatch monitoring and IAM access control.',
    tags: ['React', 'FastAPI', 'JWT', 'Docker', 'AWS ECS', 'CloudWatch', 'IAM'],
    icon: '🏙', color: '#7c6dff', featured: true,
    github: 'https://github.com/Krishnaaka',
  },
  {
    title: 'Mental Health AI',
    sub: 'Multimodal Emotion Detection',
    desc: 'Real-time emotion analysis system — facial detection (OpenCV + YOLOv8 + DeepFace), speech analysis (Librosa + Vosk) and transformer NLP sentiment, powered by a local Ollama LLM via Streamlit.',
    tags: ['OpenCV', 'YOLOv8', 'DeepFace', 'Librosa', 'Vosk', 'Streamlit', 'Ollama'],
    icon: '🧠', color: '#a78bfa',
    github: 'https://github.com/Krishnaaka',
  },
  {
    title: 'AWS Architectures',
    sub: 'Cloud Infrastructure Patterns',
    desc: 'Implemented traditional (EC2 + RDS) and serverless (Lambda + API Gateway + DynamoDB) stacks on AWS. Custom VPCs, IAM-controlled S3 hosting and multi-tier production topology.',
    tags: ['EC2', 'RDS', 'Lambda', 'API Gateway', 'DynamoDB', 'S3', 'VPC'],
    icon: '☁', color: '#00e8cc',
    github: 'https://github.com/Krishnaaka',
  },
  {
    title: 'Student Dashboard',
    sub: 'Full Stack CRUD App',
    desc: 'Premium student management system — CRUD, live search, filtering, grade charts, analytics, branch breakdown. Built across 14 internship days at Thaniya Technologies.',
    tags: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express', 'REST APIs'],
    icon: '📊', color: '#06d6a0',
    github: 'https://github.com/Krishnaaka/Krishnaaka-ThaniyaTechnologies_VTU_Internship_2026',
  },
]

// ── Spotlight card with mouse-tracking glow ──
function SpotlightCard({ p, i }) {
  const cardRef  = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness:200, damping:30 })
  const sy = useSpring(my, { stiffness:200, damping:30 })

  const bg = useTransform(
    [sx, sy],
    ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, ${p.color}18, transparent 70%)`
  )

  const onMouseMove = e => {
    const rect = cardRef.current.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      initial={{ opacity:0, y:40 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:.6, delay: i * 0.09 }}
      whileHover={{ y:-8 }}
      style={{
        position:'relative', borderRadius:'var(--radius)', overflow:'hidden',
        border:'1px solid var(--border)', background:'var(--card)',
        display:'flex', flexDirection:'column', cursor:'none',
        transition:'border-color .35s, box-shadow .35s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${p.color}50`
        e.currentTarget.style.boxShadow   = `0 30px 70px rgba(0,0,0,.6), 0 0 0 1px ${p.color}20`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow   = 'none'
        mx.set(0); my.set(0)
      }}>

      {/* Spotlight overlay */}
      <motion.div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', background:bg }} />

      {/* Top accent bar */}
      <div style={{ height:3, background:`linear-gradient(90deg,${p.color},${p.color}44,transparent)`, position:'relative', zIndex:2 }}/>

      <div style={{ padding:'1.75rem', flex:1, display:'flex', flexDirection:'column', position:'relative', zIndex:2 }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.2rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
            <div style={{ width:50, height:50, borderRadius:14, background:`${p.color}12`, border:`1px solid ${p.color}25`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem' }}>
              {p.icon}
            </div>
            <div>
              <h3 style={{ fontFamily:'var(--font-h)', fontSize:'1rem', fontWeight:700 }}>{p.title}</h3>
              <p style={{ fontSize:'.7rem', color:p.color, marginTop:'.12rem' }}>{p.sub}</p>
            </div>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:'.4rem' }}>
            {p.featured && (
              <span style={{ fontSize:'.6rem', fontWeight:700, letterSpacing:'.08em', padding:'.2rem .65rem', borderRadius:99, background:`${p.color}14`, color:p.color, border:`1px solid ${p.color}28` }}>
                ★ TOP
              </span>
            )}
            <motion.a href={p.github} target="_blank" whileHover={{ scale:1.12 }}
              style={{ width:33, height:33, borderRadius:9, background:'var(--surface)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)', transition:'all .3s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=p.color;e.currentTarget.style.color=p.color}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)'}}>
              <FiGithub size={14}/>
            </motion.a>
          </div>
        </div>

        <p style={{ color:'var(--text-2)', fontSize:'.875rem', lineHeight:1.78, flex:1, marginBottom:'1.4rem' }}>{p.desc}</p>

        <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem' }}>
          {p.tags.map((t,j) => (
            <span key={j} style={{ fontSize:'.7rem', fontWeight:500, padding:'.28rem .8rem', borderRadius:99, background:`${p.color}0c`, border:`1px solid ${p.color}25`, color:p.color }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <div className="section-header">
            <span className="section-tag">✦ What I've Built</span>
            <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
            <div className="section-divider"/>
            <p style={{ color:'var(--muted)', maxWidth:500, fontSize:'.92rem' }}>
              Real-world projects combining cloud, AI, and full-stack engineering.
            </p>
          </div>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:'1.5rem' }}>
          {projects.map((p, i) => <SpotlightCard key={i} p={p} i={i} />)}
        </div>

        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:.4 }}
          style={{ textAlign:'center', marginTop:'3.5rem' }}>
          <a href="https://github.com/Krishnaaka" target="_blank" className="btn btn-ghost">
            <FiGithub size={15}/> All Projects on GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}
