import { useEffect, useRef } from 'react'

// Logo colours, in order across the band.
const palette = [
  [29, 79, 216],
  [42, 183, 227],
  [44, 201, 166],
  [160, 108, 240],
  [217, 83, 156],
]
const strands = 150
const segments = 70

function colourAt(t) {
  const scaled = t * (palette.length - 1)
  const index = Math.min(palette.length - 2, Math.floor(scaled))
  const mix = scaled - index
  const [a, b] = [palette[index], palette[index + 1]]
  return a.map((value, channel) => Math.round(value + (b[channel] - value) * mix))
}

// Point and tangent on a cubic Bézier.
function bezier(p, s) {
  const u = 1 - s
  const point = [0, 1].map(axis => u * u * u * p[0][axis] + 3 * u * u * s * p[1][axis] + 3 * u * s * s * p[2][axis] + s * s * s * p[3][axis])
  const tangent = [0, 1].map(axis => 3 * u * u * (p[1][axis] - p[0][axis]) + 6 * u * s * (p[2][axis] - p[1][axis]) + 3 * s * s * (p[3][axis] - p[2][axis]))
  return { point, tangent }
}

// Many thin strands form one silky band that sweeps down an S-curve and twists slowly.
function draw(context, width, height, time) {
  context.clearRect(0, 0, width, height)
  const sway = Math.sin(time * 0.00021) * 0.04
  const spine = [
    [width * (0.42 + sway), -height * 0.08],
    [width * 0.98, height * (0.3 - sway)],
    [width * (0.22 - sway), height * 0.62],
    [width * 1.08, height * 1.04],
  ]
  const band = Math.min(width, height) * 0.3
  const phase = time * 0.00031

  // Sample the spine once per frame.
  const samples = []
  for (let step = 0; step <= segments; step += 1) {
    const s = step / segments
    const { point, tangent } = bezier(spine, s)
    const length = Math.hypot(tangent[0], tangent[1]) || 1
    const normal = [-tangent[1] / length, tangent[0] / length]
    const halfWidth = band * (0.55 + 0.45 * Math.sin(Math.PI * s))
    // Under one full turn along the length, so the band stays broad and only folds once.
    const angle = s * Math.PI * 1.25 + phase
    samples.push({ point, normal, halfWidth, angle })
  }

  // A soft colour wash underneath gives the band body; the strands add the silky texture.
  const wash = context.createLinearGradient(width * 0.3, 0, width, height)
  palette.forEach(([r, g, b], index) => wash.addColorStop(index / (palette.length - 1), `rgba(${r}, ${g}, ${b}, 0.1)`))
  context.fillStyle = wash
  context.beginPath()
  samples.forEach(({ point, normal, halfWidth, angle }, step) => {
    const edge = halfWidth * Math.cos(angle + 0.5)
    const x = point[0] + normal[0] * edge
    const y = point[1] + normal[1] * edge
    if (step === 0) context.moveTo(x, y)
    else context.lineTo(x, y)
  })
  for (let step = samples.length - 1; step >= 0; step -= 1) {
    const { point, normal, halfWidth, angle } = samples[step]
    const edge = halfWidth * Math.cos(angle - 0.5)
    context.lineTo(point[0] - normal[0] * edge, point[1] - normal[1] * edge)
  }
  context.fill()

  context.lineWidth = 1
  context.lineCap = 'round'
  for (let index = 0; index < strands; index += 1) {
    const t = index / (strands - 1)
    const across = (t - 0.5) * 2
    const [r, g, b] = colourAt(t)
    context.beginPath()
    // Each strand turns a little later than its neighbour, so the fold fans out like woven fabric.
    const lag = across * 0.5
    samples.forEach(({ point, normal, halfWidth, angle }, step) => {
      const offset = across * halfWidth * Math.cos(angle + lag)
      const x = point[0] + normal[0] * offset
      const y = point[1] + normal[1] * offset
      if (step === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    })
    // Strands near the edges and on folds read lighter, like a sheen on fabric.
    const alpha = 0.18 + 0.32 * (1 - Math.abs(across) ** 2)
    context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`
    context.stroke()
  }
}

function HeroRibbon({ reduced }) {
  const canvas = useRef(null)

  useEffect(() => {
    const element = canvas.current
    const context = element?.getContext('2d')
    if (!context) return undefined
    let frame = 0
    let visible = true
    let size = { width: 0, height: 0 }
    const start = performance.now() - 6000

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = element.getBoundingClientRect()
      size = { width, height }
      element.width = Math.round(width * ratio)
      element.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      draw(context, width, height, performance.now() - start)
    }

    const tick = now => {
      draw(context, size.width, size.height, now - start)
      frame = requestAnimationFrame(tick)
    }
    const run = () => {
      cancelAnimationFrame(frame)
      if (!reduced && visible && !document.hidden) frame = requestAnimationFrame(tick)
    }

    const resizer = new ResizeObserver(resize)
    resizer.observe(element)
    const watcher = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      run()
    })
    watcher.observe(element)
    document.addEventListener('visibilitychange', run)
    resize()
    run()

    return () => {
      cancelAnimationFrame(frame)
      resizer.disconnect()
      watcher.disconnect()
      document.removeEventListener('visibilitychange', run)
    }
  }, [reduced])

  return <canvas className="hx-ribbon" ref={canvas} aria-hidden="true"></canvas>
}

export default HeroRibbon
