exports.handler = async (event) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const { sheet } = event.queryStringParameters;
  const SHEET_ID = '1BZWdgCe6JFlP8yVGkcjuqke0TDeqrbvhXUhaJy1NpxM';
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(sheet)}?key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(data)
    };
  } catch (e) {
    return {statusCode: 500, body: JSON.stringify({error: e.message})};
  }
};
