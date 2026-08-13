"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Upload, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export const AdminProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { products, addProduct, updateProduct, categories } = useAdmin();

  const isEditing = Boolean(id && id !== 'new');
  const existingProduct = isEditing ? products.find((p) => p.id === id) : null;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Living',
    subcategory: 'Seating',
    price: 1200,
    compareAtPrice: 1400,
    sku: 'AURA-NEW-01',
    stock: 10,
    lowStockThreshold: 5,
    status: 'Published' as 'Published' | 'Draft' | 'Out of Stock',
    isFeatured: false,
    isNewArrival: true,
    material: 'Belgian Linen & Solid Walnut',
    color: 'Warm Cream',
    dimensions: '30"W x 32"D x 30"H',
    weight: '22 kg',
    description: 'Masterfully crafted furniture piece designed for modern living spaces.',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600',
  });

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name,
        slug: existingProduct.slug,
        category: existingProduct.category,
        subcategory: existingProduct.subcategory || '',
        price: existingProduct.price,
        compareAtPrice: existingProduct.compareAtPrice || 0,
        sku: existingProduct.sku,
        stock: existingProduct.stock,
        lowStockThreshold: existingProduct.lowStockThreshold,
        status: existingProduct.status,
        isFeatured: existingProduct.isFeatured,
        isNewArrival: existingProduct.isNewArrival,
        material: existingProduct.material,
        color: existingProduct.color,
        dimensions: existingProduct.dimensions,
        weight: existingProduct.weight,
        description: existingProduct.description,
        image: existingProduct.image,
      });
    }
  }, [existingProduct]);

  // Auto slugify name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({ ...prev, name, slug: isEditing ? prev.slug : slug }));
  };

  const handleSubmit = (e: React.FormEvent, publishStatus?: 'Published' | 'Draft') => {
    e.preventDefault();
    const finalStatus = publishStatus || formData.status;

    if (isEditing && id) {
      updateProduct(id, {
        ...formData,
        status: finalStatus,
      });
    } else {
      addProduct({
        ...formData,
        status: finalStatus,
      });
    }

    router.push('/admin/products');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300 pb-12">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8] dark:border-[#333230]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white hover:bg-[#F0EBE1] dark:hover:bg-[#2A2926]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-normal text-[#1A1A18] dark:text-white">
              {isEditing ? `Edit: ${formData.name}` : 'Create New Product'}
            </h1>
            <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
              Fill in product specifications, pricing, imagery, and visibility.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'Draft')}
            className="px-4 py-2 border border-[#E5E0D8] dark:border-[#333230] bg-white dark:bg-[#1A1A18] text-[#1A1A18] dark:text-white text-xs font-semibold rounded-xs hover:bg-[#F0EBE1] dark:hover:bg-[#2A2926] transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'Published')}
            className="px-4 py-2 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] text-xs font-semibold rounded-xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Update Product' : 'Publish Product'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
        
        {/* Left 2 Columns: Main Product Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Product Information */}
          <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 sm:p-6 rounded-xs shadow-xs space-y-4">
            <h2 className="font-serif text-lg text-[#1A1A18] dark:text-white">
              Basic Details
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="e.g. Klova Lounge Chair"
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="klova-lounge-chair"
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white font-mono text-[11px] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of materials, craft, and aesthetic..."
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 sm:p-6 rounded-xs shadow-xs space-y-4">
            <h2 className="font-serif text-lg text-[#1A1A18] dark:text-white">
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Selling Price ($) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Compare-At Price ($)
                </label>
                <input
                  type="number"
                  value={formData.compareAtPrice}
                  onChange={(e) => setFormData({ ...formData, compareAtPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  SKU Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white font-mono text-[11px] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Low Stock Threshold
                </label>
                <input
                  type="number"
                  value={formData.lowStockThreshold}
                  onChange={(e) => setFormData({ ...formData, lowStockThreshold: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 sm:p-6 rounded-xs shadow-xs space-y-4">
            <h2 className="font-serif text-lg text-[#1A1A18] dark:text-white">
              Product Specifications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Primary Material
                </label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  placeholder="e.g. Bouclé Fabric & Solid Walnut"
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Color / Finish
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="e.g. Warm Cream"
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Dimensions (W x D x H)
                </label>
                <input
                  type="text"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  placeholder='32"W x 34"D x 30"H'
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Weight
                </label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="28 kg"
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Organization, Images & Visibility */}
        <div className="space-y-6">
          
          {/* Status & Options */}
          <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 sm:p-6 rounded-xs shadow-xs space-y-4">
            <h2 className="font-serif text-lg text-[#1A1A18] dark:text-white">
              Status & Visibility
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Publishing Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                >
                  <option value="Published">Published (Active on Store)</option>
                  <option value="Draft">Draft (Hidden)</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 space-y-2 border-t border-[#E5E0D8] dark:border-[#333230]">
                <label className="flex items-center gap-2 cursor-pointer text-[#1A1A18] dark:text-white">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded-xs text-[#D4AF37] focus:ring-0"
                  />
                  <span>Feature on Homepage Hero/Grid</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#1A1A18] dark:text-white">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                    className="rounded-xs text-[#D4AF37] focus:ring-0"
                  />
                  <span>Mark as New Arrival Badge</span>
                </label>
              </div>
            </div>
          </div>

          {/* Media & Image Upload */}
          <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 sm:p-6 rounded-xs shadow-xs space-y-4">
            <h2 className="font-serif text-lg text-[#1A1A18] dark:text-white">
              Product Image
            </h2>

            <div className="space-y-3">
              <div className="aspect-square bg-[#F9F8F6] dark:bg-[#2A2926] border border-dashed border-[#E5E0D8] dark:border-[#333230] rounded-xs overflow-hidden relative flex flex-col items-center justify-center p-4">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name}
                    className="w-full h-full object-cover rounded-xs"
                  />
                ) : (
                  <div className="text-center space-y-2 text-[#8C8279]">
                    <ImageIcon className="w-8 h-8 mx-auto stroke-1" />
                    <p className="text-xs">No image provided</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white text-[11px] font-mono focus:outline-hidden"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600',
                  }))
                }
                className="w-full py-2 border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#8C8279] dark:text-[#A0988E] hover:text-[#1A1A18] dark:hover:text-white hover:bg-[#F0EBE1] dark:hover:bg-[#2A2926] text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Use Sample Unsplash Furniture Photo
              </button>
            </div>
          </div>

        </div>

      </form>

    </div>
  );
};

export default AdminProductFormPage;
