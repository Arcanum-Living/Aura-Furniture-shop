import { CollectionCategory } from '../types';

export const CATEGORIES_DATA: CollectionCategory[] = [
  {
    id: 'cat-living',
    slug: 'living',
    name: 'Living',
    tagline: 'Sofas, Chairs & Tables',
    description: 'Anchor your living sanctuary with sculptural armchairs, low-slung sectionals, and monolithic stone tables.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
    itemCount: 24,
    featuredProductIds: ['prod-1', 'prod-4', 'prod-5', 'prod-13']
  },
  {
    id: 'cat-bedroom',
    slug: 'bedroom',
    name: 'Sanctuary & Bedroom',
    tagline: 'Beds & Textiles',
    description: 'Serene bed frames, tactile linen bedding, and floating nightstands designed for rest and quiet solitude.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200',
    itemCount: 18,
    featuredProductIds: ['prod-6', 'prod-14']
  },
  {
    id: 'cat-dining',
    slug: 'dining',
    name: 'Dining',
    tagline: 'Tables, Seating & Credenzas',
    description: 'Gather around tactile solid timber tables and handcrafted chairs built for memorable conversations.',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=1200',
    itemCount: 16,
    featuredProductIds: ['prod-2', 'prod-7']
  },
  {
    id: 'cat-office',
    slug: 'office',
    name: 'Office & Studio',
    tagline: 'Desks & Spatial Workspace',
    description: 'Architectural writing desks and refined storage thoughtfully engineered for focus, productivity, and inspiration.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1200',
    itemCount: 12,
    featuredProductIds: ['prod-9']
  },
  {
    id: 'cat-lighting',
    slug: 'lighting',
    name: 'Luminance & Lighting',
    tagline: 'Lamps & Pendants',
    description: 'Warm, sculptural illumination—from mouth-blown glass pendants to solid brass table accents.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200',
    itemCount: 15,
    featuredProductIds: ['prod-3', 'prod-8', 'prod-15']
  },
  {
    id: 'cat-decor',
    slug: 'decor',
    name: 'Objects & Decor',
    tagline: 'Vessels, Mirrors & Textiles',
    description: 'Carefully curated artisan ceramic vessels, wool rugs, mirrors, and throws that bring soul to every corner.',
    image: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&q=80&w=1200',
    itemCount: 22,
    featuredProductIds: ['prod-10', 'prod-11', 'prod-12', 'prod-16']
  }
];
