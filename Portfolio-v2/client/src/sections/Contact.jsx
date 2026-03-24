import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('http://localhost:4000/api/contact', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('ok')
        setForm({ name:'', email:'', subject:'', message:'' })
      } else {
        // Fallback to mailto
        const sub = encodeURIComponent(form.subject || `Portfolio Contact from ${form.name}`)
        const body = encodeURIComponent(`Hi Krishna,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`)
        window.location.href = `mailto:krishnak1391@gmail.com?subject=${sub}&body=${body}`
        setStatus('ok')
      }
    } catch {
      // Server not running — fallback to mailto
      const sub = encodeURIComponent(form.subject || `Portfolio Contact from ${form.name}`)
      const body = encodeURIComponent(`Hi Krishna,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`)
      window.location.href = `mailto:krishnak1391@gmail.com?subject=${sub}&body=${body}`
      setStatus('ok')
    }
    setLoading(false)
    setTimeout(() => setStatus(''), 5000)
  }

  const inputStyle = {
    width:'100%', background:'var(--surface)', border:'1px solid var(--border)',
    color:'var(--text)', fontFamily:'var(--font)', fontSize:'.9rem',
    padding:'.8rem 1rem', borderRadius:11, outline:'none',
    transition:'border-color .3s',
  }

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <div className="section-header">
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
            <p style={{ color:'var(--muted)', fontSize:'.95rem', marginTop:'.5rem' }}>Open to internships, projects, and collaborations.</p>
          </div>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'4rem', alignItems:'start' }}>
          {/* Info */}
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7 }}>
            {[
              { icon:<FiMail/>, label:'Email', val:'krishnak1391@gmail.com', href:'mailto:krishnak1391@gmail.com', color:'var(--primary)' },
              { icon:<FiPhone/>, label:'Phone', val:'+91 6360511291', href:'tel:+916360511291', color:'#22c55e' },
              { icon:<FiMapPin/>, label:'Location', val:'Udupi, Karnataka, India', color:'var(--cyan)' },
            ].map((item, i) => (
              <motion.div key={i}
                style={{ display:'flex', alignItems:'center', gap:'1rem', background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.25rem', marginBottom:'1rem', transition:'all .3s' }}
                whileHover={{ borderColor:`${item.color}44`, x:6 }}>
                <div style={{ width:44, height:44, borderRadius:12, background:`${item.color}15`, color:item.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', flexShrink:0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize:'.72rem', color:'var(--muted)', marginBottom:'.15rem' }}>{item.label}</p>
                  {item.href
                    ? <a href={item.href} style={{ fontWeight:600, fontSize:'.88rem', transition:'color .3s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={e=>e.currentTarget.style.color=''}>{item.val}</a>
                    : <p style={{ fontWeight:600, fontSize:'.88rem' }}>{item.val}</p>}
                </div>
              </motion.div>
            ))}

            <div style={{ display:'flex', gap:'.75rem', marginTop:'1.5rem' }}>
              {[
                { icon:<FiGithub/>, href:'https://github.com/Krishnaaka' },
                { icon:<FiLinkedin/>, href:'https://www.linkedin.com/in/krishna-a-k' },
                { icon:'🏅', href:'https://www.credly.com/users/krishna-a-k' },
              ].map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" whileHover={{ y:-4, boxShadow:'var(--glow-p)' }}
                  style={{ width:46, height:46, borderRadius:12, background:'var(--card)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', color:'var(--muted)', transition:'all .3s' }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form onSubmit={handleSubmit}
            initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7, delay:.1 }}
            style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'2.25rem' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' }}>
              <div>
                <label style={{ fontSize:'.76rem', fontWeight:600, color:'var(--muted)', marginBottom:'.4rem', display:'block' }}>Name *</label>
                <input style={inputStyle} placeholder="Your name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                  onFocus={e=>e.target.style.borderColor='var(--primary)'} onBlur={e=>e.target.style.borderColor='var(--border)'} />
              </div>
              <div>
                <label style={{ fontSize:'.76rem', fontWeight:600, color:'var(--muted)', marginBottom:'.4rem', display:'block' }}>Email *</label>
                <input style={inputStyle} type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}
                  onFocus={e=>e.target.style.borderColor='var(--primary)'} onBlur={e=>e.target.style.borderColor='var(--border)'} />
              </div>
            </div>
            <div style={{ marginBottom:'1rem' }}>
              <label style={{ fontSize:'.76rem', fontWeight:600, color:'var(--muted)', marginBottom:'.4rem', display:'block' }}>Subject</label>
              <input style={inputStyle} placeholder="How can I help?" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))}
                onFocus={e=>e.target.style.borderColor='var(--primary)'} onBlur={e=>e.target.style.borderColor='var(--border)'} />
            </div>
            <div style={{ marginBottom:'1.5rem' }}>
              <label style={{ fontSize:'.76rem', fontWeight:600, color:'var(--muted)', marginBottom:'.4rem', display:'block' }}>Message *</label>
              <textarea rows={5} style={{...inputStyle, resize:'none'}} placeholder="Tell me about your project or opportunity..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}
                onFocus={e=>e.target.style.borderColor='var(--primary)'} onBlur={e=>e.target.style.borderColor='var(--border)'} />
            </div>
            <motion.button type="submit" className="btn btn-primary" whileTap={{ scale:.97 }}
              style={{ width:'100%', justifyContent:'center', opacity: loading ? .7 : 1, cursor:'none' }} disabled={loading}>
              {loading ? '⏳ Sending...' : '✉ Send Message'}
            </motion.button>
            {status === 'ok'  && <p style={{ color:'#22c55e', fontSize:'.85rem', marginTop:'.75rem', textAlign:'center' }}>✅ Message sent! Opening your email client...</p>}
            {status === 'error' && <p style={{ color:'#ef4444', fontSize:'.85rem', marginTop:'.75rem', textAlign:'center' }}>⚠ Please fill in all required fields.</p>}
          </motion.form>
        </div>
      </div>
      <style>{`@media(max-width:768px){ #contact .container > div { grid-template-columns:1fr!important; gap:2rem!important; } form > div:first-child { grid-template-columns:1fr!important; } }`}</style>
    </section>
  )
}
