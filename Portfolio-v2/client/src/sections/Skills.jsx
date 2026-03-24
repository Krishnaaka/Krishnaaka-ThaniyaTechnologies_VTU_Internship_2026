import { motion } from 'framer-motion'

const skillGroups = [
  {
    title: 'Cloud & DevOps', icon: '☁',
    tags: ['AWS EC2', 'ECS / ECR', 'S3 / IAM', 'Docker', 'OCI', 'VPC / Fargate'],
    color: 'var(--cyan)',
  },
  {
    title: 'Programming', icon: '⌨',
    tags: ['Python', 'SQL', 'JavaScript'],
    color: 'var(--primary)',
  },
  {
    title: 'Web & Backend', icon: '🖥',
    tags: ['FastAPI', 'React', 'REST APIs', 'HTML/CSS', 'Node.js', 'Express'],
    color: '#8b5cf6',
  },
  {
    title: 'AI / ML Tools', icon: '🤖',
    tags: ['OpenCV', 'YOLOv8', 'DeepFace', 'Librosa', 'Vosk', 'Streamlit', 'Ollama', 'NLP'],
    color: 'var(--pink)',
  },
  {
    title: 'Tools & OS', icon: '🛠',
    tags: ['Git / GitHub', 'Linux', 'VS Code', 'Notion', 'Docker'],
    color: 'var(--yellow)',
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <div className="section-header">
            <span className="section-tag">What I Know</span>
            <h2 className="section-title">Technical <span className="gradient-text">Skills</span></h2>
          </div>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.25rem' }}>
          {skillGroups.map((g, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:.6, delay: i * 0.08 }}
              style={{
                background:'var(--card)', border:'1px solid var(--border)',
                borderRadius:'var(--radius)', padding:'1.75rem',
                transition:'all .35s', position:'relative', overflow:'hidden',
              }}
              whileHover={{ y:-6, boxShadow:`0 20px 50px rgba(0,0,0,.5)`, borderColor: `${g.color}44` }}>
              {/* Glow accent */}
              <div style={{ position:'absolute', top:-40, right:-40, width:120, height:120, borderRadius:'50%', background:`radial-gradient(circle,${g.color}22,transparent)`, pointerEvents:'none' }} />

              <div style={{ display:'flex', alignItems:'center', gap:'.6rem', marginBottom:'1.25rem' }}>
                <span style={{ fontSize:'1.2rem' }}>{g.icon}</span>
                <span style={{ fontSize:'.78rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color: g.color }}>{g.title}</span>
              </div>

              <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem' }}>
                {g.tags.map((t, j) => (
                  <motion.span key={j} whileHover={{ scale:1.05 }}
                    style={{
                      background:`${g.color}12`, border:`1px solid ${g.color}28`,
                      color:'var(--text)', fontSize:'.8rem', fontWeight:500,
                      padding:'.3rem .85rem', borderRadius:99, cursor:'none',
                    }}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
