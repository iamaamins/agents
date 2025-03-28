import TOS from '@/components/legal/TOS';
import { openGraph } from '@/lib/metadata';
import { Metadata } from 'next';

export default function TOSPage() {
  return (
    <main>
      <TOS />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'UPDATE: Terms Of Services | Business',
  description:
    'UPDATE: Welcome to Business! By creating an account and using our services, you agree to these Terms of Service.',
  openGraph: {
    ...openGraph,
    title: 'Terms Of Services',
  },
  alternates: {
    canonical: '/tos',
  },
};
