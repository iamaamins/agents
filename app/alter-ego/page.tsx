import Chat from '@/components/agents/Chat';
import { askQuestion } from '@/server/actions/alterEgo';

export default function AlterEgoPage() {
  return (
    <main>
      <Chat name='alter-ego' action={askQuestion} />
    </main>
  );
}
