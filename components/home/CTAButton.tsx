import Link from 'next/link';
import { CgArrowLongRight } from 'react-icons/cg';

type Props = { isFullWidth?: boolean };

export default async function CTAButton({ isFullWidth }: Props) {
  return (
    <div className='space-y-1 text-center'>
      <Link
        href='/auth/sign-in'
        className={`flex items-center justify-center rounded-md bg-peach p-3 font-semibold text-white-black-scheme ${isFullWidth ? 'w-full' : 'w-64'}`}
      >
        Discover Feature Ideas
        <CgArrowLongRight
          title='Arrow pointing to the right'
          className='animate-move ml-1 text-xl'
        />
      </Link>
      <p className='text-sm opacity-80'>No credit card required</p>
    </div>
  );
}
