'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Heart, Eye, Plus, Star } from 'lucide-react';
import { Product } from '@/types';
import { useShop } from '@/context/ShopContext';
import { DISTANCE, DURATION, EASE_OUT, STAGGER, VIEWPORT } from '@/components/motion';

interface ProductCardProps {
  product: Product;
  /** Position within its grid — drives the stagger cadence as the row scrolls in. */
  index?: number;
}

/** Cap the cascade so items far down a long grid don't sit waiting to appear. */
const MAX_STAGGER_STEPS = 7;

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const wishlisted = isInWishlist(product.id);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : DISTANCE.md }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      viewport={VIEWPORT}
      transition={{
        duration: DURATION.base,
        delay: Math.min(index, MAX_STAGGER_STEPS) * STAGGER.base,
        ease: EASE_OUT,
      }}
      className="group relative flex flex-col h-full bg-white border border-[#E5E0D8] p-4 rounded-xs hover:border-[#1A1A18] hover:shadow-lg transition-[color,background-color,border-color,box-shadow] duration-500"
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/5 w-full bg-[#F0EBE1] overflow-hidden rounded-xs border border-[#E5E0D8]/60">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1.5">
          {product.newArrival && (
            <span className="bg-[#1A1A18] text-white text-[9px] uppercase font-semibold tracking-[0.2em] px-2.5 py-1 rounded-xs">
              New Arrival
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-[#D4AF37] text-[#1A1A18] text-[9px] uppercase font-bold tracking-[0.15em] px-2.5 py-1 rounded-xs">
              Special
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#1A1A18] hover:bg-white transition-colors shadow-xs"
        >
          {/* Re-keyed on state so each toggle plays its own small settle. */}
          <motion.span
            key={wishlisted ? 'saved' : 'unsaved'}
            initial={{ scale: reduceMotion ? 1 : 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="flex"
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-300 ${
                wishlisted ? 'fill-[#8C8279] text-[#8C8279]' : 'text-[#1A1A18]'
              }`}
            />
          </motion.span>
        </motion.button>

        {/* Product Main Image */}
        <Link href ={`/shop/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} detail view`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
            />
          )}
        </Link>

        {/* Hover Action Bar (Quick Add & Quick View) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center space-x-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-linear-to-t from-black/40 to-transparent">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="flex-1 bg-[#1A1A18] hover:bg-[#333230] text-white text-xs font-medium tracking-widest uppercase py-2.5 px-3 rounded-xs flex items-center justify-center space-x-1.5 transition-colors shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            aria-label="Quick view"
            className="w-9 h-9 bg-white text-[#1A1A18] rounded-xs flex items-center justify-center hover:bg-[#F9F8F6] transition-colors shadow-md"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-4 pb-2 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#8C8279]">
            {product.category}
          </span>
          <div className="flex items-center space-x-1 text-xs text-[#1A1A18]">
            <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
            <span className="text-[11px] font-semibold">{product.rating}</span>
          </div>
        </div>

        <Link href ={`/shop/${product.slug}`} className="group-hover:text-[#8C8279] transition-colors">
          <h3 className="font-serif text-lg font-medium text-[#1A1A18] line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-[#8C8279] font-light mt-0.5 line-clamp-1">
          {product.material}
        </p>

        <div className="mt-3 pt-2 border-t border-[#E5E0D8]/60 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-[#1A1A18]">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#8C8279] line-through font-light">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#8C8279] tracking-wider uppercase font-light">
            {product.leadTime?.split('—')[0] || 'In Stock'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
