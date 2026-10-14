import { useEffect, useRef, useState } from 'react'

const maxHeight = 5 * 24 + 20

function Composer({ onSend, disabled }) {
  const [value, setValue] = useState('')
  const field = useRef(null)

  // Grow with the text, up to five lines.
  useEffect(() => {
    const element = field.current
    if (!element) return
    element.style.height = 'auto'
    element.style.height = `${Math.min(element.scrollHeight, maxHeight)}px`
  }, [value])

  const send = () => {
    const query = value.trim()
    if (!query || disabled) return
    onSend(query)
    setValue('')
  }

  return (
    <form className="tc-composer" onSubmit={event => { event.preventDefault(); send() }}>
      <textarea
        ref={field}
        rows={1}
        value={value}
        placeholder="Ask about pricing, policies, revenue, invoices…"
        aria-label="Ask EntAura a question"
        onChange={event => setValue(event.target.value)}
        onKeyDown={event => {
          if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault()
            send()
          }
        }}
      />
      <button type="submit" className="tc-send" disabled={disabled || !value.trim()} aria-label="Send">
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M10 15V5M5 10l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </form>
  )
}

export default Composer
