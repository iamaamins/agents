import { CONFIG } from '@/server/config/agent';
import { client } from '@/server/config/ai';
import { retry } from '@/server/lib/agent';
import {
  ChatCompletionTool,
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
} from 'openai/resources.mjs';

export const tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'writeProfessionalEmail',
      description: 'Use this tool to write professional, serious cold emails',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'writeHumorousEmail',
      description: 'Use this tool to write witty, engaging cold emails',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'writeConciseEmail',
      description: 'Use this tool to write concise, to the point cold emails',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
];

const functions = {
  writeProfessionalEmail: async () => {
    try {
      const response = await retry(() =>
        client.chat.completions.create({
          model: CONFIG.model,
          messages: [
            {
              role: 'system',
              content:
                'You are a sales agent working for ComplAI, a company that provides a SaaS tool for ensuring SOC2 compliance and preparing for audits, powered by AI. You write professional, serious cold emails.',
            },
            {
              role: 'user',
              content: 'Write a professional, serious cold email.',
            },
          ],
        }),
      );

      return response.choices[0].message.content;
    } catch (err) {
      console.error(err);
    }
  },
  writeHumorousEmail: async () => {
    try {
      const response = await retry(() =>
        client.chat.completions.create({
          model: CONFIG.model,
          messages: [
            {
              role: 'system',
              content:
                'You are a humorous, engaging sales agent working for ComplAI, a company that provides a SaaS tool for ensuring SOC2 compliance and preparing for audits, powered by AI. You write witty, engaging cold emails that are likely to get a response.',
            },
            { role: 'user', content: 'Write a witty, engaging cold email.' },
          ],
        }),
      );

      return response.choices[0].message.content;
    } catch (err) {
      console.error(err);
    }
  },
  writeConciseEmail: async () => {
    try {
      const response = await retry(() =>
        client.chat.completions.create({
          model: CONFIG.model,
          messages: [
            {
              role: 'system',
              content:
                'You are a busy sales agent working for ComplAI, a company that provides a SaaS tool for ensuring SOC2 compliance and preparing for audits, powered by AI. You write concise, to the point cold emails.',
            },
            {
              role: 'user',
              content: 'Write a concise, to the point cold email',
            },
          ],
        }),
      );

      return response.choices[0].message.content;
    } catch (err) {
      console.error(err);
    }
  },
};

export async function handleEmailGeneratorToolCalls(
  toolCalls: ChatCompletionMessageToolCall[],
) {
  const templates: string[] = [];
  const results: ChatCompletionMessageParam[] = [];

  for (const toolCall of toolCalls) {
    const { name } = toolCall.function;

    const toolExists = name in functions;
    if (!toolExists) continue;

    try {
      const email = await functions[name as keyof typeof functions]();

      if (email) {
        results.push({
          role: 'tool',
          content: email,
          tool_call_id: toolCall.id,
        });

        templates.push(email);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return { templates, results };
}
