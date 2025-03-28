import { COMPARISON_DATA } from '@/data/home/COMPARISON';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5';
import { IoIosRemoveCircle } from 'react-icons/io';
import Brand from '../layout/Brand';

export default function Comparison() {
  return (
    <section className='space-y-6 px-4 py-6'>
      <div className='m-auto flex max-w-3xl flex-col items-center space-y-4 text-center'>
        <h2 className='text-3xl font-bold tracking-tight lg:text-5xl'>
          How does <Brand /> compare to other tools?
        </h2>
        <p className='text-lg leading-relaxed opacity-90'>
          <Brand /> FeatWiz is cheaper, better, and more user-centric, making it
          a perfect fit for small businesses and entrepreneurs.
        </p>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {COMPARISON_DATA.map((comparison, index) => (
          <div
            key={index}
            className={`bg-silver-charcoal-scheme space-y-2 rounded-md p-6 ${comparison.competitor === 'FeatWiz' && 'border-slight-gray border'}`}
          >
            <h3 className='text-2xl font-bold'>
              {comparison.competitor === 'FeatWiz' ? (
                <Brand />
              ) : (
                comparison.competitor
              )}
            </h3>
            <ul className='space-y-1'>
              {comparison.features.map((feature, index) => (
                <li key={index} className='flex items-center gap-1'>
                  {feature.status === 'available' ? (
                    <IoIosCheckmarkCircle size={20} color='#22c55e' />
                  ) : feature.status === 'unavailable' ? (
                    <IoCloseCircle size={20} color='#ff8360' />
                  ) : (
                    feature.status === 'meh' && (
                      <IoIosRemoveCircle size={20} color='#ff8360' />
                    )
                  )}
                  <span className='w-full'>{feature.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
