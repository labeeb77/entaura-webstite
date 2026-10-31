// Demo booking goes to a Google Apps Script web app (booking/apps-script/Code.gs)
// that reads free time from Google Calendar, books the meeting with a Meet link
// and logs each lead in a Google Sheet. Without its URL, leads are emailed
// through Web3Forms so the team can arrange a time by hand.
const bookingUrl = import.meta.env.VITE_BOOKING_URL
const formKey = import.meta.env.VITE_WEB3FORMS_KEY

export const bookingEnabled = Boolean(bookingUrl)

// Apps Script can't answer a CORS preflight, so requests are sent as plain
// text, which the browser treats as a simple request.
async function post(body) {
  const response = await fetch(bookingUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body),
  })
  return response.json()
}

// Free slot start times (ISO) for `days` days from `from` (YYYY-MM-DD).
export async function fetchSlots(from, days) {
  const response = await fetch(`${bookingUrl}?action=slots&from=${from}&days=${days}`)
  const result = await response.json()
  if (!result.ok) throw new Error(result.error || 'slots')
  return result.slots
}

export const saveLead = lead => post({ action: 'lead', ...lead })
export const bookSlot = (lead, start) => post({ action: 'book', start, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, ...lead })
export const saveAnswers = (email, answers) => post({ action: 'details', email, ...answers })

// The fallback: the lead, and any note, emailed to the team.
export async function emailLead(lead, note) {
  if (!formKey) return false
  const data = new FormData()
  data.append('access_key', formKey)
  data.append('subject', `Demo request from ${lead.firstName} ${lead.lastName}, ${lead.company}`)
  data.append('from_name', 'entaura.ai website')
  data.append('name', `${lead.firstName} ${lead.lastName}`)
  data.append('email', lead.email)
  data.append('company', lead.company)
  data.append('phone', `${lead.dialCode} ${lead.phone}`)
  data.append('country', lead.country)
  data.append('message', note || 'Requested a demo. Please email them to find a time.')
  try {
    const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
    return (await response.json()).success
  } catch {
    return false
  }
}
