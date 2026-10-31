import { Fragment, useState } from 'react'
import { parseDoc, segmentLength } from './richText.js'

// Renders the answer, cut off after `limit` characters while it streams.
export function RichDoc({ text, limit = Infinity, sources, onCite }) {
  let left = limit
  const groups = []
  parseDoc(text).forEach((block, index) => {
    if (left <= 0) return
    const parts = block.segments.map((segment, part) => {
      if (left <= 0) return null
      const shown = segment.text.slice(0, left)
      left -= segmentLength(segment)
      if (segment.kind === 'cite') {
        const source = sources?.[segment.n - 1]
        return (
          <span key={part} className="pd-cite" title={source ? `${source.name} · ${source.section}` : undefined} onMouseEnter={() => onCite?.(segment.n)} onMouseLeave={() => onCite?.(null)}>
            {segment.n}
          </span>
        )
      }
      if (segment.kind === 'b') return <strong key={part}>{shown}</strong>
      if (segment.kind === 'mark') return <mark key={part}>{shown}</mark>
      return <Fragment key={part}>{shown}</Fragment>
    })
    const last = groups[groups.length - 1]
    if (block.type === 'li' && last?.type === 'ul') last.items.push(<li key={index}>{parts}</li>)
    else if (block.type === 'li') groups.push({ type: 'ul', key: index, items: [<li key={index}>{parts}</li>] })
    else groups.push({ type: block.type, key: index, parts })
  })

  return (
    <div className="pd-doc">
      {groups.map(group => {
        if (group.type === 'ul') return <ul key={group.key}>{group.items}</ul>
        if (group.type === 'h') return <h4 key={group.key}>{group.parts}</h4>
        return <p key={group.key}>{group.parts}</p>
      })}
    </div>
  )
}

const chevron = <svg className="chev" viewBox="0 0 12 12" width="11" height="11" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>

const panelIcons = {
  context: <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M10 9v4.5M10 6.5v.01" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  thinking: <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true"><path d="M10 2.5l1.6 4.4 4.4 1.6-4.4 1.6L10 14.5l-1.6-4.4L4 8.5l4.4-1.6zM15.5 13l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>,
  sources: <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true"><path d="M5 2.5h6.5L15 6v11.5H5z M11.5 2.5V6H15M7.5 10h5M7.5 13h5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>,
}

function Panel({ name, label, open, onToggle, index, className, children }) {
  return (
    <div className={`pd-panel${open ? ' open' : ''}${className ? ` ${className}` : ''}`} style={{ '--d': `${index * 140}ms` }}>
      <button onClick={() => onToggle(name)} aria-expanded={open}>
        {panelIcons[name]}<span>{label}</span>{chevron}
      </button>
      {open && <div className="pd-panel-body">{children}</div>}
    </div>
  )
}

// Ask: a document-style answer with citations, then the context, search,
// reasoning and sources behind it. Earlier turns show only a short excerpt.
function AskAnswer({ item, limit, stage, compact, reduced }) {
  // undefined follows the demo (thinking opens while the panels appear);
  // a click takes over with a panel name, or '' for all closed.
  const [picked, setPicked] = useState(undefined)
  const [cited, setCited] = useState(null)
  const showPanels = !compact && (stage === 'extras' || stage === 'proof' || stage === 'done')
  const open = picked ?? (stage === 'extras' && !reduced ? 'thinking' : '')
  const toggle = name => setPicked(open === name ? '' : name)

  return (
    <div className={`pd-ask${compact ? ' compact' : ''}`}>
      <RichDoc text={item.answer} limit={limit} sources={item.sources} onCite={setCited} />
      {showPanels && (
        <div className="pd-panels">
          <Panel name="context" label="Context used" open={open === 'context'} onToggle={toggle} index={0}>
            <ul className="pd-context">
              {item.context.map(entry => <li key={entry.doc}><small>{entry.doc}</small>“{entry.text}”</li>)}
            </ul>
          </Panel>
          <div className="pd-panel pd-search" style={{ '--d': '140ms' }}>
            <span><b>Fast search</b>{item.search.chunks} chunks · {item.search.rows} DB rows</span>
            <em>Search deeper</em>
          </div>
          <Panel name="thinking" label="Thinking summary" open={open === 'thinking'} onToggle={toggle} index={2}>
            <p>{item.thinking}</p>
          </Panel>
          <Panel name="sources" label={<>Sources <i>{item.sources.length}</i></>} open={open === 'sources'} onToggle={toggle} index={3} className={cited ? 'hint' : undefined}>
            <ol className="pd-sources">
              {item.sources.map((source, index) => (
                <li key={source.name} className={cited === index + 1 ? 'on' : ''}>
                  <i>{index + 1}</i><b>{source.name}</b><small>{source.section}</small>
                </li>
              ))}
            </ol>
          </Panel>
        </div>
      )}
    </div>
  )
}

export default AskAnswer
