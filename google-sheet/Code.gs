/**
 * 36RC – Join form entries ko Google Sheet me save karta hai.
 *
 * Setup: google-sheet/README.md dekho.
 * Website form har submit pe is script ke Web App URL pe POST karta hai.
 */

const SHEET_NAME = 'Members'
const HEADERS = ['Date & time', 'Name', 'WhatsApp', 'City', 'Gender', 'Bike brand', 'Model', 'Language', 'Source']

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}')

    // Halka spam filter: website ek chhupa "website" field bhejti hai jo insaan khaali chhodte hain
    if (data.website) return json({ ok: true })

    const sheet = getSheet()
    sheet.appendRow([
      new Date(),
      clean(data.name, 80),
      clean(data.phone, 20),
      clean(data.city, 60),
      clean(data.gender, 30),
      clean(data.brand, 40),
      clean(data.model, 60),
      clean(data.lang, 10),
      clean(data.source, 40),
    ])
    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  }
}

// Browser me URL kholke check kar sakte ho ki script chal rahi hai
function doGet() {
  return json({ ok: true, message: '36RC form endpoint is running' })
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#ff6600').setFontColor('#ffffff')
    sheet.setFrozenRows(1)
  }
  return sheet
}

// Sheet formula injection se bachao (=, +, -, @ se shuru hone wala text)
function clean(value, max) {
  let s = String(value == null ? '' : value).trim().slice(0, max)
  if (/^[=+\-@]/.test(s)) s = "'" + s
  return s
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
