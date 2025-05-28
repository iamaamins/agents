'use server';

import { chat } from '@/server/agents/alterEgo/agent';
import { parseError } from '../lib/error';
import { Response } from '@/types';
import { ChatCompletionMessageParam } from 'openai/resources.mjs';

export async function askQuestion(
  question: string,
  history: ChatCompletionMessageParam[],
): Promise<Response<string>> {
  try {
    const response = await chat(question, history);
    if (!response) throw new Error('Failed to generate response');
    return { ok: true, data: response };
  } catch (err) {
    console.error(err);
    return parseError(err);
  }
}
