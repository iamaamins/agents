import { brandFont } from '@/lib/utils';

export default function Brand() {
  return (
    <span className={`${brandFont.className} font-bold`}>
      Busi<span className='text-peach'>Ness</span>
    </span>
  );
}
