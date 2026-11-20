const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email = "";

  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  if (!EMAIL.test(email) || email.length > 320) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    return Response.json({ error: "config" }, { status: 500 });
  }

  const upstream = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        send_welcome_email: true,
        utm_source: "website",
        referring_site: "https://crazyones.us",
      }),
    },
  );

  if (upstream.ok) {
    return Response.json({ ok: true });
  }

  const detail = await upstream.text();
  if (/already/i.test(detail)) {
    return Response.json({ ok: true });
  }

  return Response.json({ error: "subscribe" }, { status: 502 });
}
