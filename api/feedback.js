/**
 * Notion Feedback Proxy API (2026 Standard)
 * 이 파일은 Vercel 등 서버리스 환경에서 안전하게 노션 API와 통신합니다.
 */

export default async function handler(req, res) {
  // CORS 설정 (필요 시)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { content, appName } = req.body;

  // 환경 변수에서 토큰과 DB ID를 가져옵니다.
  // 이 값들은 Vercel 대시보드(Settings > Environment Variables)에서 설정합니다.
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_DB_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_TOKEN || !NOTION_DB_ID) {
    return res.status(500).json({ message: '서버 설정(Token/DB ID)이 누락되었습니다.' });
  }

  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DB_ID },
        properties: {
          '앱 이름': { title: [{ text: { content: appName || 'Unknown App' } }] },
          '피드백 내용': { rich_text: [{ text: { content: content } }] },
          '입력 날짜': { date: { start: new Date().toISOString() } }
        }
      })
    });

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({ message: 'Success' });
    } else {
      return res.status(response.status).json({ message: result.message || 'Notion API Error' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server Error: ' + error.message });
  }
}
