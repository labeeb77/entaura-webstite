import { useEffect, useRef } from 'react'
import { logos } from '../../data/home.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

function LogoRow({ hidden }) {
  return (
    <ul aria-hidden={hidden || undefined}>
      {logos.map(logo => (
        <li key={logo.name}>
          <img src={`/assets/integrations/${logo.file}`} alt="" loading="lazy" draggable={false} />
          <span>{logo.name}</span>
        </li>
      ))}
    </ul>
  )
}

function LogoMarquee() {
  const track = useRef(null)
  const offset = useRef(0)
  const drag = useRef(null)
  const hovered = useRef(false)
  const focused = useRef(false)
  const reduced = useReducedMotion()

  const move = delta => {
    const element = track.current
    const width = element?.scrollWidth / 2
    if (!width) return
    offset.current = ((offset.current + delta) % width + width) % width
    element.style.transform = `translateX(${-offset.current}px)`
  }

  useEffect(() => {
    if (reduced) return undefined
    let frame
    let previous
    const tick = time => {
      if (previous !== undefined && !drag.current && !hovered.current && !focused.current) {
        const width = track.current?.scrollWidth / 2
        move(width * Math.min(time - previous, 50) / 66000)
      }
      previous = time
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduced])

  const endDrag = event => {
    if (drag.current?.id !== event.pointerId) return
    drag.current = null
    event.currentTarget.classList.remove('dragging')
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <section className="h-logos" aria-label="Integrations">
      <p className="container">Works with the systems you already run · <strong>600+ connectors</strong></p>
      <div
        className="h-marquee"
        role="region"
        aria-label="Connector logos. Drag left or right, or use the arrow keys."
        tabIndex={0}
        onMouseEnter={() => { hovered.current = true }}
        onMouseLeave={() => { hovered.current = false }}
        onFocus={() => { focused.current = true }}
        onBlur={() => { focused.current = false }}
        onPointerDown={event => {
          if (!event.isPrimary || event.button !== 0) return
          drag.current = { id: event.pointerId, x: event.clientX }
          event.currentTarget.setPointerCapture(event.pointerId)
          event.currentTarget.classList.add('dragging')
        }}
        onPointerMove={event => {
          if (drag.current?.id !== event.pointerId) return
          move(drag.current.x - event.clientX)
          drag.current.x = event.clientX
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onKeyDown={event => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
          event.preventDefault()
          move(event.key === 'ArrowRight' ? 180 : -180)
        }}
      >
        <div className="h-marquee-track" ref={track}>
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>
    </section>
  )
}

export default LogoMarquee
