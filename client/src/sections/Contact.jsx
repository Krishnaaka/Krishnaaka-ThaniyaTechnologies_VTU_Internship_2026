import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiCopy, FiCheck } from 'react-icons/fi'

export default function Contact() {
  const [form, setForm]     = useState({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied]   = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('krishnak1391@gmail.com')
    setCopied(true)
    window.showToast && window.showToast('📋 Email copied to clipboard!')
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { setStatus('error'); return }
    setLoading(true)
    try {
      const res = await fetch('http://localhost:4000/api/contact', {
        method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form),
      })
      if (res.ok) { setStatus('ok'); setForm({ name:'', email:'', subject:'', message:'' }) }
      else throw new Error()
    } catch {
      const sub  = encodeURIComponent(form.subject || `Portfolio Contact from ${form.name}`)
      const body = encodeURIComponent(`Hi Krishna,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`)
      window.location.href = `mailto:krishnak1391@gmail.com?subject=${sub}&body=${body}`
      setStatus('ok')
    }
    setLoading(false)
    setTimeout(() => setStatus(''), 5000)
  }

  const inp = { width:'100%', background:'var(--surface)', border:'1px solid var(--border)', color:'var(--text)', fontFamily:'var(--font)', fontSize:'.88rem', padding:'.75rem 1rem', borderRadius:10, outline:'none', transition:'border-color .3s' }
  const focus = e => e.target.style.borderColor='var(--blue)'
  const blur  = e => e.target.style.borderColor='var(--border)'

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <motion.div initial={{ opacity:0, y:25 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
          <span className="pill pill-teal">✦ Get In Touch</span>
          <h2 className="h-xl">Let's <span className="gt-blue">Connect</span></h2>
          <div className="rule"/>
          <p className="section-sub" style={{ marginBottom:'3rem' }}>
            Open to internships, full-time roles, and collaboration on exciting projects.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'3rem', alignItems:'start' }}>

          {/* INFO SIDE */}
          <motion.div initial={{ opacity:0, x:-25 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7 }}>

            {/* Copy-email card (small feature) */}
            <div className="card" style={{ padding:'1.4rem', marginBottom:'1rem', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem', cursor:'pointer' }}
              onClick={copyEmail}
              onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(59,130,246,.35)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
              <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
                <div className="ibox" style={{ background:'rgba(59,130,246,.1)', color:'var(--blue)', fontSize:'1rem' }}><FiMail/></div>
                <div>
                  <p style={{ fontSize:'.7rem', color:'var(--muted)', marginBottom:'.15rem' }}>Email</p>
                  <p style={{ fontWeight:600, fontSize:'.86rem' }}>krishnak1391@gmail.com</p>
                </div>
              </div>
              <motion.button whileTap={{ scale:.9 }} style={{ width:34, height:34, borderRadius:9, background:'rgba(59,130,246,.1)', border:'1px solid rgba(59,130,246,.2)', color:'var(--blue)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'none', flexShrink:0 }}>
                {copied ? <FiCheck size={14}/> : <FiCopy size={14}/>}
              </motion.button>
            </div>

            {[
              { icon:<FiPhone size={15}/>, label:'Phone', val:'+91 6360511291', href:'tel:+916360511291', c:'#22c55e' },
              { icon:<FiMapPin size={15}/>, label:'Location', val:'Udupi, Karnataka, India', c:'var(--orange)' },
            ].map((item,i) => (
              <motion.div key={i} className="card"
                style={{ padding:'1.2rem', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'.75rem', transition:'all .3s' }}
                whileHover={{ x:5, borderColor:`${item.c}44` }}>
                <div className="ibox" style={{ width:40,height:40, borderRadius:11, background:`${item.c}12`, color:item.c, fontSize:'.95rem' }}>{item.icon}</div>
                <div>
                  <p style={{ fontSize:'.68rem', color:'var(--muted)' }}>{item.label}</p>
                  {item.href
                    ? <a href={item.href} style={{ fontWeight:600, fontSize:'.85rem' }}>{item.val}</a>
                    : <p style={{ fontWeight:600, fontSize:'.85rem' }}>{item.val}</p>}
                </div>
              </motion.div>
            ))}

            <div style={{ display:'flex', gap:'.6rem', marginTop:'1.5rem' }}>
              {[
                { icon:<FiGithub size={15}/>,   href:'https://github.com/Krishnaaka' },
                { icon:<FiLinkedin size={15}/>, href:'https://www.linkedin.com/in/krishna-a-k' },
                { icon:'🏅',                    href:'https://www.credly.com/users/krishna-a-k' },
              ].map((s,i) => (
                <motion.a key={i} href={s.href} target="_blank" whileHover={{ y:-3 }}
                  style={{ width:40, height:40, borderRadius:10, background:'var(--card)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)', fontSize:'.9rem', transition:'border-color .3s,color .3s' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--blue)';e.currentTarget.style.color='var(--blue)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)'}}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* FORM */}
          <motion.form onSubmit={handleSubmit}
            initial={{ opacity:0, x:25 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7, delay:.1 }}
            className="card" style={{ padding:'2rem' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.9rem', marginBottom:'.9rem' }}>
              {[
                { key:'name',  label:'Name *',    type:'text',  ph:'Your name' },
                { key:'email', label:'Email *',   type:'email', ph:'your@email.com' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize:'.7rem', fontWeight:700, color:'var(--muted)', marginBottom:'.4rem', display:'block', letterSpacing:'.06em', textTransform:'uppercase' }}>{f.label}</label>
                  <input style={inp} type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} onFocus={focus} onBlur={blur}/>
                </div>
              ))}
            </div>
            <div style={{ marginBottom:'.9rem' }}>
              <label style={{ fontSize:'.7rem', fontWeight:700, color:'var(--muted)', marginBottom:'.4rem', display:'block', letterSpacing:'.06em', textTransform:'uppercase' }}>Subject</label>
              <input style={inp} placeholder="How can I help?" value={form.subject} onChange={e=>setForm(p=>({...p,subject:e.target.value}))} onFocus={focus} onBlur={blur}/>
            </div>
            <div style={{ marginBottom:'1.4rem' }}>
              <label style={{ fontSize:'.7rem', fontWeight:700, color:'var(--muted)', marginBottom:'.4rem', display:'block', letterSpacing:'.06em', textTransform:'uppercase' }}>Message *</label>
              <textarea rows={5} style={{...inp,resize:'none'}} placeholder="Tell me about your project or opportunity…" value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} onFocus={focus} onBlur={blur}/>
            </div>
            <motion.button type="submit" className="btn btn-blue" whileTap={{ scale:.97 }}
              style={{ width:'100%', justifyContent:'center', opacity:loading ? .7 : 1, cursor:'none' }} disabled={loading}>
              {loading ? '⏳ Sending…' : '✉ Send Message'}
            </motion.button>
            {status==='ok'    && <p style={{ color:'#22c55e', fontSize:'.82rem', marginTop:'.7rem', textAlign:'center' }}>✅ Sent! Check your email client.</p>}
            {status==='error' && <p style={{ color:'#ef4444', fontSize:'.82rem', marginTop:'.7rem', textAlign:'center' }}>⚠ Please fill required fields.</p>}
          </motion.form>
        </div>
      </div>
      <style>{`@media(max-width:768px){#contact .container>div{grid-template-columns:1fr!important;gap:2rem!important} form>div:first-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
