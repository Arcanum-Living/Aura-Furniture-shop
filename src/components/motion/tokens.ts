/**
 * Shared motion tokens for AURA.
 *
 * One vocabulary of easings, durations and travel distances so every animation
 * across the site and the admin atelier reads as the same brand gesture:
 * slow, weighted, and settling — never bouncy or springy.
 */

/** Primary easing — a long, decelerating settle. Used for entrances. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Symmetric easing for state changes that go both ways (open/close). */
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DURATION = {
  /** Micro-interactions: badges, toggles, dropdowns. */
  fast: 0.3,
  /** Default entrance for text blocks and cards. */
  base: 0.6,
  /** Editorial moments: hero copy, large imagery. */
  slow: 0.9,
  /** Image reveals, where the settle should be almost imperceptible. */
  image: 1.1,
} as const;

/** Vertical / horizontal travel in px. Deliberately small — luxury is restraint. */
export const DISTANCE = {
  sm: 8,
  md: 16,
  lg: 28,
} as const;

/** Stagger cadence between siblings in a group. */
export const STAGGER = {
  tight: 0.05,
  base: 0.08,
  loose: 0.12,
} as const;

/**
 * Scroll trigger config. Fires once, slightly before the element is fully in
 * view so content is already settled by the time the reader reaches it.
 */
export const VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -8% 0px',
} as const;
