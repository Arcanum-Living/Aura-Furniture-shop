'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { MOCK_PRODUCTS } from '@/data/products';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'BouclÃ© Chair',
    'Travertine Table',
    'Brass Pendant',
    'Japandi Bed'
  ]);

  // Reset search term when closed
  useEffect(() => {
    if (!isSearchOpen) {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  // Live filter products
  const searchResults = searchTerm.trim()
    ? MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleRecentClick = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#F9F8F6]/95 backdrop-blur-md overflow-y-auto flex flex-col"
        >
          {/* Header Bar */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-[#E5E0D8]">
            <span className="font-serif text-2xl tracking-[0.25em] uppercase font-semibold text-[#1A1A18]">
              AURA SEARCH
            </span>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-[#1A1A18] hover:opacity-70 transition-opacity"
              aria-label="Close search overlay"
            >
              <X className="w-7 h-7 stroke-[1.5]" />
            </button>
          </div>

          {/* Search Input Section */}
          <div className="max-w-4xl mx-auto w-full px-4 pt-12 pb-8">
            <div className="relative border-b-2 border-[#1A1A18] pb-4 flex items-center">
              <Search className="w-8 h-8 text-[#8C8279] mr-4 stroke-[1.5]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search furniture, materials, lamps, or categories..."
                autoFocus
                className="w-full bg-transparent font-serif text-2xl sm:text-3xl text-[#1A1A18] placeholder-[#8C8279]/60 focus:outline-hidden"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs text-[#8C8279] uppercase tracking-widest hover:text-[#1A1A18] ml-2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Recent Searches & Popular Suggestions if search term is empty */}
            {!searchTerm && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C8279] mb-4">
                    Recent Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleRecentClick(term)}
                        className="bg-[#F0EBE1] hover:bg-[#E5E0D8] text-[#1A1A18] text-xs px-4 py-2 rounded-xs transition-colors flex items-center space-x-2"
                      >
                        <span>{term}</span>
                        <ArrowRight className="w-3 h-3 text-[#8C8279]" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C8279] mb-4">
                    Popular Collections
                  </h4>
                  <div className="space-y-2">
                    <Link
                      href="/collections/living"
                      onClick={() => setIsSearchOpen(false)}
                      className="block text-sm font-medium text-[#1A1A18] hover:text-[#8C8279] transition-colors"
                    >
                      Living Room & Armchairs â†’
                    </Link>
                    <Link
                      href="/collections/lighting"
                      onClick={() => setIsSearchOpen(false)}
                      className="block text-sm font-medium text-[#1A1A18] hover:text-[#8C8279] transition-colors"
                    >
                      Travertine & Brass Lighting â†’
                    </Link>
                    <Link
                      href="/collections/dining"
                      onClick={() => setIsSearchOpen(false)}
                      className="block text-sm font-medium text-[#1A1A18] hover:text-[#8C8279] transition-colors"
                    >
                      Solid Oak Dining Tables â†’
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Results Grid */}
            {searchTerm && (
              <div className="mt-8">
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8]">
                  <p className="text-xs text-[#8C8279] uppercase tracking-wider font-medium">
                    Found {searchResults.length} result{searchResults.length === 1 ? '' : 's'} for &ldquo;{searchTerm}&rdquo;
                  </p>
                  {searchResults.length > 0 && (
                    <Link
                      href={`/shop?q=${encodeURIComponent(searchTerm)}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="text-xs font-semibold text-[#1A1A18] hover:underline uppercase tracking-wider"
                    >
                      View all in Shop â†’
                    </Link>
                  )}
                </div>

                {searchResults.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <Sparkles className="w-8 h-8 text-[#8C8279] mx-auto stroke-[1.2]" />
                    <h3 className="font-serif text-2xl text-[#1A1A18]">
                      No matching pieces found
                    </h3>
                    <p className="text-xs text-[#8C8279] max-w-sm mx-auto font-light">
                      Try searching with broader terms like &ldquo;Chair&rdquo;, &ldquo;Oak&rdquo;, &ldquo;Table&rdquo;, or &ldquo;Linen&rdquo;.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/shop/${product.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="group flex space-x-4 p-3 bg-white hover:bg-[#F0EBE1] transition-colors rounded-xs border border-[#E5E0D8]"
                      >
                        <div className="w-20 h-24 bg-[#F0EBE1] overflow-hidden shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex flex-col justify-between py-1">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-[#8C8279] font-medium">
                              {product.category}
                            </span>
                            <h4 className="font-serif text-base font-medium text-[#1A1A18] group-hover:text-[#8C8279] transition-colors line-clamp-1">
                              {product.name}
                            </h4>
                            <p className="text-xs text-[#8C8279] font-light line-clamp-1">
                              {product.material}
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-[#1A1A18]">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
