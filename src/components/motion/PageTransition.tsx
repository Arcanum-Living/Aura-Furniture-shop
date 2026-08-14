'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { DISTANCE, DURATION, EASE_OUT } from './tokens';

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Route-level entrance. Keying on the pathname remounts the wrapper on every
 * navigation, so each page eases in from a whisper below rather than snapping
 * into place.
 *
 * Deliberately entrance-only: the App Router swaps the tree before an exit
 * animation could finish, and holding the old page back to play one out would
 * make navigation feel slower, not more considered.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children, className }) => {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: reduceMotion ? 0 : DISTANCE.sm }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.fast, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
