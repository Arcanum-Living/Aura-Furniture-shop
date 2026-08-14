'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import {
  Star,
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';

import { MOCK_PRODUCTS, MOCK_REVIEWS } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { ProductCard } from '@/components/shop/ProductCard';
import {
  AnimatedValue,
  Reveal,
  Stagger,
  StaggerItem,
  DURATION,
  EASE_OUT,
  STAGGER,
} from '@/components/motion';

/**
 * Accordion body that eases its own height open and closed, so the panel below
 * slides rather than jumping when a section is expanded.
 */
const AccordionBody: React.FC<{ open: boolean; children: React.ReactNode }> = ({
  open,
  children,
}) => (
  <AnimatePresence initial={false}>
    {open && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: DURATION.fast, ease: EASE_OUT }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

const ProductDetailsPage: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const product =
    MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];

  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>(product.color);

  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<{
    [key: string]: boolean;
  }>({
    description: true,
    materials: false,
    dimensions: false,
    shipping: false,
    care: false,
  });

  const wishlisted = isInWishlist(product.id);

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs uppercase tracking-widest text-[#8C8279] flex items-center space-x-2">
        <Link
          href="/"
          className="hover:text-[#1A1A18] transition-colors"
        >
          Home
        </Link>

        <span>/</span>

        <Link
          href="/shop"
          className="hover:text-[#1A1A18] transition-colors"
        >
          Shop
        </Link>

        <span>/</span>

        <Link
          href={`/collections/${product.category}`}
          className="hover:text-[#1A1A18] transition-colors uppercase"
        >
          {product.category}
        </Link>

        <span>/</span>

        <span className="text-[#1A1A18] font-semibold">
          {product.name}
        </span>
      </nav>

      {/* Main Product Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Image Gallery */}
        <Reveal onMount direction="right" className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/5 w-full bg-[#F0EBE1] overflow-hidden rounded-xs border border-[#E5E0D8]">
            {/* Crossfade between shots, with a whisper of settle on the incoming frame. */}
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={selectedImageIndex}
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.base, ease: EASE_OUT }}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </AnimatePresence>

            {product.newArrival && (
              <span className="absolute top-4 left-4 z-10 bg-[#1A1A18] text-white text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1">
                New Arrival
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  animate={{ scale: selectedImageIndex === idx ? 1.05 : 1 }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className={`w-20 h-24 rounded-xs overflow-hidden border-2 shrink-0 transition-[border-color,opacity] duration-300 ${
                    selectedImageIndex === idx
                      ? 'border-[#1A1A18] opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </Reveal>

        {/* Right: Product Spec & Purchase Actions */}
        <Reveal onMount direction="left" delay={0.1} className="lg:col-span-5 space-y-8 sticky top-28">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C8279]">
                {product.subcategory || product.category}
              </span>

              <div className="flex items-center space-x-1.5 text-xs text-[#1A1A18]">
                <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-[#8C8279]">
                  ({product.reviewsCount} reviews)
                </span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1A18] leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline space-x-3 mt-3">
              <span className="text-2xl font-bold text-[#1A1A18]">
                ${product.price.toLocaleString()}
              </span>

              {product.originalPrice && (
                <span className="text-sm text-[#8C8279] line-through font-light">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#8C8279] font-light leading-relaxed mt-4">
              {product.description}
            </p>
          </div>

          {/* Color Selector */}
          {product.availableColors && (
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A18]">
                Color Finish:{' '}
                <span className="font-light text-[#8C8279]">
                  {selectedColor}
                </span>
              </label>

              <div className="flex items-center space-x-3">
                {product.availableColors.map((col) => (
                  <motion.button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    animate={{ scale: selectedColor === col.name ? 1.12 : 1 }}
                    whileHover={{ scale: selectedColor === col.name ? 1.12 : 1.06 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className={`w-8 h-8 rounded-full border-2 transition-[border-color,box-shadow] duration-300 flex items-center justify-center ${
                      selectedColor === col.name
                        ? 'border-[#1A1A18] shadow-xs'
                        : 'border-transparent'
                    }`}
                    title={col.name}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-black/10"
                      style={{ backgroundColor: col.hex }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center border border-[#E5E0D8] bg-white rounded-xs">
                <motion.button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.15, ease: EASE_OUT }}
                  className="p-3 text-[#1A1A18] hover:bg-[#F0EBE1] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>

                <AnimatedValue
                  value={quantity}
                  className="px-4 text-xs font-bold text-[#1A1A18]"
                />

                <motion.button
                  onClick={() => setQuantity(quantity + 1)}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.15, ease: EASE_OUT }}
                  className="p-3 text-[#1A1A18] hover:bg-[#F0EBE1] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>

              <motion.button
                onClick={() =>
                  addToCart(product, quantity, selectedColor)
                }
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: EASE_OUT }}
                className="group flex-1 bg-[#1A1A18] hover:bg-[#333230] text-white text-xs font-semibold uppercase tracking-[0.2em] py-4 px-6 rounded-xs flex items-center justify-center space-x-2 transition-colors shadow-lg"
              >
                <ShoppingBag className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
                <span>Add to Shopping Bag</span>
              </motion.button>

              <motion.button
                onClick={() => toggleWishlist(product.id)}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.15, ease: EASE_OUT }}
                className="p-4 border border-[#E5E0D8] hover:border-[#1A1A18] bg-white text-[#1A1A18] rounded-xs transition-colors"
                aria-label="Wishlist"
              >
                <motion.span
                  key={wishlisted ? 'saved' : 'unsaved'}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className="flex"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors duration-300 ${
                      wishlisted ? 'fill-[#8C8279] text-[#8C8279]' : ''
                    }`}
                  />
                </motion.span>
              </motion.button>
            </div>

            {/* Delivery & Security Guarantee Highlights */}
            <div className="bg-[#F0EBE1] p-4 rounded-xs border border-[#E5E0D8] space-y-2 text-xs text-[#1A1A18]">
              <div className="flex items-center space-x-2.5">
                <Truck className="w-4 h-4 text-[#8C8279] shrink-0" />
                <span>{product.leadTime}</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-[#8C8279] shrink-0" />
                <span>
                  10-Year Artisanal Frame & Joinery Guarantee
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                <RefreshCw className="w-4 h-4 text-[#8C8279] shrink-0" />
                <span>
                  Complimentary 30-Day In-Home Trial & Returns
                </span>
              </div>
            </div>
          </div>

          {/* Accordions */}
          <div className="border-t border-[#E5E0D8] divide-y divide-[#E5E0D8] pt-4">
            {/* Description */}
            <div>
              <button
                onClick={() => toggleAccordion('description')}
                className="w-full py-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1A1A18]"
              >
                <span>Product Overview & Story</span>

                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ease-out ${
                    openAccordions.description ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AccordionBody open={openAccordions.description}>
                <div className="pb-4 text-xs text-[#8C8279] font-light leading-relaxed">
                  {product.longDescription || product.description}
                </div>
              </AccordionBody>
            </div>

            {/* Materials */}
            <div>
              <button
                onClick={() => toggleAccordion('materials')}
                className="w-full py-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1A1A18]"
              >
                <span>Materials & Craftsmanship</span>

                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ease-out ${
                    openAccordions.materials ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AccordionBody open={openAccordions.materials}>
                <div className="pb-4 text-xs text-[#8C8279] font-light space-y-2">
                  <p>
                    <strong className="text-[#1A1A18]">
                      Primary Finish:
                    </strong>{' '}
                    {product.material}
                  </p>

                  {product.materialsList && (
                    <ul className="list-disc pl-4 space-y-1">
                      {product.materialsList.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </AccordionBody>
            </div>

            {/* Dimensions */}
            <div>
              <button
                onClick={() => toggleAccordion('dimensions')}
                className="w-full py-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1A1A18]"
              >
                <span>Dimensions & Weight</span>

                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ease-out ${
                    openAccordions.dimensions ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AccordionBody open={openAccordions.dimensions}>
                <div className="pb-4 text-xs text-[#8C8279] font-light leading-relaxed">
                  <p>
                    <strong className="text-[#1A1A18]">
                      Overall Dimensions:
                    </strong>{' '}
                    {product.dimensions}
                  </p>

                  <p className="mt-1">
                    Designed to fit through standard doorways
                    (minimum door width clearance: 30 inches).
                  </p>
                </div>
              </AccordionBody>
            </div>

            {/* Care */}
            <div>
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full py-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1A1A18]"
              >
                <span>Care & Maintenance</span>

                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ease-out ${
                    openAccordions.care ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AccordionBody open={openAccordions.care}>
                <div className="pb-4 text-xs text-[#8C8279] font-light leading-relaxed">
                  {product.careInstructions ||
                    'Wipe clean with a soft, damp cloth. Avoid harsh chemical solvents.'}
                </div>
              </AccordionBody>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Customer Reviews */}
      <section className="pt-12 border-t border-[#E5E0D8] space-y-8">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C8279]">
              Verified Feedback
            </span>

            <h2 className="font-serif text-3xl text-[#1A1A18] font-medium mt-1">
              Client Reviews
            </h2>
          </div>

          <div className="flex items-center space-x-2 bg-[#F0EBE1] px-4 py-2 rounded-xs">
            <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
            <span className="font-bold text-sm text-[#1A1A18]">
              {product.rating} out of 5
            </span>
            <span className="text-xs text-[#8C8279]">
              ({product.reviewsCount} reviews)
            </span>
          </div>
        </Reveal>

        <Stagger gap={STAGGER.loose} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.map((rev) => (
            <StaggerItem
              key={rev.id}
              className="bg-white border border-[#E5E0D8] p-6 rounded-xs space-y-3 hover:shadow-lg transition-shadow duration-500"
            >
              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>

                <span className="text-[10px] text-[#8C8279]">
                  {rev.date}
                </span>
              </div>

              <h4 className="font-serif text-base font-medium text-[#1A1A18]">
                {rev.title}
              </h4>

              <p className="text-xs text-[#8C8279] font-light leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>

              <p className="text-[11px] font-semibold text-[#1A1A18] pt-2 border-t border-[#E5E0D8]">
                {rev.author}{' '}
                <span className="text-[#8C8279] font-normal">
                  â€¢ Verified Buyer
                </span>
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#E5E0D8] space-y-8">
          <Reveal className="flex justify-between items-end">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C8279]">
                Complementary Pieces
              </span>

              <h2 className="font-serif text-3xl text-[#1A1A18] font-medium mt-1">
                Complete the Space
              </h2>
            </div>

            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-wider text-[#1A1A18] hover:text-[#8C8279]"
            >
              View All â†’
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailsPage;