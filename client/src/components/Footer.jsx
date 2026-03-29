import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background:'var(--bg)', borderTop:'1px solid var(--border)', padding:'3rem 0' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto', alignItems:'center', gap:'2rem', flexWrap:'wrap' }}>
          <div>
            <div style={{ fontFamily:'var(--font-h)', fontSize:'1.5rem', fontWeight:800, marginBottom:'.4rem' }}>
              <span className="gradient-text">KAK</span>
              <span style={{ color:'var(--cyan)' }}>.</span>
            </div>
            <p style={{ color:'var(--muted)', fontSize:'.82rem' }}>
              Cloud Security · Full Stack · AI/ML · © {year}
            </p>
          </div>

          <div style={{ display:'flex', gap:'.75rem' }}>
            {[
              { icon:<FiGithub size={16}/>,   href:'https://github.com/Krishnaaka' },
              { icon:<FiLinkedin size={16}/>, href:'https://www.linkedin.com/in/krishna-a-k' },
              { icon:<FiMail size={16}/>,     href:'mailto:krishnak1391@gmail.com' },
              { icon:'🏅',                    href:'https://www.credly.com/users/krishna-a-k' },
            ].map((s,i)=>(
              <a key={i} href={s.href} target="_blank"
                style={{ width:38, height:38, borderRadius:10, background:'var(--card)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)', fontSize:'.9rem', transition:'all .3s', cursor:'none' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--primary)';e.currentTarget.style.color='var(--primary)';e.currentTarget.style.transform='translateY(-3px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)';e.currentTarget.style.transform=''}}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop:'1px solid var(--border)', marginTop:'2rem', paddingTop:'1.5rem', display:'flex', justifyContent:'center' }}>
          <p style={{ color:'var(--muted)', fontSize:'.78rem', textAlign:'center' }}>
            Designed & built with ❤ by <span style={{ color:'var(--primary)' }}>Krishna Adiveppa Kalasannaavara</span> · Powered by React + Vite
          </p>
        </div>
      </div>
      <style>{`@media(max-width:600px){footer .container>div:first-child{grid-template-columns:1fr!important;text-align:center} footer .container>div:first-child>div:last-child{justify-content:center}}`}</style>
    </footer>
  )
}
