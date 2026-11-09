/**
 * entaura.ai "Try Entaura" leads → Google Sheet.
 *
 * Paste this into Extensions → Apps Script of the Google Sheet that should
 * collect the leads, then deploy it as a web app (see leads/README.md).
 * Every visitor who starts the live demo adds one row.
 */
const SHEET_NAME = 'Try Entaura leads'
const HEADERS = ['Submitted at', 'Name', 'Phone', 'Business', 'Website', 'Question', 'Page', 'Referrer', 'Browser']

function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}')
    // Bots fill the hidden field; ignore them quietly.
    if (data.botcheck) return json({ ok: true })
    const name = clean(data.name, 120)
    const phone = clean(data.phone, 40)
    if (!name || !phone) return json({ ok: false, error: 'Name and phone are required.' })

    const sheet = getSheet()
    sheet.appendRow([
      new Date(),
      name,
      // A leading apostrophe keeps "+91…" as text instead of a formula/number.
      "'" + phone,
      clean(data.business, 160),
      clean(data.website, 200),
      clean(data.question, 200),
      clean(data.page, 300),
      clean(data.referrer, 300),
      clean(data.userAgent, 300),
    ])
    return json({ ok: true })
  } catch (error) {
    return json({ ok: false, error: String(error) })
  } finally {
    lock.releaseLock()
  }
}

// Opening the web app URL in a browser shows this, which confirms it is live.
function doGet() {
  return json({ ok: true, service: 'entaura try-entaura leads' })
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = book.getSheetByName(SHEET_NAME)
  if (!sheet) sheet = book.insertSheet(SHEET_NAME)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }
  return sheet
}

// Trim, cap the length, and stop spreadsheet formula injection (=, +, -, @).
function clean(value, max) {
  const text = String(value == null ? '' : value).trim().slice(0, max)
  return /^[=+\-@]/.test(text) ? "'" + text : text
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON)
}
