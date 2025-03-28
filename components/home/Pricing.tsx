import { CHAT_UNIT_PRICE, PACKAGES } from '@/data/home/PRICING';
import { IoCheckmarkOutline } from 'react-icons/io5';
import Link from 'next/link';
import { CgArrowLongRight } from 'react-icons/cg';

export default async function Pricing() {
  return (
    <section id='pricing' className='space-y-4 px-4 py-6'>
      <div className='space-y-4 text-center'>
        <div className='mx-auto max-w-2xl space-y-4'>
          <h2 className='text-3xl font-bold tracking-tight lg:text-5xl'>
            Pricing
          </h2>
          <p className='text-lg leading-relaxed opacity-90'>
            Choose the plan that works best for your business—whether you're
            just starting out or scaling up.
          </p>
        </div>
      </div>
      <div className={`grid grid-cols-1 gap-4 md:grid-cols-3`}>
        {PACKAGES.map((el, index) => (
          <div
            key={index}
            className='bg-silver-charcoal-scheme space-y-6 rounded-lg p-6'
          >
            <div className='space-y-1.5'>
              <h3 className='flex items-center gap-2 text-2xl font-bold'>
                {el.tier}
              </h3>
            </div>
            <div className='mb-6 flex items-end gap-1'>
              <p className='text-5xl font-bold'>${el.price}</p>
              {el.tier !== 'FREE' && (
                <p className='line-through opacity-90'>
                  $
                  {(
                    CHAT_UNIT_PRICE * (el.tier === 'SUPER_SAVER' ? 5000 : 25000)
                  ).toFixed(2)}
                </p>
              )}
            </div>
            <ul className='space-y-2.5 leading-relaxed'>
              {el.features.map((feature, index) => (
                <li key={index} className='flex items-center gap-2'>
                  <IoCheckmarkOutline title='Checkmark icon' />
                  {feature}
                </li>
              ))}
            </ul>
            <div className='space-y-1 text-center'>
              <Link
                href='/auth/sign-in'
                className='bg-peach text-white-black-scheme flex w-full items-center justify-center rounded-md p-3 font-semibold'
              >
                Get Started With FeatWiz
                <CgArrowLongRight
                  title='Arrow pointing to the right'
                  className='animate-move ml-1 text-xl'
                />
              </Link>
              <p className='text-sm opacity-90'>Pay only for what you use!</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
