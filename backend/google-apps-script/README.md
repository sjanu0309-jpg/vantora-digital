# Google Sheets + Apps Script — enquiry backend

Every enquiry from the website's **Contact** form is saved as a new row in a Google Sheet.

## Columns created automatically
Timestamp · Lead ID · Full Name · Business Name · Email · Phone · Country · Industry ·
Required Service · Monthly Budget · Website · Project Details · Contact Preference ·
Lead Source · Submission Status

## Setup (about 10 minutes)

1. **Create a Google Spreadsheet** (signed in as vantoradigital197@gmail.com), e.g. "VANTORA Website Leads".
   Copy its ID from the URL: `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`.
2. In the spreadsheet open **Extensions → Apps Script**.
3. Delete the sample code and **paste the whole of `Code.gs`** from this folder. Save.
4. **Configure the spreadsheet ID securely:** ⚙️ Project Settings → *Script properties* → Add:
   | Property | Value |
   |---|---|
   | `SPREADSHEET_ID` | the ID from step 1 (required) |
   | `NOTIFY_EMAIL` | vantoradigital197@gmail.com (optional — email alert per new lead) |
   | `ALLOWED_ORIGINS` | `https://vantoradigital.info,https://www.vantoradigital.info` (optional) |
   | `SHEET_NAME` | `Leads` (optional) |
5. Back in the editor, choose the function **`setup`** and click **Run**. Approve the permissions
   (Google shows "unverified app" for your own scripts — click *Advanced → Go to project*).
   A `Leads` tab with headers appears in the sheet.
6. Click **Deploy → New deployment → ⚙️ Web app**:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone** (required so website visitors can submit; they cannot see the sheet)
   - Click **Deploy** and **copy the Web app URL** (ends in `/exec`).
7. In the website project, create a file named `.env` (copy `.env.example`) and set:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
   ```
   Then rebuild: `npm run build`, and upload the new `dist/` folder.
8. **Test:** submit the form on the live site and confirm a new row appears in the sheet.
   (You can also run `testSubmission` in the Apps Script editor to add a test row.)

> Until `VITE_GOOGLE_SCRIPT_URL` is set, the form still validates, then offers to send the
> enquiry by **WhatsApp or email** with all details pre-filled — no enquiry is lost.

## Updating the script later
Edit the code, then **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**.
The URL stays the same.

## How it works / security notes
- **CORS:** Apps Script cannot answer browser "preflight" requests, so the website sends the JSON
  with `Content-Type: text/plain`. This is a "simple" request (no preflight). Google redirects the
  response to `script.googleusercontent.com`, which returns it with CORS headers the browser accepts.
- **No secrets in the website:** the Web App URL is public by design (like a form action). The
  spreadsheet ID and notification email live only in Script Properties on Google's servers.
- **Validation:** required fields, email and phone formats are checked again on the server.
- **Spam protection:** hidden honeypot field, minimum fill time, per-email limit (3/hour) and
  site-wide limit (30/minute). Bot submissions are silently discarded.
- **Formula-injection safe:** values starting with `= + - @` are stored as plain text.
- **Privacy:** lead data is never written to logs — only error messages are.
