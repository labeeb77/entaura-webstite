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

const tickLabel = value => (value === 0 ? 'SAR 0' : value >= 1e6 ? `SAR ${value / 1e6}M` : `SAR ${value / 1e3}K`)

function InsightChart({ chart }) {
  const [view, setView] = useState('Bar')
  const [showSql, setShowSql] = useState(false)
  const [copied, setCopied] = useState(false)
  const ticks = axisTicks(Math.max(...chart.rows.flatMap(row => row.values)))
  const top = ticks[ticks.length - 1]
  const percent = value => `${(value / top) * 100}%`

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
                {ticks.map(tick => <i key={tick} className="ic-grid" style={{ left: percent(tick) }}></i>)}
                {row.values.map((value, series) => (
                  <b key={series} className={`s${series}`} style={{ width: percent(value), animationDelay: `${index * 60}ms` }} title={formatSar(value)}></b>
                ))}
              </div>
            </div>
          ))}
          <div className="ic-row ic-axis">
            <span></span>
            <div className="ic-track">
              {ticks.map(tick => <small key={tick} style={{ left: percent(tick) }}>{tickLabel(tick)}</small>)}
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
                const change = (row.values[0] / row.values[1] - 1) * 100
                return (
                  <tr key={row.label} className={index === 0 ? 'top' : ''}>
                    <td>{row.label}</td>
                    {row.values.map((value, series) => <td key={series}>{formatSar(value)}</td>)}
                    <td className={change >= 0 ? 'up' : 'down'}>{change >= 0 ? '+' : ''}{change.toFixed(1)}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="ic-foot">
        <button className="ic-how" onClick={() => setShowSql(open => !open)} aria-expanded={showSql}>
          <span aria-hidden="true">{'<>'}</span> How this was computed <em>{chart.meta}</em>
        </button>
        <button className="ic-copy" onClick={copy} aria-label="Copy SQL">{copied ? 'Copied' : 'Copy SQL'}</button>
      </div>
      {showSql && <pre className="ic-sql">{chart.sql}</pre>}
    </div>
  )
}

export default InsightChart
