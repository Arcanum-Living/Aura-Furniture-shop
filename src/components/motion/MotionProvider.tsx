'use client';

import React from 'react';
import { MotionConfig } from 'motion/react';
import { DURATION, EASE_OUT } from './tokens';

/**
 * App-wide motion defaults.
 *
 * `reducedMotion="user"` makes every Motion component honour the OS
 * `prefers-reduced-motion` setting: transforms are dropped and only opacity
 * animates. Our own primitives additionally zero out their travel distance, so
 * reduced-motion users get a plain cross-fade rather than movement.
 */
export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MotionConfig
    reducedMotion="user"
    transition={{ duration: DURATION.base, ease: EASE_OUT }}
  >
    {children}
  </MotionConfig>
);
