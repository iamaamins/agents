import { PROBLEM_STATEMENT_DATA } from '@/data/home/PROBLEM_STATEMENT';
import Brand from '../layout/Brand';

export default function ProblemStatement() {
  return (
    <section className='space-y-6 px-4 py-6'>
      <div className='max-w-xl space-y-4'>
        <h2 className='text-3xl font-bold tracking-tight md:text-5xl'>
          Why <Brand />?
        </h2>
        <p className='text-lg leading-relaxed opacity-90'>
          Business success depends on delivering the right features. But how you
          do know what to deliver and where to improve? <Brand /> solved these
          problems by working as a:
        </p>
      </div>
      <div className='grid grid-cols-1 gap-4 leading-relaxed md:grid-cols-2'>
        {PROBLEM_STATEMENT_DATA.map((element, index) => (
          <div
            key={index}
            className='flex flex-col items-center gap-3 rounded-md bg-silver-charcoal-scheme p-6 text-center'
          >
            <p className='flex h-8 w-8 items-center justify-center rounded-full bg-peach text-lg font-semibold text-white-black-scheme'>
              {index + 1}
            </p>
            <h3 className='text-2xl font-bold'>{element.title}</h3>
            <p className='opacity-90'>{element.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
