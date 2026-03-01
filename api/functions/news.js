// api/news.js - Vercel Serverless Function

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GNEWS_API_KEY;
    
    if (!apiKey) {
      console.error('GNEWS_API_KEY is missing');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // FIXED: Using 'apikey' parameter (not 'token')
    const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&max=6&apikey=${apiKey}`;
    
    console.log('Fetching from GNews...');
    
    const response = await fetch(url);
    const data = await response.json();
    
    // Check for GNews API errors
    if (data.errors) {
      console.error('GNews API Error:', data.errors);
      return res.status(400).json({ error: data.errors });
    }
    
    // Return successful response
    return res.status(200).json(data);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ error: error.message });
  }
}