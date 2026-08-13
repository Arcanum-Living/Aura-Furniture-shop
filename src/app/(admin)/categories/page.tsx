"use client";

import React, { useState } from 'react';
import { Plus, FolderTree, Layers, X, Save } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export const AdminCategoriesPage: React.FC = () => {
  const { categories, addCategory } = useAdmin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCat, setNewCat] = useState({
    name: '',
    slug: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400',
    status: 'Active' as 'Active' | 'Archived',
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name) return;
    const slug = newCat.slug || newCat.name.toLowerCase().replace(/\s+/g, '-');
    addCategory({ ...newCat, slug });
    setIsModalOpen(false);
    setNewCat({
      name: '',
      slug: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400',
      status: 'Active',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18] dark:text-white">
            Product Categories
          </h1>
          <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
            Organize products into editorial collections and storefront navigation.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] text-xs font-semibold rounded-xs shadow-xs hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs shadow-xs overflow-hidden group hover:border-[#1A1A18] dark:hover:border-white transition-all flex flex-col"
          >
            <div className="h-44 relative overflow-hidden bg-[#F9F8F6] dark:bg-[#2A2926]">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-[#1A1A18]/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-widest">
                {cat.productCount} Products
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-normal text-[#1A1A18] dark:text-white">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-xs border border-emerald-200 dark:border-emerald-800">
                    {cat.status}
                  </span>
                </div>
                <p className="text-xs text-[#8C8279] dark:text-[#A0988E] line-clamp-2 mt-1">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E0D8] dark:border-[#333230] flex items-center justify-between text-[11px] text-[#8C8279] dark:text-[#A0988E]">
                <span>Slug: <code className="font-mono">{cat.slug}</code></span>
                <span>Created: {cat.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
              <h3 className="font-serif text-lg font-semibold text-[#1A1A18] dark:text-white">
                Add Category
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#8C8279] hover:text-[#1A1A18] dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  placeholder="e.g. Architectural Lighting"
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newCat.description}
                  onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                  placeholder="Brief editorial description..."
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={newCat.image}
                  onChange={(e) => setNewCat({ ...newCat, image: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white font-mono text-[11px] focus:outline-hidden"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] rounded-xs font-semibold hover:opacity-90 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCategoriesPage;
