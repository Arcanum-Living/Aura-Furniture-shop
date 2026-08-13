import { Product, ProductReview } from '@/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'klova-lounge-chair',
    name: 'Klova Lounge Chair',
    category: 'living',
    subcategory: 'Chairs & Armchairs',
    price: 1250,
    originalPrice: 1400,
    description: 'Sculptural lounge chair featuring soft ivory bouclÃ© upholstery and solid white oak frame with sculpted organic curves.',
    longDescription: 'The Klova Lounge Chair balances arch architectural proportions with inviting softness. Crafted with solid kiln-dried white oak and upholstered in high-density tactile bouclÃ© wool-blend fabric, it creates an anchor of calm sophistication in contemporary living spaces.',
    material: 'Ivory BouclÃ© & Solid Oak',
    materialsList: ['Solid Kiln-Dried White Oak', 'Textured BouclÃ© Fabric (80% Wool, 20% Acrylic)', 'High-Density Memory Foam Cushioning'],
    color: 'Ivory / Natural Oak',
    availableColors: [
      { name: 'Ivory', hex: '#F4F1EA' },
      { name: 'Oatmeal', hex: '#D8D0C5' },
      { name: 'Charcoal', hex: '#333230' }
    ],
    dimensions: '34"W x 36"D x 31"H (Seat Height: 17.5")',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9,
    reviewsCount: 38,
    featured: true,
    newArrival: true,
    inStock: true,
    designer: 'Studio Studio K&O',
    leadTime: 'In stock â€” Ships in 3â€“5 business days',
    careInstructions: 'Spot clean with mild water-free solvent. Professional cleaning recommended for deep stains. Vacuum periodically with soft brush attachment.'
  },
  {
    id: 'prod-2',
    slug: 'aero-dining-chair',
    name: 'Aero Dining Chair',
    category: 'dining',
    subcategory: 'Dining Chairs',
    price: 480,
    description: 'Minimalist dining chair in matte black stained oak with hand-caned natural rattan backrest.',
    longDescription: 'A study in quiet discipline, the Aero Dining Chair unites raw Japanese minimal sensibilities with Scandinavian joinery. Precision turned oak frame supports a hand-woven rattan inset back and sculpted wooden seat pan.',
    material: 'Matte Black Oak & Rattan',
    materialsList: ['Sustainable FSC-Certified European Oak', 'Natural Hand-Woven Rattan', 'Matte Lacquer Finish'],
    color: 'Matte Black',
    availableColors: [
      { name: 'Matte Black', hex: '#1C1C1A' },
      { name: 'Natural Oak', hex: '#CBAF8B' },
      { name: 'Smoked Walnut', hex: '#524338' }
    ],
    dimensions: '20"W x 21.5"D x 30.5"H (Seat Height: 18")',
    images: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.8,
    reviewsCount: 24,
    featured: true,
    newArrival: false,
    inStock: true,
    designer: 'Henrik Vane',
    leadTime: 'In stock â€” Ships in 2â€“4 business days',
    careInstructions: 'Wipe with soft, slightly damp cloth. Avoid harsh abrasive cleaners or prolonged exposure to direct moisture.'
  },
  {
    id: 'prod-3',
    slug: 'lumina-table-lamp',
    name: 'Lumina Table Lamp',
    category: 'lighting',
    subcategory: 'Table Lamps',
    price: 320,
    description: 'Architectural desk lamp with spun brushed brass dome shade and honed travertine stone stem.',
    longDescription: 'Casting a warm downward ambient wash, Lumina combines tactile honed Italian travertine stone with solid brushed brass hardware. Features an integrated touch dimmer on the base.',
    material: 'Brushed Brass & Travertine',
    materialsList: ['Natural Unfilled Travertine Stone', 'Spun Solid Brass', 'Braided Textile Cord'],
    color: 'Brushed Brass',
    availableColors: [
      { name: 'Brushed Brass', hex: '#C5A059' },
      { name: 'Burnished Steel', hex: '#4A4A4A' }
    ],
    dimensions: '12" Diameter x 16"H (Base: 4.5" W)',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 5.0,
    reviewsCount: 19,
    featured: true,
    newArrival: true,
    inStock: true,
    designer: 'Maren Lind',
    leadTime: 'In stock â€” Ships in 2 days',
    careInstructions: 'Dust gently with dry microfiber cloth. Do not use metal polishes on sealed brass surfaces.'
  },
  {
    id: 'prod-4',
    slug: 'oasis-coffee-table',
    name: 'Oasis Coffee Table',
    category: 'living',
    subcategory: 'Coffee Tables',
    price: 1850,
    originalPrice: 2100,
    description: 'Monolithic travertine stone coffee table with rounded pill silhouette and honed natural vein texture.',
    longDescription: 'Crafted from solid blocks of Italian Roman travertine, the Oasis Coffee Table brings monolithic timelessness into your living sanctuary. The porous natural stone surface is honed and sealed with a subtle matte protective finish.',
    material: 'Travertine Stone',
    materialsList: ['Solid Honed Travertine Stone', 'Internal Steel Reinforcement Frame'],
    color: 'Warm Ivory Stone',
    availableColors: [
      { name: 'Warm Travertine', hex: '#E2D3BE' },
      { name: 'Nero Marquina Marble', hex: '#2B2B2B' }
    ],
    dimensions: '52"W x 28"D x 14"H',
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9,
    reviewsCount: 42,
    featured: true,
    newArrival: false,
    inStock: true,
    designer: 'AURA Atelier',
    leadTime: 'White-glove delivery in 1â€“2 weeks',
    careInstructions: 'Wipe spills immediately. Use stone-safe ph-neutral cleaners only. Always use coasters.'
  },
  {
    id: 'prod-5',
    slug: 'solace-sectional-sofa',
    name: 'Solace Sectional Sofa',
    category: 'living',
    subcategory: 'Sofas',
    price: 3450,
    description: 'Low-profile modular sectional sofa upholstered in stain-resistant linen blend fabric with deep lounging seat.',
    longDescription: 'The Solace Sectional reimagines living room comfort with generous low-slung proportions and feather-down wrapped core cushions. Modularity allows endless spatial configurations from cozy nooks to expansive open-plan lounging.',
    material: 'Natural Linen & Goose Feather',
    materialsList: ['Belgium Linen Blend (60% Linen, 40% Cotton)', 'Goose Feather & Down Wrapping', 'FSC Kiln-Dried Hardwood Frame'],
    color: 'Sandstone',
    availableColors: [
      { name: 'Sandstone', hex: '#D6CEC4' },
      { name: 'Pebble Gray', hex: '#A8A49E' },
      { name: 'Warm Taupe', hex: '#8C8279' }
    ],
    dimensions: '118"W x 68"D (Chaise) x 28"H',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9,
    reviewsCount: 56,
    featured: true,
    newArrival: true,
    inStock: true,
    designer: 'Elena Vance',
    leadTime: 'White-glove delivery in 2â€“3 weeks',
    careInstructions: 'Fluff cushions regularly. Removable slipcovers are dry-cleanable.'
  },
  {
    id: 'prod-6',
    slug: 'kyoto-platform-bed',
    name: 'Kyoto Platform Bed',
    category: 'bedroom',
    subcategory: 'Beds',
    price: 2200,
    description: 'Low Japandi minimalist platform bed crafted from solid white oak with floating nightstand ledges.',
    longDescription: 'Inspired by traditional Japanese ryokan architecture, the Kyoto Platform Bed rests low to the floor, fostering spatial openness. Integrated floating headboard shelves accommodate books and nighttime essentials without cluttering floor space.',
    material: 'Solid White Oak',
    materialsList: ['100% Solid FSC White Oak', 'Hand-Rubbed Organic Oil Finish', 'Slatted Spruce Mattress Support'],
    color: 'Natural White Oak',
    availableColors: [
      { name: 'Natural White Oak', hex: '#D8C3A5' },
      { name: 'Smoked Walnut', hex: '#634F42' }
    ],
    dimensions: 'Queen: 72"W x 90"L x 32"H / King: 88"W x 90"L x 32"H',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9,
    reviewsCount: 31,
    featured: false,
    newArrival: true,
    inStock: true,
    designer: 'Kenji Takahashi',
    leadTime: 'White-glove assembly included',
    careInstructions: 'Treat wooden surfaces once a year with beeswax conditioner.'
  },
  {
    id: 'prod-7',
    slug: 'forma-dining-table',
    name: 'Forma Dining Table',
    category: 'dining',
    subcategory: 'Dining Tables',
    price: 2900,
    description: 'Sculptural oval dining table in dark stained walnut with fluted pedestal base.',
    longDescription: 'The Forma Dining Table seats up to eight guests comfortably around its soft elliptical top. Twin fluted architectural pillar bases provide rock-solid stability while maintaining ample legroom for all seated guests.',
    material: 'American Walnut',
    materialsList: ['Solid Walnut Legs & Fluted Base', 'Walnut Veneered Composite Core Top', 'Satin Polyurethane Sealant'],
    color: 'Dark Walnut',
    availableColors: [
      { name: 'Dark Walnut', hex: '#4A3B32' },
      { name: 'Natural Ash', hex: '#E0D2C3' }
    ],
    dimensions: '94"W x 42"D x 30"H',
    images: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.8,
    reviewsCount: 27,
    featured: false,
    newArrival: false,
    inStock: true,
    designer: 'AURA Studio',
    leadTime: 'Ships in 10â€“14 business days',
    careInstructions: 'Clean with damp cloth and dry immediately. Use table mats for hot dishes.'
  },
  {
    id: 'prod-8',
    slug: 'pendant-nocturne',
    name: 'Nocturne Pendant Light',
    category: 'lighting',
    subcategory: 'Ceiling Lights',
    price: 540,
    description: 'Hand-blown opal glass globe pendant with hand-brushed oxidized bronze fitting.',
    longDescription: 'Emitting a warm, diffused celestial radiance, Nocturne suspended lighting brings ambient drama over dining areas, kitchen islands, or entryways. Adjustable textile suspension cord included.',
    material: 'Opal Glass & Bronze',
    materialsList: ['Mouth-Blown Satin Opal Glass', 'Solid Bronzed Brass Hardware', 'Adjustable 8ft Fabric Cord'],
    color: 'Matte Opal & Bronze',
    availableColors: [
      { name: 'Bronze', hex: '#42372E' },
      { name: 'Brushed Nickel', hex: '#A2A5A8' }
    ],
    dimensions: '16" Diameter x 18"H Globe',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 5.0,
    reviewsCount: 15,
    featured: false,
    newArrival: true,
    inStock: true,
    designer: 'Lucas Dubois',
    leadTime: 'Ships in 3â€“5 business days',
    careInstructions: 'Ensure power is off before cleaning glass with mild glass spray and microfiber towel.'
  },
  {
    id: 'prod-9',
    slug: 'atelier-writing-desk',
    name: 'Atelier Writing Desk',
    category: 'office',
    subcategory: 'Desks',
    price: 1650,
    description: 'Refined executive desk in solid black ash wood with integrated leather writing mat and cable pass-through.',
    longDescription: 'Designed for deep focus and thoughtful work, Atelier pairs crisp architectural chamfered edges with a hand-stitched tan Italian leather center pad. Includes hidden cord management channels and soft-close drawer.',
    material: 'Black Ash & Saddle Leather',
    materialsList: ['Black Stained Ash Wood', 'Full-Grain Italian Saddle Leather', 'Concealed Soft-Close Runners'],
    color: 'Black Ash / Cognac',
    availableColors: [
      { name: 'Black Ash / Cognac', hex: '#262422' },
      { name: 'Natural Oak / Tan', hex: '#CBAF8B' }
    ],
    dimensions: '60"W x 26"D x 29.5"H',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9,
    reviewsCount: 22,
    featured: false,
    newArrival: false,
    inStock: true,
    designer: 'Marcus Thorne',
    leadTime: 'In stock â€” Ships in 5 days',
    careInstructions: 'Condition leather twice yearly with balm. Wipe wood surface with damp cloth.'
  },
  {
    id: 'prod-10',
    slug: 'terra-ceramic-vase',
    name: 'Terra Ceramic Sculptural Vessel',
    category: 'decor',
    subcategory: 'Vessels & Vases',
    price: 180,
    description: 'Hand-coiled matte ceramic vessel with raw stoneware texture and asymmetrical handles.',
    longDescription: 'Each Terra Vessel is individually hand-formed by master potters in Portugal. Its subtle coarse surface finish and earthy organic silhouette make it a compelling accent piece both filled with dried flora or displayed solo.',
    material: 'Stoneware Ceramic',
    materialsList: ['Raw Coarse Stoneware Clay', 'Hand-Applied Matte Glaze'],
    color: 'Sand Stoneware',
    availableColors: [
      { name: 'Raw Sand', hex: '#D2C3B2' },
      { name: 'Terracotta', hex: '#A85D48' },
      { name: 'Charcoal Slurry', hex: '#3B3835' }
    ],
    dimensions: '9" Diameter x 14"H',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.7,
    reviewsCount: 18,
    featured: false,
    newArrival: true,
    inStock: true,
    designer: 'Isabella Rossi',
    leadTime: 'In stock â€” Ships tomorrow',
    careInstructions: 'Hand wash only with warm soapy water.'
  },
  {
    id: 'prod-11',
    slug: 'umbra-arch-mirror',
    name: 'Umbra Arch Wall Mirror',
    category: 'decor',
    subcategory: 'Mirrors',
    price: 680,
    description: 'Full-length floor arch mirror framed in minimal ultra-slim solid burnished bronze.',
    longDescription: 'Open up room reflection and natural light with the Umbra Arch Mirror. Precision bevel-edged glass is enveloped in a hairline bronze metal frame with anti-shatter security backing.',
    material: 'Bronze Metal & High-Definition Mirror',
    materialsList: ['3mm HD Silver Glass', 'Solid Extruded Bronze Metal Frame', 'MDF Safety Backing Board'],
    color: 'Burnished Bronze',
    availableColors: [
      { name: 'Burnished Bronze', hex: '#4A3C31' },
      { name: 'Matte Black Metal', hex: '#1C1B1A' }
    ],
    dimensions: '36"W x 72"H x 1.2"D',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9,
    reviewsCount: 34,
    featured: true,
    newArrival: false,
    inStock: true,
    designer: 'AURA Atelier',
    leadTime: 'Fragile freight shipment in 5â€“7 days',
    careInstructions: 'Clean mirror glass with ammonia-free glass cleaner sprayed onto microfiber cloth.'
  },
  {
    id: 'prod-12',
    slug: 'aurora-wool-rug',
    name: 'Aurora Hand-Knotted Wool Rug',
    category: 'decor',
    subcategory: 'Rugs',
    price: 1450,
    description: 'Plush high-pile hand-knotted New Zealand wool area rug with understated line geometry.',
    longDescription: 'Spun from 100% un-dyed New Zealand virgin wool, the Aurora Rug offers deep tactile luxury underfoot. Artisans in Rajasthan hand-knot each knot, creating a subtle organic grid motif.',
    material: '100% New Zealand Wool',
    materialsList: ['Unbleached Pure New Zealand Wool', 'Natural Cotton Warp & Weft'],
    color: 'Cream / Slate Lines',
    availableColors: [
      { name: 'Cream / Slate', hex: '#EDE8E0' },
      { name: 'Oatmeal / Warm Taupe', hex: '#CBBFA8' }
    ],
    dimensions: '8\' x 10\' (Also available in 9\' x 12\')',
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.8,
    reviewsCount: 29,
    featured: false,
    newArrival: false,
    inStock: true,
    designer: 'Craft Guild Jaipur',
    leadTime: 'In stock â€” Ships in 4 days',
    careInstructions: 'Vacuum without beater bar. Rotate annually for even wear. Professional rug clean recommended.'
  },
  {
    id: 'prod-13',
    slug: 'sylvan-credenza-sideboard',
    name: 'Sylvan Fluted Sideboard Credenza',
    category: 'living',
    subcategory: 'Storage & Credenzas',
    price: 2400,
    description: 'Mid-century modern credenza with vertical tambour fluted oak doors and soft-close shelving.',
    longDescription: 'The Sylvan Credenza houses media devices, dinnerware, or collectibles behind seamless sliding tambour doors. Made with architectural precision, the rhythm of tactile vertical oak slats brings rich depth and shadow play to living and dining rooms.',
    material: 'Natural White Oak',
    materialsList: ['Solid Oak Tambour Slats', 'FSC Oak Veneer Cabinet Shell', 'Concealed Soft-Close European Hardware'],
    color: 'Natural Oak',
    availableColors: [
      { name: 'Natural Oak', hex: '#D4C3A3' },
      { name: 'Smoked Walnut', hex: '#5E4C3E' }
    ],
    dimensions: '72"W x 18"D x 30"H',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9,
    reviewsCount: 21,
    featured: false,
    newArrival: true,
    inStock: true,
    designer: 'Oliver Soren',
    leadTime: 'White-glove delivery in 2 weeks',
    careInstructions: 'Dust tambour slats gently with soft brush. Wipe wooden surfaces with dry cloth.'
  },
  {
    id: 'prod-14',
    slug: 'velvet-pouf-ottoman',
    name: 'Soleil Ottoman Pouf',
    category: 'bedroom',
    subcategory: 'Benches & Poufs',
    price: 360,
    description: 'Round upholstered pouf ottoman covered in Belgian velvet with brass recess ring base.',
    longDescription: 'A playful yet elegant accent piece, Soleil acts as additional seating, a comfortable footrest, or a vanity companion. Features a weighted low center of gravity and a subtle recessed brushed brass base.',
    material: 'Belgian Cotton Velvet & Brass',
    materialsList: ['100% Cotton Belgian Velvet', 'High-Resiliency Foam', 'Plated Brass Accent Ring'],
    color: 'Sage Moss Velvet',
    availableColors: [
      { name: 'Sage Moss', hex: '#7A8472' },
      { name: 'Warm Amber', hex: '#C28340' },
      { name: 'EcrÃº', hex: '#EBE3D5' }
    ],
    dimensions: '20" Diameter x 17"H',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.8,
    reviewsCount: 14,
    featured: false,
    newArrival: false,
    inStock: true,
    designer: 'Camilla Moreau',
    leadTime: 'In stock â€” Ships in 2 days',
    careInstructions: 'Brush velvet gently in direction of nap with soft velvet brush.'
  },
  {
    id: 'prod-15',
    slug: 'halo-floor-lamp',
    name: 'Halo Minimalist Floor Lamp',
    category: 'lighting',
    subcategory: 'Floor Lamps',
    price: 680,
    description: 'Slender arch floor lamp with adjustable brass shade and solid black Nero Marquina marble pedestal.',
    longDescription: 'Hovering gracefully over sofas or reading armchairs, the Halo Floor Lamp provides directional reading light or indirect ambient reflection. Crafted with a delicate carbon fiber arch stem and heavy Spanish Nero Marquina marble block.',
    material: 'Carbon Fiber, Brass & Marble',
    materialsList: ['Nero Marquina Spanish Marble Base', 'Flexible Carbon Fiber Rod', 'Spun Brass Shade'],
    color: 'Black Marble & Gold',
    availableColors: [
      { name: 'Black / Brass', hex: '#1C1A18' }
    ],
    dimensions: '18" Base x 58" Overhang Reach x 74" Total Height',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9,
    reviewsCount: 17,
    featured: false,
    newArrival: true,
    inStock: true,
    designer: 'Maren Lind',
    leadTime: 'In stock â€” Ships in 3â€“5 days',
    careInstructions: 'Dust stem and shade with dry cloth. Do not apply acidic cleaners to marble.'
  },
  {
    id: 'prod-16',
    slug: 'nimbus-linen-throw-blanket',
    name: 'Nimbus Waffle Linen Throw',
    category: 'decor',
    subcategory: 'Textiles & Throws',
    price: 210,
    description: 'Heavyweight stonewashed European linen throw blanket with textural waffle weave texture.',
    longDescription: 'Woven in Lithuania from 100% natural flax, the Nimbus Throw combines soft breathing warmth with rich visual texture. Pre-washed for effortless drape and relaxed texture over sofas or beds.',
    material: '100% Stonewashed European Linen',
    materialsList: ['Pure French & Lithuanian Flax Linen'],
    color: 'Oatmeal',
    availableColors: [
      { name: 'Oatmeal', hex: '#D6C8B4' },
      { name: 'Natural Clay', hex: '#B88B77' },
      { name: 'Chalk White', hex: '#F7F5F0' }
    ],
    dimensions: '55"W x 78"L',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9,
    reviewsCount: 45,
    featured: false,
    newArrival: false,
    inStock: true,
    designer: 'AURA Home',
    leadTime: 'In stock â€” Ships tomorrow',
    careInstructions: 'Machine wash on gentle cycle with cold water. Tumble dry low or line dry.'
  }
];

export const MOCK_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    author: 'Clara M.',
    rating: 5,
    date: 'October 14, 2025',
    title: 'An absolute masterpiece of comfort and design',
    comment: 'The Klova chair exceeded my expectations. The bouclÃ© fabric feels incredibly rich and soft, and the solid oak construction is solid as a rock. It instantly elevated our living room space.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    author: 'Julian V.',
    rating: 5,
    date: 'December 2, 2025',
    title: 'Impeccable craftsmanship and white glove service',
    comment: 'From the moment the delivery team arrived to place the table in our dining area, I knew AURA was different. The stone finish and weight are magnificent.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    author: 'Sophia K.',
    rating: 4,
    date: 'January 18, 2026',
    title: 'Subtle elegance and beautiful light texture',
    comment: 'The brass and travertine light creates the warmest ambient light in the evening. Extremely pleased with the quality!',
    verifiedPurchase: true
  }
];
