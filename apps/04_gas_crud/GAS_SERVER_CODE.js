/**
 * VCEP 표준 GAS CRUD 엔진 (v2 - Robust Version)
 * JSON 응답 지원 및 디버깅 강화
 */

function doGet(e) {
  const params = e.parameter;
  const action = params.action;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0]; 

  // 헤더 자동 생성
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'App', 'Title', 'Content', 'Question']);
    sheet.getRange(1, 1, 1, 5).setBackground('#E2E8F0').setFontWeight('bold');
  }

  // 1. 데이터 저장 (Insert)
  if (action === 'insert') {
    try {
      sheet.appendRow([
        params.timestamp || new Date().toISOString(),
        params.app || 'Unknown',
        params.title || '',
        params.content || '',
        params.question || ''
      ]);
      // JSON과 TEXT 응답 모두에 "Success"가 포함되도록 구성
      return ContentService.createTextOutput(JSON.stringify({status: "Success", message: "Data inserted"})).setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService.createTextOutput(JSON.stringify({status: "Error", message: err.message})).setMimeType(ContentService.MimeType.JSON);
    }
  }

  // 2. 데이터 조회 (Read)
  if (action === 'read') {
    try {
      const rows = sheet.getDataRange().getValues();
      const headers = rows.shift();
      const data = rows.map(row => {
        let obj = {};
        headers.forEach((h, i) => obj[h.toLowerCase()] = row[i]);
        return obj;
      }).reverse();

      return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService.createTextOutput(JSON.stringify([])).setMimeType(ContentService.MimeType.JSON);
    }
  }

  // 매칭되는 액션이 없을 때
  return ContentService.createTextOutput(JSON.stringify({status: "Invalid", message: "Action not found: " + action})).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  return doGet(e);
}
