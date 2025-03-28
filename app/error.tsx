'use client';

import { BiError } from 'react-icons/bi';

type ErrorProps = { reset: () => void };

export default function ErrorPage({ reset }: ErrorProps) {
  return (
    <main>
      <section className='flex h-screen flex-col items-center justify-center gap-2 p-4 text-center'>
        <BiError className='text-5xl' title='Error icon' />
        <div className='max-w-md'>
          <h1 className='mb-2 text-xl font-semibold'>Something went wrong</h1>
          <p>
            An unexpected server condition encountered which prevented
            fulfilling your request. Please try again.
          </p>
        </div>
        <button
          className='rounded-full bg-peach px-5 py-2 font-semibold text-white-black-scheme'
          onClick={reset}
        >
          Try again
        </button>
      </section>
    </main>
  );
}
