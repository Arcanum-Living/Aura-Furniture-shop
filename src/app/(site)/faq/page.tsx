import type { Metadata } from 'next';
import { InfoPage } from '@/components/content/InfoPage';

export const metadata: Metadata = { title: 'FAQ & Support — AURA' };

export default function FaqPage() {
  return (
    <InfoPage
      eyebrow="Client Care"
      title="FAQ & Support"
      intro="Answers to the questions our concierge team hears most often."
      sections={[
        {
          heading: 'Is delivery included?',
          paragraphs: [
            'White glove delivery is complimentary on orders of $1,000 or more, and $150 on smaller orders.',
          ],
        },
        {
          heading: 'How long will my order take?',
          paragraphs: ['Each product page shows its current lead time, from in-stock pieces to made-to-order work.'],
        },
        {
          heading: 'Can I return a piece?',
          paragraphs: ['Yes. Every order includes a 30-day in-home trial with complimentary returns.'],
        },
        {
          heading: 'How do I care for natural materials?',
          paragraphs: ['Our care guide covers timber, stone, upholstery, metals and textiles.'],
        },
        {
          heading: 'Is AURA a real store?',
          paragraphs: [
            'AURA is a portfolio demo. Browsing, the shopping bag and the wishlist work in your browser, but no real orders, payments or accounts are processed.',
          ],
        },
      ]}
      cta={{ href: '/care-guide', label: 'Read the Care Guide' }}
    />
  );
}
