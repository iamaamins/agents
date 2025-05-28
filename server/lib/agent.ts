import 'server-only';

import { CONFIG } from '../config/agent';
import { sleep } from './utils';

export async function retry<T>(
  operation: () => Promise<T>,
  maxRetries: number = CONFIG.maxRetries,
  retryDelay: number = CONFIG.retryDelay,
): Promise<T> {
  let lastError: Error | undefined;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      if (i < maxRetries - 1) await sleep(retryDelay);
    }
  }

  throw lastError;
}
