import { motion } from 'framer-motion'

const groups = [
  {
    icon: '☁', title: 'Cloud & DevOps', color: '#00e8cc',
    tags: ['AWS EC2', 'ECS / ECR', 'S3 / IAM', 'Lambda', 'API Gateway', 'Docker', 'OCI', 'VPC', 'Fargate', 'CloudWatch', 'Route53'],
  },
  {
    icon: '⌨', title: 'Programming', color: '#7c6dff',
    tags: ['Python', 'JavaScript', 'SQL', 'Bash', 'C'],
  },
  {
    icon: '🖥', title: 'Web & Backend', color: '#a78bfa',
    tags: ['React', 'FastAPI', 'Node.js', 'Express', 'REST APIs', 'HTML/CSS', 'MongoDB', 'PostgreSQL'],
  },
  {
    icon: '🤖', title: 'AI / ML & GenAI', color: '#ff3d9a',
    tags: ['OpenCV', 'YOLOv8', 'DeepFace', 'Librosa', 'Vosk', 'Streamlit', 'Ollama', 'NLP', 'LangChain', 'Whisper'],
  },
  {
    icon: '🛡', title: 'Security & Networking', color: '#ffd166',
    tags: ['IAM Policies', 'VPC Security Groups', 'Zero Trust', 'OWASP Top 10', 'JWT', 'HTTPS/TLS'],
  },
  {
    icon: '🛠', title: 'Tools & OS', color: '#06d6a0',
    tags: ['Git / GitHub', 'Linux', 'VS Code', 'Postman', 'Notion', 'Figma', 'n8n'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <div className="section-header">
            <span className="section-tag">✦ What I Know</span>
            <h2 className="section-title">Technical <span className="gradient-text">Skills</span></h2>
            <div className="section-divider" />
            <p style={{ color:'var(--muted)', maxWidth:520, fontSize:'.92rem' }}>
              Technologies I work with across cloud infrastructure, AI/ML, and full-stack development.
            </p>
          </div>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.25rem' }}>
          {groups.map((g, i) => (
            <motion.div key={i} className="glass-card"
              initial={{ opacity:0, y:35 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:.55, delay: i * 0.06 }}
              style={{ padding:'1.75rem', cursor:'default' }}>

              {/* Corner glow */}
              <div style={{ position:'absolute', top:-35, right:-35, width:130, height:130, borderRadius:'50%', background:`radial-gradient(circle,${g.color}15,transparent)`, pointerEvents:'none' }} />

              {/* Header */}
              <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'1.4rem' }}>
                <div style={{ width:46, height:46, borderRadius:13, background:`${g.color}12`, border:`1px solid ${g.color}28`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem' }}>
                  {g.icon}
                </div>
                <div>
                  <span style={{ fontFamily:'var(--font-h)', fontSize:'.78rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:g.color }}>
                    {g.title}
                  </span>
                  <p style={{ fontSize:'.65rem', color:'var(--muted)', marginTop:2 }}>{g.tags.length} technologies</p>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:'.45rem' }}>
                {g.tags.map((t, j) => (
                  <motion.span key={j} whileHover={{ scale:1.07, y:-2 }} className="skill-tag"
                    style={{ background:`${g.color}0d`, borderColor:`${g.color}28`, color:'var(--text)' }}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Always learning card */}
        <motion.div
          initial={{ opacity:0, y:35 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:.55, delay:.4 }}
          style={{ marginTop:'1.5rem' }}>
          <div className="glass-card" style={{ padding:'2rem 2.5rem',
            background:'linear-gradient(135deg,rgba(124,109,255,0.07),rgba(0,232,204,0.04))',
            borderColor:'rgba(124,109,255,0.2)',
            display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'2rem', alignItems:'center' }}>
            <div>
              <p style={{ fontFamily:'var(--font-h)', fontSize:'1.1rem', fontWeight:700, marginBottom:'.6rem', color:'var(--primary)' }}>
                📖 Always Learning
              </p>
              <p style={{ color:'var(--muted)', fontSize:'.88rem', lineHeight:1.8 }}>
                Currently deep-diving into <strong style={{ color:'var(--cyan)' }}>LLM fine-tuning</strong>,{' '}
                <strong style={{ color:'var(--cyan)' }}>Zero Trust Security</strong>,{' '}
                <strong style={{ color:'var(--cyan)' }}>Kubernetes</strong> and{' '}
                <strong style={{ color:'var(--cyan)' }}>Terraform / IaC</strong>.
              </p>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem' }}>
              {['Kubernetes', 'Terraform', 'LLM Fine-tuning', 'Zero Trust', 'GraphQL'].map((t, i) => (
                <span key={i} style={{ fontSize:'.75rem', fontWeight:600, padding:'.3rem .85rem', borderRadius:99,
                  background:'rgba(124,109,255,0.1)', border:'1px solid rgba(124,109,255,0.22)', color:'var(--primary)' }}>
                  {t} ✦
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
