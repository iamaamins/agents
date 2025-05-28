'use client';

import Link from 'next/link';
import Logo from '../layout/Logo';

export default function Header() {
  return (
    <header className='flex items-center justify-between p-4'>
      <div className='flex items-center gap-6 md:gap-12'>
        <Logo />
        <nav className='space-x-4 font-medium'>
          <Link href='#agents'>Agents</Link>
          <Link href='#faq'>FAQ</Link>
        </nav>
      </div>
    </header>
  );
}
