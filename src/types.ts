export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'living' | 'bedroom' | 'dining' | 'office' | 'lighting' | 'decor';
  subcategory: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription?: string;
  material: string;
  materialsList?: string[];
  color: string;
  availableColors?: { name: string; hex: string }[];
  dimensions: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  newArrival?: boolean;
  inStock: boolean;
  designer?: string;
  leadTime?: string;
  careInstructions?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Interior Design' | 'Furniture' | 'Materials' | 'Lifestyle' | 'Guides';
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  excerpt: string;
  content: {
    type: 'paragraph' | 'heading' | 'quote' | 'image' | 'list';
    text?: string;
    url?: string;
    caption?: string;
    items?: string[];
  }[];
}

export interface CollectionCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
  featuredProductIds: string[];
}
