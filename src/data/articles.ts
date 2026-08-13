import { JournalArticle } from '@/types';

export const MOCK_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    slug: 'how-to-create-a-calm-living-room',
    title: 'How to Create a Calm Living Room',
    subtitle: 'Principles of spatial subtraction, warm natural light, and tactile materiality.',
    category: 'Interior Design',
    date: 'February 4, 2026',
    readTime: '5 min read',
    author: {
      name: 'Astrid Lindqvist',
      role: 'Principal Interior Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
    },
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'In a world dominated by sensory overload, the home must serve as a sanctuary of quiet repose. Discover how subtle material choices and spatial rhythm transform standard living spaces.',
    content: [
      {
        type: 'paragraph',
        text: 'Creating a serene living environment is fundamentally an exercise in editing. Rather than asking what additional decor or furniture piece to introduce, considered interior design begins with subtractionâ€”removing visual friction and allowing spatial volume to breathe.'
      },
      {
        type: 'heading',
        text: '1. Embrace Tactile Neutrality'
      },
      {
        type: 'paragraph',
        text: 'Neutral color palettes need not feel cold or clinical. By pairing warm limestone, unbleached linen, and raw travertine with deep oiled timber, you introduce a rich spectrum of subtle texture without overwhelming the visual senses.'
      },
      {
        type: 'quote',
        text: 'Simplicity is not about having less. It is about making room for what matters.'
      },
      {
        type: 'heading',
        text: '2. Low Proportions & Unobstructed Sightlines'
      },
      {
        type: 'paragraph',
        text: 'Furniture positioned lower to the floor increases perceived ceiling height and draws the eye toward architectural windows and organic natural light shadows.'
      }
    ]
  },
  {
    id: 'art-2',
    slug: 'understanding-natural-wood-furniture',
    title: 'Understanding Natural Wood Furniture',
    subtitle: 'A guide to solid white oak, walnut grain, and organic hand-oiled finishes.',
    category: 'Materials',
    date: 'January 22, 2026',
    readTime: '7 min read',
    author: {
      name: 'Henrik Vane',
      role: 'Master Furniture Artisan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
    },
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Every piece of natural solid timber carries a unique historical grain story. Learn how sustainable harvesting and hand finishing preserve timber integrity for generations.',
    content: [
      {
        type: 'paragraph',
        text: 'Unlike mass-manufactured composite woods, solid European white oak and American walnut possess natural variations in color, grain, and figure that age gracefully with time.'
      },
      {
        type: 'heading',
        text: 'The Beauty of Live Grain'
      },
      {
        type: 'paragraph',
        text: 'When treated with organic hard-wax oils rather than thick plastic lacquers, wood retains its warm tactile feel and ability to naturally regulate moisture, acquiring a deep patina across decades.'
      }
    ]
  },
  {
    id: 'art-3',
    slug: 'the-art-of-layering-textures',
    title: 'The Art of Layering Textures',
    subtitle: 'Combining bouclÃ©, travertine stone, matte metals, and woven wool.',
    category: 'Guides',
    date: 'January 10, 2026',
    readTime: '4 min read',
    author: {
      name: 'Elena Vance',
      role: 'Senior Stylist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
    },
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'A room dressed in a single material feels flat. Discover how juxtaposing cold stone against soft wool and tactile bouclÃ© creates depth and tactile warmth.',
    content: [
      {
        type: 'paragraph',
        text: 'Texture is the silent storyteller of interior architecture. It invites touch and creates shadow play as sunlight shifts across a room throughout the day.'
      }
    ]
  }
];
