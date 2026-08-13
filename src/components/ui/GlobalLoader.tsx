'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { CometSpinner } from './comet-spinner';
import { useShop } from '@/context/ShopContext';

export const GlobalLoader: React.FC = () => {
  const { isPageLoading, setIsPageLoading } = useShop();
  const pathname = usePathname();

  const [routeLoading, setRouteLoading] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // Initial site load timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
      setInitialLoaded(true);
    }, 850);

    return () => clearTimeout(timer);
  }, [setIsPageLoading]);

  // Route change loader trigger
  useEffect(() => {
    if (!initialLoaded) return;

    setRouteLoading(true);

    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname, initialLoaded]);

  const showLoader = isPageLoading || routeLoading;

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F9F8F6]/90 backdrop-blur-md pointer-events-auto"
          id="global-comet-loader"
        >
          {/* Brand Watermark Background */}
          <div className="absolute font-serif italic text-8xl text-[#1A1A18]/5 select-none tracking-widest pointer-events-none">
            AURA
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Comet Spinner */}
            <CometSpinner />

            {/* Subtitle Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center space-y-1"
            >
              <div className="font-serif italic text-lg text-[#1A1A18] tracking-wider">
                AURA
              </div>

              <p className="text-[10px] tracking-[0.3em] uppercase text-[#8C8279] font-medium">
                Curated Living â€¢ Atelier
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};