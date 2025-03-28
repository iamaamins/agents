import Brand from '../layout/Brand';
import CTAButton from './CTAButton';

export default function Hero() {
  return (
    <section className='flex flex-col items-center gap-12 px-4 py-6'>
      <div className='flex max-w-3xl flex-col items-center gap-6 text-center'>
        <h1 className='text-4xl font-extrabold tracking-tight md:text-6xl'>
          Deliver the features your customers want
        </h1>
        <p className='text-lg leading-relaxed opacity-90'>
          <Brand /> is a smart assistant that answers user questions, analyzes
          them, and suggests potential features and improvements—helping you
          build truly user-centric products.
        </p>
        <CTAButton />
      </div>
    </section>
  );
}
