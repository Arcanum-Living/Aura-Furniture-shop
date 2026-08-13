'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Sparkles, Shield, Compass } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/products';
import { CATEGORIES_DATA } from '@/data/categories';
import { MOCK_ARTICLES } from '@/data/articles';
import { ProductCard } from '@/components/shop/ProductCard';

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 max-w-xl"
            >
              <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase block">
                The Art of Living
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#1A1A18] leading-[1.1] font-normal">
                Elevate Your Space with Timeless Elegance
              </h1>
              <p className="text-[#8C8279] text-sm sm:text-base leading-relaxed font-light">
                Furniture and objects designed for considered living. Curated with intention, crafted from organic travertine, solid timber, and handwoven textiles for a lifetime.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
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
              </div>

              {/* Geometric Metrics Bar */}
              <div className="pt-10 mt-6 border-t border-[#E5E0D8] flex items-center gap-12">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1A18]">120+</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8279] mt-1 font-semibold">Curated Pieces</span>
                </div>
                <div className="w-[1px] h-10 bg-[#E5E0D8]" />
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1A18]">14</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8279] mt-1 font-semibold">Master Artisans</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Image Column */}
          <div className="w-full lg:w-1/2 relative group min-h-[400px] lg:min-h-full bg-[#F0EBE1] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop"
                alt="Klova Lounge Chair"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating Label Card */}
            <div className="absolute bottom-8 left-8 sm:bottom-10 sm:left-10 bg-white/90 backdrop-blur-md p-5 border border-[#E5E0D8] max-w-[260px] rounded-xs shadow-lg z-10">
              <div className="text-[10px] text-[#D4AF37] mb-1 font-bold tracking-[0.2em] uppercase">NEW ARRIVAL</div>
              <div className="text-sm font-serif text-[#1A1A18] font-medium mb-1">Klova Lounge Chair in Ivory BouclÃ©</div>
              <div className="text-xs text-[#8C8279] font-light">Available in 4 curated natural finishes.</div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Grid Strip */}
        <div className="border-t border-[#E5E0D8] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[#F9F8F6]">
          {/* Feature 1 */}
          <div className="border-b sm:border-b-0 sm:border-r border-[#E5E0D8] p-8 flex items-center hover:bg-white transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-[#F0EBE1] rounded-full mr-5 flex items-center justify-center shrink-0 group-hover:bg-[#1A1A18] transition-colors">
              <Compass className="w-5 h-5 text-[#8C8279] group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase mb-0.5 text-[#1A1A18]">Free White-Glove Shipping</div>
              <div className="text-[10px] text-[#8C8279]">Complimentary delivery on orders $1,000+</div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="border-b sm:border-b-0 lg:border-r border-[#E5E0D8] p-8 flex items-center hover:bg-white transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-[#F0EBE1] rounded-full mr-5 flex items-center justify-center shrink-0 group-hover:bg-[#1A1A18] transition-colors">
              <Shield className="w-5 h-5 text-[#8C8279] group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase mb-0.5 text-[#1A1A18]">10-Year Framework Warranty</div>
              <div className="text-[10px] text-[#8C8279]">Crafted for generations of enjoyment</div>
            </div>
          </div>

          {/* Feature 3 (Interior Services) */}
          <div className="col-span-1 sm:col-span-2 p-8 bg-[#1A1A18] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xl font-serif italic mb-1">Bespoke Interior Services</div>
              <div className="text-xs text-[#D8D0C5] font-light">Book a complimentary spatial consultation with our studio team.</div>
            </div>
            <Link
              href="/interior-design"
              className="bg-white text-[#1A1A18] px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:text-white transition-all shrink-0 rounded-xs"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BRAND PHILOSOPHY */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            AURA Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#1A1A18] font-normal leading-[1.2] max-w-4xl mx-auto">
            &ldquo;We believe your home should be a reflection of your refined taste.&rdquo;
          </h2>
          <p className="text-sm sm:text-base text-[#8C8279] font-light max-w-2xl mx-auto leading-relaxed">
            AURA curates exceptional furniture and home objects from skilled European and Japanese artisans, combining heritage joinery, sustainable natural materials, and quiet contemporary design.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="pt-6 relative aspect-21/9 w-full overflow-hidden rounded-xs bg-[#F0EBE1] shadow-xl border border-[#E5E0D8]"
        >
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600"
            alt="Artisanal living arrangement"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </section>

      {/* 3. CURATED SPACES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E0D8] pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
              Spatial Design
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A18] font-medium mt-1">
              Curated Spaces
            </h2>
          </div>
          <p className="text-xs text-[#8C8279] font-light max-w-xs mt-2 md:mt-0">
            Designed for the way you liveâ€”balanced proportions and tactile materials for every sanctuary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES_DATA.slice(0, 3).map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative flex flex-col"
            >
              <Link href={`/collections/${cat.slug}`} className="block relative aspect-3/4 w-full overflow-hidden rounded-xs bg-[#F0EBE1]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
                    {cat.tagline}
                  </span>
                  <h3 className="font-serif text-2xl font-medium">
                    {cat.name}
                  </h3>
                  <div className="pt-2 flex items-center text-xs font-medium uppercase tracking-widest text-white/90 group-hover:text-white">
                    <span>Explore Space</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            New Arrivals
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A18] font-medium">
            The Signature Collection
          </h2>
          <p className="text-xs sm:text-sm text-[#8C8279] font-light max-w-md mx-auto">
            Iconic heirloom furniture pieces engineered with sculptural form and natural materials.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-3 bg-[#1A1A18] text-white hover:bg-[#333230] text-xs font-semibold uppercase tracking-[0.25em] py-4 px-8 rounded-xs transition-colors shadow-md"
          >
            <span>View Complete Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. EDITORIAL SPLIT SECTION (Bespoke Services) */}
      <section className="bg-[#F0EBE1] py-20 border-y border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Image */}
            <div className="relative aspect-4/3 lg:aspect-square w-full overflow-hidden rounded-xs shadow-xl bg-white">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200"
                alt="Interior design spatial consultation"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Text */}
            <div className="space-y-6 lg:pl-6">
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
                  className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1A18] hover:text-[#8C8279] border-b border-[#1A1A18] pb-1 transition-colors"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MATERIALS / CRAFTSMANSHIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            Authentic Materials
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A18] font-medium">
            Made With Intention
          </h2>
          <p className="text-xs sm:text-sm text-[#8C8279] font-light max-w-md mx-auto">
            Honoring organic textures that age beautifully with time and human touch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group space-y-4">
            <div className="aspect-4/3 w-full overflow-hidden rounded-xs bg-[#F0EBE1]">
              <img
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800"
                alt="Natural Wood Timber"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#1A1A18]">
              Natural Timber
            </h3>
            <p className="text-xs text-[#8C8279] font-light leading-relaxed">
              FSC-certified European white oak and American walnut harvested with sustainable forestry principles, hand-oiled for lasting durability.
            </p>
          </div>

          <div className="group space-y-4">
            <div className="aspect-4/3 w-full overflow-hidden rounded-xs bg-[#F0EBE1]">
              <img
                src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800"
                alt="Travertine Stone"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#1A1A18]">
              Travertine Stone
            </h3>
            <p className="text-xs text-[#8C8279] font-light leading-relaxed">
              Quarried Roman limestone with distinct organic pores and warm veins, honed by Italian stone masons to a velvety satin finish.
            </p>
          </div>

          <div className="group space-y-4">
            <div className="aspect-4/3 w-full overflow-hidden rounded-xs bg-[#F0EBE1]">
              <img
                src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800"
                alt="Handwoven Textiles"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#1A1A18]">
              Handwoven Textiles
            </h3>
            <p className="text-xs text-[#8C8279] font-light leading-relaxed">
              Tactile bouclÃ© yarns, stonewashed French flax linen, and heavy virgin wool spun for rich physical depth and supreme softness.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/craft"
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1A1A18] hover:text-[#8C8279] border-b border-[#1A1A18] pb-1 transition-colors"
          >
            Explore Our Artisanal Craft Process â†’
          </Link>
        </div>
      </section>

      {/* 7. JOURNAL PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E0D8] pb-6">
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
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1A18] hover:text-[#8C8279] mt-2 md:mt-0"
          >
            Read All Stories â†’
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_ARTICLES.slice(0, 3).map((article) => (
            <div key={article.id} className="group space-y-4">
              <Link href={`/journal/${article.slug}`} className="block aspect-16/10 w-full overflow-hidden rounded-xs bg-[#F0EBE1]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </Link>
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#8C8279]">
                  <span className="font-semibold text-[#1A1A18]">{article.category}</span>
                  <span>â€¢</span>
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
                    className="text-xs font-medium uppercase tracking-wider text-[#1A1A18] hover:underline"
                  >
                    Read Article â†’
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. NEWSLETTER */}
      <section className="bg-[#1A1A18] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.35em] font-semibold text-[#D4AF37]">
            Private Circle
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium">
            Join the Inner Circle
          </h2>
          <p className="text-xs sm:text-sm text-[#D8D0C5] font-light max-w-md mx-auto leading-relaxed">
            Receive early access to limited artisanal drops, private studio collection previews, and editorial spatial design insights.
          </p>

          {newsletterSubscribed ? (
            <div className="bg-[#333230] border border-[#D4AF37]/40 p-6 rounded-xs max-w-md mx-auto text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <p className="font-serif text-xl text-white">Welcome to AURA</p>
              <p className="text-xs text-[#D8D0C5] font-light">
                Thank you for subscribing. You are now enrolled in our private journal circle.
              </p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs px-4 py-3.5 rounded-xs focus:outline-hidden focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#c49f27] text-[#1A1A18] text-xs font-semibold uppercase tracking-[0.2em] py-3.5 px-6 rounded-xs transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </div>
              {newsletterError && (
                <p className="text-xs text-red-400 font-light text-left">{newsletterError}</p>
              )}
            </form>
          )}

          <p className="text-[10px] text-[#8C8279] tracking-wider uppercase font-light pt-4">
            We respect your privacy. Unsubscribe anytime with one click.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;