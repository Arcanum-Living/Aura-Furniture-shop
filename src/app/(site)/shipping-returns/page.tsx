import type { Metadata } from 'next';
import { InfoPage } from '@/components/content/InfoPage';

export const metadata: Metadata = { title: 'Shipping & Returns — AURA' };

export default function ShippingReturnsPage() {
  return (
    <InfoPage
      eyebrow="Client Care"
      title="Shipping & Returns"
      intro="Every piece is delivered with care and backed by our in-home trial and frame guarantee."
      sections={[
        {
          heading: 'White Glove Delivery',
          paragraphs: [
            'Orders of $1,000 or more receive complimentary white glove delivery and assembly. Orders under $1,000 have a flat white glove delivery fee of $150.',
            'Taxes and delivery are calculated in your shopping bag before you place an order.',
          ],
        },
        {
          heading: 'Lead Times',
          paragraphs: [
            'Many pieces ship from stock within a few business days; made-to-order pieces take longer. The current lead time is shown on every product page.',
          ],
        },
        {
          heading: '30-Day In-Home Trial & Returns',
          paragraphs: [
            'Live with your piece for 30 days. If it is not right for your space, contact our concierge team to arrange a complimentary return.',
          ],
        },
        {
          heading: '10-Year Guarantee',
          paragraphs: ['Our frames and joinery are covered by a 10-year artisanal guarantee.'],
        },
      ]}
      cta={{ href: '/contact', label: 'Contact Client Care' }}
    />
  );
}
