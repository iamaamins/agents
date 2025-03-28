'use client';

import Link from 'next/link';
import Logo from '../layout/Logo';
import { useSession } from 'next-auth/react';

export default function Header() {
  const session = useSession();

  return (
    <header className='flex items-center justify-between p-4'>
      <div className='flex items-center gap-6 md:gap-12'>
        <Logo />
        <nav className='space-x-4 font-medium'>
          <Link href='#pricing'>Pricing</Link>
          <Link href='#faq'>FAQ</Link>
        </nav>
      </div>
      <Link
        className='rounded-full bg-peach px-5 py-1.5 font-medium text-white-black-scheme'
        href={session.data?.user ? '/me/dashboard' : '/auth/sign-in'}
      >
        {session.data?.user ? 'Dashboard' : 'Sign In'}
      </Link>
    </header>
  );
}
