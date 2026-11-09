// "Try Entaura" leads go to a Google Sheet through a Google Apps Script web app
// (see leads/README.md). Paste the deployed web app URL into teamLeadsScript,
// or set VITE_LEADS_SCRIPT_URL. Without one, the demo still starts; the details
// are just not saved.
const teamLeadsScript = ''
export const leadsScriptUrl = (import.meta.env.VITE_LEADS_SCRIPT_URL || teamLeadsScript).trim()

const storageKey = 'entaura-try-lead'

// A visitor who already filled in the form on this browser skips it next time.
export function savedLead() {
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) || 'null')
  } catch {
    return null
  }
}

export function rememberLead(lead) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify({ name: lead.name, at: Date.now() }))
  } catch {
    // Private mode or blocked storage: they will just see the form again.
  }
}

// Sends one lead row. Apps Script doesn't answer CORS preflights, so this is a
// "simple" text/plain request in no-cors mode: fire and forget, never blocking
// the demo. keepalive lets it finish even if the visitor leaves the page.
export function sendLead(lead) {
  if (!leadsScriptUrl) return Promise.resolve()
  const body = JSON.stringify({
    ...lead,
    page: window.location.href,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
  })
  return fetch(leadsScriptUrl, {
    method: 'POST',
    mode: 'no-cors',
    keepalive: true,
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body,
  }).catch(() => {})
}
