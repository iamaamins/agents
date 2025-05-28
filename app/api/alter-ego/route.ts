import { chat } from '@/server/agents/alterEgo/agent';

export async function POST(req: Request) {
  const body = await req.json();
  const response = await chat(body.message);
  return new Response(JSON.stringify({ message: response }), { status: 200 });
}
