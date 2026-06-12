const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '*';
  return {
    ...securityHeaders,
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function json(payload, init = {}) {
  return Response.json(payload, {
    ...init,
    headers: {
      ...securityHeaders,
      ...(init.headers || {}),
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function clean(value, maxLength = 500) {
  return String(value || '').trim().slice(0, maxLength);
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function onRequestPost({ request, env }) {
  const cors = corsHeaders(request);

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const email = clean(body.email, 254).toLowerCase();
  const name = clean(body.name || body.firstName, 120);
  const lang = clean(body.lang || body.language || 'en', 8) || 'en';
  const freebie = clean(body.freebie || 'unknown', 160);
  const download = clean(body.download, 500);
  const source = clean(body.source || request.headers.get('Referer') || '', 500);
  const page = clean(body.page || request.headers.get('Referer') || '', 500);
  const userAgent = clean(request.headers.get('User-Agent') || '', 500);
  const createdAt = new Date().toISOString();

  if (!email || !validEmail(email)) {
    return json({ success: false, error: 'Email required' }, { status: 400, headers: cors });
  }

  let savedToGoogleSheets = false;
  let savedToBrevo = false;
  let savedToDownloadsDb = false;

  if (env.DOWNLOADS_DB) {
    try {
      await env.DOWNLOADS_DB.prepare(`
        INSERT INTO downloads (
          created_at,
          name,
          email,
          lang,
          freebie,
          download,
          source,
          page,
          user_agent
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        createdAt,
        name,
        email,
        lang,
        freebie,
        download,
        source,
        page,
        userAgent
      ).run();
      savedToDownloadsDb = true;
    } catch {
      savedToDownloadsDb = false;
    }
  }

  if (env.GOOGLE_SHEETS_WEBHOOK_URL) {
    try {
      const sheetsResponse = await fetch(env.GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          createdAt,
          name,
          email,
          lang,
          freebie,
          download,
          source,
          page,
          userAgent,
        }),
      });
      savedToGoogleSheets = sheetsResponse.ok;
    } catch {
      savedToGoogleSheets = false;
    }
  }

  if (env.BREVO_API_KEY) {
    try {
      const listId = parseInt(env.BREVO_LIST_ID || '2', 10);
      const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          attributes: {
            FIRSTNAME: name,
            LANG: lang,
            FREEBIE: freebie,
            SOURCE: source,
          },
          listIds: [listId],
          updateEnabled: true,
        }),
      });
      savedToBrevo = brevoResponse.ok || brevoResponse.status === 204;
    } catch {
      savedToBrevo = false;
    }
  }

  return json({
    success: true,
    savedToDownloadsDb,
    savedToGoogleSheets,
    savedToBrevo,
    downloadsDbSkipped: !env.DOWNLOADS_DB,
    brevoSkipped: !env.BREVO_API_KEY,
    sheetsSkipped: !env.GOOGLE_SHEETS_WEBHOOK_URL,
  }, { headers: cors });
}

export function onRequest({ request }) {
  return json({ success: false, error: 'Method not allowed' }, {
    status: 405,
    headers: corsHeaders(request),
  });
}
