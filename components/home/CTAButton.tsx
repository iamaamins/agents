import Link from 'next/link';
import { CgArrowLongRight } from 'react-icons/cg';

type Props = { isFullWidth?: boolean };

export default async function CTAButton({ isFullWidth }: Props) {
  return (
    <div className='space-y-1 text-center'>
      <Link
        href='/auth/sign-in'
        className={`bg-peach text-white-black-scheme flex items-center justify-center rounded-md p-3 font-semibold ${isFullWidth ? 'w-full' : 'w-52'}`}
      >
        Try The Agents
        <CgArrowLongRight
          title='Arrow pointing to the right'
          className='animate-move ml-1 text-xl'
        />
      </Link>
    </div>
  );
}
