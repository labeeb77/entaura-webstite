import { useEffect, useState } from 'react'

const views = ['Bar', 'Column', 'Table']

const formatSar = value => (value >= 1e6 ? `SAR ${(value / 1e6).toFixed(2)}M` : `SAR ${Math.round(value / 1e3)}K`)

// Round axis ticks: about four steps of 1, 2, 2.5, or 5 times a power of ten.
function axisTicks(max) {
  const rough = max / 4
  const magnitude = 10 ** Math.floor(Math.log10(rough))
  const step = [1, 2, 2.5, 5, 10].find(multiple => multiple * magnitude >= rough) * magnitude
  const top = Math.ceil(max / step) * step
  return Array.from({ length: Math.round(top / step) + 1 }, (_, index) => index * step)
}

const shortSar = value => (value >= 1e6 ? `${(value / 1e6).toFixed(2)}M` : `${Math.round(value / 1e3)}K`)

const change = row => (row.values[0] / row.values[1] - 1) * 100
const changeLabel = value => `${value >= 0 ? '+' : '−'}${Math.abs(value).toFixed(1)}%`

// Light SQL colouring: keywords and quoted strings, everything else as is.
const sqlKeywords = /\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|SUM|AND|BETWEEN|AS|DESC|DATE_TRUNC)\b/
const sqlToken = /('[^']*'|\b(?:SELECT|FROM|WHERE|GROUP BY|ORDER BY|SUM|AND|BETWEEN|AS|DESC|DATE_TRUNC)\b)/g

// The query, coloured, showing only its first `count` characters while it types.
function Sql({ code, count }) {
  let used = 0
  return code.split(sqlToken).map((part, index) => {
    const visible = part.slice(0, Math.max(0, count - used))
    used += part.length
    if (!visible) return null
    if (part.startsWith("'")) return <span key={index} className="ic-s">{visible}</span>
    if (sqlKeywords.test(part)) return <span key={index} className="ic-k">{visible}</span>
    return visible
  })
}

// Counts a number up from zero once, unless motion is reduced.
function useCountUp(target, run, delay = 0) {
  const [value, setValue] = useState(run ? 0 : target)
  useEffect(() => {
    if (!run) return undefined
    let frame
    let start
    const tick = now => {
      start ??= now + delay
      const t = Math.min(1, Math.max(0, (now - start) / 700))
      setValue(target * (1 - (1 - t) ** 3))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, run, delay])
  return value
}

// Reveals text a few characters at a time after a delay, unless motion is reduced.
function useTyped(text, run, delay) {
  const [count, setCount] = useState(run ? 0 : text.length)
  useEffect(() => {
    if (!run) return undefined
    let shown = 0
    let interval
    const start = setTimeout(() => {
      interval = setInterval(() => {
        shown = Math.min(text.length, shown + 3)
        setCount(shown)
        if (shown >= text.length) clearInterval(interval)
      }, 18)
    }, delay)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, run, delay])
  return count
}

function Kpi({ kpi, run, index }) {
  const counted = useCountUp(kpi.value ?? 0, run && kpi.value !== undefined, index * 120)
  return (
    <div className="ic-kpi" style={{ '--d': `${index * 120}ms` }}>
      <small>{kpi.label}</small>
      <strong>{kpi.text ?? formatSar(counted)}</strong>
      {kpi.delta !== undefined && <em className={kpi.delta >= 0 ? 'up' : 'down'}>{changeLabel(kpi.delta)}</em>}
    </div>
  )
}

const tickLabel = value => (value === 0 ? 'SAR 0' : value >= 1e6 ? `SAR ${value / 1e6}M` : `SAR ${value / 1e3}K`)

// The source, query and result, then the SQL typing in. Mounted when the
// section opens, so the animation plays each time it is opened.
function Proof({ chart, animate }) {
  const typed = useTyped(chart.sql, animate, 250)
  const trail = [
    { label: 'Source', title: `${chart.source.system} · ${chart.source.table}`, note: `${chart.source.rows} · read-only` },
    { label: 'Query', title: chart.meta, note: chart.source.period },
    { label: 'Result', title: chart.result, note: 'Numbers calculated by code' },
  ]
  return (
    <div className="ic-proof-body">
      <ol className="ic-trail">
        {trail.map((item, index) => (
          <li key={item.label} style={{ '--d': `${index * 250}ms` }}>
            <strong><small>{item.label}</small>{item.title}</strong>
            <span>{item.note}</span>
          </li>
        ))}
      </ol>
      <pre className="ic-sql" aria-label={chart.sql}>
        <Sql code={chart.sql} count={typed} />
        <i className={`ic-caret${typed >= chart.sql.length ? ' done' : ''}`} aria-hidden="true"></i>
      </pre>
    </div>
  )
}

// `proof` opens "How this was computed"; `tapping` shows the demo's pointer on it.
function InsightChart({ chart, reduced, proof, onProof, tapping }) {
  const [view, setView] = useState(chart.view ?? 'Bar')
  const [copied, setCopied] = useState(false)
  const animate = !reduced
  const ticks = axisTicks(Math.max(...chart.rows.flatMap(row => row.values)))
  const top = ticks[ticks.length - 1]
  const percent = value => `${(value / top) * 100}%`
  // Bar view: the track keeps room on the right (--ic-pad) for value labels.
  const along = value => `calc(${value / top} * (100% - var(--ic-pad)))`

  const copy = () => {
    navigator.clipboard?.writeText(chart.sql).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="ic">
      <div className="ic-kpis">
        {chart.kpis.map((kpi, index) => <Kpi key={kpi.label} kpi={kpi} run={animate} index={index} />)}
      </div>
      <div className="ic-head">
        <div className="ic-legend">
          {view !== 'Table' && chart.series.map((name, index) => <span key={name} className={`s${index}`}><i></i>{name}</span>)}
          <span className="ic-callout">{chart.callout}</span>
        </div>
        <div className="ic-views" role="tablist" aria-label="Chart view">
          {views.map(name => (
            <button key={name} role="tab" aria-selected={view === name} className={view === name ? 'on' : ''} onClick={() => setView(name)}>{name}</button>
          ))}
        </div>
      </div>


      {view === 'Bar' && (
        <div className="ic-bar" key="bar">
          {chart.rows.map((row, index) => (
            <div className={`ic-row${index === 0 ? ' top' : ''}`} key={row.label}>
              <span className="ic-label">{row.label}</span>
              <div className="ic-track">
                {ticks.map(tick => <i key={tick} className="ic-grid" style={{ left: along(tick) }}></i>)}
                {row.values.map((value, series) => (
                  <b key={series} className={`s${series}`} style={{ width: percent(value), animationDelay: `${300 + index * 90}ms` }} title={formatSar(value)}></b>
                ))}
                <em className="ic-val" style={{ left: along(row.values[0]) }}>
                  {shortSar(row.values[0])}
                  <i className={change(row) >= 0 ? 'up' : 'down'}>{changeLabel(change(row))}</i>
                </em>
                <span className="ic-tip" role="presentation">
                  <b>{row.label}</b>
                  {chart.series.map((name, series) => <span key={name}><i className={`s${series}`}></i>{name}<strong>{formatSar(row.values[series])}</strong></span>)}
                </span>
              </div>
            </div>
          ))}
          <div className="ic-row ic-axis">
            <span></span>
            <div className="ic-track">
              {ticks.map(tick => <small key={tick} style={{ left: along(tick) }}>{tickLabel(tick)}</small>)}
            </div>
          </div>
        </div>
      )}

      {view === 'Column' && (
        <div className="ic-col" key="col">
          <div className="ic-yaxis">
            {[...ticks].reverse().map(tick => <small key={tick}>{tickLabel(tick)}</small>)}
          </div>
          <div className="ic-plot">
            {ticks.map(tick => <i key={tick} className="ic-hgrid" style={{ bottom: percent(tick) }}></i>)}
            {chart.rows.map((row, index) => (
              <div className={`ic-group${index === 0 ? ' top' : ''}`} key={row.label}>
                <div className="ic-bars">
                  {row.values.map((value, series) => (
                    <b key={series} className={`s${series}`} style={{ height: percent(value), animationDelay: `${300 + index * 90}ms` }} title={formatSar(value)}></b>
                  ))}
                  <em className="ic-cval" style={{ bottom: `calc(${percent(row.values[0])} + 6px)` }}>{shortSar(row.values[0])}</em>
                </div>
                <span>{row.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'Table' && (
        <div className="ic-table">
          <table>
            <thead>
              <tr><th></th>{chart.series.map(name => <th key={name}>{name}</th>)}<th>Change</th></tr>
            </thead>
            <tbody>
              {chart.rows.map((row, index) => {
                const delta = change(row)
                return (
                  <tr key={row.label} className={index === 0 ? 'top' : ''}>
                    <td>{row.label}</td>
                    {row.values.map((value, series) => <td key={series}>{formatSar(value)}</td>)}
                    <td><span className={`ic-chip ${delta >= 0 ? 'up' : 'down'}`}>{changeLabel(delta)}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className={`ic-proof${proof ? ' open' : ''}`}>
        <div className="ic-proof-head">
          <button className={`ic-proof-toggle${tapping ? ' tapping' : ''}`} onClick={onProof} aria-expanded={Boolean(proof)}>
            <span>How this was computed</span>
            <em>{chart.meta}</em>
            <svg className="chev" viewBox="0 0 12 12" width="11" height="11" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {tapping && <i className="pd-pointer" aria-hidden="true"></i>}
          </button>
          {proof && <button className="ic-copy" onClick={copy} aria-label="Copy SQL">{copied ? 'Copied' : 'Copy SQL'}</button>}
        </div>
        {proof && <Proof chart={chart} animate={animate} />}
      </div>
    </div>
  )
}

export default InsightChart
