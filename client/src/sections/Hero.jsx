import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi'

export default function Hero() {
  const glowRef = useRef(null)

  useEffect(() => {
    const el = glowRef.current
    const move = e => {
      if (!el) return
      el.style.left = e.clientX + 'px'
      el.style.top  = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const up = (d=0) => ({ initial:{opacity:0,y:28}, animate:{opacity:1,y:0}, transition:{duration:.7,delay:d,ease:[.22,1,.36,1]} })

  return (
    <section id="hero" style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',overflow:'hidden',paddingTop:80}}>

      {/* Background layers */}
      <div style={{position:'absolute',inset:0,zIndex:0}}>
        {/* Mesh gradient */}
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 60% at 50% -10%,rgba(59,130,246,.14),transparent)'}}/>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 50% 50% at 85% 60%,rgba(249,115,22,.09),transparent)'}}/>
        {/* Grid */}
        <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',backgroundSize:'48px 48px'}}/>
        {/* Vignette */}
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,transparent 30%,var(--bg) 100%)'}}/>
      </div>

      {/* Mouse glow */}
      <div ref={glowRef} style={{position:'fixed',zIndex:0,pointerEvents:'none',width:480,height:480,borderRadius:'50%',background:'radial-gradient(circle,rgba(59,130,246,.07),transparent 70%)',transform:'translate(-50%,-50%)',left:'-999px',top:'-999px',transition:'left .08s linear,top .08s linear'}}/>

      <div className="container" style={{position:'relative',zIndex:1,display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',alignItems:'center'}}>

        {/* LEFT */}
        <div>
          <motion.div {...up(0)}>
            <div style={{display:'inline-flex',alignItems:'center',gap:'.5rem',background:'rgba(34,197,94,.07)',border:'1px solid rgba(34,197,94,.2)',borderRadius:99,padding:'.38rem 1rem',marginBottom:'1.5rem'}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:'#22c55e',display:'block',animation:'statusPulse 2s infinite'}}/>
              <span style={{fontSize:'.67rem',fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:'#22c55e'}}>Open to Opportunities</span>
            </div>
          </motion.div>

          <motion.h1 {...up(.08)} style={{fontFamily:'var(--font-h)',fontSize:'clamp(3rem,5.2vw,5rem)',fontWeight:800,lineHeight:1.0,letterSpacing:'-.03em',marginBottom:'1.25rem'}}>
            Building the<br/>
            <span className="gt-blue">Future</span>{' '}
            <span style={{color:'var(--text-2)',fontWeight:300}}>with</span><br/>
            <span className="gt-orange">Code & Cloud</span>
          </motion.h1>

          <motion.div {...up(.16)} style={{fontSize:'1rem',color:'var(--text-2)',marginBottom:'1.4rem',display:'flex',alignItems:'center',gap:'.5rem',flexWrap:'wrap'}}>
            <span>Krishna Adiveppa K. —</span>
            <span style={{color:'var(--blue)',fontWeight:600}}>
              <TypeAnimation
                sequence={['Cloud Security Engineer',2200,'Full Stack Developer',2000,'AI/ML Enthusiast',2000,'AWS Practitioner',2000]}
                wrapper="span" repeat={Infinity}
              />
            </span>
          </motion.div>

          <motion.p {...up(.22)} style={{color:'var(--muted)',lineHeight:1.85,maxWidth:480,marginBottom:'2rem',fontSize:'.92rem'}}>
            B.E. CS student at SIT Mangalore. I build secure, scalable, AI-powered software — from AWS cloud architectures to real-time emotion detection systems.
          </motion.p>

          <motion.div {...up(.28)} style={{display:'flex',gap:'.9rem',flexWrap:'wrap',marginBottom:'2.5rem'}}>
            <a href="#projects" className="btn btn-blue">
              View Projects <FiArrowRight size={14}/>
            </a>
            <a href="#contact" className="btn btn-glass">Contact Me</a>
            <a href="#" className="btn btn-orange" onClick={e=>{e.preventDefault();window.showToast&&window.showToast('📄 Resume download coming soon!')}}>
              Download CV ↓
            </a>
          </motion.div>

          <motion.div {...up(.34)} style={{display:'flex',gap:'.6rem',alignItems:'center'}}>
            {[
              {icon:<FiGithub size={15}/>,   href:'https://github.com/Krishnaaka',           label:'GitHub'},
              {icon:<FiLinkedin size={15}/>, href:'https://www.linkedin.com/in/krishna-a-k', label:'LinkedIn'},
              {icon:<FiMail size={15}/>,     href:'mailto:krishnak1391@gmail.com',           label:'Email'},
              {icon:'🏅',                    href:'https://www.credly.com/users/krishna-a-k',label:'Credly'},
            ].map((s,i)=>(
              <motion.a key={i} href={s.href} target="_blank" title={s.label}
                whileHover={{y:-4,scale:1.1}} whileTap={{scale:.95}}
                style={{width:40,height:40,borderRadius:11,background:'var(--surface)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--muted)',fontSize:'.9rem',transition:'border-color .3s,color .3s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--blue)';e.currentTarget.style.color='var(--blue)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)'}}>
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Bento card cluster */}
        <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{duration:.9,delay:.18,ease:[.22,1,.36,1]}}
          style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',position:'relative'}}>

          {/* Profile card */}
          <div className="card" style={{gridColumn:'span 2',padding:'1.75rem',display:'flex',alignItems:'center',gap:'1.25rem',background:'linear-gradient(135deg,rgba(59,130,246,.06),rgba(99,102,241,.04))'}}>
            <div style={{width:72,height:72,borderRadius:'50%',overflow:'hidden',border:'3px solid rgba(59,130,246,.3)',flexShrink:0,background:'var(--surface)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <img src="/profile.jpg" alt="Krishna" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}} onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='block'}}/>
              <span style={{display:'none',fontSize:'2rem'}}>👤</span>
            </div>
            <div>
              <p style={{fontFamily:'var(--font-h)',fontSize:'1.1rem',fontWeight:800,marginBottom:'.2rem'}}>Krishna A. K.</p>
              <p style={{fontSize:'.78rem',color:'var(--text-2)'}}>SIT Mangalore · CS & Business Systems</p>
              <p style={{fontSize:'.73rem',color:'var(--muted)',marginTop:'.25rem'}}>📍 Udupi, Karnataka</p>
            </div>
          </div>

          {/* Mini stat cards */}
          {[
            {val:'3+',  lab:'Internships',   c:'var(--blue)',  icon:'💼'},
            {val:'5+',  lab:'Certs',         c:'var(--orange)',icon:'🏅'},
            {val:'7.67',lab:'CGPA',          c:'var(--teal)',  icon:'🎓'},
            {val:'4+',  lab:'Projects',      c:'#ec4899',      icon:'🚀'},
          ].map((s,i)=>(
            <motion.div key={i} className="card" whileHover={{y:-4,borderColor:`${s.c}44`}}
              style={{padding:'1.25rem',textAlign:'center',cursor:'default'}}>
              <div style={{fontSize:'1.3rem',marginBottom:'.4rem'}}>{s.icon}</div>
              <div style={{fontFamily:'var(--font-h)',fontSize:'1.6rem',fontWeight:800,color:s.c}}>{s.val}</div>
              <div style={{fontSize:'.7rem',color:'var(--muted)'}}>{s.lab}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes statusPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
        @media(max-width:900px){#hero .container{grid-template-columns:1fr!important} #hero .container>div:last-child{display:none!important} #hero{text-align:center}}
      `}</style>
    </section>
  )
}
