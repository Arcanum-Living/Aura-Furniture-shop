'use client';

import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { EASE_OUT } from './tokens';

export interface AnimatedValueProps {
  /** The displayed value. Changing it crossfades the old text out and the new in. */
  value: string | number;
  className?: string;
  /** Direction the new value arrives from. */
  direction?: 'up' | 'down';
}

/**
 * Crossfades a changing figure — a running total, a line subtotal, a quantity —
 * so prices update with a beat rather than flicking to a new number.
 *
 * `mode="popLayout"` keeps the outgoing value out of the flow, so the row
 * doesn't jump while the two states overlap.
 */
export const AnimatedValue: React.FC<AnimatedValueProps> = ({
  value,
  className,
  direction = 'up',
}) => {
  const reduceMotion = useReducedMotion();
  const travel = reduceMotion ? 0 : direction === 'up' ? 6 : -6;

  return (
    <span className={cn('relative inline-block tabular-nums', className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ opacity: 0, y: travel }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -travel }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
