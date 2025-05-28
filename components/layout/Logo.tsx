import { brandFont } from '@/lib/utils';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/' className={`text-xl font-extrabold ${brandFont.className} `}>
      Age<span className='text-peach'>nts</span>
    </Link>
  );
}
