'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { DURATION, EASE_OUT, VIEWPORT } from './tokens';

export interface ImageRevealProps {
  src: string;
  alt: string;
  /** Classes for the clipping wrapper — put your aspect ratio / rounding here. */
  className?: string;
  /** Classes for the image itself. Defaults to a full-bleed cover fill. */
  imgClassName?: string;
  /** Scale the image gently on hover of the nearest `group` ancestor. */
  zoomOnHover?: boolean;
  delay?: number;
  loading?: 'eager' | 'lazy';
}

/**
 * Editorial image entrance: the photograph fades in while easing down from a
 * slight over-scale, so it appears to settle into its frame rather than pop.
 *
 * The wrapper clips, so the over-scale never shifts surrounding layout.
 */
export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className,
  imgClassName,
  zoomOnHover = false,
  delay = 0,
  loading = 'lazy',
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: DURATION.image, delay, ease: EASE_OUT }}
        className={cn(
          'w-full h-full object-cover object-center',
          zoomOnHover &&
            'transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100',
          imgClassName
        )}
      />
    </div>
  );
};
