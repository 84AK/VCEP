/**
 * VCEP Pixel Master Pro - 통합 백엔드 (GAS) v2.1
 * 데이터를 압축된 단일 문자열(Single Value)로 시트 한 칸에 저장합니다.
 */

var SHEET_NAME = "PixelData";
var HEADERS = ["저장 일시", "그림 데이터"];

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  
  // 첫 방문 시 헤더 생성 및 스타일링
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground("#4F46E5") // 인디고 배경
               .setFontColor("#FFFFFF") // 흰색 글자
               .setFontWeight("bold")   // 굵게
               .setHorizontalAlignment("center");
    sheet.setFrozenRows(1); // 첫 행 고정
  }
  
  if (data.action === 'save') {
    // 새로운 행에 [일시, 데이터] 추가
    sheet.appendRow([new Date(), JSON.stringify(data.payload)]);
    return ContentService.createTextOutput("저장 성공!")
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  var action = e.parameter.action;
  
  if (action === 'test') {
    return ContentService.createTextOutput(JSON.stringify({status: "ok"}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'list') {
    var rows = sheet.getDataRange().getValues();
    var list = [];
    for (var i = 1; i < rows.length; i++) {
      list.push({ row: i + 1, time: rows[i][0] });
    }
    return ContentService.createTextOutput(JSON.stringify({ status: "success", data: list }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  if (action === 'load') {
    var targetRow = e.parameter.row ? parseInt(e.parameter.row) : sheet.getLastRow();
    if (targetRow > 1) {
      var data = sheet.getRange(targetRow, 2).getValue();
      return ContentService.createTextOutput(JSON.stringify({ status: "success", data: data }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({status: "empty"}))
    .setMimeType(ContentService.MimeType.JSON);
}
