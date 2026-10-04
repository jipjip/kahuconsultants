import { sign } from '../lib/sign';
import { getResource } from '../lib/resources';

const LINK_TTL = 1000 * 60 * 15; // 15 minutes

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const data = await req.formData();
  const email = String(data.get('email') ?? '').trim();
  const resourceId = String(data.get('resource') ?? '');
  const honeypot = String(data.get('bot-field') ?? '');

  if (honeypot) return Response.json({ error: 'Bad request' }, { status: 400 });
  if (!email.includes('@')) return Response.json({ error: 'Invalid email' }, { status: 400 });
  if (!getResource(resourceId)) return Response.json({ error: 'Unknown resource' }, { status: 400 });

  const expires = Date.now() + LINK_TTL;
  const params = new URLSearchParams({
    r: resourceId,
    expires: String(expires),
    sig: sign(resourceId, expires),
  });

  return Response.json({ url: `/download?${params}` });
};

export const config = { path: '/api/download-link' };