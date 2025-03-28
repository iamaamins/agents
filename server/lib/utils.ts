import 'server-only';

import { createHmac, timingSafeEqual } from 'crypto';

export const removeExtraSpaces = (str: string) =>
  str.replace(/\s+/g, ' ').trim();

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function verifyLSQZSig(payload: string, sig: string | null) {
  if (!sig) return false;

  const hmac = createHmac('sha256', process.env.LSQZ_WEBHOOK_SECRET as string);
  const digest = Buffer.from(hmac.update(payload).digest('hex'), 'utf8');
  const signature = Buffer.from(sig, 'utf8');

  return timingSafeEqual(digest, signature);
}
