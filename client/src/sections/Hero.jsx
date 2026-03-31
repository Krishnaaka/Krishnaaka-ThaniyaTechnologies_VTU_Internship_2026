import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'

// ── Aurora animated background ──
function Aurora() {
  return (
    <div style={{ position:'absolute', inset:0, zIndex:0, overflow:'hidden' }}>
      {/* Animated aurora blobs */}
      {[
        { color:'124,109,255', size:900, x:'-10%', y:'-20%', dur:'12s', delay:'0s'  },
        { color:'0,232,204',   size:700, x:'60%',  y:'30%',  dur:'15s', delay:'3s'  },
        { color:'255,61,154',  size:600, x:'20%',  y:'50%',  dur:'18s', delay:'6s'  },
        { color:'255,111,41',  size:500, x:'70%',  y:'-10%', dur:'10s', delay:'2s'  },
      ].map((b,i)=>(
        <div key={i} style={{
          position:'absolute',
          width:b.size, height:b.size,
          left:b.x, top:b.y,
          borderRadius:'50%',
          background:`radial-gradient(circle,rgba(${b.color},0.18) 0%,transparent 70%)`,
          filter:'blur(60px)',
          animation:`auroraFloat${i} ${b.dur} ease-in-out infinite alternate`,
          animationDelay:b.delay,
        }}/>
      ))}
      {/* Grid lines */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:'linear-gradient(rgba(124,109,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,109,255,0.04) 1px,transparent 1px)',
        backgroundSize:'60px 60px',
      }}/>
      {/* Vignette */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center,transparent 40%,var(--bg) 100%)' }}/>
      <style>{`
        @keyframes auroraFloat0{0%{transform:translate(0,0) scale(1)}100%{transform:translate(80px,-60px) scale(1.2)}}
        @keyframes auroraFloat1{0%{transform:translate(0,0) scale(1.1)}100%{transform:translate(-60px,80px) scale(0.9)}}
        @keyframes auroraFloat2{0%{transform:translate(0,0) scale(0.95)}100%{transform:translate(100px,40px) scale(1.15)}}
        @keyframes auroraFloat3{0%{transform:translate(0,0) scale(1.05)}100%{transform:translate(-80px,-50px) scale(0.85)}}
      `}</style>
    </div>
  )
}

export default function Hero() {
  const mouseRef = useRef({ x:0, y:0 })
  const glowRef  = useRef(null)

  // Mouse-tracking glow
  useEffect(()=>{
    const onMove = e=>{
      mouseRef.current = {x:e.clientX, y:e.clientY}
      if(glowRef.current){
        glowRef.current.style.left = e.clientX + 'px'
        glowRef.current.style.top  = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMove)
    return ()=>window.removeEventListener('mousemove', onMove)
  },[])

  const fadeUp = (delay=0) => ({
    initial:{opacity:0,y:35},
    animate:{opacity:1,y:0},
    transition:{duration:.8,delay,ease:[.22,1,.36,1]},
  })

  return (
    <section id="hero" style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',overflow:'hidden',paddingTop:88}}>
      <Aurora/>

      {/* Mouse follower glow */}
      <div ref={glowRef} style={{
        position:'fixed',zIndex:0,pointerEvents:'none',
        width:400,height:400,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(124,109,255,0.08),transparent 70%)',
        transform:'translate(-50%,-50%)',
        transition:'left .12s linear,top .12s linear',
      }}/>

      <div className="container" style={{position:'relative',zIndex:1,display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'5rem',alignItems:'center'}}>

        {/* LEFT */}
        <div>
          {/* Status badge */}
          <motion.div {...fadeUp(0)}>
            <div style={{display:'inline-flex',alignItems:'center',gap:'.6rem',background:'rgba(6,214,160,0.07)',border:'1px solid rgba(6,214,160,0.22)',borderRadius:99,padding:'.45rem 1.2rem',marginBottom:'1.75rem'}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:'var(--green)',boxShadow:'0 0 8px var(--green)',display:'inline-block',animation:'statusPulse 2s infinite'}}/>
              <span style={{fontSize:'.68rem',fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--green)'}}>Available for Opportunities</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1 {...fadeUp(.1)} style={{fontFamily:'var(--font-h)',fontSize:'clamp(3.2rem,5.5vw,5.2rem)',fontWeight:800,lineHeight:1.0,letterSpacing:'-.03em',marginBottom:'1.5rem'}}>
            Hi, I'm<br/>
            <span className="gradient-text" style={{display:'inline-block',position:'relative'}}>
              Krishna<span style={{color:'var(--cyan)'}}>.</span>
              {/* Underline shimmer */}
              <span style={{position:'absolute',bottom:-4,left:0,right:0,height:3,borderRadius:99,background:'linear-gradient(90deg,var(--primary),var(--cyan),var(--pink))',backgroundSize:'200% 100%',animation:'shimmerLine 2.5s linear infinite'}}/>
            </span>
          </motion.h1>

          {/* Role typing */}
          <motion.div {...fadeUp(.18)} style={{fontSize:'1.1rem',color:'var(--text-2)',marginBottom:'1.6rem',display:'flex',alignItems:'center',gap:'.6rem',flexWrap:'wrap'}}>
            <span style={{color:'var(--muted)'}}>Crafting</span>
            <span style={{padding:'.25rem .9rem',borderRadius:8,background:'rgba(124,109,255,0.1)',border:'1px solid rgba(124,109,255,0.2)'}}>
              <TypeAnimation
                sequence={['Cloud Security Solutions',2200,'Full Stack Applications',2000,'AI / ML Systems',2000,'AWS Architectures',2000]}
                wrapper="span" repeat={Infinity}
                style={{color:'var(--primary)',fontWeight:700}}
              />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p {...fadeUp(.24)} style={{color:'var(--muted)',lineHeight:1.9,maxWidth:500,marginBottom:'2.2rem',fontSize:'.94rem'}}>
            B.E. CS student at SIT Mangalore — turning ideas into secure, scalable,
            AI-powered software. <strong style={{color:'var(--text-2)'}}>Learning by building</strong>, one commit at a time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div {...fadeUp(.3)} style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginBottom:'2.8rem'}}>
            <a href="#projects" className="btn btn-primary" style={{gap:'.6rem'}}>
              🚀 View Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              Let's Collaborate ↗
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div {...fadeUp(.36)} style={{display:'flex',gap:'.6rem',alignItems:'center'}}>
            <span style={{fontSize:'.7rem',color:'var(--muted)',letterSpacing:'.12em',textTransform:'uppercase',marginRight:'.3rem'}}>Connect</span>
            {[
              {icon:<FiGithub size={15}/>,   href:'https://github.com/Krishnaaka',                label:'GitHub'},
              {icon:<FiLinkedin size={15}/>, href:'https://www.linkedin.com/in/krishna-a-k',      label:'LinkedIn'},
              {icon:<FiMail size={15}/>,     href:'mailto:krishnak1391@gmail.com',                label:'Email'},
              {icon:<span>🏅</span>,         href:'https://www.credly.com/users/krishna-a-k',     label:'Credly'},
            ].map((s,i)=>(
              <motion.a key={i} href={s.href} target="_blank" title={s.label}
                whileHover={{y:-4,scale:1.1}}
                whileTap={{scale:.95}}
                style={{width:40,height:40,borderRadius:11,background:'var(--surface)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--muted)',fontSize:'.95rem',transition:'border-color .3s,color .3s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--primary)';e.currentTarget.style.color='var(--primary)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)'}}>
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Profile */}
        <motion.div initial={{opacity:0,scale:.8,rotate:-5}} animate={{opacity:1,scale:1,rotate:0}} transition={{duration:1,delay:.2,ease:[.22,1,.36,1]}}
          style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>

          {/* Orbit rings */}
          <div style={{position:'absolute',width:420,height:420,borderRadius:'50%',border:'1px solid rgba(124,109,255,0.1)',animation:'orbit 25s linear infinite'}}/>
          <div style={{position:'absolute',width:360,height:360,borderRadius:'50%',border:'1px dashed rgba(0,232,204,0.08)',animation:'orbit 18s linear infinite reverse'}}/>

          {/* Glowing dots on orbit */}
          <div style={{position:'absolute',width:420,height:420,borderRadius:'50%',animation:'orbit 25s linear infinite'}}>
            <div style={{position:'absolute',top:-4,left:'50%',width:8,height:8,borderRadius:'50%',background:'var(--primary)',boxShadow:'0 0 12px var(--primary)',transform:'translateX(-50%)'}}/>
          </div>

          {/* Photo ring */}
          <div style={{position:'relative',width:290,height:290}}>
            {/* Animated conic gradient ring */}
            <div style={{position:'absolute',inset:-4,borderRadius:'50%',background:'conic-gradient(var(--primary),var(--cyan),#a78bfa,var(--pink),var(--orange),var(--primary))',animation:'spinSlow 6s linear infinite',filter:'blur(1px)'}}/>
            <div style={{position:'relative',width:'100%',height:'100%',borderRadius:'50%',overflow:'hidden',background:'var(--bg)',border:'4px solid var(--bg)'}}>
              <img src="/profile.jpg" alt="Krishna AK"
                style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top center'}}
                onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex'}}/>
              <div style={{display:'none',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:'6rem',color:'var(--primary)'}}>👤</div>
            </div>
          </div>

          {/* Floating chips */}
          {[
            {label:'Python 🐍',  color:'var(--cyan)',    pos:{top:'-18px',left:'-70px'},  delay:0  },
            {label:'☁ AWS',      color:'var(--yellow)',  pos:{top:'30px', right:'-65px'}, delay:1  },
            {label:'AI/ML 🤖',   color:'var(--pink)',    pos:{bottom:'30px',left:'-65px'},delay:2  },
            {label:'🐋 Docker',  color:'var(--green)',   pos:{bottom:'0',right:'-70px'},  delay:1.5},
          ].map((c,i)=>(
            <motion.div key={i} animate={{y:[0,-10,0]}} transition={{repeat:Infinity,duration:3.2+i*.5,delay:c.delay}}
              style={{position:'absolute',...c.pos,background:'rgba(10,10,28,0.92)',backdropFilter:'blur(16px)',border:`1px solid ${c.color}35`,borderRadius:12,padding:'.5rem 1rem',fontSize:'.76rem',fontWeight:700,color:c.color,boxShadow:`0 8px 24px rgba(0,0,0,.5),0 0 20px ${c.color}18`,whiteSpace:'nowrap',zIndex:2}}>
              {c.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a href="#about" animate={{y:[0,10,0]}} transition={{repeat:Infinity,duration:1.7}}
        style={{position:'absolute',bottom:'2.5rem',left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'.4rem',color:'var(--muted)',fontSize:'.68rem',letterSpacing:'.15em',textTransform:'uppercase',zIndex:2,cursor:'none'}}>
        scroll <FiArrowDown size={15}/>
      </motion.a>

      <style>{`
        @keyframes spinSlow{to{transform:rotate(360deg)}}
        @keyframes orbit{to{transform:rotate(360deg)}}
        @keyframes statusPulse{0%,100%{opacity:1}50%{opacity:.4}}
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
