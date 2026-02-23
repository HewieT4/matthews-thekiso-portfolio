exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const apiKey = process.env.GNEWS_API_KEY;
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&max=6&token=${apiKey}`
    );
    const data = await response.json();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};