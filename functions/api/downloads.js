const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Cache-Control': 'no-store',
};

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
      page
    FROM downloads
    ORDER BY created_at DESC
    LIMIT 1000
  `).all();

  const csvUrl = `/api/downloads.csv?token=${encodeURIComponent(token)}`;
  const rows = results.map((row) => `
    <tr>
      <td>${escapeHtml(row.created_at)}</td>
      <td>${escapeHtml(row.name)}</td>
      <td><a href="mailto:${escapeHtml(row.email)}">${escapeHtml(row.email)}</a></td>
      <td>${escapeHtml(row.lang)}</td>
      <td>${escapeHtml(row.freebie)}</td>
      <td>${escapeHtml(row.download)}</td>
      <td>${escapeHtml(row.source)}</td>
      <td><a href="${escapeHtml(row.page)}" target="_blank" rel="noreferrer">${escapeHtml(row.page)}</a></td>
    </tr>
  `).join('');

  const empty = results.length ? '' : '<tr><td colspan="8" class="empty">Aucun telechargement pour le moment.</td></tr>';

  return new Response(`<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Telechargements Loopinky</title>
  <style>
    :root {
      color-scheme: light;
      font-family: Arial, sans-serif;
      --ink: #14213d;
      --muted: #5f6c7b;
      --line: #d9e1ea;
      --blue: #0b67d1;
      --bg: #f6f8fb;
      --white: #ffffff;
    }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--ink);
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 22px 28px;
      background: var(--white);
      border-bottom: 1px solid var(--line);
    }

    h1 {
      margin: 0;
      font-size: 22px;
      letter-spacing: 0;
    }

    .count {
      margin-top: 4px;
      color: var(--muted);
      font-size: 14px;
    }

    .button {
      display: inline-flex;
      align-items: center;
      min-height: 40px;
      padding: 0 14px;
      border-radius: 6px;
      background: var(--blue);
      color: white;
      font-weight: 700;
      text-decoration: none;
      white-space: nowrap;
    }

    main {
      padding: 24px 28px;
      overflow-x: auto;
    }

    table {
      width: 100%;
      min-width: 980px;
      border-collapse: collapse;
      background: var(--white);
      border: 1px solid var(--line);
    }

    th, td {
      padding: 12px 14px;
      border-bottom: 1px solid var(--line);
      text-align: left;
      vertical-align: top;
      font-size: 14px;
    }

    th {
      background: #edf4fb;
      color: var(--ink);
      font-size: 12px;
      text-transform: uppercase;
    }

    a {
      color: var(--blue);
    }

    .empty {
      color: var(--muted);
      text-align: center;
      padding: 36px;
    }

    @media (max-width: 720px) {
      header {
        align-items: flex-start;
        flex-direction: column;
        padding: 18px;
      }

      main {
        padding: 18px;
      }
    }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>Telechargements Loopinky</h1>
      <div class="count">${results.length} entree${results.length > 1 ? 's' : ''}</div>
    </div>
    <a class="button" href="${csvUrl}">Exporter CSV</a>
  </header>
  <main>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Prenom</th>
          <th>Email</th>
          <th>Langue</th>
          <th>Telechargement</th>
          <th>Fichier</th>
          <th>Source</th>
          <th>Page</th>
        </tr>
      </thead>
      <tbody>${rows}${empty}</tbody>
    </table>
  </main>
</body>
</html>`, {
    headers: {
      ...securityHeaders,
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

export function onRequest() {
  return new Response('Method not allowed', {
    status: 405,
    headers: securityHeaders,
  });
}
