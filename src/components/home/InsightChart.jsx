import { useState } from 'react'

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

function Sql({ code }) {
  return code.split(sqlToken).map((part, index) => {
    if (part.startsWith("'")) return <span key={index} className="ic-s">{part}</span>
    if (sqlKeywords.test(part)) return <span key={index} className="ic-k">{part}</span>
    return part
  })
}

const dbIcon = <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><ellipse cx="10" cy="4.5" rx="6" ry="2.5" /><path d="M4 4.5v11c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-11M4 10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5" /></svg>

const tickLabel = value => (value === 0 ? 'SAR 0' : value >= 1e6 ? `SAR ${value / 1e6}M` : `SAR ${value / 1e3}K`)

function InsightChart({ chart }) {
  const [view, setView] = useState('Bar')
  const [copied, setCopied] = useState(false)
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
      <div className="ic-head">
        <div>
          <strong>{chart.title}</strong>
          <small>{chart.subtitle}</small>
        </div>
        <div className="ic-views" role="tablist" aria-label="Chart view">
          {views.map(name => (
            <button key={name} role="tab" aria-selected={view === name} className={view === name ? 'on' : ''} onClick={() => setView(name)}>{name}</button>
          ))}
        </div>
      </div>

      {view !== 'Table' && (
        <div className="ic-legend">
          {chart.series.map((name, index) => <span key={name} className={`s${index}`}><i></i>{name}</span>)}
        </div>
      )}

      {view === 'Bar' && (
        <div className="ic-bar" key="bar">
          {chart.rows.map((row, index) => (
            <div className={`ic-row${index === 0 ? ' top' : ''}`} key={row.label}>
              <span className="ic-label">{row.label}</span>
              <div className="ic-track">
                {ticks.map(tick => <i key={tick} className="ic-grid" style={{ left: along(tick) }}></i>)}
                {row.values.map((value, series) => (
                  <b key={series} className={`s${series}`} style={{ width: percent(value), animationDelay: `${index * 60}ms` }} title={formatSar(value)}></b>
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
                    <b key={series} className={`s${series}`} style={{ height: percent(value), animationDelay: `${index * 60}ms` }} title={formatSar(value)}></b>
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

      <div className="ic-proof">
        <div className="ic-proof-head">
          <span>How this was computed</span>
          <em>{chart.meta}</em>
          <button className="ic-copy" onClick={copy} aria-label="Copy SQL">{copied ? 'Copied' : 'Copy SQL'}</button>
        </div>
        <div className="ic-proof-body">
          <div className="ic-source">
            <small>Source</small>
            <strong>{dbIcon}{chart.source.system} · <code>{chart.source.table}</code></strong>
            <span>{chart.source.rows}</span>
            <span>{chart.source.period}</span>
            <span className="ro">Read-only</span>
          </div>
          <pre className="ic-sql" aria-label="SQL query"><Sql code={chart.sql} /></pre>
        </div>
      </div>
    </div>
  )
}

export default InsightChart
