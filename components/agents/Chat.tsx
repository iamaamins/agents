import { Response } from '@/types';
import ChatForm from './ChatForm';
import { ChatCompletionMessageParam } from 'openai/resources.mjs';

type Props = {
  name: string;
  action: (
    question: string,
    history: ChatCompletionMessageParam[],
  ) => Promise<Response<string>>;
};

export default function Chat({ name, action }: Props) {
  return (
    <section className='fixed bottom-0 left-0 w-screen px-4 py-6 md:left-1/2 md:max-w-xl md:-translate-x-1/2'>
      <ChatForm name={name} action={action} />
    </section>
  );
}
