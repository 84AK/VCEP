/**
 * VCEP: 스마트폰 웰니스 마스터 통합 백엔드 (GAS) v2
 * 시트 이름을 한국어로 생성하고 데이터를 통합 관리합니다.
 */

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const params = JSON.parse(e.postData.contents);
  
  const userId = params.userId || "Unknown";
  const category = params.category || "General";
  const sheetName = params.sheetName || category; // 한국어 시트 이름
  const payload = JSON.stringify(params.payload || {});
  const timestamp = new Date();
  
  // 시트 이름 매핑 (만약 전달받지 못했을 경우를 대비한 백업)
  const nameMap = {
    "thieves_v2": "시간 도둑",
    "persona_results": "도파민 수사대",
    "nophone_timer": "폰 안 보기",
    "focus_session": "반려돌 키우기",
    "phonedown_challenge": "심심함 자판기",
    "offline_topic": "시한폭탄 토크",
    "sleep_routine": "양 떼 목장",
    "time_diary": "오늘의 시간 일기"
  };

  const finalSheetName = params.sheetName || nameMap[category] || category;
  
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
