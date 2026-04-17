import { motion } from 'framer-motion'

const rows = [
  ['Python','AWS EC2','React','FastAPI','Docker','Node.js','OpenCV','Linux','Git','SQL'],
  ['YOLOv8','S3 / IAM','Express','ECS Fargate','DeepFace','Streamlit','Ollama','OCI','Vosk','VPC'],
]

const groups = [
  { icon:'☁', title:'Cloud & DevOps', color:'#3b82f6', tags:['AWS EC2','ECS / ECR','S3 / IAM','Docker','OCI','VPC','Fargate','CloudWatch'] },
  { icon:'⌨', title:'Programming',   color:'#f97316', tags:['Python','SQL','JavaScript'] },
  { icon:'🖥', title:'Web & Backend', color:'#a855f7', tags:['React','FastAPI','Node.js','Express','REST APIs','HTML/CSS'] },
  { icon:'🤖', title:'AI & ML',       color:'#ec4899', tags:['OpenCV','YOLOv8','DeepFace','Librosa','Vosk','Streamlit','Ollama','NLP'] },
  { icon:'🛠', title:'Tools & OS',    color:'#14b8a6', tags:['Git / GitHub','Linux','VS Code','Notion','Docker'] },
]

function MarqueeRow({ items, reverse }) {
  const doubled = [...items, ...items, ...items]
  return (
    <div style={{ overflow:'hidden', width:'100%', margin:'.5rem 0', position:'relative' }}>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:80, background:'linear-gradient(to right,var(--bg2),transparent)', zIndex:1, pointerEvents:'none' }}/>
      <div style={{ position:'absolute', right:0, top:0, bottom:0, width:80, background:'linear-gradient(to left,var(--bg2),transparent)', zIndex:1, pointerEvents:'none' }}/>
      <motion.div
        style={{ display:'flex', gap:'1rem', width:'max-content' }}
        animate={{ x: reverse ? ['0%','-33.33%'] : ['-33.33%','0%'] }}
        transition={{ duration:30, repeat:Infinity, ease:'linear' }}>
        {doubled.map((t,i)=>(
          <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:'.4rem', padding:'.4rem 1.1rem', borderRadius:99, background:'var(--card)', border:'1px solid var(--border)', fontSize:'.78rem', fontWeight:500, color:'var(--text-2)', whiteSpace:'nowrap', flexShrink:0 }}>
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <motion.div initial={{ opacity:0, y:25 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <span className="pill pill-orange">✦ What I Know</span>
          <h2 className="h-xl">Technical <span className="gt-orange">Skills</span></h2>
          <div className="rule" style={{ background:'linear-gradient(135deg,#f97316,#eab308)' }}/>
          <p className="section-sub" style={{ marginBottom:'2.5rem' }}>Technologies I work with day-to-day.</p>
        </motion.div>

        {/* Marquee rows */}
        <div style={{ marginBottom:'3rem' }}>
          <MarqueeRow items={rows[0]} />
          <MarqueeRow items={rows[1]} reverse />
        </div>

        {/* Detailed category cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.1rem' }}>
          {groups.map((g,i) => (
            <motion.div key={i} className="card"
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:.55, delay:i*.07 }}
              style={{ padding:'1.6rem', cursor:'default' }}
              whileHover={{ y:-5, borderColor:`${g.color}40` }}>

              <div style={{ position:'absolute', top:-30, right:-30, width:100, height:100, borderRadius:'50%', background:`radial-gradient(circle,${g.color}18,transparent)`, pointerEvents:'none' }}/>

              <div style={{ display:'flex', alignItems:'center', gap:'.6rem', marginBottom:'1.2rem' }}>
                <div className="ibox" style={{ background:`${g.color}12`, border:`1px solid ${g.color}22`, fontSize:'1.15rem' }}>{g.icon}</div>
                <span style={{ fontSize:'.72rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:g.color }}>{g.title}</span>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'.45rem' }}>
                {g.tags.map((t,j) => (
                  <motion.span key={j} whileHover={{ scale:1.05 }} className="chip"
                    style={{ background:`${g.color}0d`, borderColor:`${g.color}28`, color:'var(--text)' }}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div className="card"
            initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.55, delay:.38 }}
            style={{ padding:'1.6rem', background:'linear-gradient(135deg,rgba(59,130,246,.07),rgba(20,184,166,.04))', borderColor:'rgba(59,130,246,.15)' }}>
            <p style={{ fontFamily:'var(--font-h)', fontSize:'1rem', fontWeight:800, color:'var(--blue)', marginBottom:'.5rem' }}>📖 Currently Learning</p>
            <p style={{ color:'var(--muted)', fontSize:'.86rem', lineHeight:1.8 }}>
              <span style={{ color:'var(--teal)', fontWeight:600 }}>Kubernetes</span> · <span style={{ color:'var(--teal)', fontWeight:600 }}>LLM fine-tuning</span> · <span style={{ color:'var(--teal)', fontWeight:600 }}>Zero Trust Security</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
