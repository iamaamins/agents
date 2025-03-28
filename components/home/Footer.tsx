import Link from 'next/link';
import { FOOTER_DATA } from '@/data/home/FOOTER';
import Logo from '../layout/Logo';

export default function Footer() {
  return (
    <footer className='flex flex-col items-center gap-10 border-t border-slight-gray px-4 py-6 text-center md:flex-row md:items-start md:justify-between md:text-left'>
      <div className='flex flex-col items-center gap-3 md:items-start'>
        <Logo />
        <div className='text-sm leading-relaxed opacity-90'>
          <p>Deliver the features your customers want.</p>
          <p>
            Copyright &copy; {new Date().getFullYear()} - All rights reserved.
          </p>
        </div>
      </div>
      {FOOTER_DATA.map((section, index) => (
        <div key={index} className='space-y-3'>
          <p className='text-sm font-semibold tracking-widest'>
            {section.title}
          </p>
          <div className='flex flex-col gap-2 text-sm'>
            {section.links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={link.label === 'Support' ? '_blank' : '_self'}
                className='hover:underline'
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </footer>
  );
}
