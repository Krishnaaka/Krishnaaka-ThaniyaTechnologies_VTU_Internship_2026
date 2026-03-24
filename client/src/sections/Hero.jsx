import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiCrewai } from 'react-icons/si'

export default function Hero() {
  const canvasRef = useRef(null)

  // Three.js particle galaxy
  useEffect(() => {
    let animId
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const PARTICLES = 120
    const particles = Array.from({ length: PARTICLES }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.5 ? '108,99,255' : '0,245,212',
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.opacity})`
        ctx.fill()
      })

      // draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(108,99,255,${0.12 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section id="hero" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, zIndex:0 }} />

      {/* Gradient blobs */}
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }}>
        <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', top:'-10%', left:'-5%', background:'radial-gradient(circle,rgba(108,99,255,0.12),transparent 70%)', filter:'blur(40px)' }} />
        <div style={{ position:'absolute', width:500, height:500, borderRadius:'50%', bottom:'-10%', right:'-5%', background:'radial-gradient(circle,rgba(0,245,212,0.10),transparent 70%)', filter:'blur(40px)' }} />
      </div>

      <div className="container" style={{ position:'relative', zIndex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center', paddingTop:'6rem' }}>
        {/* Text */}
        <div>
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7 }}>
            <span className="section-tag">👋 Available for Opportunities</span>
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7, delay:.1 }}
            style={{ fontFamily:'var(--font-h)', fontSize:'clamp(2.8rem,5vw,4.5rem)', fontWeight:800, lineHeight:1.05, marginTop:'1rem', marginBottom:'1.25rem' }}>
            Krishna<br />
            <span className="gradient-text glow-text">Adiveppa K.</span>
          </motion.h1>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.3 }}
            style={{ fontSize:'1.2rem', color:'var(--muted)', marginBottom:'1.5rem', minHeight:'2rem' }}>
            I'm a{' '}
            <TypeAnimation
              sequence={[
                'Cloud Security Engineer', 2000,
                'Full Stack Developer',    2000,
                'AI / ML Enthusiast',      2000,
                'AWS Cloud Practitioner',  2000,
                'Backend Engineer',        2000,
              ]}
              wrapper="span"
              repeat={Infinity}
              style={{ color:'var(--cyan)', fontWeight:700 }}
            />
          </motion.div>

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.4 }}
            style={{ color:'var(--muted)', lineHeight:1.8, maxWidth:480, marginBottom:'2rem', fontSize:'.95rem' }}>
            Learning by building — turning ideas into real, secure, scalable software.
            Based in Udupi, Karnataka.
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.5 }}
            style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'2rem' }}>
            <a href="#projects" className="btn btn-primary">🚀 View Projects</a>
            <a href="https://www.linkedin.com/in/krishna-a-k" target="_blank" className="btn btn-outline">LinkedIn ↗</a>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.65 }}
            style={{ display:'flex', gap:'.85rem' }}>
            {[
              { icon: <FiGithub />, href:'https://github.com/Krishnaaka', label:'GitHub' },
              { icon: <FiLinkedin />, href:'https://www.linkedin.com/in/krishna-a-k', label:'LinkedIn' },
              { icon: <FiMail />, href:'mailto:krishnak1391@gmail.com', label:'Email' },
              { icon: '🏅', href:'https://www.credly.com/users/krishna-a-k', label:'Credly' },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" title={s.label}
                style={{ width:44, height:44, borderRadius:12, background:'var(--card)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', color:'var(--muted)', transition:'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--primary)'; e.currentTarget.style.color='var(--primary)'; e.currentTarget.style.transform='translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.transform='' }}>
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Profile image */}
        <motion.div initial={{ opacity:0, scale:.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.8, delay:.2 }}
          style={{ display:'flex', justifyContent:'center', alignItems:'center', position:'relative' }}>
          <div style={{ position:'relative' }}>
            {/* Rotating ring */}
            <div style={{
              width:320, height:320, borderRadius:'50%',
              background:'conic-gradient(var(--primary),var(--cyan),#8b5cf6,var(--primary))',
              animation:'rotate 4s linear infinite',
              display:'flex', alignItems:'center', justifyContent:'center',
              padding:3,
            }}>
              <div style={{
                width:'100%', height:'100%', borderRadius:'50%',
                background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center',
                overflow:'hidden',
              }}>
                <img src="/profile.jpg" alt="Krishna AK"
                  style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', borderRadius:'50%' }}
                  onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
                />
                <div style={{ display:'none', width:'100%', height:'100%', alignItems:'center', justifyContent:'center', fontSize:'6rem', color:'var(--primary)' }}>👤</div>
              </div>
            </div>

            {/* Floating chips */}
            {[
              { label:'Python', emoji:'🐍', top:'-20px', left:'-50px', color:'var(--cyan)' },
              { label:'AWS',    emoji:'☁',  top:'20px',  right:'-60px', color:'var(--yellow)' },
              { label:'AI/ML',  emoji:'🤖', bottom:'10px', left:'-55px', color:'var(--pink)' },
            ].map((c,i) => (
              <motion.div key={i} animate={{ y:[0,-8,0] }} transition={{ repeat:Infinity, duration:3, delay:i*1 }}
                style={{ position:'absolute', ...{top:c.top,left:c.left,right:c.right,bottom:c.bottom}, background:'var(--card)', border:`1px solid ${c.color}33`, borderRadius:12, padding:'.5rem 1rem', fontSize:'.8rem', fontWeight:700, color:c.color, display:'flex', alignItems:'center', gap:'.4rem', boxShadow:`0 0 20px ${c.color}22` }}>
                {c.emoji} {c.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y:[0,10,0] }} transition={{ repeat:Infinity, duration:1.5 }}
        style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', color:'var(--muted)', fontSize:'.75rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'.4rem', zIndex:1 }}>
        <span>Scroll</span>
        <span style={{ fontSize:'1.2rem' }}>↓</span>
      </motion.div>

      <style>{`
        @keyframes rotate { to { transform: rotate(360deg) } }
        @media(max-width:900px){
          #hero .container { grid-template-columns: 1fr !important; text-align: center; }
          #hero .container > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  )
}
