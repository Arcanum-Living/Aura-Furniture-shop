export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  lowStockThreshold: number;
  status: 'Published' | 'Draft' | 'Out of Stock';
  isFeatured: boolean;
  isNewArrival: boolean;
  material: string;
  color: string;
  dimensions: string;
  weight: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  salesCount: number;
  revenue: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  date: string;
  itemsCount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: {
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
  }[];
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  status: 'Active' | 'Archived';
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  status: 'Active' | 'VIP' | 'Inactive';
  address: string;
  phone: string;
}

export interface AdminReview {
  id: string;
  productName: string;
  productImage: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  reviewText: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Hidden';
}

export interface AdminMessage {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Read' | 'Replied';
  replyText?: string;
}

export interface AdminSubscriber {
  id: string;
  email: string;
  subscribedDate: string;
  status: 'Subscribed' | 'Unsubscribed';
}

export interface AdminJournalArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedDate: string;
  status: 'Published' | 'Draft';
}

export interface AdminCollection {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  productCount: number;
  isFeatured: boolean;
  displayOrder: number;
}

// Initial Mock Data
export const initialProducts: AdminProduct[] = [
  {
    id: 'prod-1',
    name: 'Klova Lounge Chair',
    slug: 'klova-lounge-chair',
    category: 'Living',
    subcategory: 'Seating',
    price: 1250,
    compareAtPrice: 1450,
    sku: 'AURA-KLV-01',
    stock: 4,
    lowStockThreshold: 5,
    status: 'Published',
    isFeatured: true,
    isNewArrival: false,
    material: 'Bouclé Fabric & Solid Walnut',
    color: 'Warm Cream',
    dimensions: '32"W x 34"D x 30"H',
    weight: '28 kg',
    description: 'Sculptural lounge chair featuring tactile bouclé upholstery and an organic solid walnut frame.',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-01-15',
    updatedAt: '2026-08-01',
    salesCount: 124,
    revenue: 155000,
  },
  {
    id: 'prod-2',
    name: 'Aero Dining Chair',
    slug: 'aero-dining-chair',
    category: 'Dining',
    subcategory: 'Chairs',
    price: 480,
    compareAtPrice: 550,
    sku: 'AURA-AER-02',
    stock: 18,
    lowStockThreshold: 8,
    status: 'Published',
    isFeatured: true,
    isNewArrival: true,
    material: 'Natural Ash & Linen Blend',
    color: 'Oatmeal',
    dimensions: '21"W x 22"D x 31"H',
    weight: '8.5 kg',
    description: 'Minimalist dining chair designed with fluid curves and lightweight ash wood frame.',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-02-10',
    updatedAt: '2026-07-28',
    salesCount: 98,
    revenue: 47040,
  },
  {
    id: 'prod-3',
    name: 'Lumina Table Lamp',
    slug: 'lumina-table-lamp',
    category: 'Lighting',
    subcategory: 'Table Lamps',
    price: 320,
    compareAtPrice: 380,
    sku: 'AURA-LUM-03',
    stock: 6,
    lowStockThreshold: 10,
    status: 'Published',
    isFeatured: false,
    isNewArrival: true,
    material: 'Brushed Brass & Travertine Stone',
    color: 'Warm Gold',
    dimensions: '12"D x 18"H',
    weight: '4.2 kg',
    description: 'Architectural desk lamp with travertine pedestal base and warm diffused glow.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-03-01',
    updatedAt: '2026-08-05',
    salesCount: 86,
    revenue: 27520,
  },
  {
    id: 'prod-4',
    name: 'Oasis Coffee Table',
    slug: 'oasis-coffee-table',
    category: 'Living',
    subcategory: 'Tables',
    price: 1850,
    sku: 'AURA-OAS-04',
    stock: 2,
    lowStockThreshold: 5,
    status: 'Published',
    isFeatured: true,
    isNewArrival: false,
    material: 'Honed Calacatta Marble',
    color: 'Veined White',
    dimensions: '48"L x 32"W x 15"H',
    weight: '62 kg',
    description: 'Monolithic coffee table crafted from solid hand-finished Calacatta marble slab.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-01-20',
    updatedAt: '2026-08-02',
    salesCount: 45,
    revenue: 83250,
  },
  {
    id: 'prod-5',
    name: 'Arden 3-Seater Sofa',
    slug: 'arden-3-seater-sofa',
    category: 'Living',
    subcategory: 'Sofas',
    price: 3400,
    compareAtPrice: 3800,
    sku: 'AURA-ARD-05',
    stock: 12,
    lowStockThreshold: 4,
    status: 'Published',
    isFeatured: true,
    isNewArrival: false,
    material: 'Performance Belgian Linen',
    color: 'Sand Taupe',
    dimensions: '94"W x 38"D x 28"H',
    weight: '75 kg',
    description: 'Deep-seated luxury sofa filled with feather-down blend and heavy-duty natural linen wrap.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
    createdAt: '2025-11-12',
    updatedAt: '2026-07-20',
    salesCount: 62,
    revenue: 210800,
  },
  {
    id: 'prod-6',
    name: 'Mira Side Table',
    slug: 'mira-side-table',
    category: 'Living',
    subcategory: 'Tables',
    price: 640,
    sku: 'AURA-MIR-06',
    stock: 15,
    lowStockThreshold: 5,
    status: 'Published',
    isFeatured: false,
    isNewArrival: true,
    material: 'Ebonized Oak & Smoked Glass',
    color: 'Charcoal Black',
    dimensions: '18"D x 22"H',
    weight: '9 kg',
    description: 'Cylindrical accent side table featuring fluted oak detailing and tempered glass top.',
    image: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-04-05',
    updatedAt: '2026-08-08',
    salesCount: 52,
    revenue: 33280,
  },
  {
    id: 'prod-7',
    name: 'Luna King Bed',
    slug: 'luna-king-bed',
    category: 'Bedroom',
    subcategory: 'Beds',
    price: 2950,
    sku: 'AURA-LUN-07',
    stock: 7,
    lowStockThreshold: 3,
    status: 'Published',
    isFeatured: true,
    isNewArrival: false,
    material: 'Upholstered Velvet & Solid White Oak',
    color: 'Warm Almond',
    dimensions: '82"W x 88"L x 48"H',
    weight: '88 kg',
    description: 'Plush winged headboard frame crafted from sustainable kiln-dried white oak.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-02-28',
    updatedAt: '2026-07-15',
    salesCount: 38,
    revenue: 112100,
  },
  {
    id: 'prod-8',
    name: 'Noir Floor Lamp',
    slug: 'noir-floor-lamp',
    category: 'Lighting',
    subcategory: 'Floor Lamps',
    price: 580,
    sku: 'AURA-NOI-08',
    stock: 0,
    lowStockThreshold: 5,
    status: 'Out of Stock',
    isFeatured: false,
    isNewArrival: false,
    material: 'Matte Steel & Frosted Opal Glass',
    color: 'Matte Black',
    dimensions: '16"W x 64"H',
    weight: '11 kg',
    description: 'Slender architectural floor lamp providing soft, indirect ambient illumination.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-03-12',
    updatedAt: '2026-08-09',
    salesCount: 41,
    revenue: 23780,
  },
  {
    id: 'prod-9',
    name: 'Siena Extension Dining Table',
    slug: 'siena-extension-dining-table',
    category: 'Dining',
    subcategory: 'Tables',
    price: 3200,
    sku: 'AURA-SIE-09',
    stock: 5,
    lowStockThreshold: 2,
    status: 'Published',
    isFeatured: true,
    isNewArrival: false,
    material: 'Solid European Walnut',
    color: 'Natural Walnut',
    dimensions: '78"-102"L x 38"W x 30"H',
    weight: '92 kg',
    description: 'Seamless extendable dining table seating up to 10 guests with internal leaf mechanism.',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-01-05',
    updatedAt: '2026-07-10',
    salesCount: 29,
    revenue: 92800,
  },
  {
    id: 'prod-10',
    name: 'Forma Executive Desk',
    slug: 'forma-executive-desk',
    category: 'Office',
    subcategory: 'Desks',
    price: 2100,
    sku: 'AURA-FOR-10',
    stock: 9,
    lowStockThreshold: 4,
    status: 'Published',
    isFeatured: false,
    isNewArrival: true,
    material: 'Smoked Oak & Anodized Bronze',
    color: 'Espresso',
    dimensions: '66"W x 30"D x 29.5"H',
    weight: '54 kg',
    description: 'Ergonomic executive desk with concealed cable management and soft-close leather drawers.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-05-01',
    updatedAt: '2026-08-02',
    salesCount: 33,
    revenue: 69300,
  },
  {
    id: 'prod-11',
    name: 'Nora Accent Chair',
    slug: 'nora-accent-chair',
    category: 'Living',
    subcategory: 'Seating',
    price: 980,
    sku: 'AURA-NOR-11',
    stock: 14,
    lowStockThreshold: 6,
    status: 'Published',
    isFeatured: false,
    isNewArrival: true,
    material: 'Terracotta Corduroy & Matte Black Iron',
    color: 'Terracotta',
    dimensions: '29"W x 31"D x 32"H',
    weight: '19 kg',
    description: 'Mid-century inspired accent chair upholstered in textured plush corduroy.',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-05-18',
    updatedAt: '2026-08-07',
    salesCount: 47,
    revenue: 46060,
  },
  {
    id: 'prod-12',
    name: 'Atlas Oak Sideboard',
    slug: 'atlas-oak-sideboard',
    category: 'Dining',
    subcategory: 'Storage',
    price: 2650,
    sku: 'AURA-ATL-12',
    stock: 3,
    lowStockThreshold: 3,
    status: 'Draft',
    isFeatured: false,
    isNewArrival: false,
    material: 'Solid White Oak & Brass Latches',
    color: 'Light Oak',
    dimensions: '72"W x 19"D x 31"H',
    weight: '68 kg',
    description: 'Four-door credenza featuring hand-carved relief doors and adjustable shelving inside.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-06-10',
    updatedAt: '2026-08-01',
    salesCount: 15,
    revenue: 39750,
  }
];

export const initialOrders: AdminOrder[] = [
  {
    id: 'ord-1024',
    orderNumber: '#AURA-1024',
    customerName: 'Sarah Mitchell',
    customerEmail: 'sarah.m@example.com',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    date: 'Aug 11, 2026',
    itemsCount: 3,
    total: 2450,
    paymentMethod: 'Apple Pay',
    paymentStatus: 'Paid',
    status: 'Processing',
    shippingAddress: {
      street: '742 Evergreen Terrace',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'United States',
    },
    items: [
      {
        productId: 'prod-1',
        productName: 'Klova Lounge Chair',
        productImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=200',
        price: 1250,
        quantity: 1,
      },
      {
        productId: 'prod-3',
        productName: 'Lumina Table Lamp',
        productImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=200',
        price: 320,
        quantity: 2,
      },
    ],
  },
  {
    id: 'ord-1023',
    orderNumber: '#AURA-1023',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.v@example.com',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    date: 'Aug 10, 2026',
    itemsCount: 2,
    total: 4280,
    paymentMethod: 'Credit Card (Visa)',
    paymentStatus: 'Paid',
    status: 'Shipped',
    shippingAddress: {
      street: '1200 Madison Ave, Suite 14',
      city: 'New York',
      state: 'NY',
      zip: '10028',
      country: 'United States',
    },
    items: [
      {
        productId: 'prod-5',
        productName: 'Arden 3-Seater Sofa',
        productImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=200',
        price: 3400,
        quantity: 1,
      },
      {
        productId: 'prod-2',
        productName: 'Aero Dining Chair',
        productImage: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=200',
        price: 480,
        quantity: 2,
      },
    ],
  },
  {
    id: 'ord-1022',
    orderNumber: '#AURA-1022',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.r@example.com',
    customerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    date: 'Aug 09, 2026',
    itemsCount: 1,
    total: 1850,
    paymentMethod: 'Credit Card (Mastercard)',
    paymentStatus: 'Paid',
    status: 'Delivered',
    shippingAddress: {
      street: '450 Ocean Drive',
      city: 'Miami',
      state: 'FL',
      zip: '33139',
      country: 'United States',
    },
    items: [
      {
        productId: 'prod-4',
        productName: 'Oasis Coffee Table',
        productImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=200',
        price: 1850,
        quantity: 1,
      },
    ],
  },
  {
    id: 'ord-1021',
    orderNumber: '#AURA-1021',
    customerName: 'Julian Sterling',
    customerEmail: 'julian.s@example.com',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    date: 'Aug 08, 2026',
    itemsCount: 4,
    total: 1920,
    paymentMethod: 'PayPal',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    shippingAddress: {
      street: '88 Beverly Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90210',
      country: 'United States',
    },
    items: [
      {
        productId: 'prod-2',
        productName: 'Aero Dining Chair',
        productImage: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=200',
        price: 480,
        quantity: 4,
      },
    ],
  },
  {
    id: 'ord-1020',
    orderNumber: '#AURA-1020',
    customerName: 'Amara Okafor',
    customerEmail: 'amara.o@example.com',
    customerAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150',
    date: 'Aug 07, 2026',
    itemsCount: 1,
    total: 2950,
    paymentMethod: 'Credit Card (Amex)',
    paymentStatus: 'Paid',
    status: 'Pending',
    shippingAddress: {
      street: '310 Michigan Ave',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      country: 'United States',
    },
    items: [
      {
        productId: 'prod-7',
        productName: 'Luna King Bed',
        productImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=200',
        price: 2950,
        quantity: 1,
      },
    ],
  },
  {
    id: 'ord-1019',
    orderNumber: '#AURA-1019',
    customerName: 'David Chen',
    customerEmail: 'david.c@example.com',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    date: 'Aug 05, 2026',
    itemsCount: 2,
    total: 1220,
    paymentMethod: 'Apple Pay',
    paymentStatus: 'Refunded',
    status: 'Cancelled',
    shippingAddress: {
      street: '150 Market St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States',
    },
    items: [
      {
        productId: 'prod-3',
        productName: 'Lumina Table Lamp',
        productImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=200',
        price: 320,
        quantity: 1,
      },
      {
        productId: 'prod-11',
        productName: 'Nora Accent Chair',
        productImage: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&q=80&w=200',
        price: 900,
        quantity: 1,
      },
    ],
  }
];

export const initialCategories: AdminCategory[] = [
  {
    id: 'cat-1',
    name: 'Living',
    slug: 'living',
    description: 'Sculptural seating, coffee tables, and tailored lounge pieces.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400',
    productCount: 48,
    status: 'Active',
    createdAt: '2025-08-10',
  },
  {
    id: 'cat-2',
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Serene bed frames, nightstands, and organic linen bedding.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=400',
    productCount: 32,
    status: 'Active',
    createdAt: '2025-08-10',
  },
  {
    id: 'cat-3',
    name: 'Dining',
    slug: 'dining',
    description: 'Architectural dining tables, handcrafted chairs, and sideboards.',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=400',
    productCount: 28,
    status: 'Active',
    createdAt: '2025-08-12',
  },
  {
    id: 'cat-4',
    name: 'Office',
    slug: 'office',
    description: 'Refined executive desks, ergonomic chairs, and filing systems.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=400',
    productCount: 19,
    status: 'Active',
    createdAt: '2025-09-01',
  },
  {
    id: 'cat-5',
    name: 'Lighting',
    slug: 'lighting',
    description: 'Sculptural floor lamps, brass pendants, and stone desk illumination.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=400',
    productCount: 24,
    status: 'Active',
    createdAt: '2025-09-15',
  },
  {
    id: 'cat-6',
    name: 'Decor',
    slug: 'decor',
    description: 'Hand-thrown ceramics, travertine vessels, and woven textiles.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400',
    productCount: 35,
    status: 'Active',
    createdAt: '2025-10-01',
  }
];

export const initialCustomers: AdminCustomer[] = [
  {
    id: 'cust-1',
    name: 'Sarah Mitchell',
    email: 'sarah.m@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    ordersCount: 8,
    totalSpent: 14850,
    joinedDate: 'Jan 12, 2025',
    status: 'VIP',
    address: '742 Evergreen Terrace, Seattle, WA',
    phone: '+1 (206) 555-0192',
  },
  {
    id: 'cust-2',
    name: 'Marcus Vance',
    email: 'marcus.v@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    ordersCount: 5,
    totalSpent: 9620,
    joinedDate: 'Mar 04, 2025',
    status: 'VIP',
    address: '1200 Madison Ave, New York, NY',
    phone: '+1 (212) 555-0144',
  },
  {
    id: 'cust-3',
    name: 'Elena Rostova',
    email: 'elena.r@example.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    ordersCount: 3,
    totalSpent: 4200,
    joinedDate: 'Nov 18, 2025',
    status: 'Active',
    address: '450 Ocean Drive, Miami, FL',
    phone: '+1 (305) 555-0188',
  },
  {
    id: 'cust-4',
    name: 'Julian Sterling',
    email: 'julian.s@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    ordersCount: 2,
    totalSpent: 3100,
    joinedDate: 'Feb 14, 2026',
    status: 'Active',
    address: '88 Beverly Blvd, Los Angeles, CA',
    phone: '+1 (310) 555-0120',
  },
  {
    id: 'cust-5',
    name: 'Amara Okafor',
    email: 'amara.o@example.com',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150',
    ordersCount: 1,
    totalSpent: 2950,
    joinedDate: 'May 20, 2026',
    status: 'Active',
    address: '310 Michigan Ave, Chicago, IL',
    phone: '+1 (312) 555-0177',
  }
];

export const initialReviews: AdminReview[] = [
  {
    id: 'rev-1',
    productName: 'Klova Lounge Chair',
    productImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=150',
    customerName: 'Sarah Mitchell',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    reviewText: 'The bouclé texture is exquisite and the walnut craftsmanship exceeded my expectations. A true centerpiece in our living room.',
    date: 'Aug 04, 2026',
    status: 'Approved',
  },
  {
    id: 'rev-2',
    productName: 'Arden 3-Seater Sofa',
    productImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=150',
    customerName: 'Marcus Vance',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    reviewText: 'Exceptionally comfortable deep seating. Linen fabric cleans easily and feels luxurious to the touch.',
    date: 'Aug 02, 2026',
    status: 'Approved',
  },
  {
    id: 'rev-3',
    productName: 'Lumina Table Lamp',
    productImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=150',
    customerName: 'Claire Dupont',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    rating: 4,
    reviewText: 'Solid travertine weight gives it such presence. Provides the perfect warm glow for evening reading.',
    date: 'Jul 29, 2026',
    status: 'Pending',
  }
];

export const initialMessages: AdminMessage[] = [
  {
    id: 'msg-1',
    customerName: 'Oliver Vance',
    customerEmail: 'oliver@vancearch.com',
    subject: 'Trade Account & Custom Fabric Inquiry',
    message: 'Hello AURA Team, I am an interior architect based in Boston working on a residential penthouse project. Do you offer trade pricing for bulk orders of the Klova Chair?',
    date: 'Aug 10, 2026 • 09:42 AM',
    status: 'Unread',
  },
  {
    id: 'msg-2',
    customerName: 'Hannah Abbott',
    customerEmail: 'hannah.a@example.com',
    subject: 'Delivery Timeline for Siena Dining Table',
    message: 'Hi there, I placed order #AURA-1021 yesterday. Could you confirm if white-glove assembly is included with delivery to Los Angeles?',
    date: 'Aug 09, 2026 • 03:15 PM',
    status: 'Read',
    replyText: 'Hi Hannah, Yes! White-glove assembly and packaging removal are included free of charge for all dining table orders.',
  }
];

export const initialSubscribers: AdminSubscriber[] = [
  { id: 'sub-1', email: 'victoria.sterling@atelier.com', subscribedDate: 'Jan 02, 2026', status: 'Subscribed' },
  { id: 'sub-2', email: 'architect.chen@designstudio.io', subscribedDate: 'Jan 15, 2026', status: 'Subscribed' },
  { id: 'sub-3', email: 'sophia.g@luxuryhomes.com', subscribedDate: 'Feb 10, 2026', status: 'Subscribed' },
  { id: 'sub-4', email: 'derek.w@interiors.org', subscribedDate: 'Mar 22, 2026', status: 'Subscribed' },
  { id: 'sub-5', email: 'contact@minimalistspace.co', subscribedDate: 'Apr 05, 2026', status: 'Subscribed' },
];

export const initialJournalArticles: AdminJournalArticle[] = [
  {
    id: 'art-1',
    title: 'The Art of Tactile Warmth: Bouclé and Walnut',
    slug: 'the-art-of-tactile-warmth',
    category: 'Material Focus',
    author: 'Elena Vance',
    excerpt: 'Exploring how organic textures and rich timber bring grounded serenity to contemporary interiors.',
    content: 'In modern architecture, material contrast creates emotion. Pairing raw bouclé with oiled walnut creates a tactile dialogue...',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    publishedDate: 'Jul 24, 2026',
    status: 'Published',
  },
  {
    id: 'art-2',
    title: 'Illumination as Architecture: Ambient Light in Open Spaces',
    slug: 'illumination-as-architecture',
    category: 'Interior Styling',
    author: 'Marcus Lind',
    excerpt: 'How sculpted travertine and frosted glass transform functional lighting into living art.',
    content: 'Lighting is not merely utility; it dictates the spatial pulse of a room...',
    coverImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800',
    publishedDate: 'Aug 02, 2026',
    status: 'Published',
  }
];

export const initialCollections: AdminCollection[] = [
  {
    id: 'col-1',
    name: 'Living Room Atelier',
    description: 'Sculptural lounge chairs, monolithic marble tables, and Belgian linen sofas.',
    coverImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
    productCount: 14,
    isFeatured: true,
    displayOrder: 1,
  },
  {
    id: 'col-2',
    name: 'Sustainable Oak Series',
    description: 'Handcrafted solid European white oak dining tables and sideboards.',
    coverImage: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=600',
    productCount: 9,
    isFeatured: true,
    displayOrder: 2,
  },
  {
    id: 'col-3',
    name: 'Minimalist Workspace',
    description: 'Smoked oak executive desks, ergonomic seating, and warm desk lighting.',
    coverImage: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600',
    productCount: 8,
    isFeatured: false,
    displayOrder: 3,
  }
];

export const initialSettings = {
  storeName: 'AURA Furniture Atelier',
  storeEmail: 'admin@auradesign.com',
  phone: '+1 (800) 555-AURA',
  address: '125 Design District Ave, Suite 400, New York, NY 10012',
  currency: 'USD ($)',
  taxRate: 8.875,
  defaultShippingFee: 150,
  emailNotifications: true,
  orderNotifications: true,
  lowStockNotifications: true,
  adminName: 'Victoria Sterling',
  adminRole: 'Administrator',
  adminEmail: 'victoria.sterling@auradesign.com',
};
