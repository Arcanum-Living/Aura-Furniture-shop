'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HoverArrowProps {
  className?: string;
}

/**
 * An arrow that eases forward when its nearest `group` ancestor is hovered.
 * Pure CSS, so it costs nothing and works inside Server Components' markup.
 * Requires `group` on the parent link/button.
 */
export const HoverArrow: React.FC<HoverArrowProps> = ({ className }) => (
  <ArrowRight
    aria-hidden="true"
    className={cn(
      'w-4 h-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0',
      className
    )}
  />
);

export interface HoverUnderlineProps {
  children: React.ReactNode;
  className?: string;
  /** Draw the rule from the nearest `group` ancestor's hover instead of its own. */
  fromGroup?: boolean;
}

/**
 * A hairline rule that draws itself left-to-right on hover — the house style
 * for text links. Uses `currentColor` so it inherits whatever palette it lands in.
 */
export const HoverUnderline: React.FC<HoverUnderlineProps> = ({
  children,
  className,
  fromGroup = false,
}) => (
  <span
    className={cn(
      'relative inline-block',
      'after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-current',
      'after:transition-[width] after:duration-300 after:ease-out',
      fromGroup ? 'group-hover:after:w-full' : 'hover:after:w-full',
      'motion-reduce:after:transition-none',
      className
    )}
  >
    {children}
  </span>
);
