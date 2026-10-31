/**
 * entaura.ai demo booking: a Google Apps Script web app behind /demo.html.
 *
 *   GET  ?action=slots&from=YYYY-MM-DD&days=7  -> free 30-minute slots
 *   POST {action: 'lead', ...}                 -> saves the visitor's details
 *   POST {action: 'book', start, ...}          -> books the demo with a Meet link
 *   POST {action: 'details', email, ...}       -> saves the optional answers
 *
 * Bound to the "entaura demo leads" Google Sheet. Needs the Google Calendar
 * advanced service (Services > Google Calendar API). See booking/README.md.
 */

const CONFIG = {
  // 'primary' is the calendar of the account that deploys this script.
  CALENDAR_ID: 'primary',
  SPREADSHEET_ID: '1jWyNpBzqMwNxjeczLcrqWtWkLkEtLDBIt7elbTHRKWI',
  TIME_ZONE: 'Asia/Kolkata',
  // ISO weekdays: 1 = Monday ... 7 = Sunday.
  WEEKDAYS: [1, 2, 3, 4, 5],
  START_HOUR: 10,
  END_HOUR: 18,
  SLOT_MINUTES: 30,
  // Free time kept around existing meetings.
  BUFFER_MINUTES: 10,
  MIN_NOTICE_HOURS: 2,
  MAX_DAYS_AHEAD: 28,
  // Teammates invited to every demo, e.g. ['sales@entaura.ai'].
  TEAM_GUESTS: [],
  EVENT_TITLE: 'entaura demo',
  SHEET_NAME: 'Leads',
}

const COLUMNS = ['Received', 'Email', 'First name', 'Last name', 'Company', 'Country', 'Phone', 'Updates consent', 'Status', 'Demo time', 'Meet link', 'Wants to see', 'Heard from', 'Visitor time zone']

// ---------- Web app entry points ----------

function doGet(e) {
  const params = (e && e.parameter) || {}
  if (params.action !== 'slots') return json({ ok: false, error: 'unknown action' })
  const days = Math.min(Math.max(Number(params.days) || 7, 1), 14)
  const from = /^\d{4}-\d{2}-\d{2}$/.test(params.from || '') ? params.from : today()
  return json({ ok: true, slots: freeSlots(from, days).map(date => date.toISOString()) })
}

function doPost(e) {
  let body
  try {
    body = JSON.parse(e.postData.contents)
  } catch (error) {
    return json({ ok: false, error: 'bad request' })
  }
  const email = clean(body.email, 120).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ ok: false, error: 'invalid email' })
  if (tooMany(email)) return json({ ok: false, error: 'too many requests' })

  if (body.action === 'lead') {
    const lock = LockService.getScriptLock()
    lock.waitLock(20000)
    try { saveLead(email, body, 'Details given') } finally { lock.releaseLock() }
    return json({ ok: true })
  }
  if (body.action === 'book') return json(book(email, body))
  if (body.action === 'details') {
    updateLead(email, { 'Wants to see': clean(body.goals, 2000), 'Heard from': clean(body.source, 80) })
    return json({ ok: true })
  }
  return json({ ok: false, error: 'unknown action' })
}

// ---------- Slots ----------

// Free slot start times for `days` days from `from` (a date in TIME_ZONE).
function freeSlots(from, days) {
  const tz = CONFIG.TIME_ZONE
  const first = Utilities.parseDate(`${from} 00:00`, tz, 'yyyy-MM-dd HH:mm')
  const last = new Date(first.getTime() + days * 864e5)
  const earliest = Date.now() + CONFIG.MIN_NOTICE_HOURS * 36e5
  const latest = Date.now() + CONFIG.MAX_DAYS_AHEAD * 864e5
  const busy = busyTimes(first, last)
  const pad = CONFIG.BUFFER_MINUTES * 6e4
  const length = CONFIG.SLOT_MINUTES * 6e4
  const slots = []

  for (let index = 0; index < days; index++) {
    const noon = new Date(first.getTime() + index * 864e5 + 12 * 36e5)
    const day = Utilities.formatDate(noon, tz, 'yyyy-MM-dd')
    if (CONFIG.WEEKDAYS.indexOf(Number(Utilities.formatDate(noon, tz, 'u'))) === -1) continue
    const open = Utilities.parseDate(`${day} ${CONFIG.START_HOUR}:00`, tz, 'yyyy-MM-dd H:mm').getTime()
    const close = Utilities.parseDate(`${day} ${CONFIG.END_HOUR}:00`, tz, 'yyyy-MM-dd H:mm').getTime()
    for (let start = open; start + length <= close; start += length) {
      if (start < earliest || start > latest) continue
      const end = start + length
      const clash = busy.some(block => start < block.end + pad && end > block.start - pad)
      if (!clash) slots.push(new Date(start))
    }
  }
  return slots
}

function busyTimes(from, to) {
  const result = Calendar.Freebusy.query({
    timeMin: from.toISOString(),
    timeMax: to.toISOString(),
    timeZone: CONFIG.TIME_ZONE,
    items: [{ id: CONFIG.CALENDAR_ID }],
  })
  const calendar = result.calendars && result.calendars[CONFIG.CALENDAR_ID]
  if (!calendar || calendar.errors || !Array.isArray(calendar.busy)) throw new Error('Calendar availability unavailable')
  return calendar.busy.map(block => ({ start: new Date(block.start).getTime(), end: new Date(block.end).getTime() }))
}

// ---------- Booking ----------

function book(email, body) {
  const start = new Date(body.start)
  if (isNaN(start.getTime())) return { ok: false, error: 'invalid time' }

  const lock = LockService.getScriptLock()
  lock.waitLock(20000)
  try {
    // Still free? The slot must be one this script would offer right now.
    const day = Utilities.formatDate(start, CONFIG.TIME_ZONE, 'yyyy-MM-dd')
    const offered = freeSlots(day, 1).some(slot => slot.getTime() === start.getTime())
    if (!offered) return { ok: false, error: 'taken' }

    const end = new Date(start.getTime() + CONFIG.SLOT_MINUTES * 6e4)
    const name = `${clean(body.firstName, 60)} ${clean(body.lastName, 60)}`.trim()
    const company = clean(body.company, 120)
    const phone = `${clean(body.dialCode, 6)} ${clean(body.phone, 20)}`.trim()
    const guests = [{ email }].concat(CONFIG.TEAM_GUESTS.map(guest => ({ email: guest })))

    const event = Calendar.Events.insert({
      summary: `${CONFIG.EVENT_TITLE} · ${company || name}`,
      description: [
        `Demo for ${name} (${email})`,
        `Company: ${company}`,
        `Phone: ${phone}`,
        `Country: ${clean(body.country, 4)}`,
        'Booked from entaura.ai/demo.html',
      ].join('\n'),
      start: { dateTime: start.toISOString(), timeZone: CONFIG.TIME_ZONE },
      end: { dateTime: end.toISOString(), timeZone: CONFIG.TIME_ZONE },
      attendees: guests,
      conferenceData: { createRequest: { requestId: Utilities.getUuid(), conferenceSolutionKey: { type: 'hangoutsMeet' } } },
      reminders: { useDefault: true },
    }, CONFIG.CALENDAR_ID, { conferenceDataVersion: 1, sendUpdates: 'all' })

    saveLead(email, body, 'Booked', {
      'Demo time': Utilities.formatDate(start, CONFIG.TIME_ZONE, 'yyyy-MM-dd HH:mm') + ' IST',
      'Meet link': event.hangoutLink || '',
      'Visitor time zone': clean(body.timeZone, 60),
    })
    return { ok: true, start: start.toISOString(), meet: event.hangoutLink || '' }
  } finally {
    lock.releaseLock()
  }
}

// ---------- Leads sheet ----------

function sheet() {
  const book = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
  const tab = book.getSheetByName(CONFIG.SHEET_NAME) || book.insertSheet(CONFIG.SHEET_NAME)
  if (tab.getLastRow() === 0) {
    tab.appendRow(COLUMNS)
    tab.setFrozenRows(1)
  }
  return tab
}

// The visitor's latest row, or 0 when there isn't one.
function rowOf(tab, email) {
  const last = tab.getLastRow()
  if (last < 2) return 0
  const emails = tab.getRange(2, 2, last - 1, 1).getValues()
  for (let index = emails.length - 1; index >= 0; index--) {
    if (String(emails[index][0]).toLowerCase() === email) return index + 2
  }
  return 0
}

function saveLead(email, body, status, extra) {
  const tab = sheet()
  const values = Object.assign({
    'Received': new Date(),
    'Email': email,
    'First name': clean(body.firstName, 60),
    'Last name': clean(body.lastName, 60),
    'Company': clean(body.company, 120),
    'Country': clean(body.country, 4),
    'Phone': `${clean(body.dialCode, 6)} ${clean(body.phone, 20)}`.trim(),
    'Updates consent': body.consent ? 'Yes' : 'No',
    'Status': status,
  }, extra || {})
  const row = rowOf(tab, email)
  if (row) {
    // A delayed details request must never reopen a completed booking.
    if (status !== 'Booked' && tab.getRange(row, COLUMNS.indexOf('Status') + 1).getValue() === 'Booked') {
      delete values.Status
      delete values.Received
    }
    writeRow(tab, row, values)
  } else {
    tab.appendRow(COLUMNS.map(column => (column in values ? safe(values[column]) : '')))
  }
}

function updateLead(email, values) {
  const tab = sheet()
  const row = rowOf(tab, email)
  if (row) writeRow(tab, row, values)
}

function writeRow(tab, row, values) {
  Object.keys(values).forEach(column => {
    const index = COLUMNS.indexOf(column)
    if (index !== -1 && values[column] !== '') tab.getRange(row, index + 1).setValue(safe(values[column]))
  })
}

// ---------- Helpers ----------

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON)
}

function today() {
  return Utilities.formatDate(new Date(), CONFIG.TIME_ZONE, 'yyyy-MM-dd')
}

// Trimmed, length-limited text.
function clean(value, max) {
  return String(value == null ? '' : value).trim().slice(0, max)
}

// Text a spreadsheet won't run as a formula; the leading ' isn't shown.
function safe(value) {
  return typeof value === 'string' && /^[=+\-@]/.test(value) ? `'${value}` : value
}

// At most 8 requests per email every 10 minutes.
function tooMany(email) {
  const cache = CacheService.getScriptCache()
  const key = `rate:${email}`
  const count = Number(cache.get(key) || 0) + 1
  cache.put(key, String(count), 600)
  return count > 8
}

// Run once from the editor to approve permissions and check the setup.
function testSetup() {
  sheet()
  const slots = freeSlots(today(), 7)
  Logger.log(`${slots.length} free slots this week. First: ${slots[0] || 'none'}`)
}
