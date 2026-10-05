import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const FUNCTION_PREFIX = '/.netlify/functions/api-proxy';

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const API_KEY = Netlify.env.get('API_KEY');
  const API_URL = Netlify.env.get('API_URL');

  if (!API_KEY || !API_URL) {
    return { statusCode: 500, body: 'API key not configured' };
  }

  const suffix =
    event.path.startsWith(FUNCTION_PREFIX) ?
      event.path.slice(FUNCTION_PREFIX.length)
    : event.path;
  const targetPath = suffix || '/';

  const upstreamUrl = new URL(targetPath, API_URL);
  if (event.queryStringParameters) {
    for (const [key, value] of Object.entries(event.queryStringParameters)) {
      if (value !== undefined) upstreamUrl.searchParams.set(key, value);
    }
  }

  try {
    const response = await fetch(upstreamUrl.toString(), {
      method: 'GET',
      headers: {
        'X-API-Key': API_KEY,
      },
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Proxy request failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to reach upstream API' }),
    };
  }
};
