'use client';

import React from 'react';
import Link from 'next/link';
import {
  HoverArrow,
  ImageReveal,
  Reveal,
  Stagger,
  StaggerItem,
  DURATION,
  STAGGER,
} from '@/components/motion';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 space-y-24">
      {/* Editorial Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Stagger onMount gap={STAGGER.loose} className="max-w-3xl space-y-4">
          <StaggerItem>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
              The Studio Story
            </span>
          </StaggerItem>
          <StaggerItem duration={DURATION.slow}>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1A18] font-medium leading-tight">
              Curating considered spaces through architectural proportion and human craft.
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="text-sm sm:text-base text-[#8C8279] font-light leading-relaxed">
              Founded in 2021 by interior architects and master woodworkers in New York City, AURA was born out of a desire to create furniture and domestic objects that transcend fleeting trends.
            </p>
          </StaggerItem>
        </Stagger>

        <ImageReveal
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600"
          alt="AURA Design Studio Atelier"
          loading="eager"
          className="relative aspect-21/9 w-full rounded-xs bg-[#F0EBE1] shadow-xl"
        />
      </section>

      {/* Philosophy Grid */}
      <section className="bg-[#F0EBE1] py-20 border-y border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Reveal className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
              Our Four Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A18] font-medium">
              Designed for Generations
            </h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StaggerItem className="bg-white p-6 rounded-xs border border-[#E5E0D8] space-y-3 hover:shadow-lg transition-shadow duration-500">
              <span className="font-serif text-2xl text-[#D4AF37] font-semibold">01</span>
              <h3 className="font-serif text-xl font-medium text-[#1A1A18]">Architectural Discipline</h3>
              <p className="text-xs text-[#8C8279] font-light leading-relaxed">
                Every silhouette is calculated to balance negative space, weight distribution, and pure geometric simplicity.
              </p>
            </StaggerItem>

            <StaggerItem className="bg-white p-6 rounded-xs border border-[#E5E0D8] space-y-3 hover:shadow-lg transition-shadow duration-500">
              <span className="font-serif text-2xl text-[#D4AF37] font-semibold">02</span>
              <h3 className="font-serif text-xl font-medium text-[#1A1A18]">Authentic Materiality</h3>
              <p className="text-xs text-[#8C8279] font-light leading-relaxed">
                We never fake texture. Unbleached wool, solid timber, and honed limestone are left in their honest organic state.
              </p>
            </StaggerItem>

            <StaggerItem className="bg-white p-6 rounded-xs border border-[#E5E0D8] space-y-3 hover:shadow-lg transition-shadow duration-500">
              <span className="font-serif text-2xl text-[#D4AF37] font-semibold">03</span>
              <h3 className="font-serif text-xl font-medium text-[#1A1A18]">Heritage Artisanship</h3>
              <p className="text-xs text-[#8C8279] font-light leading-relaxed">
                Partnering with small-batch family workshops across Kyoto, Kyoto, and Portugal preserving centuries of joinery.
              </p>
            </StaggerItem>

            <StaggerItem className="bg-white p-6 rounded-xs border border-[#E5E0D8] space-y-3 hover:shadow-lg transition-shadow duration-500">
              <span className="font-serif text-2xl text-[#D4AF37] font-semibold">04</span>
              <h3 className="font-serif text-xl font-medium text-[#1A1A18]">Tactile Quietude</h3>
              <p className="text-xs text-[#8C8279] font-light leading-relaxed">
                Objects that soothe the nervous system—encouraging presence, calm reflection, and effortless domesticity.
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Studio Team & Craft CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <Reveal direction="right" className="space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            The Atelier
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A18] font-medium">
            Visited Our NYC Flagship
          </h2>
          <p className="text-xs sm:text-sm text-[#8C8279] font-light leading-relaxed">
            Located in Manhattan’s Soho Design District, our studio gallery serves as an immersive sanctuary where clients and interior designers can experience full spatial installations and touch material swatches in natural light.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="group inline-flex items-center space-x-2 bg-[#1A1A18] text-white hover:bg-[#333230] text-xs font-semibold uppercase tracking-[0.2em] py-3.5 px-6 rounded-xs transition-colors"
            >
              <span>Schedule Private Visit</span>
              <HoverArrow />
            </Link>
          </div>
        </Reveal>

        <ImageReveal
          src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1200"
          alt="NYC Gallery Studio"
          className="aspect-4/3 w-full rounded-xs bg-[#F0EBE1] border border-[#E5E0D8]"
        />
      </section>
    </div>
  );
};

export default AboutPage;
