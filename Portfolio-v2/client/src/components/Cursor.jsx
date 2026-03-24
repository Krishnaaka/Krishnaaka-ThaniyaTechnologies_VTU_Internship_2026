import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const followerPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = e.clientX + 'px'
      cursor.style.top  = e.clientY + 'px'
    }

    let raf
    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.1
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.1
      follower.style.left = followerPos.current.x + 'px'
      follower.style.top  = followerPos.current.y + 'px'
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onEnter = () => {
      cursor.classList.add('hovered')
      follower.classList.add('hovered')
    }
    const onLeave = () => {
      cursor.classList.remove('hovered')
      follower.classList.remove('hovered')
    }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, .tilt-card').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-ring" />
      <style>{`
        .cursor-dot {
          position: fixed; top: 0; left: 0; z-index: 9999;
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--cyan);
          pointer-events: none; transform: translate(-50%,-50%);
          box-shadow: 0 0 12px var(--cyan);
          transition: width .2s, height .2s, background .2s;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0; z-index: 9998;
          width: 36px; height: 36px; border-radius: 50%;
          border: 1.5px solid rgba(108,99,255,0.6);
          pointer-events: none; transform: translate(-50%,-50%);
          transition: width .3s, height .3s, border-color .3s;
        }
        .cursor-dot.hovered { width: 14px; height: 14px; background: var(--primary); }
        .cursor-ring.hovered { width: 54px; height: 54px; border-color: var(--primary); background: rgba(108,99,255,0.07); }
      `}</style>
    </>
  )
}
