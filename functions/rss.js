// Cloudflare Pages Functions
export async function onRequest(context) {
  const noteRssUrl = 'https://note.com/notakanonoryet/rss';

  try {
    // Cloudflareのサーバーから直接noteのRSSを取りに行くわ（サーバー間通信だからCORSは関係ないの♪）
    const response = await fetch(noteRssUrl);
    const xmlText = await response.text();

    // 取得したXMLをそのまま自分のサイトの /rss として返すわよ
    return new Response(xmlText, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Access-Control-Allow-Origin': '*' // 念のためCORS許可ヘッダーもつけるわ
      }
    });
  } catch (err) {
    return new Response('Failed to fetch RSS', { status: 500 });
  }
}
