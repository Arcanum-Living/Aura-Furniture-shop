import type { Metadata } from 'next';
import { InfoPage } from '@/components/content/InfoPage';

export const metadata: Metadata = { title: 'Privacy Policy — AURA' };

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="AURA is a frontend portfolio demo. It has no backend and does not collect, send or sell your personal data."
      sections={[
        {
          heading: 'What is stored',
          paragraphs: [
            'Your shopping bag, wishlist and demo sign-in are saved only in your own browser, using localStorage. The demo admin area saves its changes the same way.',
            'Forms such as the newsletter, enquiry and sign-in forms are simulated. Nothing you type is sent to a server.',
          ],
        },
        {
          heading: 'Third-party requests',
          paragraphs: [
            'Product and editorial images are loaded from Unsplash and fonts from Google Fonts. Like any website request, those services receive standard technical data such as your IP address and browser type.',
          ],
        },
        {
          heading: 'Removing your data',
          paragraphs: ["Clear this site's data in your browser settings to remove everything the demo has saved."],
        },
      ]}
    />
  );
}
