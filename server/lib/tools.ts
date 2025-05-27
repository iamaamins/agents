import {
  ChatCompletionTool,
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
} from 'openai/resources.mjs';

export const tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'recordUserEmail',
      description:
        'Use this tool to record that a user is interested in being in touch and provided an email address',
      parameters: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'The email address of this user',
          },
        },
        required: ['email'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'recordUnknownQuestion',
      description:
        "Always use this tool to record any question that couldn't be answered as you didn't know the answer",
      parameters: {
        type: 'object',
        properties: {
          question: {
            type: 'string',
            description: "The question that couldn't be answered",
          },
        },
        required: ['question'],
        additionalProperties: false,
      },
    },
  },
];

const functions = {
  recordUserEmail: (data: { email: string }) => {
    console.log(`Recording interest from ${data.email}`);
    return { recorded: 'ok' };
  },
  recordUnknownQuestion: (data: { question: string }) => {
    console.log(`Recording unknown question: ${data.question}`);
    return { recorded: 'ok' };
  },
};

export function handleToolCalls(toolCalls: ChatCompletionMessageToolCall[]) {
  const messages: ChatCompletionMessageParam[] = [];

  for (const toolCall of toolCalls) {
    const { name, arguments: args } = toolCall.function;

    if (name in functions) {
      const message = functions[name as keyof typeof functions](
        JSON.parse(args),
      );

      messages.push({
        role: 'tool',
        content: JSON.stringify(message),
        tool_call_id: toolCall.id,
      });
    } else {
      console.error(`Unknown tool function: ${name}`);
    }
  }

  return messages;
}
