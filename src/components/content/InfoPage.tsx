import React from 'react';
import Link from 'next/link';
import { HoverArrow, Reveal, Stagger, StaggerItem, DURATION, STAGGER } from '@/components/motion';

export interface InfoSection {
  heading: string;
  paragraphs: string[];
}

interface InfoPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  sections: InfoSection[];
  cta?: { href: string; label: string };
}

/** Simple editorial text page (contact, FAQ, care, policies) in the About page's style. */
export const InfoPage: React.FC<InfoPageProps> = ({ eyebrow, title, intro, sections, cta }) => (
  <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
    <Stagger onMount gap={STAGGER.loose} className="max-w-3xl space-y-4 border-b border-[#E5E0D8] pb-10">
      <StaggerItem>
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
          {eyebrow}
        </span>
      </StaggerItem>
      <StaggerItem duration={DURATION.slow}>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1A18] font-medium leading-tight">
          {title}
        </h1>
      </StaggerItem>
      <StaggerItem>
        <p className="text-sm sm:text-base text-[#8C8279] font-light leading-relaxed">{intro}</p>
      </StaggerItem>
    </Stagger>

    <div className="max-w-3xl space-y-12">
      {sections.map((section) => (
        <Reveal key={section.heading} className="space-y-3">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A18] font-medium">
            {section.heading}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-xs sm:text-sm text-[#8C8279] font-light leading-relaxed">
              {paragraph}
            </p>
          ))}
        </Reveal>
      ))}

      {cta && (
        <Reveal className="pt-2">
          <Link
            href={cta.href}
            className="group inline-flex items-center space-x-2 bg-[#1A1A18] text-white hover:bg-[#333230] text-xs font-semibold uppercase tracking-[0.2em] py-3.5 px-6 rounded-xs transition-colors"
          >
            <span>{cta.label}</span>
            <HoverArrow />
          </Link>
        </Reveal>
      )}
    </div>
  </div>
);
