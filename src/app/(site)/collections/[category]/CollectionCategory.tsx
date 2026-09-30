'use client';

import React from 'react';
import Link from 'next/link';

import { CATEGORIES_DATA } from '@/data/categories';
import { MOCK_PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';
import type { CollectionCategory as CollectionCategoryData } from '@/types';
import { ImageReveal, Reveal, Stagger, StaggerItem, DURATION, STAGGER } from '@/components/motion';

/** Client UI for a collection page. The route's server `page.tsx` resolves the slug (or 404s). */
const CollectionCategory: React.FC<{ category: CollectionCategoryData }> = ({ category }) => {
  const categoryProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === category.slug
  );

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Category Banner */}
      <div className="relative aspect-21/9 w-full overflow-hidden rounded-xs bg-[#1A1A18] text-white flex items-center justify-center p-8">
        <ImageReveal
          src={category.image}
          alt={category.name}
          loading="eager"
          className="absolute inset-0 w-full h-full"
          imgClassName="opacity-40"
        />

        <Stagger onMount delay={0.15} className="relative z-10 text-center max-w-2xl space-y-3">
          <StaggerItem>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37]">
              {category.tagline}
            </span>
          </StaggerItem>

          <StaggerItem duration={DURATION.slow}>
            <h1 className="font-serif text-4xl sm:text-6xl font-medium">
              {category.name} Collection
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="text-xs sm:text-sm font-light text-[#E5E0D8] leading-relaxed">
              {category.description}
            </p>
          </StaggerItem>
        </Stagger>
      </div>

      {/* Navigation Tabs to other collections */}
      <Stagger
        onMount
        gap={STAGGER.tight}
        className="flex items-center justify-center space-x-2 sm:space-x-6 overflow-x-auto pb-4 border-b border-[#E5E0D8] text-xs font-semibold uppercase tracking-wider"
      >
        {CATEGORIES_DATA.map((cat) => (
          <StaggerItem key={cat.id} distance={8} duration={DURATION.fast}>
            <Link
              href={`/collections/${cat.slug}`}
              className={`block py-2 px-4 rounded-xs whitespace-nowrap transition-colors duration-300 ${
                cat.slug === category.slug
                  ? 'bg-[#1A1A18] text-white'
                  : 'text-[#8C8279] hover:text-[#1A1A18] hover:bg-[#F0EBE1]'
              }`}
            >
              {cat.name}
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Product Grid */}
      <div className="space-y-8">
        <Reveal className="flex justify-between items-center text-xs text-[#8C8279]">
          <span className="uppercase tracking-widest font-semibold text-[#1A1A18]">
            Curated Pieces ({categoryProducts.length})
          </span>

          <Link
            href="/shop"
            className="hover:underline font-medium"
          >
            View All Shop Furniture →
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionCategory;