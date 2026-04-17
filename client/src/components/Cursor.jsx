import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Current real mouse pos
    const mouse = { x: -200, y: -200 }
    // Lagging ring pos
    const lag   = { x: -200, y: -200 }

    // State
    let isHover   = false
    let isClicking= false
    let hoverColor= '#3b82f6'   // default blue
    let raf

    // Move
    const onMove = e => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    // Hover detection on interactive elements
    const onEnter = e => {
      isHover = true
      // Pick accent color from data-cursor attr or fallback
      hoverColor = e.currentTarget.dataset.cursor || '#3b82f6'
      ring.style.width  = '52px'
      ring.style.height = '52px'
      ring.style.borderColor = hoverColor
      ring.style.background  = `${hoverColor}0d`
      dot.style.transform = 'translate(-50%,-50%) scale(0)'
    }
    const onLeave = () => {
      isHover = false
      ring.style.width  = '34px'
      ring.style.height = '34px'
      ring.style.borderColor = 'rgba(59,130,246,0.55)'
      ring.style.background  = 'transparent'
      dot.style.transform = 'translate(-50%,-50%) scale(1)'
    }
    const onDown = () => {
      isClicking = true
      ring.style.transform = 'translate(-50%,-50%) scale(.8)'
    }
    const onUp = () => {
      isClicking = false
      ring.style.transform = 'translate(-50%,-50%) scale(1)'
    }

    // Attach to all interactive elements
    const els = document.querySelectorAll('a, button, input, textarea, [data-cursor]')
    els.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    // Animate lag
    const animate = () => {
      lag.x += (mouse.x - lag.x) * 0.1
      lag.y += (mouse.y - lag.y) * 0.1
      ring.style.left = lag.x + 'px'
      ring.style.top  = lag.y + 'px'
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      els.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Sharp dot — follows instantly */}
      <div ref={dotRef} style={{
        position: 'fixed', zIndex: 9999, pointerEvents: 'none',
        width: 7, height: 7, borderRadius: '50%',
        background: 'var(--blue)',
        boxShadow: '0 0 10px rgba(59,130,246,.9)',
        transform: 'translate(-50%,-50%)',
        transition: 'transform .2s, background .3s',
        left: -200, top: -200,
      }} />

      {/* Lagging ring */}
      <div ref={ringRef} style={{
        position: 'fixed', zIndex: 9998, pointerEvents: 'none',
        width: 34, height: 34, borderRadius: '50%',
        border: '1.5px solid rgba(59,130,246,0.55)',
        background: 'transparent',
        transform: 'translate(-50%,-50%)',
        transition: 'width .25s, height .25s, border-color .3s, background .3s, transform .15s',
        left: -200, top: -200,
      }} />
    </>
  )
}
