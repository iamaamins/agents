'use client';

import { MdErrorOutline } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useAlert } from '@/contexts/Alert';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

export default function Alert() {
  const { alert } = useAlert();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (alert) {
      setShowAlert(true);
      timeoutId = setTimeout(() => setShowAlert(false), 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [alert]);

  return (
    <div
      className={`fixed right-1/2 z-50 w-max translate-x-1/2 rounded-full px-[14px] py-2 font-semibold transition-all duration-150 ease-linear ${
        showAlert ? 'top-[24.5px] md:top-[18.5px]' : '-top-[45px]'
      } ${alert?.type === 'success' && 'bg-green'} ${
        alert?.type === 'failed' && 'bg-red-500'
      } md:py-[6px]`}
    >
      <p className='flex items-center justify-center text-white'>
        {alert?.type === 'success' ? (
          <IoMdCheckmarkCircleOutline className='mr-2 text-[1.2rem]' />
        ) : (
          <MdErrorOutline className='mr-2 text-[1.2rem]' />
        )}
        {alert?.message}
      </p>
    </div>
  );
}
