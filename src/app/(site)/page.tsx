'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Shield, Compass } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/products';
import { CATEGORIES_DATA } from '@/data/categories';
import { MOCK_ARTICLES } from '@/data/articles';
import { ProductCard } from '@/components/shop/ProductCard';
import {
  HoverArrow,
  HoverUnderline,
  ImageReveal,
  Reveal,
  Stagger,
  StaggerItem,
  DURATION,
  EASE_OUT,
  STAGGER,
} from '@/components/motion';

const HomePage: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.featured).slice(0, 8);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterError('Please enter a valid email address');
      return;
    }
    setNewsletterError('');
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <div className="space-y-16 md:space-y-24  pt-20">
      {/* 1. HERO SECTION - GEOMETRIC BALANCE SPLIT LAYOUT */}
      <section className="border-b border-[#E5E0D8]">
        <div className="flex flex-col lg:flex-row min-h-[640px] w-full bg-[#F9F8F6]">
          {/* Left Hero Column */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#E5E0D8] relative overflow-hidden">
            <Stagger onMount gap={STAGGER.loose} className="space-y-6 max-w-xl">
              <StaggerItem>
                <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase block">
                  The Art of Living
                </span>
              </StaggerItem>
              <StaggerItem duration={DURATION.slow}>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#1A1A18] leading-[1.1] font-normal">
                  Elevate Your Space with Timeless Elegance
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="text-[#8C8279] text-sm sm:text-base leading-relaxed font-light">
                  Furniture and objects designed for considered living. Curated with intention, crafted from organic travertine, solid timber, and handwoven textiles for a lifetime.
                </p>
              </StaggerItem>
              <StaggerItem className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/shop"
                  className="bg-[#1A1A18] text-white px-8 py-4 text-[12px] uppercase tracking-widest font-semibold hover:bg-[#8C8279] transition-colors rounded-xs shadow-sm"
                >
                  Explore Collection
                </Link>
                <Link
                  href="/about"
                  className="border border-[#1A1A18] text-[#1A1A18] px-8 py-4 text-[12px] uppercase tracking-widest font-semibold hover:bg-[#1A1A18] hover:text-white transition-colors rounded-xs"
                >
                  Our Story
                </Link>
              </StaggerItem>

              {/* Geometric Metrics Bar */}
              <StaggerItem className="pt-10 mt-6 border-t border-[#E5E0D8] flex items-center gap-12">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1A18]">120+</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8279] mt-1 font-semibold">Curated Pieces</span>
                </div>
                <div className="w-[1px] h-10 bg-[#E5E0D8]" />
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1A18]">14</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8279] mt-1 font-semibold">Master Artisans</span>
                </div>
              </StaggerItem>
            </Stagger>
          </div>

          {/* Right Hero Image Column */}
          <div className="w-full lg:w-1/2 relative group min-h-[400px] lg:min-h-full bg-[#F0EBE1] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <ImageReveal
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop"
                alt="Klova Lounge Chair"
                loading="eager"
                zoomOnHover
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating Label Card */}
            <Reveal
              onMount
              delay={0.5}
              className="absolute bottom-8 left-8 sm:bottom-10 sm:left-10 bg-white/90 backdrop-blur-md p-5 border border-[#E5E0D8] max-w-[260px] rounded-xs shadow-lg z-10"
            >
              <div className="text-[10px] text-[#D4AF37] mb-1 font-bold tracking-[0.2em] uppercase">NEW ARRIVAL</div>
              <div className="text-sm font-serif text-[#1A1A18] font-medium mb-1">Klova Lounge Chair in Ivory Bouclé</div>
              <div className="text-xs text-[#8C8279] font-light">Available in 4 curated natural finishes.</div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Feature Grid Strip */}
        <Stagger className="border-t border-[#E5E0D8] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[#F9F8F6]">
          {/* Feature 1 */}
          <StaggerItem className="border-b sm:border-b-0 sm:border-r border-[#E5E0D8] p-8 flex items-center hover:bg-white transition-colors duration-500 cursor-pointer group">
            <div className="w-12 h-12 bg-[#F0EBE1] rounded-full mr-5 flex items-center justify-center shrink-0 group-hover:bg-[#1A1A18] transition-colors">
              <Compass className="w-5 h-5 text-[#8C8279] group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase mb-0.5 text-[#1A1A18]">Free White-Glove Shipping</div>
              <div className="text-[10px] text-[#8C8279]">Complimentary delivery on orders $1,000+</div>
            </div>
          </StaggerItem>

          {/* Feature 2 */}
          <StaggerItem className="border-b sm:border-b-0 lg:border-r border-[#E5E0D8] p-8 flex items-center hover:bg-white transition-colors duration-500 cursor-pointer group">
            <div className="w-12 h-12 bg-[#F0EBE1] rounded-full mr-5 flex items-center justify-center shrink-0 group-hover:bg-[#1A1A18] transition-colors">
              <Shield className="w-5 h-5 text-[#8C8279] group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase mb-0.5 text-[#1A1A18]">10-Year Framework Warranty</div>
              <div className="text-[10px] text-[#8C8279]">Crafted for generations of enjoyment</div>
            </div>
          </StaggerItem>

          {/* Feature 3 (Interior Services) */}
          <StaggerItem className="col-span-1 sm:col-span-2 p-8 bg-[#1A1A18] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xl font-serif italic mb-1">Bespoke Interior Services</div>
              <div className="text-xs text-[#D8D0C5] font-light">Book a complimentary spatial consultation with our studio team.</div>
            </div>
            <Link
              href="/interior-design"
              className="group bg-white text-[#1A1A18] px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:text-white transition-colors duration-300 shrink-0 rounded-xs inline-flex items-center gap-2"
            >
              <span>Enquire Now</span>
              <HoverArrow className="w-3 h-3" />
            </Link>
          </StaggerItem>
        </Stagger>
      </section>

      {/* 2. BRAND PHILOSOPHY */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <Stagger gap={STAGGER.loose} className="space-y-6">
          <StaggerItem>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
              AURA Philosophy
            </span>
          </StaggerItem>
          <StaggerItem duration={DURATION.slow}>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#1A1A18] font-normal leading-[1.2] max-w-4xl mx-auto">
              &ldquo;We believe your home should be a reflection of your refined taste.&rdquo;
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="text-sm sm:text-base text-[#8C8279] font-light max-w-2xl mx-auto leading-relaxed">
              AURA curates exceptional furniture and home objects from skilled European and Japanese artisans, combining heritage joinery, sustainable natural materials, and quiet contemporary design.
            </p>
          </StaggerItem>
        </Stagger>

        <div className="pt-6">
          <ImageReveal
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600"
            alt="Artisanal living arrangement"
            className="relative aspect-21/9 w-full rounded-xs bg-[#F0EBE1] shadow-xl border border-[#E5E0D8]"
          />
        </div>
      </section>

      {/* 3. CURATED SPACES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E0D8] pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
              Spatial Design
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A18] font-medium mt-1">
              Curated Spaces
            </h2>
          </div>
          <p className="text-xs text-[#8C8279] font-light max-w-xs mt-2 md:mt-0">
            Designed for the way you live—balanced proportions and tactile materials for every sanctuary.
          </p>
        </Reveal>

        <Stagger gap={STAGGER.loose} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES_DATA.slice(0, 3).map((cat) => (
            <StaggerItem key={cat.id} className="group relative flex flex-col">
              <Link href={`/collections/${cat.slug}`} className="block relative aspect-3/4 w-full overflow-hidden rounded-xs bg-[#F0EBE1]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
                    {cat.tagline}
                  </span>
                  <h3 className="font-serif text-2xl font-medium">
                    {cat.name}
                  </h3>
                  <div className="pt-2 flex items-center text-xs font-medium uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">
                    <span>Explore Space</span>
                    <HoverArrow className="w-3.5 h-3.5 ml-2" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* 4. FEATURED COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Reveal className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            New Arrivals
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A18] font-medium">
            The Signature Collection
          </h2>
          <p className="text-xs sm:text-sm text-[#8C8279] font-light max-w-md mx-auto">
            Iconic heirloom furniture pieces engineered with sculptural form and natural materials.
          </p>
        </Reveal>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>

        <Reveal className="text-center pt-8">
          <Link
            href="/shop"
            className="group inline-flex items-center space-x-3 bg-[#1A1A18] text-white hover:bg-[#333230] text-xs font-semibold uppercase tracking-[0.25em] py-4 px-8 rounded-xs transition-colors shadow-md"
          >
            <span>View Complete Collection</span>
            <HoverArrow />
          </Link>
        </Reveal>
      </section>

      {/* 5. EDITORIAL SPLIT SECTION (Bespoke Services) */}
      <section className="bg-[#F0EBE1] py-20 border-y border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Image */}
            <ImageReveal
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200"
              alt="Interior design spatial consultation"
              className="relative aspect-4/3 lg:aspect-square w-full rounded-xs shadow-xl bg-white"
            />

            {/* Right Text */}
            <Reveal direction="left" className="space-y-6 lg:pl-6">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
                Bespoke Services
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A18] font-medium leading-tight">
                Tailored to Your Lifestyle
              </h2>
              <p className="text-sm sm:text-base text-[#8C8279] font-light leading-relaxed">
                Our in-house interior design studio offers comprehensive styling and spatial planning services. From selecting individual heirloom pieces to complete residential home transformations, we work collaboratively to realize your aesthetic vision.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-xs text-[#1A1A18] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#8C8279]" />
                  <span>3D Spatial Rendering & Layout Floorplans</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-[#1A1A18] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#8C8279]" />
                  <span>Custom Wood Stain & Textile Swatch Selection</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-[#1A1A18] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#8C8279]" />
                  <span>Dedicated White Glove Assembly & Placement</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/interior-design"
                  className="group inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1A18] hover:text-[#8C8279] border-b border-[#1A1A18] pb-1 transition-colors"
                >
                  <span>Book a Consultation</span>
                  <HoverArrow />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. MATERIALS / CRAFTSMANSHIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Reveal className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            Authentic Materials
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A18] font-medium">
            Made With Intention
          </h2>
          <p className="text-xs sm:text-sm text-[#8C8279] font-light max-w-md mx-auto">
            Honoring organic textures that age beautifully with time and human touch.
          </p>
        </Reveal>

        <Stagger gap={STAGGER.loose} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StaggerItem className="group space-y-4">
            <ImageReveal
              src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800"
              alt="Natural Wood Timber"
              zoomOnHover
              className="aspect-4/3 w-full rounded-xs bg-[#F0EBE1]"
            />
            <h3 className="font-serif text-2xl font-medium text-[#1A1A18]">
              Natural Timber
            </h3>
            <p className="text-xs text-[#8C8279] font-light leading-relaxed">
              FSC-certified European white oak and American walnut harvested with sustainable forestry principles, hand-oiled for lasting durability.
            </p>
          </StaggerItem>

          <StaggerItem className="group space-y-4">
            <ImageReveal
              src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800"
              alt="Travertine Stone"
              zoomOnHover
              className="aspect-4/3 w-full rounded-xs bg-[#F0EBE1]"
            />
            <h3 className="font-serif text-2xl font-medium text-[#1A1A18]">
              Travertine Stone
            </h3>
            <p className="text-xs text-[#8C8279] font-light leading-relaxed">
              Quarried Roman limestone with distinct organic pores and warm veins, honed by Italian stone masons to a velvety satin finish.
            </p>
          </StaggerItem>

          <StaggerItem className="group space-y-4">
            <ImageReveal
              src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800"
              alt="Handwoven Textiles"
              zoomOnHover
              className="aspect-4/3 w-full rounded-xs bg-[#F0EBE1]"
            />
            <h3 className="font-serif text-2xl font-medium text-[#1A1A18]">
              Handwoven Textiles
            </h3>
            <p className="text-xs text-[#8C8279] font-light leading-relaxed">
              Tactile bouclé yarns, stonewashed French flax linen, and heavy virgin wool spun for rich physical depth and supreme softness.
            </p>
          </StaggerItem>
        </Stagger>

        <Reveal className="text-center pt-4">
          <Link
            href="/craft"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#1A1A18] hover:text-[#8C8279] border-b border-[#1A1A18] pb-1 transition-colors"
          >
            <span>Explore Our Artisanal Craft Process</span>
            <HoverArrow className="w-3.5 h-3.5" />
          </Link>
        </Reveal>
      </section>

      {/* 7. JOURNAL PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E0D8] pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
              Design Journal
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A18] font-medium mt-1">
              From the Journal
            </h2>
          </div>
          <Link
            href="/journal"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1A18] hover:text-[#8C8279] mt-2 md:mt-0 transition-colors"
          >
            <span>Read All Stories</span>
            <HoverArrow className="w-3.5 h-3.5" />
          </Link>
        </Reveal>

        <Stagger gap={STAGGER.loose} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_ARTICLES.slice(0, 3).map((article) => (
            <StaggerItem key={article.id} className="group space-y-4">
              <Link href={`/journal/${article.slug}`} className="block aspect-16/10 w-full overflow-hidden rounded-xs bg-[#F0EBE1]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </Link>
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#8C8279]">
                  <span className="font-semibold text-[#1A1A18]">{article.category}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <Link href={`/journal/${article.slug}`}>
                  <h3 className="font-serif text-xl font-medium text-[#1A1A18] group-hover:text-[#8C8279] transition-colors">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-xs text-[#8C8279] font-light line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/journal/${article.slug}`}
                    className="group/link inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#1A1A18]"
                  >
                    <HoverUnderline>Read Article</HoverUnderline>
                    <HoverArrow className="w-3.5 h-3.5 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* 8. NEWSLETTER */}
      <section className="bg-[#1A1A18] text-white py-20">
        <Reveal className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.35em] font-semibold text-[#D4AF37]">
            Private Circle
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium">
            Join the Inner Circle
          </h2>
          <p className="text-xs sm:text-sm text-[#D8D0C5] font-light max-w-md mx-auto leading-relaxed">
            Receive early access to limited artisanal drops, private studio collection previews, and editorial spatial design insights.
          </p>

          <AnimatePresence mode="wait" initial={false}>
            {newsletterSubscribed ? (
              <motion.div
                key="subscribed"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: DURATION.fast, ease: EASE_OUT }}
                className="bg-[#333230] border border-[#D4AF37]/40 p-6 rounded-xs max-w-md mx-auto text-center space-y-2"
              >
                <CheckCircle2 className="w-8 h-8 text-[#D4AF37] mx-auto" />
                <p className="font-serif text-xl text-white">Welcome to AURA</p>
                <p className="text-xs text-[#D8D0C5] font-light">
                  Thank you for subscribing. You are now enrolled in our private journal circle.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="subscribe-form"
                onSubmit={handleNewsletterSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: DURATION.fast, ease: EASE_OUT }}
                className="max-w-md mx-auto space-y-3"
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs px-4 py-3.5 rounded-xs focus:outline-hidden focus:border-[#D4AF37] focus:bg-white/15 transition-[background-color,border-color] duration-300"
                  />
                  <button
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#c49f27] text-[#1A1A18] text-xs font-semibold uppercase tracking-[0.2em] py-3.5 px-6 rounded-xs transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </div>
                <AnimatePresence>
                  {newsletterError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: DURATION.fast, ease: EASE_OUT }}
                      className="text-xs text-red-400 font-light text-left"
                    >
                      {newsletterError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-[10px] text-[#8C8279] tracking-wider uppercase font-light pt-4">
            We respect your privacy. Unsubscribe anytime with one click.
          </p>
        </Reveal>
      </section>
    </div>
  );
};

export default HomePage;