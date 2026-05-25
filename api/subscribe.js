function json(res, statusCode, payload) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(payload);
  }

  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  if (req.body) {
    return typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    return json(res, 405, { success: false, error: 'Method not allowed' });
  }

  try {
    const body = await readBody(req);
    const email = String(body.email || '').trim().toLowerCase();
    const name = String(body.name || body.firstName || '').trim();
    const lang = String(body.lang || body.language || 'en').trim().slice(0, 8) || 'en';
    const freebie = String(body.freebie || '').trim() || 'unknown';
    const download = String(body.download || '').trim();
    const source = String(body.source || req.headers.referer || req.headers.referrer || '').trim();
    const page = String(body.page || req.headers.referer || req.headers.referrer || '').trim();
    const userAgent = req.headers['user-agent'] || '';
    const createdAt = new Date().toISOString();

    if (!email || !isValidEmail(email)) {
      return json(res, 400, { success: false, error: 'Email required' });
    }

    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    const apiKey = process.env.BREVO_API_KEY;
    const listId = parseInt(process.env.BREVO_LIST_ID || '2', 10);
    let savedToGoogleSheets = false;
    let savedToBrevo = false;

    if (sheetsWebhookUrl) {
      try {
        const sheetsResponse = await fetch(sheetsWebhookUrl, {
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
      } catch (err) {
        // Same behavior as Univers: spreadsheet logging is best-effort and must not block downloads.
      }
    }

    if (apiKey) {
      try {
        const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'api-key': apiKey,
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
      } catch (err) {
        // Brevo is optional for the download flow.
      }
    }

    return json(res, 200, {
      success: true,
      savedToGoogleSheets,
      savedToBrevo,
      brevoSkipped: !apiKey,
    });
  } catch (err) {
    return json(res, 200, { success: true, savedToGoogleSheets: false, brevoError: 'Server error' });
  }
};
