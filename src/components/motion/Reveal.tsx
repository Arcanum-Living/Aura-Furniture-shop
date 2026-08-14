'use client';

import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { DISTANCE, DURATION, EASE_OUT, VIEWPORT } from './tokens';

export type RevealDirection = 'none' | 'up' | 'down' | 'left' | 'right';

type MotionDivProps = Omit<
  HTMLMotionProps<'div'>,
  'initial' | 'animate' | 'whileInView' | 'viewport' | 'transition'
>;

export interface RevealProps extends MotionDivProps {
  /** Direction the element travels from. `none` is a pure fade. */
  direction?: RevealDirection;
  /** Travel distance in px. Defaults to the `md` token. */
  distance?: number;
  delay?: number;
  duration?: number;
  /** Animate immediately on mount instead of waiting for scroll. */
  onMount?: boolean;
  /** Replay every time the element re-enters the viewport. */
  repeat?: boolean;
}

const offsetFor = (direction: RevealDirection, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * Fade / fade-up / slide entrance, triggered on scroll by default.
 *
 * Under `prefers-reduced-motion` the travel collapses to zero and only the
 * opacity fade remains.
 */
export const Reveal: React.FC<RevealProps> = ({
  direction = 'up',
  distance = DISTANCE.md,
  delay = 0,
  duration = DURATION.base,
  onMount = false,
  repeat = false,
  children,
  ...rest
}) => {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? {} : offsetFor(direction, distance);
  const settled = { opacity: 1, x: 0, y: 0 };
  const transition = { duration, delay, ease: EASE_OUT };

  if (onMount) {
    return (
      <motion.div
        initial={{ opacity: 0, ...offset }}
        animate={settled}
        transition={transition}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={settled}
      viewport={{ ...VIEWPORT, once: !repeat }}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
