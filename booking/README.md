# Demo booking (Request a demo)

`/demo.html` asks for a work email, then name, company and phone, then shows free
times from the team's Google Calendar. Booking a time creates a 30-minute Google
Meet event, emails the visitor an invite, and logs the lead in a Google Sheet.

The website is static, so the calendar work is done by a small **Google Apps
Script web app** (`apps-script/Code.gs`) that runs in the entaura Google account.
It is free and needs no server.

| What | Where |
|---|---|
| Free slots | Mon–Fri, 10:00–18:00 India time, 30 minutes, 2 hours' notice, up to 4 weeks ahead, 10 minutes kept free around other meetings |
| Visitor sees | Times in their own time zone |
| Leads | The **Leads** tab of the "entaura demo leads" sheet: one row per visitor, status *Details given* → *Booked* |
| Without the script | The details are emailed to the team through Web3Forms, and the visitor is told we'll email them a time |

## One-time setup (about 10 minutes)

Use the Google account whose calendar should take the demos (e.g. the sales
or founder account).

1. **Create the sheet.** In Google Drive, create a Google Sheet named
   `entaura demo leads`. Open **Extensions → Apps Script**.
2. **Add the code.** Replace the contents of `Code.gs` with
   [`apps-script/Code.gs`](apps-script/Code.gs). In `CONFIG` at the top, check:
   - `CALENDAR_ID`: `'primary'` uses this account's own calendar, or paste a
     shared calendar's ID (Calendar settings → Integrate calendar).
   - `TEAM_GUESTS`: teammates to invite to every demo, e.g. `['sales@entaura.ai']`.
   - Hours, days and slot length, if they should change.
3. **Turn on the Calendar API.** In the Apps Script editor, click **Services
   (+)** → **Google Calendar API** → **Add**. This is needed for Meet links.
4. **Approve permissions.** Choose `testSetup` in the function menu and click
   **Run**. Approve the Calendar and Sheets permissions. The log should show
   the number of free slots, and a **Leads** tab appears in the sheet.
5. **Deploy.** **Deploy → New deployment → ⚙ → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**

   Click **Deploy** and copy the **Web app URL** (ends in `/exec`).
6. **Connect the website.** Set the URL as `VITE_BOOKING_URL` where the site is
   built:
   - Locally: add `VITE_BOOKING_URL=https://script.google.com/macros/s/…/exec`
     to `.env.local`.
   - For the live site: add the same variable to the build that uploads to
     S3/CloudFront.

   Rebuild with `npm run build` and deploy.
7. **Test.** Open `/demo.html`, go through the steps with your own email and
   book a time. Check that the invite with a Meet link arrives, the event is
   in the calendar, and the row in the sheet says *Booked*.

## Changing it later

- Edit `CONFIG` in the Apps Script editor, then **Deploy → Manage deployments
  → ✎ → Version: New version → Deploy**. The URL stays the same, so the website
  doesn't need rebuilding.
- To stop bookings, archive the deployment. The site then falls back to
  emailing the details.

## Notes

- The script only reads free/busy times; visitors never see event titles.
- The same email can make at most 8 requests every 10 minutes.
- Values that start with `=`, `+`, `-` or `@` are stored as text, so they can't
  run as spreadsheet formulas.
