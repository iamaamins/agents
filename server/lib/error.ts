import 'server-only';

import { ErrorResponse } from '@/types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function parseError(err: unknown): ErrorResponse {
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      if (err.message.includes('name_key'))
        return { ok: false, message: 'Please provide a unique name' };

      if (err.message.includes('email_key'))
        return { ok: false, message: 'Please provide a unique email' };
    }
    return { ok: false, message: 'Something went wrong' };
  }

  if (err instanceof Error) {
    if (err.stack?.includes('sendgrid'))
      return { ok: false, message: 'Failed to submit from' };
    return { ok: false, message: err.message };
  }

  return { ok: false, message: 'Something went wrong' };
}
