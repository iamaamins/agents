'use client';

import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { brandFont } from '@/lib/utils';

export default function SignIn() {
  const session = useSession();
  if (session.data && session.data.user) redirect('/me/dashboard');

  return (
    <section className='flex h-screen items-center justify-center'>
      <div className='bg-silver-charcoal-scheme flex flex-col items-center rounded-md p-6'>
        <Link href='/' className='mb-6 flex items-center gap-2'>
          <Image
            priority
            src='/layout/logo.png'
            width={400}
            height={400}
            alt='Business logo'
            className='h-8 w-8 rounded-md'
          />
          <span className={`${brandFont.className} text-xl font-extrabold`}>
            UPDATE: Busi<span className='text-peach'>Ness</span>
          </span>
        </Link>
        <div
          onClick={() =>
            signIn('google', { redirect: false, callbackUrl: '/me/dashboard' })
          }
          className='border-slight-gray mb-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2'
        >
          <Image
            src='/logos/google.png'
            width={100}
            height={100}
            alt='Google logo'
            className='h-auto w-6'
          />
          <p className='font-medium'>Sign in with Google</p>
        </div>
        <p className='text-sm opacity-90'>
          By signing in, you agree to our{' '}
          <Link className='font-medium underline' href='/tos'>
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
