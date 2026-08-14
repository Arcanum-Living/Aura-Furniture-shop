'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Plus, Minus, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { useShop } from '@/context/ShopContext';
import { AnimatedValue, HoverArrow, DURATION, EASE_OUT } from '@/components/motion';

/**
 * Presence wrapper. The contents live in their own component so the modal can
 * finish its exit animation before unmounting — returning `null` from here on a
 * cleared product would tear it off the screen mid-transition.
 */
export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct } = useShop();

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <QuickView
          key={quickViewProduct.id}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </AnimatePresence>
  );
};

const QuickView: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  const wishlisted = isInWishlist(product.id);
  const mainImage = product.images[selectedImageIndex] || product.images[0];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    onClose();
  };

  return (
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.fast, ease: EASE_OUT }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 16 }}
          transition={{ duration: DURATION.fast, ease: EASE_OUT }}
          className="relative w-full max-w-4xl bg-[#F9F8F6] shadow-2xl rounded-xs overflow-hidden z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={() => onClose()}
            className="absolute top-4 right-4 z-20 p-2 text-[#1A1A18] hover:opacity-70 bg-white/80 rounded-full transition-opacity"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Left */}
            <div className="p-6 bg-[#F0EBE1] flex flex-col justify-between">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-xs bg-white mb-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={mainImage}
                    src={mainImage}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: DURATION.fast, ease: EASE_OUT }}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                      className={`w-16 h-16 rounded-xs overflow-hidden border-2 transition-[border-color,opacity] duration-300 ${
                        selectedImageIndex === idx
                          ? 'border-[#1A1A18] opacity-100'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Spec Details Right */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C8279]">
                  {product.category}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1A18] mt-1">
                  {product.name}
                </h3>

                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-xl font-semibold text-[#1A1A18]">
                    ${product.price.toLocaleString()}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-[#1A1A18] bg-[#E5E0D8]/60 px-2.5 py-1 rounded-xs">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-[#8C8279]">({product.reviewsCount})</span>
                  </div>
                </div>

                <p className="text-xs text-[#8C8279] leading-relaxed mt-4 font-light">
                  {product.description}
                </p>

                {/* Color Selector */}
                {product.availableColors && (
                  <div className="mt-6">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A18] mb-2">
                      Color Finish: <span className="font-light text-[#8C8279]">{selectedColor || product.color}</span>
                    </label>
                    <div className="flex items-center space-x-3">
                      {product.availableColors.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                            (selectedColor || product.color) === col.name
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
                  <p><span className="font-semibold text-[#8C8279]">Material:</span> {product.material}</p>
                  <p><span className="font-semibold text-[#8C8279]">Dimensions:</span> {product.dimensions}</p>
                  <p><span className="font-semibold text-[#8C8279]">Shipping:</span> {product.leadTime}</p>
                </div>
              </div>

              {/* Add to Cart Actions */}
              <div className="space-y-3 pt-4 border-t border-[#E5E0D8]">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-[#E5E0D8] bg-white rounded-xs">
                    <motion.button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.15, ease: EASE_OUT }}
                      className="p-2.5 text-[#1A1A18] hover:bg-[#F0EBE1] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </motion.button>
                    <AnimatedValue
                      value={quantity}
                      className="px-4 text-xs font-semibold text-[#1A1A18]"
                    />
                    <motion.button
                      onClick={() => setQuantity(quantity + 1)}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.15, ease: EASE_OUT }}
                      className="p-2.5 text-[#1A1A18] hover:bg-[#F0EBE1] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>

                  <motion.button
                    onClick={handleAddToCart}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15, ease: EASE_OUT }}
                    className="group flex-1 bg-[#1A1A18] hover:bg-[#333230] text-white text-xs font-medium uppercase tracking-[0.2em] py-3.5 px-6 rounded-xs flex items-center justify-center space-x-2 transition-colors shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
                    <span>Add to Bag</span>
                  </motion.button>

                  <motion.button
                    onClick={() => toggleWishlist(product.id)}
                    whileTap={{ scale: 0.92 }}
                    transition={{ duration: 0.15, ease: EASE_OUT }}
                    className="p-3.5 border border-[#E5E0D8] hover:border-[#1A1A18] bg-white text-[#1A1A18] rounded-xs transition-colors"
                    aria-label="Wishlist"
                  >
                    <motion.span
                      key={wishlisted ? 'saved' : 'unsaved'}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                      className="flex"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors duration-300 ${
                          wishlisted ? 'fill-[#8C8279] text-[#8C8279]' : ''
                        }`}
                      />
                    </motion.span>
                  </motion.button>
                </div>

                <Link
                  href={`/shop/${product.slug}`}
                  onClick={() => onClose()}
                  className="group flex items-center justify-center gap-2 text-center text-xs text-[#8C8279] hover:text-[#1A1A18] font-medium uppercase tracking-wider transition-colors pt-2"
                >
                  <span>View Full Product Details &amp; Specifications</span>
                  <HoverArrow className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
  );
};
