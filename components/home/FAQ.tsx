'use client';

import { FAQ_DATA } from '@/data/home/FAQ';
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

export default function FAQ() {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  function toggleFAQ(index: number) {
    setOpenQuestions((prevState) =>
      !prevState.includes(index)
        ? [...prevState, index]
        : prevState.filter((el) => el !== index),
    );
  }

  return (
    <section id='faq' className='flex flex-col gap-6 px-4 py-6 lg:flex-row'>
      <div className='basis-1/2 space-y-4'>
        <h2 className='text-4xl font-extrabold'>Frequently asked questions</h2>
        <p className='opacity-90'>
          Have another question? Contact me on{' '}
          <a className='font-semibold underline' href='https://x.com/alaminnku'>
            X
          </a>{' '}
          or via{' '}
          <a
            className='font-semibold underline'
            target='_blank'
            href='https://wa.me/8801701022532?text=Hi%20Alamin,%20I%20would%20like%20to%20discuss%20something%20about...'
          >
            WhatsApp
          </a>
        </p>
      </div>
      <ul className='basis-1/2'>
        {FAQ_DATA.map((faq, index) => (
          <li key={index} className='border-t border-slight-gray'>
            <div
              onClick={() => toggleFAQ(index)}
              className='flex cursor-pointer items-center justify-between gap-2 py-5 text-lg font-semibold'
            >
              <p>{faq.question}</p>
              <span
                className={`transition-transform duration-300 ease-in-out ${
                  openQuestions.includes(index) ? 'rotate-180' : 'rotate-0'
                }`}
              >
                {openQuestions.includes(index) ? (
                  <AiOutlineMinus title='Hide FAQ icon' />
                ) : (
                  <AiOutlinePlus title='Show FAQ icon' />
                )}
              </span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openQuestions.includes(index)
                  ? 'max-h-fit opacity-90'
                  : 'max-h-0 opacity-0'
              }`}
              style={{
                maxHeight: openQuestions.includes(index) ? '288px' : '0px',
              }}
            >
              <div className='space-y-2 pb-5 leading-relaxed'>
                {faq.answer.map((el, index) => (
                  <p key={index}>{el}</p>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
