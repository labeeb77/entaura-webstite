import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flow } from '../../data/home.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import ChannelIcon from '../ChannelIcon.jsx'
import IntegrationIcon from '../IntegrationIcons.jsx'
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
function useConnectorPaths(gridRef, nodes, scenario) {
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
      scenario.sources.forEach((_, index) => { paths[`s${index}`] = curve(rect(`s${index}`), rect('core')) })
      paths.result = curve(rect('core'), rect('result'))
      scenario.deliver.forEach((_, index) => { paths[`d${index}`] = curve(rect('result'), rect(`d${index}`)) })
      setLayout({ width: box.width, height: box.height, paths })
    }
    measure()
    // Cards change height as their content changes, so watch each of them.
    const observer = new ResizeObserver(measure)
    observer.observe(grid)
    Object.values(nodes.current).forEach(element => element && observer.observe(element))
    return () => observer.disconnect()
  }, [gridRef, nodes, scenario])

  return layout
}

function PlatformFlow() {
  const reduced = useReducedMotion()
  const section = useRef(null)
  const grid = useRef(null)
  const nodes = useRef({})
  const node = key => element => { nodes.current[key] = element }
  // Opens on Insight, like the hero demo; autoplay continues from there.
  const [scenarioIndex, setScenarioIndex] = useState(1)
  const scenario = flow.scenarios[scenarioIndex]
  const { width, height, paths } = useConnectorPaths(grid, nodes, scenario)

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

  // With reduced motion the whole path is shown at once.
  const shown = reduced ? flow.steps.length - 1 : step

  // Links in play for this scenario, with the step at which each one fires.
  const links = [
    ...scenario.sources.flatMap((source, index) => (source.active ? [{ id: `s${index}`, at: 0 }] : [])),
    { id: 'result', at: 2 },
    ...scenario.deliver.flatMap((target, index) => (target.active ? [{ id: `d${index}`, at: 3 }] : [])),
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
          <p>Pick a product and follow one request, from source to answer.</p>
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
                  {item.name}
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

            <div className="fl-col fl-swap" key={`s-${scenarioIndex}`}>
              <span className="fl-label">{scenario.sourcesLabel}</span>
              {scenario.sources.map((item, index) => (
                <div key={item.name} ref={node(`s${index}`)} className={`fl-node ${stateOf(item.active, 0)}`}>{item.name}</div>
              ))}
            </div>

            <div className={`fl-col fl-core${shown === 1 ? ' is-active' : shown > 1 ? ' is-done' : ''}`} ref={node('core')}>
              <i className="orb" aria-hidden="true"></i>
              <strong>How {scenario.name} works</strong>
              {scenario.core.map((item, index) => (
                <span key={`${scenarioIndex}-${item}`} style={{ '--i': index }}>{item}</span>
              ))}
            </div>

            <div className="fl-col fl-swap" key={`r-${scenarioIndex}`}>
              <span className="fl-label">The result</span>
              <div ref={node('result')} className={`fl-node fl-product fl-result tone-${scenario.product} ${stateOf(true, 2)}`}>
                <span>
                  <ProductMark product={scenario.product} size="sm" />
                  <b>{scenario.result.text}</b>
                  <small>{scenario.result.meta}</small>
                </span>
              </div>
            </div>

            <div className="fl-col fl-swap" key={`d-${scenarioIndex}`}>
              <span className="fl-label">Where it lands</span>
              {scenario.deliver.map((item, index) => (
                <div key={item.name} ref={node(`d${index}`)} className={`fl-node fl-channel ${stateOf(item.active, 3)}`}>
                  {item.channel && <ChannelIcon channel={item.channel} size={18} />}
                  {item.src && <img src={item.src} alt="" />}
                  {item.icon && <IntegrationIcon name={item.icon} />}
                  <span>{item.name}</span>
                  {item.active && shown >= 3 && <em className="fl-toast">{scenario.message}</em>}
                </div>
              ))}
            </div>
          </div>

          <ol className="fl-steps">
            {flow.steps.map((label, index) => (
              <li key={label} className={index === shown ? 'active' : index < shown ? 'done' : ''}>
                <button onClick={() => choose(scenarioIndex, index)}>
                  <i>{playing && index === shown && <b key={`${scenarioIndex}-${step}`} style={{ animationDuration: `${stepDuration}ms` }}></b>}</i>
                  <span>0{index + 1} · {label}</span>
                  <small>{scenario.captions[index]}</small>
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
