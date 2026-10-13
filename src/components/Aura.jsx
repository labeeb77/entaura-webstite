import { useId } from 'react'
import { auraColor } from '../data/aura.js'

// The EntAura "aura": a soft sphere inside a ring of rounded rays, the same
// capsule rays that form the EntAura mark, coloured along the mark's gradient.

function Corona({ variant, cx, cy, small, soft }) {
  const count = small ? 12 : 36
  const inner = small ? 36 : 35
  const length = small ? 11 : 10
  const width = small ? 6.5 : soft ? 2.4 : 3.6

  return (
    <g className="aura-corona">
      {Array.from({ length: count }, (_, index) => {
        const t = index / count
        // Going round the ring, colour runs out along the slice and back, so
        // the ring has no hard seam where the gradient starts.
        const along = t < 0.5 ? t * 2 : (1 - t) * 2
        // Rays breathe in length and fade on one side, like light radiating.
        const stretch = small ? 0 : Math.sin(t * Math.PI * 6) * 1.6
        const opacity = small ? 1 : (soft ? 0.6 : 1) * (0.45 + 0.55 * (0.5 + 0.5 * Math.cos(t * Math.PI * 2)))
        return (
          <rect
            key={index}
            x={cx - width / 2}
            y={cy - inner - length - stretch}
            width={width}
            height={length + stretch}
            rx={width / 2}
            fill={auraColor(variant, along)}
            opacity={opacity}
            transform={`rotate(${t * 360} ${cx} ${cy})`}
          />
        )
      })}
    </g>
  )
}

function Core({ id, blurId, variant, cx, cy, small }) {
  const r = small ? 27 : 29
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-core`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor={auraColor(variant, 0.35)} stopOpacity="0.55" />
          <stop offset="100%" stopColor={auraColor(variant, 0.15)} stopOpacity="0.9" />
        </radialGradient>
        <clipPath id={`${id}-clip`}><circle cx={cx} cy={cy} r={r} /></clipPath>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-core)`} />
      {!small && (
        <g clipPath={`url(#${id}-clip)`} filter={`url(#${blurId})`}>
          <circle className="aura-blob" cx={cx + 12} cy={cy + 14} r={17} fill={auraColor(variant, 1)} opacity="0.75" />
          <circle className="aura-blob two" cx={cx - 14} cy={cy + 6} r={13} fill={auraColor(variant, 0.5)} opacity="0.6" />
          <circle cx={cx - 9} cy={cy - 12} r={12} fill="#ffffff" opacity="0.9" />
        </g>
      )}
    </g>
  )
}

// `soft` gives thinner, lighter rays for large background use.
function Aura({ variant = 'full', size = 120, twin = false, soft = false, className }) {
  const id = `aura${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const small = size < 60
  const classes = ['aura', className].filter(Boolean).join(' ')

  if (twin) {
    // Two auras fused like the mark: a larger left loop and a smaller right one.
    return (
      <svg className={classes} viewBox="0 0 176 110" width={size} height={size * 0.625} aria-hidden="true" focusable="false">
        <defs>
          <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
        </defs>
        <g transform="translate(4 5)">
          <Corona variant="ask" cx={50} cy={50} soft={soft} />
          <Core id={`${id}-l`} blurId={`${id}-blur`} variant="ask" cx={50} cy={50} />
        </g>
        <g transform="translate(91 16) scale(0.78)">
          <Corona variant="watch" cx={50} cy={50} soft={soft} />
          <Core id={`${id}-r`} blurId={`${id}-blur`} variant="watch" cx={50} cy={50} />
        </g>
      </svg>
    )
  }

  return (
    <svg className={classes} viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" focusable="false">
      {!small && (
        <defs>
          <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
        </defs>
      )}
      <Corona variant={variant} cx={50} cy={50} small={small} soft={soft} />
      <Core id={id} blurId={`${id}-blur`} variant={variant} cx={50} cy={50} small={small} />
    </svg>
  )
}

export default Aura
