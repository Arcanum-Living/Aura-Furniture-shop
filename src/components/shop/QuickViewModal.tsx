'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Plus, Minus, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  if (!quickViewProduct) return null;

  const wishlisted = isInWishlist(quickViewProduct.id);
  const mainImage = quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0];

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor);
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#F9F8F6] shadow-2xl rounded-xs overflow-hidden z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-[#1A1A18] hover:opacity-70 bg-white/80 rounded-full transition-opacity"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Left */}
            <div className="p-6 bg-[#F0EBE1] flex flex-col justify-between">
              <div className="aspect-4/5 w-full overflow-hidden rounded-xs bg-white mb-4">
                <img
                  src={mainImage}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex space-x-2">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xs overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#1A1A18] opacity-100'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Spec Details Right */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C8279]">
                  {quickViewProduct.category}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1A18] mt-1">
                  {quickViewProduct.name}
                </h3>

                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-xl font-semibold text-[#1A1A18]">
                    ${quickViewProduct.price.toLocaleString()}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-[#1A1A18] bg-[#E5E0D8]/60 px-2.5 py-1 rounded-xs">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span className="font-semibold">{quickViewProduct.rating}</span>
                    <span className="text-[#8C8279]">({quickViewProduct.reviewsCount})</span>
                  </div>
                </div>

                <p className="text-xs text-[#8C8279] leading-relaxed mt-4 font-light">
                  {quickViewProduct.description}
                </p>

                {/* Color Selector */}
                {quickViewProduct.availableColors && (
                  <div className="mt-6">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A18] mb-2">
                      Color Finish: <span className="font-light text-[#8C8279]">{selectedColor || quickViewProduct.color}</span>
                    </label>
                    <div className="flex items-center space-x-3">
                      {quickViewProduct.availableColors.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                            (selectedColor || quickViewProduct.color) === col.name
                              ? 'border-[#1A1A18] scale-110'
                              : 'border-transparent hover:scale-105'
                          }`}
                          title={col.name}
                        >
                          <span
                            className="w-5 h-5 rounded-full border border-black/10"
                            style={{ backgroundColor: col.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dimensions & Material */}
                <div className="mt-6 pt-4 border-t border-[#E5E0D8] space-y-1.5 text-xs text-[#1A1A18]">
                  <p><span className="font-semibold text-[#8C8279]">Material:</span> {quickViewProduct.material}</p>
                  <p><span className="font-semibold text-[#8C8279]">Dimensions:</span> {quickViewProduct.dimensions}</p>
                  <p><span className="font-semibold text-[#8C8279]">Shipping:</span> {quickViewProduct.leadTime}</p>
                </div>
              </div>

              {/* Add to Cart Actions */}
              <div className="space-y-3 pt-4 border-t border-[#E5E0D8]">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-[#E5E0D8] bg-white rounded-xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 text-[#1A1A18] hover:bg-[#F0EBE1] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-semibold text-[#1A1A18]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 text-[#1A1A18] hover:bg-[#F0EBE1] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#1A1A18] hover:bg-[#333230] text-white text-xs font-medium uppercase tracking-[0.2em] py-3.5 px-6 rounded-xs flex items-center justify-center space-x-2 transition-colors shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="p-3.5 border border-[#E5E0D8] hover:border-[#1A1A18] bg-white text-[#1A1A18] rounded-xs transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#8C8279] text-[#8C8279]' : ''}`} />
                  </button>
                </div>

                <Link
                  href={`/shop/${quickViewProduct.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="block text-center text-xs text-[#8C8279] hover:text-[#1A1A18] font-medium uppercase tracking-wider transition-colors pt-2"
                >
                  View Full Product Details & Specifications â†’
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
