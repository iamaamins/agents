import { generateAndSendEmail } from '@/server/agents/coldEmailer/agent';

export async function POST() {
  const response = await generateAndSendEmail();
  return new Response(JSON.stringify({ message: response }), { status: 200 });
}
