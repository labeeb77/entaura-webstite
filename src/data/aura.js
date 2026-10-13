// Colours of the EntAura mark, in order along the infinity loop.
export const logoStops = ['#1f4fd8', '#4cb8ee', '#62d9cf', '#b7df8a', '#f2d27a', '#f5a58c', '#e58dc0', '#a97be6']

// Each variant takes its slice of the mark's gradient, as [from, to] stop
// positions: Ask is the left loop, Insight the crossing, Watch the right loop.
export const auraRanges = {
  full: [0, 7],
  ask: [0, 2.6],
  insight: [2, 4.6],
  watch: [4.6, 7],
}

function hexToRgb(hex) {
  const value = parseInt(hex.slice(1), 16)
  return [value >> 16, (value >> 8) & 255, value & 255]
}

// Colour at position `at` (0 to 7) along the mark's gradient.
export function stopColor(at) {
  const clamped = Math.min(Math.max(at, 0), logoStops.length - 1)
  const index = Math.min(Math.floor(clamped), logoStops.length - 2)
  const mix = clamped - index
  const from = hexToRgb(logoStops[index])
  const to = hexToRgb(logoStops[index + 1])
  const rgb = from.map((channel, i) => Math.round(channel + (to[i] - channel) * mix))
  return `rgb(${rgb.join(',')})`
}

// Colour at fraction `t` (0 to 1) of a variant's slice.
export function auraColor(variant, t) {
  const [from, to] = auraRanges[variant] ?? auraRanges.full
  return stopColor(from + (to - from) * t)
}
