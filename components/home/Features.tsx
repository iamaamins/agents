'use client';

import { FEATURE_DATA } from '@/data/home/FEATURES';
import { IoCheckmarkOutline } from 'react-icons/io5';

export default function Features() {
  return (
    <section className='py-10'>
      <div className='m-auto max-w-2xl px-4'>
        <div className='mb-6 space-y-4'>
          <h2 className='text-3xl font-bold tracking-tight lg:text-5xl'>
            Features designed to deliver user-centric products
          </h2>
          <p className='max-w-xl text-lg leading-relaxed opacity-90'>
            Discover tools designed to help users learn about your business,
            analyze questions, generate feature ideas, and help you build
            products the users will love.
          </p>
        </div>
      </div>
      <div className='bg-silver-charcoal-scheme'>
        <ul className='m-auto max-w-2xl space-y-2 px-4 py-6 leading-relaxed'>
          {FEATURE_DATA.map((feature, index) => (
            <li key={index} className='flex items-center gap-1'>
              <IoCheckmarkOutline />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
