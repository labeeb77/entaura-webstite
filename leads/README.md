# Try Entaura leads (Google Sheet)

Before the live demo on `/try.html` starts, visitors fill in a short form:
**name** and **phone** (required), **business** and **website** (optional).
Each submission becomes a row in a Google Sheet, through a small Google Apps
Script web app. There is no other backend.

Visitors are never blocked by this: the demo starts as soon as they press
**Start the demo**, and the row is sent in the background. A visitor who has
already filled in the form on that browser goes straight to the demo.

## 1. Create the sheet and the script (about 5 minutes)

1. Sign in to Google with the account that should own the leads, and create a
   new sheet at [sheets.new](https://sheets.new), e.g. **entaura leads**.
2. In the sheet: **Extensions → Apps Script**.
3. Delete the sample code, paste in everything from
   [`apps-script.gs`](./apps-script.gs), and click **Save**.
4. Click **Deploy → New deployment**.
   - **Select type** (gear icon): **Web app**
   - **Execute as:** *Me*
   - **Who has access:** *Anyone*
   - Click **Deploy**, then **Authorize access** and allow it (Google warns
     that the app is unverified: **Advanced → Go to … (unsafe)**; it is your
     own script).
5. Copy the **Web app URL**. It looks like
   `https://script.google.com/macros/s/AKfy…/exec`.

Open that URL in a browser: you should see
`{"ok":true,"service":"entaura try-entaura leads"}`.

The first lead creates a tab called **Try Entaura leads** with these columns:
Submitted at, Name, Phone, Business, Website, Question, Page, Referrer, Browser.

## 2. Connect the website

Put the URL in `src/data/leads.js` (`teamLeadsScript`), or set it as an
environment variable for the build:

```
VITE_LEADS_SCRIPT_URL=https://script.google.com/macros/s/AKfy…/exec
```

Without a URL the form still works and the demo still starts; the details are
just not saved anywhere.

## Updating the script later

After changing the code: **Deploy → Manage deployments → ✏️ Edit → Version:
New version → Deploy**. The URL stays the same.

## Optional: an email for every lead

In the Apps Script editor, add inside `doPost` after `sheet.appendRow(…)`:

```js
MailApp.sendEmail('reachus@entaura.ai', 'New Try Entaura lead: ' + name, name + '\n' + phone + '\n' + clean(data.business, 160))
```

Then deploy a new version (above) and authorize the extra permission.
