/**
 * Notion Feedback Proxy API (Robust Version)
 */

module.exports = async (req, res) => {
  // CORS 설정
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

  // Vercel 환경 변수에서 토큰과 DB ID를 가져옵니다.
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_DB_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_TOKEN || !NOTION_DB_ID) {
    return res.status(500).json({ 
      message: '서버 환경 변수(NOTION_TOKEN 또는 NOTION_DATABASE_ID)가 설정되지 않았습니다. Vercel 설정창을 확인해 주세요.' 
    });
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
          'App Name': { title: [{ text: { content: appName || 'Unknown App' } }] },
          'Feedback Content': { rich_text: [{ text: { content: content } }] },
          'Date': { date: { start: new Date().toISOString() } }
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
    return res.status(500).json({ message: 'Internal Server Error: ' + error.message });
  }
};
