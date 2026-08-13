"use client";

import React, { useState } from 'react';
import {
  Boxes,
  AlertTriangle,
  PackageX,
  DollarSign,
  Search,
  Filter,
  Edit2,
  X,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export const AdminInventoryPage: React.FC = () => {
  const { products, updateStock } = useAdmin();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Healthy' | 'Low Stock' | 'Out of Stock'>('All');

  // Stock Adjustment Modal
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [newStockQty, setNewStockQty] = useState<number>(0);
  const [adjustmentReason, setAdjustmentReason] = useState('Restock Shipment');

  // Calculate KPIs
  const totalStockItems = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const totalInventoryValuation = products.reduce((sum, p) => sum + p.stock * p.price, 0);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());

    const isLow = p.stock > 0 && p.stock <= p.lowStockThreshold;
    const isOut = p.stock === 0;
    const isHealthy = p.stock > p.lowStockThreshold;

    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Healthy' && isHealthy) ||
      (filterStatus === 'Low Stock' && isLow) ||
      (filterStatus === 'Out of Stock' && isOut);

    return matchesSearch && matchesStatus;
  });

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProductId !== null) {
      updateStock(selectedProductId, newStockQty);
      setSelectedProductId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18] dark:text-white">
          Inventory Management
        </h1>
        <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
          Monitor warehouse stock levels, low-inventory triggers, and product valuations.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 rounded-xs shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8C8279] dark:text-[#A0988E] font-medium block">
            Total In-Stock Units
          </span>
          <div className="font-serif text-2xl text-[#1A1A18] dark:text-white flex items-center justify-between">
            <span>{totalStockItems.toLocaleString()}</span>
            <Boxes className="w-5 h-5 text-[#8C8279]" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1A1A18] border border-amber-200 dark:border-amber-900/40 p-5 rounded-xs shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold block">
            Low Stock Triggers
          </span>
          <div className="font-serif text-2xl text-amber-800 dark:text-amber-400 flex items-center justify-between">
            <span>{lowStockCount} Products</span>
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1A1A18] border border-rose-200 dark:border-rose-900/40 p-5 rounded-xs shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-rose-800 dark:text-rose-400 font-semibold block">
            Out of Stock
          </span>
          <div className="font-serif text-2xl text-rose-800 dark:text-rose-400 flex items-center justify-between">
            <span>{outOfStockCount} Products</span>
            <PackageX className="w-5 h-5 text-rose-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 rounded-xs shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8C8279] dark:text-[#A0988E] font-medium block">
            Inventory Valuation
          </span>
          <div className="font-serif text-2xl text-[#1A1A18] dark:text-[#D4AF37] flex items-center justify-between">
            <span>${totalInventoryValuation.toLocaleString()}</span>
            <DollarSign className="w-5 h-5 text-[#D4AF37]" />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-4 rounded-xs shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8279]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name, SKU..."
            className="w-full pl-9 pr-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white placeholder-[#8C8279] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {(['All', 'Healthy', 'Low Stock', 'Out of Stock'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                filterStatus === status
                  ? 'bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] font-semibold'
                  : 'bg-[#F9F8F6] dark:bg-[#2A2926] text-[#8C8279] hover:text-[#1A1A18] dark:hover:text-white border border-[#E5E0D8] dark:border-[#333230]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F9F8F6] dark:bg-[#2A2926] text-[#8C8279] dark:text-[#A0988E] uppercase tracking-wider text-[10px] border-b border-[#E5E0D8] dark:border-[#333230]">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Threshold</th>
                <th className="py-3 px-4">Stock Value</th>
                <th className="py-3 px-4">Health Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] dark:divide-[#333230] text-[#1A1A18] dark:text-white">
              {filteredProducts.map((p) => {
                const isOut = p.stock === 0;
                const isLow = p.stock > 0 && p.stock <= p.lowStockThreshold;

                return (
                  <tr key={p.id} className="hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926]/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-8 h-8 object-cover rounded-xs border shrink-0" />
                        <span className="font-semibold text-xs text-[#1A1A18] dark:text-white">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#8C8279] dark:text-[#A0988E]">{p.sku}</td>
                    <td className="py-3 px-4 text-[#8C8279] dark:text-[#A0988E]">{p.category}</td>
                    <td className="py-3 px-4 font-bold text-sm">
                      <span className={isOut ? 'text-rose-600' : isLow ? 'text-amber-600' : 'text-emerald-600 dark:text-emerald-400'}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#8C8279] dark:text-[#A0988E]">{p.lowStockThreshold} units</td>
                    <td className="py-3 px-4 font-medium">${(p.stock * p.price).toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-xs border ${
                          isOut
                            ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
                            : isLow
                            ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                        }`}
                      >
                        {isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedProductId(p.id);
                          setNewStockQty(p.stock);
                        }}
                        className="px-2.5 py-1 bg-[#F0EBE1] dark:bg-[#2A2926] text-[#1A1A18] dark:text-white hover:bg-[#1A1A18] hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-[#1A1A18] rounded-xs text-[11px] font-semibold transition-colors flex items-center gap-1.5 ml-auto"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Adjust Stock</span>
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#8C8279]">
                    No inventory records match search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {selectedProductId !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
              <h3 className="font-serif text-lg font-semibold text-[#1A1A18] dark:text-white">
                Adjust Warehouse Stock
              </h3>
              <button onClick={() => setSelectedProductId(null)} className="text-[#8C8279]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdjustSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  New Stock Quantity
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={newStockQty}
                  onChange={(e) => setNewStockQty(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white font-bold text-sm focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Adjustment Reason
                </label>
                <select
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                >
                  <option value="Restock Shipment">Supplier Restock Shipment</option>
                  <option value="Warehouse Audit">Physical Warehouse Audit</option>
                  <option value="Damaged Stock">Damaged / Defective Removal</option>
                  <option value="Customer Return">Customer Return Restock</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProductId(null)}
                  className="px-4 py-2 border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] rounded-xs font-semibold hover:opacity-90 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Update Quantity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminInventoryPage;
