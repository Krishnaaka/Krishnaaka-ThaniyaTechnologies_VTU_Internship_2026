import { motion } from 'framer-motion'

const groups = [
  {
    icon: '☁', title: 'Cloud & DevOps', color: '#00e8cc',
    tags: ['AWS EC2', 'ECS / ECR', 'S3 / IAM', 'Docker', 'OCI', 'VPC', 'Fargate', 'CloudWatch'],
  },
  {
    icon: '⌨', title: 'Programming', color: '#7c6dff',
    tags: ['Python', 'SQL', 'JavaScript'],
  },
  {
    icon: '🖥', title: 'Web & Backend', color: '#a78bfa',
    tags: ['React', 'FastAPI', 'Node.js', 'Express', 'REST APIs', 'HTML/CSS'],
  },
  {
    icon: '🤖', title: 'AI / ML', color: '#ff3d9a',
    tags: ['OpenCV', 'YOLOv8', 'DeepFace', 'Librosa', 'Vosk', 'Streamlit', 'Ollama', 'NLP'],
  },
  {
    icon: '🛠', title: 'Tools & OS', color: '#ffd166',
    tags: ['Git / GitHub', 'Linux', 'VS Code', 'Notion', 'Docker'],
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
            <p style={{ color:'var(--muted)', maxWidth:500, fontSize:'.92rem' }}>
              Technologies I work with across cloud, AI, and full-stack development.
            </p>
          </div>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'1.25rem' }}>
          {groups.map((g, i) => (
            <motion.div key={i} className="glass-card"
              initial={{ opacity:0, y:35 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:.55, delay: i * 0.07 }}
              style={{ padding:'1.75rem', cursor:'default' }}>

              {/* Corner glow */}
              <div style={{ position:'absolute', top:-30, right:-30, width:120, height:120, borderRadius:'50%', background:`radial-gradient(circle,${g.color}18,transparent)`, pointerEvents:'none' }} />

              {/* Header */}
              <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'1.4rem' }}>
                <div style={{ width:44, height:44, borderRadius:12, background:`${g.color}14`, border:`1px solid ${g.color}28`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem' }}>
                  {g.icon}
                </div>
                <span style={{ fontFamily:'var(--font-h)', fontSize:'.8rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:g.color }}>
                  {g.title}
                </span>
              </div>

              {/* Tags */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem' }}>
                {g.tags.map((t, j) => (
                  <motion.span key={j} whileHover={{ scale:1.06, y:-2 }} className="skill-tag"
                    style={{ background:`${g.color}0e`, borderColor:`${g.color}2a`, color:'var(--text)' }}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Extra wide summary card */}
          <motion.div className="glass-card"
            initial={{ opacity:0, y:35 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.55, delay:.35 }}
            style={{ padding:'1.75rem', background:'linear-gradient(135deg,rgba(124,109,255,0.06),rgba(0,232,204,0.04))', borderColor:'rgba(124,109,255,0.2)' }}>
            <p style={{ fontFamily:'var(--font-h)', fontSize:'1.05rem', fontWeight:700, marginBottom:'.6rem', color:'var(--primary)' }}>
              Always Learning 📖
            </p>
            <p style={{ color:'var(--muted)', fontSize:'.88rem', lineHeight:1.75 }}>
              Currently exploring <strong style={{ color:'var(--cyan)' }}>LLM fine-tuning</strong>, <strong style={{ color:'var(--cyan)' }}>Zero Trust Security</strong> and <strong style={{ color:'var(--cyan)' }}>Kubernetes</strong>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
