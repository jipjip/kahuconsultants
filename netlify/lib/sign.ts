import { createHmac, timingSafeEqual } from 'node:crypto';

function getSecret(): string {
  const secret = process.env.DOWNLOAD_SECRET;
  if (!secret) throw new Error('DOWNLOAD_SECRET is not set');
  return secret;
}

export function sign(file: string, expires: number): string {
  return createHmac('sha256', getSecret())
    .update(`${file}:${expires}`)
    .digest('base64url');
}

export function verify(file: string, expires: number, sig: string): boolean {
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  const expected = Buffer.from(sign(file, expires));
  const given = Buffer.from(sig);

  return expected.length === given.length && timingSafeEqual(expected, given);
}