export default function Footer() {
  return (
    <footer style={{ background:'var(--bg)', borderTop:'1px solid var(--border)', padding:'2.5rem 0', textAlign:'center' }}>
      <div className="container">
        <p style={{ fontFamily:'var(--font-h)', fontSize:'1rem', marginBottom:'.4rem' }}>
          Designed & Built by <span style={{ background:'linear-gradient(135deg,var(--primary),var(--cyan))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Krishna Adiveppa Kalasannaavara</span>
        </p>
        <p style={{ color:'var(--muted)', fontSize:'.78rem' }}>© 2026 · Cloud Security · Full Stack · AI/ML</p>
      </div>
    </footer>
  )
}
