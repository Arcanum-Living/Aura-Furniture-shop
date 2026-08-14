'use client';

import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from 'motion/react';
import { DISTANCE, DURATION, EASE_OUT, STAGGER, VIEWPORT } from './tokens';

type MotionDivProps = Omit<
  HTMLMotionProps<'div'>,
  'initial' | 'animate' | 'whileInView' | 'viewport' | 'variants'
>;

export interface StaggerProps extends MotionDivProps {
  /** Delay between each child, in seconds. */
  gap?: number;
  /** Delay before the first child animates. */
  delay?: number;
  /** Animate on mount instead of on scroll. */
  onMount?: boolean;
  repeat?: boolean;
}

/**
 * Orchestrates a group of `StaggerItem` children so they arrive one after the
 * other. Children must be `StaggerItem` (or any Motion component using the
 * `staggerItemVariants`) for the cascade to propagate.
 */
export const Stagger: React.FC<StaggerProps> = ({
  gap = STAGGER.base,
  delay = 0,
  onMount = false,
  repeat = false,
  children,
  ...rest
}) => {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: gap, delayChildren: delay },
    },
  };

  const trigger = onMount
    ? { animate: 'visible' as const }
    : {
        whileInView: 'visible' as const,
        viewport: { ...VIEWPORT, once: !repeat },
      };

  return (
    <motion.div initial="hidden" variants={container} {...trigger} {...rest}>
      {children}
    </motion.div>
  );
};

export interface StaggerItemProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  distance?: number;
  duration?: number;
}

/** A single member of a `Stagger` group. Fades up as its turn comes round. */
export const StaggerItem: React.FC<StaggerItemProps> = ({
  distance = DISTANCE.md,
  duration = DURATION.base,
  children,
  ...rest
}) => {
  const reduceMotion = useReducedMotion();

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : distance },
    visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT } },
  };

  return (
    <motion.div variants={item} {...rest}>
      {children}
    </motion.div>
  );
};
