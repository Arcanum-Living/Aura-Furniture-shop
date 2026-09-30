import type { Metadata } from 'next';
import { InfoPage } from '@/components/content/InfoPage';

export const metadata: Metadata = { title: 'Care Guide — AURA' };

export default function CareGuidePage() {
  return (
    <InfoPage
      eyebrow="Client Care"
      title="Care Guide"
      intro="Natural materials age beautifully with a little attention. Each product page also lists care notes specific to that piece."
      sections={[
        {
          heading: 'Solid Timber: Oak & Walnut',
          paragraphs: [
            'Clean with a soft, slightly damp cloth and dry immediately. Avoid harsh abrasive cleaners and prolonged exposure to moisture.',
            'Use table mats for hot dishes, and treat wooden surfaces once a year with a beeswax conditioner.',
          ],
        },
        {
          heading: 'Travertine, Marble & Stone',
          paragraphs: [
            'Wipe spills immediately and always use coasters. Use stone-safe, pH-neutral cleaners only — never acidic cleaners.',
          ],
        },
        {
          heading: 'Bouclé, Linen & Velvet Upholstery',
          paragraphs: [
            'Vacuum periodically with a soft brush attachment and fluff cushions regularly. Spot clean bouclé with a mild water-free solvent; professional cleaning is recommended for deep stains.',
            'Brush velvet gently in the direction of the nap. Removable linen slipcovers are dry-cleanable.',
          ],
        },
        {
          heading: 'Brass, Bronze & Leather',
          paragraphs: [
            'Dust metal gently with a dry microfiber cloth and do not use metal polishes on sealed brass. Condition leather twice a year with a balm.',
          ],
        },
        {
          heading: 'Rugs & Textiles',
          paragraphs: [
            'Vacuum wool rugs without a beater bar and rotate them annually for even wear. Machine wash linen textiles on a gentle, cold cycle.',
          ],
        },
      ]}
      cta={{ href: '/shop', label: 'Shop the Collection' }}
    />
  );
}
