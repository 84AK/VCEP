/**
 * VCEP: 멘탈 웰니스 마스터 통합 백엔드 (GAS)
 * 감정 및 정신건강 카테고리 9개 앱의 데이터를 구글 시트에 통합 저장합니다.
 */

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const params = JSON.parse(e.postData.contents);
  
  const userId = params.userId || "Unknown";
  const category = params.category || "General";
  
  // 시트 이름 매핑
  const nameMap = {
    "bioluminescent_fluid": "심해의 파동",
    "cheer_airplane": "응원의 종이비행기",
    "empathy_dialogue": "마음의 온도",
    "empathy_postman": "마음 배달부",
    "help_lighthouse": "마음의 등대",
    "message_lantern": "기억의 등불",
    "resource_map": "마음 쉼터 지도",
    "secret_ink_fire": "비밀 잉크와 불꽃",
    "stat_garden": "마음 정원"
  };

  const finalSheetName = params.sheetName || nameMap[category] || category;
  const payload = JSON.stringify(params.payload || {});
  const timestamp = new Date();
  
  // 카테고리별 시트가 없으면 생성
  let sheet = ss.getSheetByName(finalSheetName);
  if (!sheet) {
    sheet = ss.insertSheet(finalSheetName);
    sheet.appendRow(["Timestamp", "User ID", "Data (JSON)"]);
    sheet.setFrozenRows(1);
    sheet.getRange("1:1").setFontWeight("bold").setBackground("#f3f4f6");
  }
  
  // 데이터 추가
  sheet.appendRow([timestamp, userId, payload]);
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Data saved to " + finalSheetName
  })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const userId = e.parameter.userId;
  const results = {};
  
  const sheets = ss.getSheets();
  sheets.forEach(sheet => {
    const name = sheet.getName();
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return; // 헤더만 있는 경우 제외
    
    data.shift(); // 헤더 제거
    
    // 해당 유저의 데이터만 필터링
    const userRows = data.filter(row => row[1] == userId).map(row => ({
      timestamp: row[0],
      payload: row[2] ? JSON.parse(row[2]) : {}
    }));
    
    if (userRows.length > 0) results[name] = userRows;
  });
  
  return ContentService.createTextOutput(JSON.stringify(results))
    .setMimeType(ContentService.MimeType.JSON);
}
