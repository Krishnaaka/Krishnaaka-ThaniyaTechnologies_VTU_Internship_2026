import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    let raf
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const N = 130
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      c: Math.random() > .55 ? '124,109,255' : Math.random() > .5 ? '0,232,204' : '255,61,154',
      a: Math.random() * .5 + .15,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x = (p.x + p.vx + canvas.width)  % canvas.width
        p.y = (p.y + p.vy + canvas.height) % canvas.height
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c},${p.a})`
        ctx.fill()
      })
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(124,109,255,${0.1 * (1 - d / 110)})`
            ctx.lineWidth = .6
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: .7, delay, ease: [.25, .46, .45, .94] },
  })

  return (
    <section id="hero" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', paddingTop:88 }}>
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, zIndex:0, opacity:.85 }} />

      {/* Blobs */}
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }}>
        <div className="blob-glow" style={{ width:700, height:700, top:'-15%', left:'-8%', background:'radial-gradient(circle,rgba(124,109,255,0.13),transparent 70%)' }} />
        <div className="blob-glow" style={{ width:550, height:550, bottom:'-10%', right:'-5%', background:'radial-gradient(circle,rgba(0,232,204,0.1),transparent 70%)' }} />
        <div className="blob-glow" style={{ width:350, height:350, top:'35%', right:'30%', background:'radial-gradient(circle,rgba(255,61,154,0.08),transparent 70%)' }} />
      </div>

      {/* Grid overlay */}
      <div style={{ position:'absolute', inset:0, zIndex:0, backgroundImage:'linear-gradient(rgba(124,109,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(124,109,255,0.025) 1px,transparent 1px)', backgroundSize:'64px 64px', pointerEvents:'none' }} />

      <div className="container" style={{ position:'relative', zIndex:1, display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:'5rem', alignItems:'center' }}>

        {/* ── LEFT TEXT SIDE ── */}
        <div>
          <motion.div {...fadeUp(0)}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'.6rem', background:'rgba(6,214,160,0.08)', border:'1px solid rgba(6,214,160,0.2)', borderRadius:99, padding:'.4rem 1.1rem', marginBottom:'1.5rem' }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--green)', boxShadow:'0 0 10px var(--green)', display:'inline-block', animation:'pulse 1.8s infinite' }} />
              <span style={{ fontSize:'.72rem', fontWeight:700, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--green)' }}>Available for Opportunities</span>
            </div>
          </motion.div>

          <motion.h1 {...fadeUp(.08)} style={{ fontFamily:'var(--font-h)', fontSize:'clamp(3rem,5.5vw,5rem)', fontWeight:800, lineHeight:1.02, letterSpacing:'-.03em', marginBottom:'1.25rem' }}>
            Krishna<br />
            <span className="gradient-text glow">Adiveppa K.</span>
          </motion.h1>

          <motion.div {...fadeUp(.16)} style={{ fontSize:'1.15rem', color:'var(--text-2)', marginBottom:'1.5rem', minHeight:'1.8rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
            <span style={{ color:'var(--muted)' }}>I'm a</span>
            <TypeAnimation
              sequence={['Cloud Security Engineer',2200,'Full Stack Developer',2000,'AI / ML Enthusiast',2000,'AWS Cloud Practitioner',2000]}
              wrapper="span" repeat={Infinity}
              style={{ color:'var(--cyan)', fontWeight:700 }}
            />
          </motion.div>

          <motion.p {...fadeUp(.22)} style={{ color:'var(--muted)', lineHeight:1.85, maxWidth:500, marginBottom:'2.2rem', fontSize:'.95rem' }}>
            B.E. CS student at SIT Mangalore — building secure, scalable, AI-powered applications.
            Turning ideas into real-world software, one commit at a time.
          </motion.p>

          <motion.div {...fadeUp(.28)} style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'2.5rem' }}>
            <a href="#projects" className="btn btn-primary">🚀 Explore Projects</a>
            <a href="#contact" className="btn btn-outline">💬 Let's Talk</a>
          </motion.div>

          <motion.div {...fadeUp(.34)} style={{ display:'flex', gap:'.75rem', alignItems:'center' }}>
            <span style={{ fontSize:'.72rem', color:'var(--muted)', letterSpacing:'.1em', textTransform:'uppercase', marginRight:'.25rem' }}>Find me</span>
            {[
              { icon:<FiGithub size={16}/>,   href:'https://github.com/Krishnaaka',                label:'GitHub' },
              { icon:<FiLinkedin size={16}/>, href:'https://www.linkedin.com/in/krishna-a-k',      label:'LinkedIn' },
              { icon:<FiMail size={16}/>,     href:'mailto:krishnak1391@gmail.com',                label:'Email' },
              { icon:<span style={{fontSize:13}}>🏅</span>, href:'https://www.credly.com/users/krishna-a-k', label:'Credly' },
            ].map((s,i)=>(
              <motion.a key={i} whileHover={{ y:-4, scale:1.08 }} href={s.href} target="_blank" title={s.label}
                style={{ width:40, height:40, borderRadius:11, background:'var(--surface)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)', transition:'border-color .3s, color .3s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--primary)';e.currentTarget.style.color='var(--primary)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)'}}>
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT IMAGE SIDE ── */}
        <motion.div initial={{ opacity:0, scale:.85 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.9, delay:.15, ease:[.25,.46,.45,.94] }}
          style={{ display:'flex', justifyContent:'center', alignItems:'center', position:'relative' }}>

          {/* Outer decorative rings */}
          <div style={{ position:'absolute', width:380, height:380, borderRadius:'50%', border:'1px dashed rgba(124,109,255,0.15)', animation:'spinSlow 20s linear infinite' }} />
          <div style={{ position:'absolute', width:440, height:440, borderRadius:'50%', border:'1px dashed rgba(0,232,204,0.08)', animation:'spinSlow 30s linear infinite reverse' }} />

          {/* Profile ring */}
          <div style={{ width:300, height:300, borderRadius:'50%', padding:3, background:'conic-gradient(var(--primary),var(--cyan),#a78bfa,var(--pink),var(--primary))', animation:'spinSlow 5s linear infinite', position:'relative' }}>
            <div style={{ width:'100%', height:'100%', borderRadius:'50%', overflow:'hidden', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <img src="/profile.jpg" alt="Krishna AK" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center' }}
                onError={e=>{e.target.style.display='none'; e.target.nextSibling.style.display='flex'}} />
              <div style={{ display:'none', width:'100%', height:'100%', alignItems:'center', justifyContent:'center', fontSize:'6rem', color:'var(--primary)' }}>👤</div>
            </div>
          </div>

          {/* Floating skill chips */}
          {[
            { label:'Python 🐍',  v:'-20px', h:'-65px', side:'left',  color:'var(--cyan)',    delay:0 },
            { label:'AWS ☁',     v:'30px',  h:'-70px', side:'right', color:'var(--yellow)',  delay:1 },
            { label:'AI / ML 🤖', v:null,   h:'-25px', side:'left',  color:'var(--pink)',    delay:2, bottom:true },
            { label:'Docker 🐋',  v:null,   h:'-60px', side:'right', color:'var(--green)',   delay:1.5, bottom:true },
          ].map((c,i)=>(
            <motion.div key={i}
              animate={{ y:[0,-10,0] }} transition={{ repeat:Infinity, duration: 3+i*.4, delay:c.delay }}
              style={{
                position:'absolute',
                top: c.bottom ? undefined : c.v,
                bottom: c.bottom ? c.v || '30px' : undefined,
                [c.side]: c.h,
                background:'rgba(14,14,32,0.9)',
                backdropFilter:'blur(12px)',
                border:`1px solid ${c.color}40`,
                borderRadius:12, padding:'.5rem 1rem',
                fontSize:'.78rem', fontWeight:700, color:c.color,
                boxShadow:`0 8px 32px rgba(0,0,0,.4), 0 0 20px ${c.color}20`,
                whiteSpace:'nowrap',
              }}>
              {c.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a href="#about" animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:1.6 }}
        style={{ position:'absolute', bottom:'2.5rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'.4rem', color:'var(--muted)', fontSize:'.72rem', letterSpacing:'.12em', textTransform:'uppercase', zIndex:1, cursor:'none' }}>
        Scroll <FiArrowDown size={16} />
      </motion.a>

      <style>{`
        @keyframes spinSlow { to { transform: rotate(360deg) } }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(6,214,160,.5)} 50%{box-shadow:0 0 0 6px rgba(6,214,160,0)} }
        @media(max-width:960px){
          #hero .container { grid-template-columns:1fr !important; gap:3rem !important; }
          #hero .container > div:last-child { display:none !important; }
          #hero { text-align:center; }
          #hero .container > div:first-child > div:last-child { justify-content:center; }
          #hero .container > div:first-child > div:nth-child(5) { justify-content:center; }
        }
      `}</style>
    </section>
  )
}
