import { useEffect, useRef } from 'react'

// Brand blue, teal and violet, left to right.
const colors = ['#3567d8', '#2cc9a6', '#8457d4']
const lineCount = 34
const step = 6

// Flowing silk behind the hero: a bundle of thin lines that twists, bends and
// drifts slowly. Drawn on a canvas; it pauses off screen and holds still for
// reduced motion.
function HeroSilk({ reduced }) {
  const canvas = useRef(null)

  useEffect(() => {
    const element = canvas.current
    const context = element?.getContext('2d')
    if (!context) return undefined
    let width = 0
    let height = 0
    let frame = 0
    let visible = true

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = element.clientWidth
      height = element.clientHeight
      element.width = Math.round(width * ratio)
      element.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const draw = time => {
      const t = time / 1000
      context.clearRect(0, 0, width, height)
      const gradient = context.createLinearGradient(0, 0, width, 0)
      colors.forEach((color, index) => gradient.addColorStop(index / (colors.length - 1), color))
      context.strokeStyle = gradient
      context.lineWidth = 1

      for (let line = 0; line < lineCount; line++) {
        const k = line / (lineCount - 1)
        // Lines near the middle of the bundle are the strongest.
        context.globalAlpha = 0.07 + 0.2 * (1 - Math.abs(k - 0.5) * 2)
        context.beginPath()
        for (let x = -step; x <= width + step; x += step) {
          const u = x / width
          const centre = height * (0.46 + 0.12 * Math.sin(u * Math.PI * 1.6 + t * 0.22) + 0.05 * Math.sin(u * Math.PI * 4.2 - t * 0.31))
          // The twist: the bundle narrows and widens along its length.
          const spread = height * 0.34 * Math.cos(u * Math.PI * 1.25 + t * 0.18 + 0.6)
          const ripple = 9 * Math.sin(u * 9 + t * 0.6 + k * 3)
          const y = centre + (k - 0.5) * spread + ripple
          if (x === -step) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.stroke()
      }
      context.globalAlpha = 1
    }

    const loop = time => {
      draw(time)
      frame = visible ? requestAnimationFrame(loop) : 0
    }

    resize()
    const resizer = new ResizeObserver(() => {
      resize()
      draw(performance.now())
    })
    resizer.observe(element)

    if (reduced) {
      draw(12000)
      return () => resizer.disconnect()
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame) frame = requestAnimationFrame(loop)
    })
    observer.observe(element)
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizer.disconnect()
    }
  }, [reduced])

  return <canvas className="hx-silk" ref={canvas} aria-hidden="true"></canvas>
}

export default HeroSilk
