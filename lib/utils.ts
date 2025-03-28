import { Josefin_Sans } from 'next/font/google';

export const brandFont = Josefin_Sans({ subsets: ['latin'], display: 'swap' });

export function dateToText(input: string | Date) {
  const date = new Date(input);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export const formatNumber = (number: number) =>
  new Intl.NumberFormat('en-US').format(number);
