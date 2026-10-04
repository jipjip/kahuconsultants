import { getStore } from '@netlify/blobs';
import { verify } from '../lib/sign';
import { getResource } from '../lib/resources';

export default async (req: Request) => {
  const params = new URL(req.url).searchParams;
  const resourceId = params.get('r') ?? '';
  const expires = Number(params.get('expires'));
  const sig = params.get('sig') ?? '';

  const resource = getResource(resourceId);
  if (!resource || !verify(resourceId, expires, sig)) {
    return new Response('This download link is invalid or has expired.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const file = await getStore('downloads').get(resource.blob, { type: 'stream' });
  if (!file) {
    console.error(`Blob "${resource.blob}" not found in store "downloads"`);
    return new Response('File unavailable.', { status: 500 });
  }

  return new Response(file, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${resource.filename}"`,
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex',
    },
  });
};

export const config = { path: '/download' };