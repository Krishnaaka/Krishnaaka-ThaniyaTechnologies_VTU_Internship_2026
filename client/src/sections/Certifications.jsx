import { motion } from 'framer-motion'

const certs = [
  { title:'AWS Academy Cloud Foundations', org:'AWS Academy', icon:'☁', color:'#f97316', credly: true },
  { title:'OCI 2025 Generative AI Professional', org:'Oracle Cloud', icon:'🔴', color:'#ef4444', credly: true },
  { title:'AWS Educate ML Foundations', org:'AWS Educate', icon:'🤖', color:'#38bdf8', credly: true },
  { title:'Data Science Using Python', org:'SWAYAM NPTEL', icon:'🐍', color:'#22c55e', credly: true },
  { title:'Cisco Python Essentials', org:'Cisco NetAcad', icon:'🌐', color:'#1d4ed8', credly: true },
]

const achievements = [
  { title:'Research Paper Published', desc:'Presented AI paper on "Mental Health State Detection using OpenCV & Sentiment Analysis" at International Conference, SIT — May 2025.', icon:'📄', color:'var(--primary)' },
  { title:'2nd Place — Decode the Code', desc:'Achieved 2nd place in bug-identification event organized by SSOSC, competing against multiple teams.', icon:'🥈', color:'var(--yellow)' },
  { title:'National Hackathon Participant', desc:'Participated in National ROOLATHON & SRINATHON Technology events at Valachil, Mangalore.', icon:'🏆', color:'var(--cyan)' },
]

export default function Certifications() {
  return (
    <>
      {/* ── Achievements ── */}
      <section id="achievements" className="section">
        <div className="container">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
            <div className="section-header">
              <span className="section-tag">Milestones</span>
              <h2 className="section-title">Achievements & <span className="gradient-text">Awards</span></h2>
            </div>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.5rem' }}>
            {achievements.map((a, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:.6, delay: i * 0.1 }}
                style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'2rem', textAlign:'center', transition:'all .3s' }}
                whileHover={{ y:-6, borderColor:`${a.color}44`, boxShadow:`0 20px 50px rgba(0,0,0,.4)` }}>
                <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>{a.icon}</div>
                <h3 style={{ fontFamily:'var(--font-h)', fontSize:'1rem', fontWeight:700, marginBottom:'.6rem', color: a.color }}>{a.title}</h3>
                <p style={{ color:'var(--muted)', fontSize:'.85rem', lineHeight:1.7 }}>{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section id="certifications" className="section section-alt">
        <div className="container">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
            <div className="section-header">
              <span className="section-tag">Verified Credentials</span>
              <h2 className="section-title">Certifications & <span className="gradient-text">Badges</span></h2>
            </div>
          </motion.div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1.25rem' }}>
            {certs.map((c, i) => (
              <motion.a key={i} href="https://www.credly.com/users/krishna-a-k" target="_blank"
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:.6, delay: i * 0.08 }}
                style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.75rem', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'.6rem', cursor:'none', textDecoration:'none' }}
                whileHover={{ y:-6, borderColor:`${c.color}44`, boxShadow:`0 0 30px ${c.color}22` }}>
                <span style={{ fontSize:'2.2rem' }}>{c.icon}</span>
                <h4 style={{ fontFamily:'var(--font-h)', fontSize:'.9rem', fontWeight:700, color:'var(--text)', textAlign:'center' }}>{c.title}</h4>
                <p style={{ color:'var(--muted)', fontSize:'.75rem' }}>{c.org}</p>
                <span style={{ fontSize:'.72rem', color: c.color, fontWeight:600, display:'flex', alignItems:'center', gap:'.3rem' }}>
                  View Badge ↗
                </span>
              </motion.a>
            ))}

            {/* Credly CTA */}
            <motion.a href="https://www.credly.com/users/krishna-a-k" target="_blank"
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:.6, delay:.5 }}
              style={{ background:'linear-gradient(135deg,rgba(108,99,255,0.1),rgba(0,245,212,0.05))', border:'1px solid rgba(108,99,255,0.3)', borderRadius:'var(--radius)', padding:'1.75rem', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'.6rem', cursor:'none', textDecoration:'none' }}
              whileHover={{ scale:1.03 }}>
              <span style={{ fontSize:'2.2rem' }}>🏅</span>
              <h4 style={{ fontFamily:'var(--font-h)', fontSize:'.9rem', fontWeight:700, color:'var(--primary)' }}>View All Badges</h4>
              <p style={{ color:'var(--muted)', fontSize:'.75rem' }}>All verified on Credly</p>
              <span className="btn btn-primary" style={{ fontSize:'.75rem', padding:'.45rem 1.1rem', marginTop:'.3rem' }}>Open Credly ↗</span>
            </motion.a>
          </div>
        </div>
      </section>
    </>
  )
}
