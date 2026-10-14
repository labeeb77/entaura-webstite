import { Fragment } from 'react'

// Inline markdown: **bold** and `code`. Everything else stays plain text, so
// answers are never injected as HTML.
function Inline({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) return <strong key={index}>{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) return <code key={index}>{part.slice(1, -1)}</code>
    return <Fragment key={index}>{part}</Fragment>
  })
}

const isTableRow = line => /^\s*\|.*\|\s*$/.test(line)
const isDivider = line => /^\s*\|?\s*:?-{2,}/.test(line)
const cells = line => line.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim())

// Block markdown: headings, bullet and numbered lists, tables, paragraphs.
function Markdown({ text }) {
  const lines = text.replace(/\r/g, '').split('\n')
  const blocks = []
  let index = 0
  while (index < lines.length) {
    const line = lines[index]
    if (!line.trim()) { index += 1; continue }
    if (isTableRow(line)) {
      const rows = []
      while (index < lines.length && isTableRow(lines[index])) {
        if (!isDivider(lines[index])) rows.push(cells(lines[index]))
        index += 1
      }
      blocks.push({ kind: 'table', rows })
      continue
    }
    const list = line.match(/^\s*([-*•]|\d+[.)])\s+/)
    if (list) {
      const ordered = /\d/.test(list[1])
      const items = []
      while (index < lines.length && /^\s*([-*•]|\d+[.)])\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*([-*•]|\d+[.)])\s+/, ''))
        index += 1
      }
      blocks.push({ kind: ordered ? 'ol' : 'ul', items })
      continue
    }
    const heading = line.match(/^#{1,6}\s+(.*)$/)
    if (heading) {
      blocks.push({ kind: 'h', text: heading[1] })
      index += 1
      continue
    }
    const paragraph = []
    while (index < lines.length && lines[index].trim() && !isTableRow(lines[index]) && !/^\s*([-*•]|\d+[.)])\s+/.test(lines[index]) && !/^#{1,6}\s/.test(lines[index])) {
      paragraph.push(lines[index])
      index += 1
    }
    blocks.push({ kind: 'p', text: paragraph.join(' ') })
  }

  return blocks.map((block, key) => {
    if (block.kind === 'h') return <h4 key={key}><Inline text={block.text} /></h4>
    if (block.kind === 'p') return <p key={key}><Inline text={block.text} /></p>
    if (block.kind === 'table') {
      const [head, ...body] = block.rows
      return (
        <div className="tc-table" key={key}>
          <table>
            <thead><tr>{head.map((cell, i) => <th key={i}><Inline text={cell} /></th>)}</tr></thead>
            <tbody>{body.map((row, r) => <tr key={r}>{row.map((cell, i) => <td key={i}><Inline text={cell} /></td>)}</tr>)}</tbody>
          </table>
        </div>
      )
    }
    const List = block.kind
    return <List key={key}>{block.items.map((item, i) => <li key={i}><Inline text={item} /></li>)}</List>
  })
}

function ChatMessage({ message, onFollowup, isLast }) {
  if (message.role === 'user') {
    return (
      <div className="tc-row user">
        <p className="tc-bubble">{message.text}</p>
      </div>
    )
  }

  const waiting = message.status === 'waiting' && !message.text
  return (
    <div className="tc-row bot">
      <img className="tc-avatar" src="/assets/entaura-mark.png" alt="" />
      <div className="tc-answer">
        {waiting ? (
          <div className="tc-thinking"><i></i><i></i><i></i><span>{message.progress || 'Searching records and policies'}</span></div>
        ) : message.status === 'error' ? (
          <p className="tc-error">{message.text}</p>
        ) : (
          <div className="tc-md"><Markdown text={message.text} />{message.status === 'streaming' && <i className="tc-caret"></i>}</div>
        )}
        {message.sources?.length > 0 && (
          <div className="tc-sources">
            <span>Sources</span>
            {message.sources.map(source => <em key={source}>{source}</em>)}
          </div>
        )}
        {isLast && message.followups?.length > 0 && (
          <div className="tc-followups">
            {message.followups.map(question => (
              <button key={question} onClick={() => onFollowup(question)}>{question} <span>↗</span></button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatMessage
