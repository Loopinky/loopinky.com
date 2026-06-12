const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

function csvCell(value) {
  return `"${String(value || '').replace(/"/g, '""')}"`;
}

function csvRow(values) {
  return values.map(csvCell).join(',');
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token') || '';

  if (!env.DOWNLOADS_EXPORT_TOKEN || token !== env.DOWNLOADS_EXPORT_TOKEN) {
    return new Response('Forbidden', {
      status: 403,
      headers: securityHeaders,
    });
  }

  if (!env.DOWNLOADS_DB) {
    return new Response('Downloads database is not configured', {
      status: 500,
      headers: securityHeaders,
    });
  }

  const { results } = await env.DOWNLOADS_DB.prepare(`
    SELECT
      created_at,
      name,
      email,
      lang,
      freebie,
      download,
      source,
      page,
      user_agent
    FROM downloads
    ORDER BY created_at DESC
    LIMIT 5000
  `).all();

  const rows = [
    csvRow([
      'Date',
      'Prenom',
      'Email',
      'Langue',
      'Telechargement',
      'Fichier',
      'Source',
      'Page',
      'User-Agent',
    ]),
    ...results.map((row) => csvRow([
      row.created_at,
      row.name,
      row.email,
      row.lang,
      row.freebie,
      row.download,
      row.source,
      row.page,
      row.user_agent,
    ])),
  ];

  return new Response(rows.join('\n'), {
    headers: {
      ...securityHeaders,
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="loopinky-downloads.csv"',
    },
  });
}

export function onRequest() {
  return new Response('Method not allowed', {
    status: 405,
    headers: securityHeaders,
  });
}
