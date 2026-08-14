'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { AnimatedValue, HoverArrow, DURATION, EASE_IN_OUT, EASE_OUT } from '@/components/motion';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen
  } = useShop();

  const FREE_SHIPPING_THRESHOLD = 1000;
  const progressPercent = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - cartSubtotal;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE_IN_OUT }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: EASE_IN_OUT }}
              className="w-screen max-w-md bg-[#F9F8F6] shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#1A1A18]" />
                  <h2 className="font-serif text-xl tracking-wide font-medium text-[#1A1A18]">
                    Your Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-[#1A1A18] hover:opacity-70 transition-opacity"
                  aria-label="Close cart"
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="bg-[#F0EBE1] px-6 py-3 border-b border-[#E5E0D8]">
                <AnimatePresence mode="wait" initial={false}>
                  {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? (
                    <motion.p
                      key="unlocked"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: DURATION.fast, ease: EASE_OUT }}
                      className="text-xs text-[#1A1A18] font-medium tracking-wide text-center"
                    >
                      âœ¨ Congratulations! You unlocked <span className="font-semibold text-[#8C8279]">Complimentary White Glove Delivery</span>.
                    </motion.p>
                  ) : (
                    <motion.div
                      key="progress"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: DURATION.fast, ease: EASE_OUT }}
                      className="space-y-1.5"
                    >
                      <p className="text-xs text-[#1A1A18] font-light">
                        Add <span className="font-semibold">${remainingForFreeShipping.toLocaleString()}</span> more to enjoy free white-glove shipping.
                      </p>
                      <div className="w-full bg-[#E5E0D8] h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          className="bg-[#8C8279] h-full origin-left"
                          initial={false}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: DURATION.base, ease: EASE_OUT }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-[#E5E0D8]">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: DURATION.base, delay: 0.15, ease: EASE_OUT }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#F0EBE1] flex items-center justify-center text-[#8C8279]">
                      <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-[#1A1A18]">
                      Your bag is empty
                    </h3>
                    <p className="text-xs text-[#8C8279] max-w-xs font-light">
                      Explore our curated furniture and objects designed for considered living.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 bg-[#1A1A18] text-white text-xs font-medium uppercase tracking-[0.2em] py-3 px-6 rounded-xs hover:bg-[#333230] transition-colors"
                    >
                      Explore Collection
                    </button>
                  </motion.div>
                ) : (
                  <AnimatePresence initial={false} mode="popLayout">
                  {cart.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                      transition={{ duration: DURATION.fast, ease: EASE_OUT }}
                      className="group pt-6 first:pt-0 flex space-x-4"
                    >
                      {/* Product Thumbnail */}
                      <Link
                        href ={`/shop/${item.product.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="w-20 h-24 bg-[#F0EBE1] rounded-xs overflow-hidden shrink-0"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </Link>

                      {/* Product Specs */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <Link
                            href ={`/shop/${item.product.slug}`}
                              onClick={() => setIsCartOpen(false)}
                              className="font-serif text-base font-medium text-[#1A1A18] hover:text-[#8C8279] transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <motion.button
                              onClick={() => removeFromCart(item.product.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.2, ease: EASE_OUT }}
                              className="text-[#8C8279] hover:text-[#1A1A18] transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4 stroke-[1.5]" />
                            </motion.button>
                          </div>
                          <p className="text-xs text-[#8C8279] mt-0.5 font-light">
                            {item.selectedColor || item.product.color}
                          </p>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-[#E5E0D8] bg-white rounded-xs">
                            <motion.button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.15, ease: EASE_OUT }}
                              className="p-1.5 text-[#1A1A18] hover:bg-[#F0EBE1] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </motion.button>
                            <AnimatedValue
                              value={item.quantity}
                              className="px-3 text-xs font-semibold text-[#1A1A18]"
                            />
                            <motion.button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.15, ease: EASE_OUT }}
                              className="p-1.5 text-[#1A1A18] hover:bg-[#F0EBE1] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </motion.button>
                          </div>

                          <AnimatedValue
                            value={`$${(item.product.price * item.quantity).toLocaleString()}`}
                            className="text-sm font-semibold text-[#1A1A18]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-[#E5E0D8] space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-[#8C8279] uppercase tracking-wider">
                      <span>Subtotal</span>
                      <AnimatedValue
                        value={`$${cartSubtotal.toLocaleString()}`}
                        className="font-semibold text-[#1A1A18]"
                      />
                    </div>
                    <p className="text-[11px] text-[#8C8279] font-light">
                      Taxes and white glove shipping calculated at checkout.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Link
                    href ="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="group w-full bg-[#1A1A18] hover:bg-[#333230] text-white text-xs font-medium uppercase tracking-[0.2em] py-3.5 px-4 rounded-xs flex items-center justify-center space-x-2 transition-colors"
                    >
                      <span>View Cart & Checkout</span>
                      <HoverArrow />
                    </Link>

                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full text-center text-xs text-[#8C8279] hover:text-[#1A1A18] tracking-widest uppercase py-2 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
