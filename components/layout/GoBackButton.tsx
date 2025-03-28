'use client';

import { useRouter } from 'next/navigation';
import { CgArrowLeft } from 'react-icons/cg';

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className='group bg-silver-charcoal-scheme mb-4 flex w-fit items-center gap-1 rounded-md px-4 py-2 text-sm font-medium shadow-sm'
    >
      <CgArrowLeft
        size={16}
        title='Arrow pointing to the left'
        className='transition-transform duration-200 group-hover:-translate-x-1'
      />
      Go Back
    </button>
  );
}
