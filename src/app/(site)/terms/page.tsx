import type { Metadata } from 'next';
import { InfoPage } from '@/components/content/InfoPage';

export const metadata: Metadata = { title: 'Terms & Conditions — AURA' };

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="AURA is a portfolio demo built for educational purposes, not a real store."
      sections={[
        {
          heading: 'No real sales',
          paragraphs: [
            'Products, prices, stock and the AURA brand are fictional. Placing an order in the demo does not create a purchase, payment or delivery.',
          ],
        },
        {
          heading: 'Accounts',
          paragraphs: ['Sign-in and registration are simulated in your browser. No account is created on any server.'],
        },
        {
          heading: 'Imagery',
          paragraphs: ['Photography is sourced from Unsplash and remains the property of its photographers.'],
        },
      ]}
    />
  );
}
