import { ReactNode } from 'react';
import GoBackButton from '@/components/layout/GoBackButton';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className='mx-auto max-w-2xl space-y-8 px-4 py-6'>
      <GoBackButton />
      {children}
    </div>
  );
}
