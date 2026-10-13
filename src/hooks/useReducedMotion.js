import { useEffect, useState } from 'react'

const query = '(prefers-reduced-motion: reduce)'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => Boolean(window.matchMedia?.(query).matches))

  useEffect(() => {
    const media = window.matchMedia?.(query)
    if (!media) return undefined
    const update = () => setReduced(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reduced
}
