// Demo bookings use a Google Calendar appointment schedule: its "Website embed"
// link is shown on /demo.html, and Google handles the slots, the booking form,
// the calendar event and the confirmation emails (see booking/README.md).
const url = (import.meta.env.VITE_GOOGLE_CALENDAR_BOOKING_URL || '').trim()

// The embed needs gv=true; add it if the copied link doesn't have it.
export const calendarEmbedUrl = url && (/[?&]gv=true/.test(url) ? url : `${url}${url.includes('?') ? '&' : '?'}gv=true`)
