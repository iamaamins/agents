import { brandFont } from '@/lib/utils';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/' className={`text-xl font-extrabold ${brandFont.className} `}>
      Busi<span className='text-peach'>Ness</span>
    </Link>
  );
}
