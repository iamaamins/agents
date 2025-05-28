import Header from '@/components/home/Header';
import { openGraph } from '@/lib/metadata';
import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Agents from '@/components/home/Agents';
import Footer from '@/components/home/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Agents />
      </main>
      <Footer />
    </>
  );
}

export const metadata: Metadata = {
  title: 'UPDATE: Title | Business',
  description: 'UPDATE: Description',
  openGraph: {
    ...openGraph,
    title: 'UPDATE: Title',
  },
  alternates: {
    canonical: '/',
  },
};
