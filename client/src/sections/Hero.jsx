import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiCode } from 'react-icons/fi'

// ── Particle star field ──
function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top:  `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    dur:  `${Math.random() * 4 + 2}s`,
    del:  `${Math.random() * 5}s`,
  }))
  return (
    <div style={{ position:'absolute', inset:0, zIndex:0, overflow:'hidden', pointerEvents:'none' }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position:'absolute', top:s.top, left:s.left,
          width:s.size, height:s.size, borderRadius:'50%',
          background:'rgba(255,255,255,0.6)',
          animation:`starTwinkle ${s.dur} ease-in-out infinite alternate`,
          animationDelay:s.del,
        }}/>
      ))}
      <style>{`@keyframes starTwinkle{from{opacity:.08}to{opacity:.5}}`}</style>
    </div>
  )
}

// ── Aurora animated background ──
function Aurora() {
  return (
    <div style={{ position:'absolute', inset:0, zIndex:0, overflow:'hidden' }}>
      {[
        { color:'124,109,255', size:1000, x:'-15%', y:'-25%', dur:'14s', delay:'0s'  },
        { color:'0,232,204',   size:750,  x:'55%',  y:'25%',  dur:'17s', delay:'3s'  },
        { color:'255,61,154',  size:650,  x:'15%',  y:'55%',  dur:'20s', delay:'6s'  },
        { color:'255,111,41',  size:500,  x:'72%',  y:'-15%', dur:'11s', delay:'2s'  },
      ].map((b,i)=>(
        <div key={i} style={{
          position:'absolute',
          width:b.size, height:b.size,
          left:b.x, top:b.y,
          borderRadius:'50%',
          background:`radial-gradient(circle,rgba(${b.color},0.16) 0%,transparent 70%)`,
          filter:'blur(70px)',
          animation:`auroraFloat${i} ${b.dur} ease-in-out infinite alternate`,
          animationDelay:b.delay,
        }}/>
      ))}
      {/* Grid */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:'linear-gradient(rgba(124,109,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(124,109,255,0.035) 1px,transparent 1px)',
        backgroundSize:'70px 70px',
      }}/>
      {/* Vignette */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center,transparent 35%,var(--bg) 100%)' }}/>
      <style>{`
        @keyframes auroraFloat0{0%{transform:translate(0,0) scale(1)}100%{transform:translate(90px,-70px) scale(1.25)}}
        @keyframes auroraFloat1{0%{transform:translate(0,0) scale(1.1)}100%{transform:translate(-70px,90px) scale(0.88)}}
        @keyframes auroraFloat2{0%{transform:translate(0,0) scale(0.93)}100%{transform:translate(110px,50px) scale(1.18)}}
        @keyframes auroraFloat3{0%{transform:translate(0,0) scale(1.06)}100%{transform:translate(-90px,-55px) scale(0.82)}}
      `}</style>
    </div>
  )
}

// ── Quick-stat pill ──
function HeroStat({ value, label }) {
  return (
    <div style={{
      display:'flex', flexDirection:'column', alignItems:'center',
      padding:'.6rem 1.2rem',
      background:'rgba(255,255,255,0.03)',
      border:'1px solid rgba(255,255,255,0.07)',
      borderRadius:12, minWidth:80,
    }}>
      <span style={{ fontFamily:'var(--font-h)', fontSize:'1.3rem', fontWeight:800, color:'var(--text)', letterSpacing:'-.03em' }}>{value}</span>
      <span style={{ fontSize:'.62rem', color:'var(--muted)', letterSpacing:'.1em', textTransform:'uppercase', marginTop:2 }}>{label}</span>
    </div>
  )
}

export default function Hero() {
  const glowRef = useRef(null)

  useEffect(()=>{
    const onMove = e=>{
      if(glowRef.current){
        glowRef.current.style.left = e.clientX + 'px'
        glowRef.current.style.top  = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMove)
    return ()=>window.removeEventListener('mousemove', onMove)
  },[])

  const fadeUp = (delay=0) => ({
    initial:{opacity:0,y:40},
    animate:{opacity:1,y:0},
    transition:{duration:.85,delay,ease:[.22,1,.36,1]},
  })

  return (
    <section id="hero" style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',overflow:'hidden',paddingTop:88}}>
      <Aurora/>
      <Stars/>

      {/* Mouse follower glow */}
      <div ref={glowRef} style={{
        position:'fixed',zIndex:0,pointerEvents:'none',
        width:500,height:500,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(124,109,255,0.07),transparent 70%)',
        transform:'translate(-50%,-50%)',
        transition:'left .15s linear,top .15s linear',
      }}/>

      <div className="container" style={{position:'relative',zIndex:1,display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'5rem',alignItems:'center'}}>

        {/* LEFT */}
        <div>
          {/* Status badge */}
          <motion.div {...fadeUp(0)}>
            <div style={{display:'inline-flex',alignItems:'center',gap:'.6rem',background:'rgba(6,214,160,0.07)',border:'1px solid rgba(6,214,160,0.22)',borderRadius:99,padding:'.4rem 1.1rem',marginBottom:'1.75rem'}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:'var(--green)',boxShadow:'0 0 10px var(--green)',display:'inline-block',animation:'statusPulse 2s infinite'}}/>
              <span style={{fontSize:'.68rem',fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--green)'}}>Available for Opportunities</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1 {...fadeUp(.1)} style={{fontFamily:'var(--font-h)',fontSize:'clamp(3rem,5.5vw,5.2rem)',fontWeight:800,lineHeight:1.0,letterSpacing:'-.03em',marginBottom:'1.4rem'}}>
            Hi, I'm<br/>
            <span className="gradient-text" style={{display:'inline-block',position:'relative'}}>
              Krishna<span style={{color:'var(--cyan)'}}>.</span>
              <span style={{position:'absolute',bottom:-4,left:0,right:0,height:3,borderRadius:99,background:'linear-gradient(90deg,var(--primary),var(--cyan),var(--pink))',backgroundSize:'200% 100%',animation:'shimmerLine 2.5s linear infinite'}}/>
            </span>
          </motion.h1>

          {/* Typing role */}
          <motion.div {...fadeUp(.18)} style={{fontSize:'1.05rem',color:'var(--text-2)',marginBottom:'1.5rem',display:'flex',alignItems:'center',gap:'.6rem',flexWrap:'wrap'}}>
            <span style={{color:'var(--muted)'}}>Building</span>
            <span style={{padding:'.28rem 1rem',borderRadius:9,background:'rgba(124,109,255,0.1)',border:'1px solid rgba(124,109,255,0.22)'}}>
              <TypeAnimation
                sequence={[
                  'Cloud-Native Systems ☁',2200,
                  'Full Stack Web Apps 🌐',2000,
                  'AI / ML Pipelines 🤖',2000,
                  'AWS Architectures 🏗',2000,
                  'GenAI Solutions ✨',2000,
                ]}
                wrapper="span" repeat={Infinity}
                style={{color:'var(--primary)',fontWeight:700}}
              />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p {...fadeUp(.24)} style={{color:'var(--muted)',lineHeight:1.95,maxWidth:510,marginBottom:'1.6rem',fontSize:'.94rem'}}>
            B.E. CS undergrad at <strong style={{color:'var(--text-2)'}}>SIT Mangalore</strong> — turning ideas into secure, scalable, AI-powered software.
            Currently interning as a <strong style={{color:'var(--text-2)'}}>GenAI &amp; Analytics Intern</strong> at Learners Byte.
            {' '}<em style={{color:'var(--cyan)',fontStyle:'normal',fontWeight:600}}>Learning by building</em>, one commit at a time.
          </motion.p>

          {/* Quick stats */}
          <motion.div {...fadeUp(.28)} style={{display:'flex',gap:'.75rem',flexWrap:'wrap',marginBottom:'2rem'}}>
            <HeroStat value="3+" label="Internships" />
            <HeroStat value="10+" label="Projects" />
            <HeroStat value="7.67" label="CGPA" />
            <HeroStat value="5+" label="Certs" />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div {...fadeUp(.32)} style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginBottom:'2.2rem'}}>
            <a href="#projects" className="btn btn-primary" style={{gap:'.6rem'}}>
              🚀 View Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              Let's Work Together ↗
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div {...fadeUp(.38)} style={{display:'flex',gap:'.55rem',alignItems:'center'}}>
            <span style={{fontSize:'.67rem',color:'var(--muted)',letterSpacing:'.12em',textTransform:'uppercase',marginRight:'.3rem'}}>Connect</span>
            {[
              {icon:<FiGithub size={14}/>,   href:'https://github.com/Krishnaaka',             label:'GitHub'},
              {icon:<FiLinkedin size={14}/>, href:'https://www.linkedin.com/in/krishna-a-k',   label:'LinkedIn'},
              {icon:<FiMail size={14}/>,     href:'mailto:krishnak1391@gmail.com',             label:'Email'},
              {icon:<FiCode size={14}/>,     href:'https://leetcode.com/u/krishna_ak/',        label:'LeetCode'},
              {icon:<span style={{fontSize:'.9rem'}}>🏅</span>, href:'https://www.credly.com/users/krishna-a-k', label:'Credly'},
            ].map((s,i)=>(
              <motion.a key={i} href={s.href} target="_blank" title={s.label}
                whileHover={{y:-4,scale:1.12}}
                whileTap={{scale:.93}}
                style={{width:38,height:38,borderRadius:10,background:'var(--surface)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--muted)',fontSize:'.9rem',transition:'border-color .3s,color .3s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--primary)';e.currentTarget.style.color='var(--primary)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)'}}>
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Profile card */}
        <motion.div initial={{opacity:0,scale:.82,rotate:-6}} animate={{opacity:1,scale:1,rotate:0}} transition={{duration:1.1,delay:.2,ease:[.22,1,.36,1]}}
          style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>

          {/* Orbit rings */}
          <div style={{position:'absolute',width:440,height:440,borderRadius:'50%',border:'1px solid rgba(124,109,255,0.1)',animation:'orbit 26s linear infinite'}}/>
          <div style={{position:'absolute',width:370,height:370,borderRadius:'50%',border:'1px dashed rgba(0,232,204,0.09)',animation:'orbit 19s linear infinite reverse'}}/>
          <div style={{position:'absolute',width:300,height:300,borderRadius:'50%',border:'1px solid rgba(255,61,154,0.06)',animation:'orbit 33s linear infinite'}}/>

          {/* Orbit dots */}
          <div style={{position:'absolute',width:440,height:440,borderRadius:'50%',animation:'orbit 26s linear infinite'}}>
            <div style={{position:'absolute',top:-5,left:'50%',width:10,height:10,borderRadius:'50%',background:'var(--primary)',boxShadow:'0 0 14px var(--primary)',transform:'translateX(-50%)'}}/>
          </div>
          <div style={{position:'absolute',width:370,height:370,borderRadius:'50%',animation:'orbit 19s linear infinite reverse'}}>
            <div style={{position:'absolute',bottom:-4,left:'50%',width:8,height:8,borderRadius:'50%',background:'var(--cyan)',boxShadow:'0 0 10px var(--cyan)',transform:'translateX(-50%)'}}/>
          </div>

          {/* Photo ring */}
          <div style={{position:'relative',width:295,height:295}}>
            <div style={{position:'absolute',inset:-4,borderRadius:'50%',background:'conic-gradient(var(--primary),var(--cyan),#a78bfa,var(--pink),var(--orange),var(--primary))',animation:'spinSlow 7s linear infinite',filter:'blur(1px)'}}/>
            <div style={{position:'relative',width:'100%',height:'100%',borderRadius:'50%',overflow:'hidden',background:'var(--bg)',border:'4px solid var(--bg)'}}>
              <img src="/profile.jpg" alt="Krishna AK"
                style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top center'}}
                onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex'}}/>
              <div style={{display:'none',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:'6rem',color:'var(--primary)'}}>👤</div>
            </div>
          </div>

          {/* Floating chips */}
          {[
            {label:'Python 🐍',     color:'var(--cyan)',   pos:{top:'-20px',left:'-75px'},   delay:0   },
            {label:'☁ AWS',         color:'var(--yellow)', pos:{top:'25px', right:'-68px'},  delay:1   },
            {label:'GenAI ✨',       color:'var(--pink)',   pos:{bottom:'35px',left:'-68px'}, delay:2   },
            {label:'🐋 Docker',     color:'var(--green)',  pos:{bottom:'-5px',right:'-72px'},delay:1.5 },
          ].map((c,i)=>(
            <motion.div key={i} animate={{y:[0,-10,0]}} transition={{repeat:Infinity,duration:3.4+i*.5,delay:c.delay}}
              style={{position:'absolute',...c.pos,background:'rgba(8,8,22,0.92)',backdropFilter:'blur(18px)',border:`1px solid ${c.color}38`,borderRadius:12,padding:'.48rem 1rem',fontSize:'.74rem',fontWeight:700,color:c.color,boxShadow:`0 8px 28px rgba(0,0,0,.55),0 0 22px ${c.color}1a`,whiteSpace:'nowrap',zIndex:2}}>
              {c.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a href="#about" animate={{y:[0,10,0]}} transition={{repeat:Infinity,duration:1.8}}
        style={{position:'absolute',bottom:'2.5rem',left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'.4rem',color:'var(--muted)',fontSize:'.67rem',letterSpacing:'.15em',textTransform:'uppercase',zIndex:2,cursor:'none'}}>
        scroll <FiArrowDown size={14}/>
      </motion.a>

      <style>{`
        @keyframes spinSlow{to{transform:rotate(360deg)}}
        @keyframes orbit{to{transform:rotate(360deg)}}
        @keyframes statusPulse{0%,100%{opacity:1}50%{opacity:.35}}
        @keyframes shimmerLine{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        @media(max-width:960px){
          #hero .container{grid-template-columns:1fr!important;gap:2rem!important}
          #hero .container>div:last-child{display:none!important}
          #hero{text-align:center}
        }
      `}</style>
    </section>
  )
}
