# Website email signups

The website keeps its existing email-box design. Visitors enter an email address and press Enter (or Go on a phone keyboard). There is no visible submit button or provider branding. The field shows `Email saved. Thank you!` only after the Google-hosted script confirms the write.

Empty submissions are ignored. Invalid email formats and save failures use muted inline text matching the website, without browser validation popups. During a request, an animated `Processing…` label replaces the visible email inside the same box; the actual submitted address is preserved. The animation respects reduced-motion preferences.

## Your list and settings

- Spreadsheet: https://docs.google.com/spreadsheets/d/1dx7jt2iW3VNFUJOSgTxfXG0gvGaT8l8cEYNmb5DDwt8/edit
- Destination tab: **Signups**
- Script project: https://script.google.com/u/0/home/projects/1EluXMwfCY-ljpztooVQplzFs2Jk-3cK5xQxo8MDit9K6-nCpasMM9vU9/edit
- Owner: **nuartfilmclub@gmail.com**

The spreadsheet is private. The public web app accepts signups and returns only a success/error acknowledgment. It does not provide an endpoint for reading the list. This collects addresses; it does not send newsletters or verify email ownership.

## Change the spreadsheet link or tab

1. Open the script project linked above. Click **Project Settings** (the gear on the left).
2. Scroll to **Script properties** and click **Edit script properties**.
3. Set **SPREADSHEET_URL** to the full Google Sheets link, such as `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`.
4. Set **SHEET_NAME** to the exact tab name at the bottom of the destination spreadsheet, such as `Signups` or `Film subscribers`. This is the tab's name, not the document title or the numeric `gid` in the URL.
5. Click **Save script properties**. The very next signup uses the new destination. **No website changes or redeployment are needed.**

The script owner must have edit access to the destination spreadsheet. Keep the sheet private; do not publish it or give public edit access. If the named tab does not exist, the collector creates it with its headers. An existing destination tab must use these exact first-row headers in columns A–C: **Signed up at**, **Email address**, **Source**. Use a new empty tab if another tab already contains unrelated data.

Changing settings does not move old records; copy them manually if you want a combined list. If you rename the Signups tab, also update SHEET_NAME. Otherwise the collector will create a fresh tab under the old name. Do not delete the property entries: missing properties fall back to the original defaults in Code.gs.

## View, edit, and export

- View and edit addresses directly in the spreadsheet's **Signups** tab. Keep the first row and column order intact.
- Delete a person's row to remove them from the stored list.
- Export: select the signup tab, then **File → Download → Comma-separated values (.csv)**. CSV downloads the currently selected tab.
- The script trims and lowercases emails and avoids duplicate addresses in the destination tab. Signups have a Google-generated timestamp. Email values are stored as literal text to prevent spreadsheet formulas from user input.

## Deployment and source

`Code.gs` is the Google-hosted collector source. The live deployment executes as the owner and allows **Anyone**, so visitors do not need Google accounts. The website sends a normal POST into a hidden iframe; the script acknowledges a completed save with a message tied to that request's random ID. Iframe loading alone never signals success. After 45 seconds without acknowledgment, the field reports that it could not confirm the save; retrying is safe because addresses are deduplicated.

The public web-app URL is stored in `client/src/config/emailSignup.ts`. Do not put Google passwords, API keys, or OAuth tokens in website code. Changing only the spreadsheet/tab properties needs no deployment. If you change the collector's code, update it in the Apps Script editor, save, then **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**. Updating the same deployment preserves its URL.

If you create a different web-app deployment, replace `emailSignupUrl` in `client/src/config/emailSignup.ts` with its `/exec` URL and deploy the website normally. The script's allowed origins currently include `https://nuartfilmsociety.com`, `https://www.nuartfilmsociety.com`, and local development on port 5173. Add a new website origin in Code.gs and update the deployment if the website domain or local port changes.

The website's GitHub Pages deployment still runs from `master`; editing the feature branch does not publish it. Google Apps Script and Sheets use the account's free quotas. No paid service or server process is required. The honeypot and duplicate checks reduce simple spam; they are not email ownership verification or a CAPTCHA service.

## Checks

From the repository root:

```sh
node --test google-apps-script/signup.test.mjs
npm run -w client build
```

For a real test, enter an email you control in the local homepage field and press Enter. Wait for the saved message, then verify the row in Signups. Submit it again to confirm there is still only one row for that address.
