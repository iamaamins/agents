import { openGraph } from '@/lib/metadata';
import { Metadata } from 'next';
import Link from 'next/link';
import { BiError } from 'react-icons/bi';

export default function AuthErrorPage() {
  return (
    <main>
      <section className='flex h-screen flex-col items-center justify-center gap-2 p-4 text-center'>
        <BiError className='text-5xl' title='Error icon' />
        <div className='max-w-md'>
          <h1 className='mb-2 text-xl font-semibold'>Something went wrong</h1>
          <p>
            An unexpected server condition encountered which prevented your
            login request. Please try again.
          </p>
        </div>
        <Link
          href='/auth/sign-in'
          className='bg-peach text-white-black-scheme rounded-full px-5 py-2 font-semibold'
        >
          Try again
        </Link>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'UPDATE: Sign In Error | Business',
  description:
    'An unexpected server condition encountered which prevented your login request. Please try again.',
  openGraph: {
    ...openGraph,
    title: 'Sign In Error',
  },
  alternates: {
    canonical: '/auth/error',
  },
};
