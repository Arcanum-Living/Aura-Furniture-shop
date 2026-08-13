import React from 'react';
import Link from 'next/link';
import { ArrowUpRight} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A18] text-[#F9F8F6] pt-16 pb-12 border-t border-[#1A1A18]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#333230]">
          
          {/* Brand Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link
              href="/"
              className="font-serif italic text-3xl tracking-[0.1em] text-white inline-block"
            >
              AURA
            </Link>
            <p className="text-sm font-light text-[#A8A29E] leading-relaxed max-w-sm">
              Defining modern luxury through intentional design, timeless aesthetics, and unparalleled artisanal craftsmanship.
            </p>
            <div className="flex items-center space-x-4 pt-2">
          <a
  href="https://instagram.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram"
  className="w-10 h-10 rounded-full border border-[#44423E] flex items-center justify-center text-[#D8D0C5] hover:text-white hover:border-white transition-colors"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37a4 4 0 1 1-3.37-3.37A4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
</a>

<a
  href="https://pinterest.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Pinterest"
  className="w-10 h-10 rounded-full border border-[#44423E] flex items-center justify-center text-[#D8D0C5] hover:text-white hover:border-white transition-colors"
>
  <span className="text-xs font-bold font-serif">P</span>
</a>

<a
  href="https://facebook.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Facebook"
  className="w-10 h-10 rounded-full border border-[#44423E] flex items-center justify-center text-[#D8D0C5] hover:text-white hover:border-white transition-colors"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z" />
  </svg>
</a>
            </div>
          </div>

          {/* Shop Column (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]">
              Collection
            </h4>
            <ul className="space-y-2.5 text-sm font-light text-[#D8D0C5]">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Furniture
                </Link>
              </li>
              <li>
                <Link href="/collections/living" className="hover:text-white transition-colors">
                  Living Sanctuary
                </Link>
              </li>
              <li>
                <Link href="/collections/bedroom" className="hover:text-white transition-colors">
                  Bedroom & Textiles
                </Link>
              </li>
              <li>
                <Link href="/collections/dining" className="hover:text-white transition-colors">
                  Dining & Seating
                </Link>
              </li>
              <li>
                <Link href="/collections/lighting" className="hover:text-white transition-colors">
                  Luminance & Lamps
                </Link>
              </li>
              <li>
                <Link href="/collections/decor" className="hover:text-white transition-colors">
                  Objects & Decor
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-sm font-light text-[#D8D0C5]">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ & Support
                </Link>
              </li>
              <li>
                <Link href="/care-guide" className="hover:text-white transition-colors">
                  Care Guide
                </Link>
              </li>
              <li>
                <Link href="/interior-design" className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>Trade Program</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Location (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]">
              NYC Flagship Studio
            </h4>
            <div className="text-sm font-light text-[#D8D0C5] space-y-2">
              <p>125 Design District Avenue</p>
              <p>New York, NY 10012</p>
              <p className="pt-2 text-white font-normal">hello@auradesign.com</p>
              <p className="text-[#A8A29E]">+1 (555) 123-4567</p>
              <p className="pt-2 text-xs text-[#8C8279]">
                Mon–Fri: 10am – 7pm EST<br />
                Sat–Sun: By Private Appointment
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#8C8279] space-y-4 md:space-y-0">
          <p>© 2026 AURA Design Studio LLC. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-[#D8D0C5] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#D8D0C5] transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
