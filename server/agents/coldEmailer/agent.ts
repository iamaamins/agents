import 'server-only';

import { client } from '@/server/config/ai';
import { tools, handleEmailGeneratorToolCalls } from './tools';
import { ChatCompletionMessageParam } from 'openai/resources.mjs';
import { sendEmail } from '@/server/config/mail';
import { CONFIG } from '@/server/config/agent';
import { retry } from '@/server/lib/agent';

async function generateEmails() {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content:
        "You are a sales manager working for ComplAI. You use the tools given to you to generate cold sales emails. You never generate sales emails yourself; you always use the tools. You try all 3 sales_agent tools once before choosing the best one. You can use the tools multiple times if you're not satisfied with the results from the first try. You select the single best email using your own judgement of which email will be most effective.",
    },
    {
      role: 'user',
      content: 'Generate and pick the most effective email.',
    },
  ];
  const emails: string[] = [];

  try {
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

        if (toolCalls) {
          const { templates, results } =
            await handleEmailGeneratorToolCalls(toolCalls);

          messages.push(message, ...results);
          emails.push(...templates);
        }
      } else {
        done = true;
        return emails;
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function pickBestEmail(emails: string[]) {
  try {
    const response = await retry(() =>
      client.chat.completions.create({
        model: CONFIG.model,
        messages: [
          {
            role: 'system',
            content:
              'You pick the best cold sales email from the given options. Imagine you are a customer and pick the one you are most likely to respond to. Do not give an explanation; reply with the selected email only.',
          },
          { role: 'user', content: emails.join('\n\n') },
        ],
      }),
    );

    return response.choices[0].message.content;
  } catch (err) {
    console.error(err);
  }
}

async function generateSubject(email: string) {
  try {
    const response = await retry(() =>
      client.chat.completions.create({
        model: CONFIG.model,
        messages: [
          {
            role: 'system',
            content:
              'You can write a subject for a cold sales email. You are given a message and you need to write a subject for an email that is likely to get a response. Only return the best subject without any explanation.',
          },
          { role: 'user', content: email },
        ],
      }),
    );

    return response.choices[0].message.content;
  } catch (err) {
    console.error(err);
  }
}

async function convertEmailToHtml(email: string) {
  try {
    const response = await retry(() =>
      client.chat.completions.create({
        model: CONFIG.model,
        messages: [
          {
            role: 'system',
            content:
              'You can convert a text email body to an HTML email body. You are given a text email body which might have some markdown and you need to convert it to an HTML email body with simple, clear, compelling layout and design. Only return the HTML email body without any explanation.',
          },
          { role: 'user', content: email },
        ],
      }),
    );

    return response.choices[0].message.content;
  } catch (err) {
    console.error(err);
  }
}

export async function generateAndSendEmail() {
  try {
    const emails = await generateEmails();
    if (!emails?.length) throw new Error('Failed to generate emails');

    const bestEmail = await pickBestEmail(emails);
    if (!bestEmail) throw new Error('Failed to pick the best email');

    const subject = await generateSubject(bestEmail);
    if (!subject) throw new Error('Failed to generate subject');

    const html = await convertEmailToHtml(bestEmail);
    if (!html) throw new Error('Failed to convert email to HTML');

    await sendEmail({
      to: 'alaminn.ku@gmail.com',
      from: 'hello@alaminshaikh.com',
      subject,
      html,
    });

    return 'Email sent successfully!';
  } catch (err) {
    console.error(err);
  }
}
