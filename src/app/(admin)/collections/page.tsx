"use client";

import React from 'react';
import { Layers, Plus, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';

export const AdminCollectionsPage: React.FC = () => {
  const { categories } = useAdmin();

  const curatedCollections = [
    {
      id: 'col-1',
      title: 'The Minimalist Salon',
      subtitle: 'Sculptural seating and architectural low tables for modern entertaining.',
      count: 14,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
      featured: true,
      status: 'Active',
    },
    {
      id: 'col-2',
      title: 'Nordic Warmth & Raw Oak',
      subtitle: 'Natural oiled timbers, bouclé upholstery, and organic curves.',
      count: 9,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
      featured: true,
      status: 'Active',
    },
    {
      id: 'col-3',
      title: 'Architectural Lighting Series',
      subtitle: 'Diffused alabaster, hand-blown glass, and antiqued brass pendants.',
      count: 18,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800',
      featured: false,
      status: 'Active',
    },
    {
      id: 'col-4',
      title: 'Atelier Outdoor Luxury',
      subtitle: 'Weatherproof teak, woven rope, and powder-coated aluminum.',
      count: 7,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
      featured: false,
      status: 'Draft',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18] dark:text-white">
            Editorial Collections
          </h1>
          <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
            Curated lookbooks and themed seasonal features for storefront promotion.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] text-xs font-semibold rounded-xs shadow-xs hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          <span>Create Collection</span>
        </button>
      </div>

      {/* Grid of Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {curatedCollections.map((col) => (
          <div
            key={col.id}
            className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs shadow-xs overflow-hidden flex flex-col group hover:border-[#1A1A18] dark:hover:border-white transition-all"
          >
            <div className="h-52 relative overflow-hidden bg-[#F9F8F6] dark:bg-[#2A2926]">
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 flex items-center gap-2">
                {col.featured && (
                  <span className="bg-[#D4AF37] text-[#1A1A18] font-bold text-[10px] px-2 py-0.5 rounded-xs flex items-center gap-1 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> Featured Lookbook
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] font-semibold text-[#D4AF37] tracking-widest uppercase">
                  {col.count} Items Curated
                </span>
                <h3 className="font-serif text-xl font-normal leading-snug">
                  {col.title}
                </h3>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
                {col.subtitle}
              </p>

              <div className="pt-3 border-t border-[#E5E0D8] dark:border-[#333230] flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-xs uppercase tracking-wider ${
                  col.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                }`}>
                  {col.status}
                </span>

                <Link
                  href="/collections"
                  target="_blank"
                  className="inline-flex items-center gap-1 text-[#1A1A18] dark:text-white hover:text-[#D4AF37] font-medium"
                >
                  <span>Preview Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminCollectionsPage;
