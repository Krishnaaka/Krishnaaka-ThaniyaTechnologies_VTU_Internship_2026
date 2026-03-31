import { useEffect, useRef, useState } from 'react'

const COLORS = ['124,109,255', '0,232,204', '255,61,154', '255,209,102']

export default function Cursor() {
  const dotRef    = useRef(null)
  const ringRef   = useRef(null)
  const trailsRef = useRef([])
  const pos       = useRef({ x: -100, y: -100 })
  const follow    = useRef({ x: -100, y: -100 })
  const colorIdx  = useRef(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Create trail particles
    const TRAIL = 8
    const trails = Array.from({ length: TRAIL }, (_, i) => {
      const el = document.createElement('div')
      el.style.cssText = `
        position:fixed;z-index:9997;border-radius:50%;pointer-events:none;
        width:${6 - i * 0.5}px;height:${6 - i * 0.5}px;
        opacity:${0.6 - i * 0.07};
        transform:translate(-50%,-50%);
        transition:background .3s;
        left:-100px;top:-100px;
      `
      document.body.appendChild(el)
      return el
    })
    trailsRef.current = trails

    const history = Array.from({ length: TRAIL }, () => ({ x: -100, y: -100 }))
    let raf

    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    const animate = () => {
      follow.current.x += (pos.current.x - follow.current.x) * 0.12
      follow.current.y += (pos.current.y - follow.current.y) * 0.12
      ring.style.left = follow.current.x + 'px'
      ring.style.top  = follow.current.y + 'px'

      // Shift color every 60 frames
      colorIdx.current = (colorIdx.current + 1) % (60 * COLORS.length)
      const c = COLORS[Math.floor(colorIdx.current / 60)]
      dot.style.background  = `rgb(${c})`
      dot.style.boxShadow   = `0 0 12px rgba(${c},.9)`
      ring.style.borderColor = `rgba(${c},.5)`
      trails.forEach(t => t.style.background = `rgb(${c})`)

      // Trail positions
      history.unshift({ x: pos.current.x, y: pos.current.y })
      history.pop()
      trails.forEach((t, i) => {
        t.style.left = history[i].x + 'px'
        t.style.top  = history[i].y + 'px'
      })

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      trails.forEach(t => t.remove())
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position:'fixed',zIndex:9999,borderRadius:'50%',pointerEvents:'none',
        width: hovered ? 14 : 8, height: hovered ? 14 : 8,
        transform:'translate(-50%,-50%)',
        transition:'width .2s,height .2s',
        left:-100,top:-100,
      }}/>
      <div ref={ringRef} style={{
        position:'fixed',zIndex:9998,borderRadius:'50%',pointerEvents:'none',
        width: hovered ? 52 : 36, height: hovered ? 52 : 36,
        border:'1.5px solid',
        transform:'translate(-50%,-50%)',
        background: hovered ? 'rgba(124,109,255,0.06)' : 'transparent',
        transition:'width .25s,height .25s,background .25s',
        left:-100,top:-100,
      }}/>
    </>
  )
}
