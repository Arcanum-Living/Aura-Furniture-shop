import type { Metadata } from 'next';
import { InfoPage } from '@/components/content/InfoPage';

export const metadata: Metadata = { title: 'Contact — AURA' };

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Client Care"
      title="Contact the Studio"
      intro="Visit our NYC flagship, write to our concierge team, or book a private design consultation."
      sections={[
        {
          heading: 'NYC Flagship Studio',
          paragraphs: ['125 Design District Avenue, New York, NY 10012'],
        },
        {
          heading: 'Email & Phone',
          paragraphs: ['hello@auradesign.com', '+1 (555) 123-4567'],
        },
        {
          heading: 'Opening Hours',
          paragraphs: ['Mon–Fri: 10am – 7pm EST', 'Sat–Sun: By Private Appointment'],
        },
      ]}
      cta={{ href: '/interior-design', label: 'Book a Design Consultation' }}
    />
  );
}
