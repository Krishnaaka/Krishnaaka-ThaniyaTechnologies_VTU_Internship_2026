import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer style={{ background:'var(--bg)', borderTop:'1px solid var(--border)', padding:'2.5rem 0' }}>
      <div className="container">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1.5rem' }}>
          <div>
            <div style={{ fontFamily:'var(--font-h)', fontSize:'1.4rem', fontWeight:800, marginBottom:'.3rem' }}>
              <span className="gt-blue">KAK</span><span style={{ color:'var(--orange)' }}>.</span>
            </div>
            <p style={{ color:'var(--muted)', fontSize:'.78rem' }}>
              Cloud · Full Stack · AI/ML · © {new Date().getFullYear()}
            </p>
          </div>

          <div style={{ display:'flex', gap:'.6rem' }}>
            {[
              { icon:<FiGithub size={15}/>,   href:'https://github.com/Krishnaaka' },
              { icon:<FiLinkedin size={15}/>, href:'https://www.linkedin.com/in/krishna-a-k' },
              { icon:<FiMail size={15}/>,     href:'mailto:krishnak1391@gmail.com' },
              { icon:'🏅',                    href:'https://www.credly.com/users/krishna-a-k' },
            ].map((s,i) => (
              <a key={i} href={s.href} target="_blank"
                style={{ width:37, height:37, borderRadius:9, background:'var(--card)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)', fontSize:'.85rem', transition:'all .3s', cursor:'none' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--blue)';e.currentTarget.style.color='var(--blue)';e.currentTarget.style.transform='translateY(-3px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)';e.currentTarget.style.transform=''}}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop:'1px solid var(--border)', marginTop:'2rem', paddingTop:'1.5rem', textAlign:'center' }}>
          <p style={{ color:'var(--muted)', fontSize:'.75rem' }}>
            Designed & built by <span style={{ color:'var(--blue)' }}>Krishna Adiveppa Kalasannaavara</span> · Powered by React + Vite
          </p>
        </div>
      </div>
    </footer>
  )
}
