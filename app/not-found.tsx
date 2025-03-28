import { openGraph } from '@/lib/metadata';
import { Metadata } from 'next';
import Link from 'next/link';
import { CgArrowLongRight } from 'react-icons/cg';
import { TbUnlink } from 'react-icons/tb';

export default function NotFoundPage() {
  return (
    <main>
      <section className='flex h-screen flex-col items-center justify-center gap-2 p-4 text-center'>
        <TbUnlink className='text-5xl' title='Broken link icon' />
        <div className='max-w-md'>
          <h1 className='mb-2 text-xl font-semibold'>
            This page isn't available
          </h1>
          <p>
            This is maybe a broken link or the page have been removed. Please
            check to see the link you are trying to open is correct.
          </p>
        </div>
        <Link
          href='/'
          className='group bg-peach text-white-black-scheme flex items-center gap-1.5 rounded-full px-5 py-2 font-semibold'
        >
          Go home
          <CgArrowLongRight
            size={20}
            title='Arrow pointing to the right'
            className='transition-transform duration-300 ease-in-out group-hover:translate-x-1'
          />
        </Link>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Page Not Found | Business',
  description:
    'This is maybe a broken link or the page has been removed. Please check to see the link you are trying to open is correct.',
  openGraph: {
    ...openGraph,
    title: 'Page Not Found',
  },
};
