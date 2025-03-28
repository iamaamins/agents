import { PROBLEMS } from '@/data/home/PROBLEMS';
import { IoCheckmarkOutline } from 'react-icons/io5';
import CTAButton from './CTAButton';
import Brand from '../layout/Brand';

export default function Problems() {
  return (
    <section className='m-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-6'>
      <div className='flex flex-col items-center space-y-4 text-center'>
        <h2 className='text-3xl font-bold tracking-tight md:text-5xl'>
          Is <Brand /> for me? Yes, if you:
        </h2>
      </div>
      <div className='max-w-3xl space-y-1 rounded-md bg-silver-charcoal-scheme p-6 text-lg font-medium leading-relaxed opacity-90'>
        {PROBLEMS.map((problem, index) => (
          <p key={index} className='flex items-center gap-2'>
            <IoCheckmarkOutline title='Checkmark icon' />
            <span className='w-full'>{problem}</span>
          </p>
        ))}
      </div>
      <CTAButton />
    </section>
  );
}
