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

const CraftPage: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Material Selection',
      desc: 'We source FSC-certified European white oak, American walnut, and unblemished Roman limestone from certified sustainable quarries and forests. Each log and stone slab is hand-selected for figure and density.',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=1000'
    },
    {
      step: '02',
      title: 'Architectural Proportions & Prototyping',
      desc: 'Our design team in New York sketches 1:1 scale wood mockups to test ergonomics, sightlines, and weight balance. Every joint is calculated for maximum tensile strength without visible hardware.',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1000'
    },
    {
      step: '03',
      title: 'Hand Joinery & Stonemasonry',
      desc: 'Master craftspeople utilize traditional mortise-and-tenon wood joinery and precision stone honing. No quick-assembly glues or particleboard staples are ever permitted in an AURA creation.',
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=1000'
    },
    {
      step: '04',
      title: 'Organic Finishing',
      desc: 'Timber surfaces are treated with organic hard-wax oils that seep deep into the grain while allowing the natural timber to breathe. Travertine stone is sealed with a non-yellowing food-safe matte barrier.',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=1000'
    },
    {
      step: '05',
      title: 'Rigorous Quality Control & White Glove Shipping',
      desc: 'Before leaving our workshop, each piece undergoes a 12-point inspection covering structural tolerance, cushion resilience, and hand finish uniformity, wrapped in recycled felt blankets for transit.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <Stagger
        onMount
        gap={STAGGER.loose}
        className="text-center max-w-3xl mx-auto space-y-4 border-b border-[#E5E0D8] pb-10"
      >
        <StaggerItem>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            The Artisanal Journey
          </span>
        </StaggerItem>
        <StaggerItem duration={DURATION.slow}>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1A18] font-medium">
            Our Craft Process
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="text-sm text-[#8C8279] font-light leading-relaxed">
            From sustainable forest timber and raw travertine quarries to precision joinery and hand finishing.
          </p>
        </StaggerItem>
      </Stagger>

      {/* Timeline Steps */}
      <div className="space-y-16">
        {steps.map((item, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <Reveal
              key={item.step}
              duration={DURATION.slow}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white p-8 rounded-xs border border-[#E5E0D8] shadow-xs hover:shadow-lg transition-shadow duration-500"
            >
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <ImageReveal
                  src={item.image}
                  alt={item.title}
                  zoomOnHover
                  className="aspect-16/10 w-full rounded-xs bg-[#F0EBE1]"
                />
              </div>

              <Reveal
                direction={isEven ? 'left' : 'right'}
                delay={0.1}
                className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
              >
                <span className="font-serif text-3xl font-semibold text-[#D4AF37]">
                  {item.step}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A18] font-medium">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8C8279] font-light leading-relaxed">
                  {item.desc}
                </p>
              </Reveal>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="text-center pt-8">
        <Link
        href="/shop"
          className="group inline-flex items-center space-x-2 bg-[#1A1A18] text-white hover:bg-[#333230] text-xs font-semibold uppercase tracking-[0.2em] py-4 px-8 rounded-xs transition-colors shadow-md"
        >
          <span>Explore Handcrafted Pieces</span>
          <HoverArrow />
        </Link>
      </Reveal>
    </div>
  );
};

export default CraftPage;
