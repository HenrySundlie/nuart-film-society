import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

const source = readFileSync(new URL('./Code.gs', import.meta.url), 'utf8');

function collector() {
  const properties = new Map();
  const documents = new Map();
  let failWrite = false;
  const createSheet = () => {
    const rows = [];
    const sheet = {
      rows,
      getLastRow: () => rows.length,
      getRange: (r, c, h = 1, w = 1) => {
        const range = {
          setValues(values) {
            if (failWrite) throw new Error('Storage unavailable');
            values.forEach((row, i) => {
              rows[r - 1 + i] ||= [];
              row.forEach((v, j) => { rows[r - 1 + i][c - 1 + j] = v; });
            });
            return range;
          },
          getDisplayValues: () => Array.from({ length: h }, (_, i) =>
            Array.from({ length: w }, (_, j) => String(rows[r - 1 + i]?.[c - 1 + j] ?? '').replace(/^'/, ''))),
          setFontWeight: () => range,
          setBackground: () => range,
          setFontColor: () => range,
          setNumberFormat: () => range,
        };
        return range;
      },
      setFrozenRows() {},
      setColumnWidth() {},
    };
    return sheet;
  };
  const context = vm.createContext({
    console: { error() {} },
    PropertiesService: { getScriptProperties: () => ({
      getProperty: key => properties.get(key),
      setProperty: (key, value) => properties.set(key, value),
    }) },
    SpreadsheetApp: {
      openByUrl: url => {
        if (!documents.has(url)) documents.set(url, new Map());
        const tabs = documents.get(url);
        return {
          getSheetByName: name => tabs.get(name),
          insertSheet: name => { const sheet = createSheet(); tabs.set(name, sheet); return sheet; },
        };
      },
      flush() {},
    },
    LockService: { getScriptLock: () => ({ waitLock() {}, hasLock: () => true, releaseLock() {} }) },
    ContentService: { createTextOutput: text => ({ text }) },
    HtmlService: {
      XFrameOptionsMode: { ALLOWALL: 'ALLOWALL' },
      createHtmlOutput: html => ({ html, setXFrameOptionsMode() { return this; } }),
    },
  });
  vm.runInContext(source, context);
  return { context, properties, documents, failWrites: () => { failWrite = true; } };
}

function post(app, fields = {}) {
  return app.context.doPost({ parameter: {
    origin: 'https://nuartfilmsociety.com', requestId: '8a179bb6-fd96-4370-b9ca-5bd32b0557ac',
    email: 'person@example.com', website: '', ...fields,
  } });
}

function result(response) {
  return JSON.parse(response.html.match(/postMessage\((\{.*?\}),/)[1]);
}

test('rejects bad requests without touching the spreadsheet', () => {
  const app = collector();
  assert.ok(post(app, { origin: 'https://other.example' }).text);
  assert.ok(post(app, { requestId: '</script>' }).text);
  assert.equal(result(post(app, { email: 'not-an-email' })).ok, false);
  assert.equal(result(post(app, { website: 'bot-filled-field' })).ok, false);
  assert.equal(app.documents.size, 0);
});

test('saves a normalized address once and acknowledges without exposing addresses', () => {
  const app = collector();
  assert.equal(result(post(app, { email: ' Person@Example.com ' })).ok, true);
  assert.equal(result(post(app)).ok, true);
  const rows = [...app.documents.values()][0].get('Signups').rows;
  assert.equal(rows.length, 2);
  assert.equal(rows[1][1], "'person@example.com");
  assert.doesNotMatch(post(app).html, /person@example\.com/);
});

test('destination settings take effect on the next request without redeployment', () => {
  const app = collector();
  app.context.setupSignupSheet();
  const newUrl = 'https://docs.google.com/spreadsheets/d/another-spreadsheet/edit';
  app.properties.set('SPREADSHEET_URL', newUrl);
  app.properties.set('SHEET_NAME', 'New signups');
  assert.equal(result(post(app)).ok, true);
  assert.equal(app.documents.get(newUrl).get('New signups').rows.length, 2);
  assert.equal(app.documents.size, 2);
});

test('storage failures do not report success and formula-like emails stay text', () => {
  const app = collector();
  assert.equal(result(post(app, { email: '=formula@example.com' })).ok, true);
  assert.equal([...app.documents.values()][0].get('Signups').rows[1][1], "'=formula@example.com");
  app.failWrites();
  assert.equal(result(post(app, { email: 'second@example.com' })).ok, false);
});
