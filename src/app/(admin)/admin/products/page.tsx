"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Eye,
  CheckSquare,
  Square,
  AlertCircle,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { AdminProduct } from '@/data/adminMockData';

export const AdminProductsPage: React.FC = () => {
  const { products, categories, deleteProduct, duplicateProduct } = useAdmin();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'sales'>('newest');

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'sales') return b.salesCount - a.salesCount;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Bulk Select
  const toggleSelectAll = () => {
    if (selectedProductIds.length === sortedProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(sortedProducts.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(selectedProductIds.filter((i) => i !== id));
    } else {
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18] dark:text-white">
            Products Catalog
          </h1>
          <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
            Manage AURA furniture items, pricing, inventory stock, and status.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] text-xs font-semibold rounded-xs shadow-xs hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-4 rounded-xs shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8279]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name, SKU..."
            className="w-full pl-9 pr-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white placeholder-[#8C8279] focus:outline-hidden"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] px-2.5 py-1.5 rounded-xs">
            <Filter className="w-3.5 h-3.5 text-[#8C8279]" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-[#1A1A18] dark:text-white focus:outline-hidden cursor-pointer"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] px-2.5 py-1.5 rounded-xs">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-[#1A1A18] dark:text-white focus:outline-hidden cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div className="bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] px-2.5 py-1.5 rounded-xs">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-[#1A1A18] dark:text-white focus:outline-hidden cursor-pointer"
            >
              <option value="newest">Sort: Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="sales">Best Selling</option>
            </select>
          </div>
        </div>

      </div>

      {/* Bulk Select Bar */}
      {selectedProductIds.length > 0 && (
        <div className="p-3 bg-[#1A1A18] text-white rounded-xs text-xs flex items-center justify-between">
          <span>{selectedProductIds.length} items selected</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm(`Delete ${selectedProductIds.length} products?`)) {
                  selectedProductIds.forEach((id) => deleteProduct(id));
                  setSelectedProductIds([]);
                }
              }}
              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-xs font-semibold"
            >
              Delete Selected
            </button>
            <button
              onClick={() => setSelectedProductIds([])}
              className="px-2.5 py-1 bg-[#333230] hover:bg-[#444340] text-white rounded-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Product Table */}
      <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F9F8F6] dark:bg-[#2A2926] text-[#8C8279] dark:text-[#A0988E] uppercase tracking-wider text-[10px] border-b border-[#E5E0D8] dark:border-[#333230]">
              <tr>
                <th className="py-3 px-4 w-10 text-center">
                  <button onClick={toggleSelectAll}>
                    {selectedProductIds.length === sortedProducts.length && sortedProducts.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-[#D4AF37]" />
                    ) : (
                      <Square className="w-4 h-4 text-[#8C8279]" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] dark:divide-[#333230] text-[#1A1A18] dark:text-white">
              {sortedProducts.map((prod) => {
                const isSelected = selectedProductIds.includes(prod.id);
                return (
                  <tr
                    key={prod.id}
                    className={`hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926]/50 transition-colors ${
                      isSelected ? 'bg-[#F0EBE1]/50 dark:bg-[#2A2926]' : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-center">
                      <button onClick={() => toggleSelectOne(prod.id)}>
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#D4AF37]" />
                        ) : (
                          <Square className="w-4 h-4 text-[#8C8279]" />
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-10 object-cover rounded-xs border border-[#E5E0D8] dark:border-[#333230] shrink-0"
                        />
                        <div>
                          <Link
                            href={`/admin/products/${prod.id}`}
                            className="font-medium text-xs hover:underline block text-[#1A1A18] dark:text-white"
                          >
                            {prod.name}
                          </Link>
                          {prod.isFeatured && (
                            <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider">
                              FEATURED
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#8C8279] dark:text-[#A0988E]">{prod.category}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#8C8279] dark:text-[#A0988E]">{prod.sku}</td>
                    <td className="py-3 px-4 font-semibold">${prod.price.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-semibold ${
                          prod.stock === 0
                            ? 'text-rose-600'
                            : prod.stock <= prod.lowStockThreshold
                            ? 'text-amber-600'
                            : 'text-[#1A1A18] dark:text-white'
                        }`}
                      >
                        {prod.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-xs border ${
                          prod.status === 'Published'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                            : prod.status === 'Draft'
                            ? 'bg-stone-100 text-stone-800 border-stone-300 dark:bg-stone-800 dark:text-stone-300'
                            : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300'
                        }`}
                      >
                        {prod.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right relative">
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === prod.id ? null : prod.id)}
                        className="p-1 hover:bg-[#F0EBE1] dark:hover:bg-[#333230] rounded-xs text-[#8C8279]"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenuId === prod.id && (
                        <div className="absolute right-4 mt-1 w-40 bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] shadow-xl rounded-xs p-1.5 z-30 text-left space-y-1 animate-in fade-in">
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              router.push(`/admin/products/${prod.id}`);
                            }}
                            className="w-full text-left px-2.5 py-1.5 hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] rounded-xs flex items-center gap-2 text-xs"
                          >
                            <Edit className="w-3.5 h-3.5 text-[#8C8279]" />
                            Edit Product
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              duplicateProduct(prod.id);
                            }}
                            className="w-full text-left px-2.5 py-1.5 hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] rounded-xs flex items-center gap-2 text-xs"
                          >
                            <Copy className="w-3.5 h-3.5 text-[#8C8279]" />
                            Duplicate
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              window.open(`/shop/${prod.slug}`, '_blank');
                            }}
                            className="w-full text-left px-2.5 py-1.5 hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] rounded-xs flex items-center gap-2 text-xs"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#8C8279]" />
                            View on Store
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              setDeleteConfirmId(prod.id);
                            }}
                            className="w-full text-left px-2.5 py-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 rounded-xs flex items-center gap-2 text-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {sortedProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#8C8279] dark:text-[#A0988E]">
                    No products found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Alert Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h3 className="font-serif text-lg font-semibold text-[#1A1A18] dark:text-white">
                Delete Product?
              </h3>
            </div>
            <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
              Are you sure you want to permanently delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-[#F0EBE1] dark:bg-[#2A2926] text-[#1A1A18] dark:text-white rounded-xs text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 bg-rose-600 text-white rounded-xs text-xs font-semibold hover:bg-rose-700"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProductsPage;
