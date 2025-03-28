import SignIn from '@/components/auth/SignIn';
import { openGraph } from '@/lib/metadata';
import { Metadata } from 'next';

export default function SignInPage() {
  return (
    <main>
      <SignIn />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'UPDATE: Sign In | Business',
  description: 'UPDATE: Sign in to your account to manage your details.',
  openGraph: {
    ...openGraph,
    title: 'Sign In',
  },
  alternates: {
    canonical: '/auth/sign-in',
  },
};
