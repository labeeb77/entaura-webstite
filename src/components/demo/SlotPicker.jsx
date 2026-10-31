import { useEffect, useRef, useState } from 'react'
import { fetchSlots } from '../../data/booking.js'

// How many weeks ahead visitors can page.
const maxWeeks = 4

const dayKey = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

function startOfWeek(date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  start.setDate(start.getDate() - start.getDay())
  return start
}

const addDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)

const timeLabel = iso => new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

function zoneLabel() {
  try {
    return new Intl.DateTimeFormat([], { timeZoneName: 'long' }).formatToParts(new Date()).find(part => part.type === 'timeZoneName')?.value
  } catch {
    return ''
  }
}

const chevron = direction => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d={direction === 'left' ? 'M10 3.5L5.5 8l4.5 4.5' : 'M6 3.5L10.5 8 6 12.5'} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

// A week of days, then the free 30-minute slots of the chosen day, in the
// visitor's own time zone. `onPick` receives the slot's ISO start time.
function SlotPicker({ selected, onPick, notice, onError }) {
  const [week, setWeek] = useState(() => startOfWeek(new Date()))
  const [slots, setSlots] = useState(null)
  const [day, setDay] = useState(null)
  const [thisWeek] = useState(() => startOfWeek(new Date()))
  const skipped = useRef(false)
  const weekIndex = Math.round((week - thisWeek) / (7 * 864e5))

  // Fetched per week, and again after a notice (a slot was taken meanwhile).
  useEffect(() => {
    let current = true
    fetchSlots(dayKey(week), 7)
      .then(list => {
        if (!current) return
        // Late in the week nothing may be left: open on the next week instead.
        if (!list.length && !skipped.current && week.getTime() === thisWeek.getTime()) {
          skipped.current = true
          setWeek(addDays(week, 7))
          return
        }
        setSlots(list)
        const first = list[0] && dayKey(new Date(list[0]))
        setDay(previous => (previous && list.some(slot => dayKey(new Date(slot)) === previous) ? previous : first || null))
      })
      .catch(() => current && onError())
    return () => { current = false }
  }, [week, notice, onError, thisWeek])

  const days = Array.from({ length: 7 }, (_, index) => addDays(week, index))
  const byDay = {}
  for (const slot of slots ?? []) (byDay[dayKey(new Date(slot))] ??= []).push(slot)
  const times = (day && byDay[day]) || []
  const loading = slots === null

  const page = step => {
    setSlots(null)
    setWeek(addDays(week, step * 7))
  }

  return (
    <div className="dm-picker">
      <h2>What day is best for you?</h2>
      <div className="dm-week">
        <button type="button" className="dm-arrow" onClick={() => page(-1)} disabled={weekIndex <= 0} aria-label="Previous week">{chevron('left')}</button>
        <div className="dm-days" role="listbox" aria-label="Day">
          {days.map(date => {
            const key = dayKey(date)
            const open = Boolean(byDay[key])
            return (
              <button
                type="button"
                key={key}
                role="option"
                aria-selected={day === key}
                className={day === key ? 'on' : ''}
                disabled={!open}
                onClick={() => setDay(key)}
              >
                <small>{date.toLocaleDateString([], { weekday: 'short' })}</small>
                <b>{date.getDate()}</b>
                <small>{date.toLocaleDateString([], { month: 'short' })}</small>
              </button>
            )
          })}
        </div>
        <button type="button" className="dm-arrow" onClick={() => page(1)} disabled={weekIndex >= maxWeeks - 1} aria-label="Next week">{chevron('right')}</button>
      </div>

      <h2>What time works?</h2>
      <p className="dm-zone">30 minute Google Meet · {zoneLabel()}</p>
      {notice && <p className="dm-notice" role="alert">{notice}</p>}
      {loading ? (
        <div className="dm-times" aria-busy="true">{Array.from({ length: 6 }, (_, index) => <span key={index} className="dm-shimmer"></span>)}</div>
      ) : times.length ? (
        <div className="dm-times">
          {times.map(slot => (
            <button type="button" key={slot} className={selected === slot ? 'on' : ''} aria-pressed={selected === slot} onClick={() => onPick(slot)}>{timeLabel(slot)}</button>
          ))}
        </div>
      ) : (
        <p className="dm-empty">No free times this week. Try the next week.</p>
      )}
    </div>
  )
}

export default SlotPicker
