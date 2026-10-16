/**
 * Negative Mart – Google Sheets backend (Google Apps Script)
 * Paste this whole file into the Apps Script editor of a Google Sheet.
 * See SETUP.md for the step-by-step instructions.
 *
 * POST  (from the game)  -> adds one row: id | time | name | emoji | coins
 * GET   (from the game)  -> returns { scores: [ {id, name, emoji, coins}, ... ] }
 */
const SHEET_NAME = 'Scores';
const MAX_COINS = 300;      // safety limit (the game's maximum is 210)

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['id', 'time', 'name', 'emoji', 'coins']);
    sh.setFrozenRows(1);
  }
  return sh;
}

// stop spreadsheet formulas such as =HYPERLINK(...) being typed in as a name
function clean_(v, max) {
  let t = String(v == null ? '' : v).replace(/[\r\n]+/g, ' ').trim().slice(0, max);
  if (/^[=+\-@]/.test(t)) t = "'" + t;
  return t;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const d = JSON.parse(e.postData.contents);
    const name = clean_(d.name, 12);
    const coins = Number(d.coins);
    if (!name || !isFinite(coins) || coins < 0 || coins > MAX_COINS) return json_({ ok: false });
    lock.waitLock(10000);
    getSheet_().appendRow([Number(d.id) || Date.now(), new Date(), name, clean_(d.emoji, 4), coins]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false });
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

function doGet() {
  const rows = getSheet_().getDataRange().getValues().slice(1);   // skip the header row
  const scores = rows
    .filter(r => r[2] !== '' && r[4] !== '')
    .map(r => ({ id: Number(r[0]), name: String(r[2]), emoji: String(r[3]), coins: Number(r[4]) }));
  return json_({ scores: scores });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
