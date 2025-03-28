import Image from 'next/image';
import Brand from '../layout/Brand';

export default function AboutMe() {
  return (
    <section className='mx-auto max-w-2xl px-4 py-6 leading-relaxed'>
      <Image
        src='/home/me.jpg'
        width={200}
        height={200}
        alt='Alamin Shaikh'
        className='float-left mr-4 h-auto w-36 rounded-lg md:mb-4 md:w-52'
      />
      <p className='mb-2 font-semibold md:text-lg'>Hi, it's Alamin 👋</p>
      <div className='space-y-4 opacity-90'>
        <p>
          In 2024, I started building small products and quickly realized I
          needed a solid way to understand users' needs.
        </p>
        <p>
          First, I tried emailing them, but it was{' '}
          <span className='font-semibold'>
            time-consuming and often went unanswered.
          </span>{' '}
          That's when I thought—why not build a chatbot? A tool that not only
          helps users learn about the product but also provides insights into
          what they're most interested in.
        </p>
        <p>
          That idea led to the creation of <Brand />, designed to:
        </p>
        <ol className='ml-8 list-decimal'>
          <li>Help your users quickly understand your business offerings.</li>
          <li>
            Give you valuable insights into the features and improvements your
            users truly want.
          </li>
        </ol>
        <p>
          I am a <span className='font-semibold'>Top Rated Plus</span> developer
          on{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='font-medium underline'
            href='https://www.upwork.com/freelancers/~01fc6138ad0b44435c'
          >
            Upwork
          </a>
          , with over <span className='font-semibold'>$40K in earnings</span>.
          Many clients trust me to build their software. In recent years, I’ve
          developed web apps that generate{' '}
          <span className='font-semibold'>multi-million-dollar revenue.</span>
        </p>
      </div>
    </section>
  );
}
