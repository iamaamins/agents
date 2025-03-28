import Header from '@/components/home/Header';
import { openGraph } from '@/lib/metadata';
import { Metadata } from 'next';
import AboutMe from '@/components/home/AboutMe';
import CTA from '@/components/home/CTA';
import FAQ from '@/components/home/FAQ';
import Features from '@/components/home/Features';
import Footer from '@/components/home/Footer';
import Hero from '@/components/home/Hero';
import Promotion from '@/components/home/Promotion';
import ProblemStatement from '@/components/home/ProblemStatement';
import Pricing from '@/components/home/Pricing';
import Problems from '@/components/home/Problems';
import Comparison from '@/components/home/Comparison';

export default function HomePage() {
  return (
    <>
      <Promotion />
      <Header />
      <main>
        <Hero />
        <ProblemStatement />
        <Problems />
        <Features />
        <Comparison />
        <AboutMe />
        <Pricing />
        <FAQ />
        <CTA />
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
