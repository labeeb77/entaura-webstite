// Inline markers: **bold**, ==highlight== and [n] citations.
const inlineToken = /(\*\*[^*]+\*\*|==[^=]+==|\[\d+\])/g

function parseLine(text) {
  return text.split(inlineToken).filter(Boolean).map(part => {
    if (part.startsWith('**')) return { kind: 'b', text: part.slice(2, -2) }
    if (part.startsWith('==')) return { kind: 'mark', text: part.slice(2, -2) }
    if (/^\[\d+\]$/.test(part)) return { kind: 'cite', n: Number(part.slice(1, -1)), text: '' }
    return { kind: 'text', text: part }
  })
}

// One block per line: "## " is a heading, "- " a bullet, anything else a paragraph.
export function parseDoc(text) {
  return text.split('\n').map(line => {
    if (line.startsWith('## ')) return { type: 'h', segments: parseLine(line.slice(3)) }
    if (line.startsWith('- ')) return { type: 'li', segments: parseLine(line.slice(2)) }
    return { type: 'p', segments: parseLine(line) }
  })
}

// A citation counts as one character, so it pops in as the stream reaches it.
export const segmentLength = segment => (segment.kind === 'cite' ? 1 : segment.text.length)

export const docLength = text => parseDoc(text).reduce((total, block) => total + block.segments.reduce((sum, segment) => sum + segmentLength(segment), 0), 0)
