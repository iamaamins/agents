'use client';

import { BounceLoader } from 'react-spinners';

export default function LoadingPage() {
  return (
    <main>
      <section className='flex h-screen items-center justify-center'>
        <BounceLoader color='#ff8360' />
      </section>
    </main>
  );
}
