// Demo bookings use a Google Calendar appointment schedule: its "Website embed"
// link is shown on /demo.html, and Google handles the slots, the booking form,
// the calendar event and the confirmation emails (see booking/README.md).
// The link is public (it's the booking page itself), so the team's schedule is
// built in; VITE_GOOGLE_CALENDAR_BOOKING_URL can point at a different one.
const teamSchedule = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2M9LhZQDhe8nY65viqMASPGRpYJ7nSZfVvr-Dmg1zykT6a9U8bOW3kMqTIsoNrA64N9t4sJ4Ku?gv=true'
const url = (import.meta.env.VITE_GOOGLE_CALENDAR_BOOKING_URL || teamSchedule).trim()

// The embed needs gv=true; add it if the copied link doesn't have it.
export const calendarEmbedUrl = url && (/[?&]gv=true/.test(url) ? url : `${url}${url.includes('?') ? '&' : '?'}gv=true`)
