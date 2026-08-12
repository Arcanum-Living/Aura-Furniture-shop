'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  SlidersHorizontal,
  Grid,
  List,
  X,
  Search,
  Check,
  RotateCcw,
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../../data/products';
import { ProductCard } from '../../components/shop/ProductCard';

export const ShopPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [priceMax, setPriceMax] = useState<number>(4000);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] =
    useState<boolean>(false);

  // Extract unique materials for filter options
  const materials = useMemo(() => {
    const list = new Set<string>();

    MOCK_PRODUCTS.forEach((p) => {
      if (p.material.includes('Oak')) list.add('Oak Wood');
      else if (p.material.includes('Walnut')) list.add('Walnut Wood');
      else if (
        p.material.includes('Travertine') ||
        p.material.includes('Stone')
      )
        list.add('Travertine & Stone');
      else if (p.material.includes('Bouclé')) list.add('Bouclé Fabric');
      else if (p.material.includes('Linen')) list.add('Linen & Cotton');
      else if (
        p.material.includes('Brass') ||
        p.material.includes('Bronze')
      )
        list.add('Brass & Metal');
      else if (p.material.includes('Wool')) list.add('Wool');
    });

    return Array.from(list);
  }, []);

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Category check
      if (
        selectedCategory !== 'all' &&
        product.category !== selectedCategory
      ) {
        return false;
      }

      // Search query check
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.material
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) &&
        !product.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Price check
      if (product.price > priceMax) {
        return false;
      }

      // Material check
      if (selectedMaterial !== 'all') {
        if (
          !product.material
            .toLowerCase()
            .includes(selectedMaterial.toLowerCase().split(' ')[0])
        ) {
          return false;
        }
      }

      // In stock check
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'newest')
        return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);

      // Default 'featured'
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    selectedCategory,
    searchQuery,
    priceMax,
    selectedMaterial,
    inStockOnly,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceMax(4000);
    setSelectedMaterial('all');
    setInStockOnly(false);
    setSortBy('featured');

    router.push('/shop');
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Catalog Header */}
      <div className="border-b border-[#E5E0D8] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
          Catalog & Collection
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1A18] font-medium">
          Shop Furniture & Objects
        </h1>

        <p className="text-sm text-[#8C8279] font-light max-w-xl">
          Thoughtfully designed artisanal pieces crafted for considered,
          elegant interior spaces.
        </p>
      </div>

      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-3 border-b border-[#E5E0D8]/60 text-xs text-[#1A1A18]">
        {/* Left: Mobile Filter Button & Active Count */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="lg:hidden flex items-center space-x-2 bg-[#1A1A18] text-white px-4 py-2.5 rounded-xs hover:bg-[#333230] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="uppercase font-semibold tracking-wider">
              Filters
            </span>
          </button>

          <span className="text-[#8C8279] font-light">
            Showing{' '}
            <strong className="font-semibold text-[#1A1A18]">
              {filteredProducts.length}
            </strong>{' '}
            of {MOCK_PRODUCTS.length} pieces
          </span>

          {(selectedCategory !== 'all' ||
            searchQuery ||
            priceMax < 4000 ||
            selectedMaterial !== 'all' ||
            inStockOnly) && (
            <button
              onClick={handleResetFilters}
              className="hidden sm:flex items-center space-x-1 text-[#8C8279] hover:text-[#1A1A18] underline font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Right: Search Input, View Mode Toggle & Sort Dropdown */}
        <div className="flex items-center space-x-4">
          {/* Quick Search Input */}
          <div className="relative w-48 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword..."
              className="w-full bg-[#F0EBE1] border border-[#E5E0D8] text-xs px-3 py-2 pl-8 rounded-xs text-[#1A1A18] placeholder-[#8C8279] focus:outline-hidden focus:border-[#1A1A18]"
            />

            <Search className="w-3.5 h-3.5 text-[#8C8279] absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <label className="text-[#8C8279] uppercase tracking-wider font-light hidden sm:inline">
              Sort:
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#F0EBE1] border border-[#E5E0D8] text-xs font-semibold py-2 px-3 rounded-xs text-[#1A1A18] focus:outline-hidden focus:border-[#1A1A18]"
            >
              <option value="featured">Featured First</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="hidden sm:flex items-center space-x-1 border border-[#E5E0D8] rounded-xs bg-white p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#1A1A18] text-white'
                  : 'text-[#8C8279] hover:text-[#1A1A18]'
              }`}
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-xs transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#1A1A18] text-white'
                  : 'text-[#8C8279] hover:text-[#1A1A18]'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Left Sidebar + Right Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Left Filter Sidebar */}
        <aside className="hidden lg:block space-y-8 pr-4 border-r border-[#E5E0D8]">
          {/* Category Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A18] border-b border-[#E5E0D8] pb-2">
              Categories
            </h3>

            <div className="space-y-1.5 text-xs text-[#1A1A18]">
              {[
                { id: 'all', label: 'All Collections' },
                { id: 'living', label: 'Living Room' },
                { id: 'bedroom', label: 'Bedroom & Sanctuary' },
                { id: 'dining', label: 'Dining & Tables' },
                { id: 'office', label: 'Office & Studio' },
                { id: 'lighting', label: 'Lamps & Lighting' },
                { id: 'decor', label: 'Decor & Textiles' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left py-1.5 px-2 rounded-xs flex items-center justify-between transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#1A1A18] text-white font-medium'
                      : 'hover:bg-[#F0EBE1] text-[#1A1A18]'
                  }`}
                >
                  <span>{cat.label}</span>

                  {selectedCategory === cat.id && (
                    <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-[#E5E0D8] pb-2">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A18]">
                Max Price
              </h3>

              <span className="text-xs font-semibold text-[#8C8279]">
                ${priceMax.toLocaleString()}
              </span>
            </div>

            <input
              type="range"
              min="200"
              max="4000"
              step="100"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-[#1A1A18] cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-[#8C8279]">
              <span>$200</span>
              <span>$4,000+</span>
            </div>
          </div>

          {/* Material Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A18] border-b border-[#E5E0D8] pb-2">
              Material & Craft
            </h3>

            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedMaterial('all')}
                className={`w-full text-left py-1 px-2 rounded-xs transition-colors ${
                  selectedMaterial === 'all'
                    ? 'font-bold text-[#1A1A18] bg-[#F0EBE1]'
                    : 'text-[#8C8279] hover:text-[#1A1A18]'
                }`}
              >
                All Materials
              </button>

              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`w-full text-left py-1 px-2 rounded-xs transition-colors ${
                    selectedMaterial === mat
                      ? 'font-bold text-[#1A1A18] bg-[#F0EBE1]'
                      : 'text-[#8C8279] hover:text-[#1A1A18]'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="pt-2 border-t border-[#E5E0D8]">
            <label className="flex items-center space-x-2 text-xs font-medium text-[#1A1A18] cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded-xs accent-[#1A1A18] w-4 h-4"
              />

              <span>In Stock Items Only</span>
            </label>
          </div>

          {/* Reset Filters CTA */}
          <button
            onClick={handleResetFilters}
            className="w-full py-2.5 text-xs uppercase tracking-widest text-[#8C8279] border border-[#E5E0D8] hover:border-[#1A1A18] hover:text-[#1A1A18] rounded-xs transition-colors"
          >
            Clear All Filters
          </button>
        </aside>

        {/* Right Product Catalog Area */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-[#F0EBE1] border border-[#E5E0D8] rounded-xs p-12 text-center space-y-4 my-8">
              <h3 className="font-serif text-2xl font-medium text-[#1A1A18]">
                No matching furniture found
              </h3>

              <p className="text-xs text-[#8C8279] max-w-sm mx-auto font-light">
                We couldn&apos;t find any items matching your selected filter
                criteria. Try adjusting your search query or price slider.
              </p>

              <button
                onClick={handleResetFilters}
                className="bg-[#1A1A18] text-white text-xs font-semibold uppercase tracking-[0.2em] py-3 px-6 rounded-xs hover:bg-[#333230] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-[#E5E0D8] rounded-xs p-4 flex flex-col sm:flex-row gap-6 items-center"
                >
                  <div className="w-full sm:w-48 aspect-4/5 bg-[#F0EBE1] overflow-hidden rounded-xs shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8C8279]">
                      {product.category}
                    </span>

                    <h3 className="font-serif text-2xl font-medium text-[#1A1A18]">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#8C8279] font-light leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                    <p className="text-xs text-[#1A1A18] font-medium pt-1">
                      Material:{' '}
                      <span className="font-light text-[#8C8279]">
                        {product.material}
                      </span>
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-[#1A1A18]">
                        ${product.price.toLocaleString()}
                      </span>

                      <a
                        href={`/shop/${product.slug}`}
                        className="bg-[#1A1A18] text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-5 rounded-xs hover:bg-[#333230] transition-colors"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            <div className="fixed inset-y-0 left-0 max-w-full flex">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-sm bg-[#F9F8F6] p-6 shadow-2xl overflow-y-auto space-y-6"
              >
                <div className="flex justify-between items-center border-b border-[#E5E0D8] pb-4">
                  <h2 className="font-serif text-xl font-medium text-[#1A1A18]">
                    Filter Products
                  </h2>

                  <button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="p-1 text-[#1A1A18]"
                  >
                    <X className="w-6 h-6 stroke-[1.5]" />
                  </button>
                </div>

                {/* Mobile Category List */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A18]">
                    Category
                  </h3>

                  {[
                    'all',
                    'living',
                    'bedroom',
                    'dining',
                    'office',
                    'lighting',
                    'decor',
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsFilterDrawerOpen(false);
                      }}
                      className={`block w-full text-left text-xs py-2 px-3 rounded-xs uppercase tracking-wider ${
                        selectedCategory === cat
                          ? 'bg-[#1A1A18] text-white font-bold'
                          : 'text-[#1A1A18] hover:bg-[#F0EBE1]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Mobile Price Slider */}
                <div className="space-y-2 pt-4 border-t border-[#E5E0D8]">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span>Max Price</span>
                    <span>${priceMax.toLocaleString()}</span>
                  </div>

                  <input
                    type="range"
                    min="200"
                    max="4000"
                    step="100"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-[#1A1A18]"
                  />
                </div>

                <div className="pt-6 border-t border-[#E5E0D8]">
                  <button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="w-full bg-[#1A1A18] text-white text-xs uppercase tracking-widest py-3 rounded-xs"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};