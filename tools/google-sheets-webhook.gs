const SHEET_NAME = 'Telechargements';
const HEADERS = [
  'Date',
  'Prenom',
  'Email',
  'Langue',
  'Telechargement',
  'Fichier',
  'Source',
  'Page',
  'User-Agent',
];

function doPost(e) {
  const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  const sheet = getSheet_();

  sheet.appendRow([
    data.createdAt || new Date().toISOString(),
    data.name || '',
    data.email || '',
    data.lang || '',
    data.freebie || '',
    data.download || '',
    data.source || '',
    data.page || '',
    data.userAgent || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  return sheet;
}
