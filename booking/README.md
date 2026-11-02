# Demo booking (Request a demo)

Every "Request a demo" button opens `/demo.html`. It shows a short intro and the
team's **Google Calendar appointment schedule**, embedded inline. Google handles
everything else, so there is no backend:

1. The visitor sees the free days and times (in their own time zone).
2. They pick a slot and fill in Google's booking form: name, email, phone and
   any extra questions.
3. Google creates the event, with a Meet link, in the calendar, and emails a
   confirmation to the visitor and to you.

## 1. Create the appointment schedule (about 5 minutes)

Sign in to [calendar.google.com](https://calendar.google.com/) as the account
that should take the demos (currently **dev@texolworld.com**).

1. Click **Create** (top left) → **Appointment schedule**.
2. Set it up:
   - **Title:** `entaura demo`
   - **Appointment duration:** 30 minutes
   - **General availability:** Mon–Fri, 10:00–18:00 (time zone *India
     Standard Time*). Change these as needed.
   - **Scheduling window:** e.g. *Available now* to *28 days in advance*
   - **Adjusted availability:** block holidays or specific dates
   - **Booked appointment settings:**
     - *Buffer time:* 10 minutes
     - *Maximum bookings per day:* optional
     - *Minimum notice:* 2 hours
   - **Location and conferencing:** *Google Meet video conferencing*
   - **Description:** e.g. "A 30-minute walkthrough of entaura Ask, Insight and
     Watch on your own questions."
3. **Booking form**, in the same panel:
   - First name, last name and email are always collected.
   - **Phone number:** tick it and set it to **Required**.
   - **Add item** → custom questions:
     - `Company name` (optional)
     - `Service required` (optional; e.g. "Ask, Insight, Watch or not sure")
     - `What would you like to discuss?` (optional)
   - Custom questions depend on your Google plan. If **Add item** isn't
     offered, keep phone as required and ask the rest on the call.
4. **Booking confirmations and reminders:** keep the confirmation email on,
   and add an email reminder (e.g. 1 hour before).
5. Click **Save**.

## 2. Get the embed link

1. Click the new schedule in the calendar (or in **Booking pages**), then
   **Share**.
2. Choose **Website embed** → **Inline booking page**, then **Copy**.
3. You get iframe code like this:
   ```html
   <iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ…?gv=true" style="border: 0" width="100%" height="600" frameborder="0"></iframe>
   ```
   You only need the address inside `src="…"`.

## 3. Connect the website

The site already uses the team's schedule (the address is in
`src/data/booking.js`), locally and in production, with no setup.

To use a **different** schedule, either replace the address in
`src/data/booking.js`, or set `VITE_GOOGLE_CALENDAR_BOOKING_URL`:
- **Local:** add it to `.env.local`, then restart `npm run dev`.
- **Production:** add it as a GitHub repository variable (**Settings → Secrets
  and variables → Actions → Variables**). The deploy workflow passes it to the
  build.

## 4. Manage bookings

- **Every booking is an event** in the Google Calendar. Open it to see the
  visitor's name, email, phone and answers, plus the Meet link.
- **Emails:** Google sends a confirmation to the visitor and to the calendar
  owner, and the reminders you set.
- **Cancel or reschedule:** open the event and use **Delete** or change the
  time; the visitor is told automatically. Visitors can also cancel from their
  confirmation email.
- **The public page:** click the schedule → **Open booking page** to see what
  visitors see.
- **Change hours or questions:** edit the schedule in Google Calendar. The
  website updates by itself, with no rebuild.
- **For the team:** add teammates as guests on the schedule, or create it on a
  calendar shared with them, so everyone sees the bookings.
