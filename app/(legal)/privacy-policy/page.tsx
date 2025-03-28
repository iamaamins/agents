import PrivacyPolicy from '@/components/legal/PrivacyPolicy';
import { openGraph } from '@/lib/metadata';
import { Metadata } from 'next';

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PrivacyPolicy />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'UPDATE: Privacy Policy | Business',
  description:
    'UPDATE: Business is committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your information.',
  openGraph: {
    ...openGraph,
    title: 'Privacy Policy',
  },
  alternates: {
    canonical: '/privacy-policy',
  },
};
