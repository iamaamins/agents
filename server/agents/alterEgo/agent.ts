import 'server-only';

import { client } from '@/server/config/ai';
import { tools, handleToolCalls } from './tools';
import { getPersonalDetail } from '@/server/lib/utils';
import { ChatCompletionMessageParam } from 'openai/resources.mjs';
import { retry } from '@/server/lib/agent';
import { CONFIG } from '@/server/config/agent';

function generateSystemPrompt(name: string, linkedin: string, summary: string) {
  return `
      You are acting as ${name}. You are answering questions on ${name}'s website, particularly questions related to ${name}'s career, background, skills, and experience.
  
      Your responsibility is to represent ${name} for interactions on the website as faithfully as possible. You are given a summary of ${name}'s background and LinkedIn profile which you can use to answer questions.
  
      Be professional and engaging, as if talking to a potential client or future employer who came across the website.
  
      If you don't know the answer to any question, use your 'recordUnknownQuery' tool to record the question that you couldn't answer, even if it's about something trivial or unrelated to career.
  
      If the user is engaging in discussion, try to steer them towards getting in touch via email; ask for their email and record it using your 'recordUserEmail' tool.
  
      ## LinkedIn Profile:
      ${linkedin}
  
      ## Summary:
      ${summary}
  
      With this context, please chat with the user, always staying in character as ${name}.
    `;
}

export async function chat(message: string) {
  const { linkedin, summary } = await getPersonalDetail();

  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: generateSystemPrompt('Alamin Shaikh', summary, linkedin),
    },
    // Add 5 previous messages as history
    { role: 'user', content: message },
  ];

  let done = false;
  while (!done) {
    const response = await retry(() =>
      client.chat.completions.create({
        model: CONFIG.model,
        messages,
        tools,
      }),
    );

    if (response.choices[0].finish_reason === 'tool_calls') {
      const message = response.choices[0].message;
      const toolCalls = message.tool_calls;
      if (toolCalls) messages.push(message, ...handleToolCalls(toolCalls));
    } else {
      done = true;
      return response.choices[0].message.content;
    }
  }
}
