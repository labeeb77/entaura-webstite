import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flow, showcase } from '../../data/home.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import ProductMark from '../ProductMark.jsx'

const stepDuration = 2600

// Curve between two node rects: left-to-right when the target sits to the
// right (desktop columns), top-to-bottom when it sits below (stacked mobile).
function curve(a, b) {
  if (!a || !b) return null
  if (b.x >= a.x + a.w - 1) {
    const x1 = a.x + a.w
    const y1 = a.y + a.h / 2
    const x2 = b.x
    const y2 = b.y + b.h / 2
    const dx = (x2 - x1) / 2
    return `M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`
  }
  const x1 = a.x + a.w / 2
  const y1 = a.y + a.h
  const x2 = b.x + b.w / 2
  const y2 = b.y
  const dy = (y2 - y1) / 2
  return `M${x1} ${y1} C${x1} ${y1 + dy} ${x2} ${y2 - dy} ${x2} ${y2}`
}

// Measures the nodes and returns the connector paths, keyed by link id.
function useConnectorPaths(gridRef, nodes) {
  const [layout, setLayout] = useState({ width: 0, height: 0, paths: {} })

  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return undefined
    const measure = () => {
      const box = grid.getBoundingClientRect()
      const rect = key => {
        const node = nodes.current[key]?.getBoundingClientRect()
        return node && { x: node.left - box.left, y: node.top - box.top, w: node.width, h: node.height }
      }
      const paths = {}
      flow.sources.forEach((_, index) => { paths[`s${index}`] = curve(rect(`s${index}`), rect('core')) })
      flow.products.forEach(key => { paths[`p-${key}`] = curve(rect('core'), rect(`p-${key}`)) })
      flow.scenarios.forEach(item => { paths[`c-${item.product}`] = curve(rect(`p-${item.product}`), rect(`c${item.channel}`)) })
      setLayout({ width: box.width, height: box.height, paths })
    }
    measure()
    // Cards change height as their content changes, so watch each of them.
    const observer = new ResizeObserver(measure)
    observer.observe(grid)
    Object.values(nodes.current).forEach(element => element && observer.observe(element))
    return () => observer.disconnect()
  }, [gridRef, nodes])

  return layout
}

function PlatformFlow() {
  const reduced = useReducedMotion()
  const section = useRef(null)
  const grid = useRef(null)
  const nodes = useRef({})
  const node = key => element => { nodes.current[key] = element }
  const { width, height, paths } = useConnectorPaths(grid, nodes)

  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [inView, setInView] = useState(false)
  const [paused, setPaused] = useState(false)
  const playing = !reduced && inView && !paused

  useEffect(() => {
    const target = section.current
    if (!target || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!playing) return undefined
    const timer = setTimeout(() => {
      if (step < flow.steps.length - 1) {
        setStep(step + 1)
      } else {
        setStep(0)
        setScenarioIndex(index => (index + 1) % flow.scenarios.length)
      }
    }, stepDuration)
    return () => clearTimeout(timer)
  }, [playing, step, scenarioIndex])

  const scenario = flow.scenarios[scenarioIndex]
  // With reduced motion the whole path is shown at once.
  const shown = reduced ? flow.steps.length - 1 : step

  // Links in play for this scenario, with the step at which each one fires.
  const links = [
    ...scenario.sources.map(index => ({ id: `s${index}`, at: 0 })),
    { id: `p-${scenario.product}`, at: 2 },
    { id: `c-${scenario.product}`, at: 3 },
  ]
  const activeLinks = links.filter(link => link.at <= shown && paths[link.id])
  const restLinks = Object.entries(paths).filter(([, d]) => d)

  const stateOf = (active, at) => (active && shown >= at ? (shown === at ? 'is-active' : 'is-done') : 'is-dim')

  const choose = (nextScenario, nextStep) => {
    setScenarioIndex(nextScenario)
    setStep(nextStep)
  }

  return (
    <section className="h-section h-flow" id="platform" ref={section}>
      <div className="container">
        <div className="h-head reveal">
          <span className="eyebrow">How it works</span>
          <h2>From enterprise data <span className="muted">to business action.</span></h2>
          <p>entaura.ai blends unstructured policy documents with structured transactional data, then puts RAG and agentic AI to work on top of it.</p>
        </div>

        <div className="fl-shell reveal" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="fl-bar">
            <span className="fl-label">Follow a request</span>
            <div className="fl-pills" role="tablist" aria-label="Example request">
              {flow.scenarios.map((item, index) => (
                <button
                  key={item.product}
                  role="tab"
                  aria-selected={index === scenarioIndex}
                  className={`tone-${item.product}${index === scenarioIndex ? ' active' : ''}`}
                  onClick={() => choose(index, 0)}
                >
                  {showcase.find(product => product.key === item.product).name}
                </button>
              ))}
            </div>
          </div>

          <div className={`fl-grid tone-${scenario.product}`} ref={grid}>
            <svg className="fl-svg" width={width} height={height} viewBox={`0 0 ${width || 1} ${height || 1}`} aria-hidden="true">
              {restLinks.map(([id, d]) => <path key={id} className="fl-link" d={d} />)}
              {activeLinks.map(link => (
                <path
                  key={`${scenarioIndex}-${link.id}`}
                  className={`fl-link live${link.at === shown ? ' drawing' : ''}`}
                  d={paths[link.id]}
                  pathLength="1"
                />
              ))}
            </svg>
            {playing && activeLinks.filter(link => link.at === shown).map(link => (
              <i
                key={`${scenarioIndex}-${shown}-${link.id}`}
                className="fl-dot"
                style={{ offsetPath: `path('${paths[link.id]}')` }}
                aria-hidden="true"
              ></i>
            ))}

            <div className="fl-col">
              <span className="fl-label">Your sources</span>
              {flow.sources.map((item, index) => (
                <div key={item} ref={node(`s${index}`)} className={`fl-node ${stateOf(scenario.sources.includes(index), 0)}`}>{item}</div>
              ))}
            </div>

            <div className={`fl-col fl-core${shown === 1 ? ' is-active' : shown > 1 ? ' is-done' : ''}`} ref={node('core')}>
              <i className="orb" aria-hidden="true"></i>
              <strong>entaura.ai intelligence layer</strong>
              {flow.core.map((item, index) => (
                <span key={item} style={{ '--i': index }}>{item}</span>
              ))}
            </div>

            <div className="fl-col">
              <span className="fl-label">Products</span>
              {showcase.map(item => {
                const active = item.key === scenario.product
                return (
                  <div key={item.key} ref={node(`p-${item.key}`)} className={`fl-node fl-product tone-${item.key} ${stateOf(active, 2)}`}>
                    <span>
                      <ProductMark product={item.key} size="sm" />
                      <small>{active && shown >= 2 ? scenario.output : item.tag}</small>
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="fl-col">
              <span className="fl-label">Where teams act</span>
              {flow.channels.map((item, index) => {
                const active = index === scenario.channel
                return (
                  <div key={item.name} ref={node(`c${index}`)} className={`fl-node fl-channel ${stateOf(active, 3)}`}>
                    <img src={`/assets/integrations/${item.icon}`} alt="" />
                    <span>{item.name}</span>
                    {active && shown >= 3 && <em className="fl-toast">{scenario.message}</em>}
                  </div>
                )
              })}
            </div>
          </div>

          <ol className="fl-steps">
            {flow.steps.map((item, index) => (
              <li key={item.label} className={index === shown ? 'active' : index < shown ? 'done' : ''}>
                <button onClick={() => choose(scenarioIndex, index)}>
                  <i>{playing && index === shown && <b key={`${scenarioIndex}-${step}`} style={{ animationDuration: `${stepDuration}ms` }}></b>}</i>
                  <span>0{index + 1} · {item.label}</span>
                  <small>{item.caption}</small>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default PlatformFlow
