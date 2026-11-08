// Hosted by Google Apps Script. No API keys or public spreadsheet sharing.
// Change the destination in Project Settings > Script properties, without redeploying.
const DEFAULT_SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1dx7jt2iW3VNFUJOSgTxfXG0gvGaT8l8cEYNmb5DDwt8/edit';
const DEFAULT_SHEET_NAME = 'Signups';
const ALLOWED_ORIGINS = [
  'https://nuartfilmsociety.com',
  'https://www.nuartfilmsociety.com',
  'http://127.0.0.1:5173',
  'http://localhost:5173',
];

// Run once from the editor to initialize settings and column headers.
function setupSignupSheet() {
  const settings = PropertiesService.getScriptProperties();
  if (!settings.getProperty('SPREADSHEET_URL')) settings.setProperty('SPREADSHEET_URL', DEFAULT_SPREADSHEET_URL);
  if (!settings.getProperty('SHEET_NAME')) settings.setProperty('SHEET_NAME', DEFAULT_SHEET_NAME);
  getSignupSheet_();
}

function getSignupSheet_() {
  const settings = PropertiesService.getScriptProperties();
  const spreadsheet = SpreadsheetApp.openByUrl(settings.getProperty('SPREADSHEET_URL') || DEFAULT_SPREADSHEET_URL);
  const name = settings.getProperty('SHEET_NAME') || DEFAULT_SHEET_NAME;
  const sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
  const headers = ['Signed up at', 'Email address', 'Source'];
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#282828').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(2, 300);
    sheet.setColumnWidth(3, 160);
  } else if (sheet.getRange(1, 1, 1, 3).getDisplayValues()[0].join('|') !== headers.join('|')) {
    throw new Error('Destination tab must have the signup column headers.');
  }
  return sheet;
}

function doGet() {
  return ContentService.createTextOutput('Nuart email signup endpoint. Submit using the website form.');
}

function doPost(e) {
  const input = (e && e.parameter) || {};
  const origin = String(input.origin || '');
  const requestId = String(input.requestId || '');
  if (ALLOWED_ORIGINS.indexOf(origin) === -1 || !/^[a-zA-Z0-9-]{20,80}$/.test(requestId)) {
    return ContentService.createTextOutput('Invalid signup request.');
  }
  const email = String(input.email || '').trim().toLowerCase();
  if (input.website || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return signupResponse_(origin, requestId, false, 'Please enter a valid email address.');
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const sheet = getSignupSheet_();
    const count = sheet.getLastRow();
    const duplicate = count > 1 && sheet.getRange(2, 2, count - 1, 1)
      .getDisplayValues().some(row => String(row[0]).trim().toLowerCase() === email);
    if (!duplicate) {
      // A leading apostrophe stores even formula-like email local parts as text.
      sheet.getRange(count + 1, 1, 1, 3).setValues([[new Date(), "'" + email, 'Website signup']]);
      sheet.getRange(count + 1, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
      SpreadsheetApp.flush();
    }
    return signupResponse_(origin, requestId, true, 'Email saved. Thank you!');
  } catch (error) {
    console.error('Signup save failed: ' + error.message);
    return signupResponse_(origin, requestId, false, 'Could not save your email. Please try again.');
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function signupResponse_(origin, requestId, ok, message) {
  const payload = JSON.stringify({type: 'nuart-signup', requestId: requestId, ok: ok, message: message})
    .replace(/</g, '\\u003c');
  // A POST into a hidden iframe avoids cross-origin fetch restrictions. Only a
  // server-confirmed save sends success; loading the iframe alone never does.
  const html = '<!doctype html><html><body><script>window.top.postMessage(' + payload + ',' + JSON.stringify(origin) + ');</script></body></html>';
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
