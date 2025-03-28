'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
  '/home/devcoach-project-mockup-1.png',
  '/home/devcoach-project-mockup-2.png',
  '/home/devcoach-project-mockup-3.png',
  '/home/devcoach-project-mockup-4.png',
  '/home/devcoach-project-mockup-5.png',
  '/home/devcoach-project-mockup-6.png',
];

export default function MockupSlider() {
  const [isAuto, setIsAuto] = useState(true);
  const [currIndex, setCurrIndex] = useState(0);

  function viewImage(index: number) {
    setCurrIndex(index);
    if (isAuto) setIsAuto(false);
  }

  useEffect(() => {
    if (isAuto) {
      const interval = setInterval(() => {
        setCurrIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isAuto]);

  return (
    <div className='overflow-hidden md:w-4/5'>
      <div
        className='mb-4 flex transition-transform duration-500'
        style={{ transform: `translateX(-${currIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <Image
            priority
            key={index}
            src={image}
            width={1080}
            height={668}
            quality={100}
            alt='DevCoach project mockup'
            className='border-slight-gray rounded-md border'
          />
        ))}
      </div>

      <div className='flex justify-center space-x-2'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => viewImage(index)}
            className={`h-[10px] w-[10px] rounded-full ${
              currIndex === index ? 'bg-peach' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
