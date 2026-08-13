'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES_DATA } from '@/data/categories';

const CollectionsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 border-b border-[#E5E0D8] pb-10">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
          Spatial Curation
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1A18] font-medium">
          The Collections
        </h1>
        <p className="text-sm text-[#8C8279] font-light leading-relaxed">
          Explore spatial environments curated by interior architectsâ€”where form, proportion, and organic natural materials unify into harmonious living quarters.
        </p>
      </div>

      {/* Magazine Editorial Category Blocks */}
      <div className="space-y-20">
        {CATEGORIES_DATA.map((cat, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Category Photography (7 Cols) */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <Link
                  href ={`/collections/${cat.slug}`}
                  className="block relative aspect-16/10 w-full overflow-hidden rounded-xs bg-[#F0EBE1] group shadow-xl"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </Link>
              </div>

              {/* Category Editorial Content (5 Cols) */}
              <div className={`lg:col-span-5 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
                  0{idx + 1} â€” {cat.tagline}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A18] font-medium">
                  {cat.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#8C8279] font-light leading-relaxed">
                  {cat.description}
                </p>
                <div className="pt-2">
                  <Link
                    href ={`/collections/${cat.slug}`}
                    className="inline-flex items-center space-x-2 bg-[#1A1A18] text-white hover:bg-[#333230] text-xs font-semibold uppercase tracking-[0.2em] py-3.5 px-6 rounded-xs transition-colors shadow-md"
                  >
                    <span>Explore {cat.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionsPage;
