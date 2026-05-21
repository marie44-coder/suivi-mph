export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/.netlify/functions/sheets') {
      const sheet = url.searchParams.get('sheet');
      const apiKey = env.GOOGLE_API_KEY;
      const SHEET_ID = '1BZWdgCe6JFlP8yVGkcjuqke0TDeqrbvhXUhaJy1NpxM';
      const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(sheet)}?key=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    return env.ASSETS.fetch(request);
  }
}
