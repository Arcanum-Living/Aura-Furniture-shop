"use client";

import React, { useState } from 'react';
import { Users, Search, Mail, Phone, ShoppingBag, DollarSign, X } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { AdminCustomer } from '@/data/adminMockData';

export const AdminCustomersPage: React.FC = () => {
  const { customers, orders } = useAdmin();
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18] dark:text-white">
          Customer Directory
        </h1>
        <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
          Manage registered clients, order history, and VIP accounts.
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-4 rounded-xs shadow-xs text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8279]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name or email..."
            className="w-full pl-9 pr-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white placeholder-[#8C8279] focus:outline-hidden"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F9F8F6] dark:bg-[#2A2926] text-[#8C8279] dark:text-[#A0988E] uppercase tracking-wider text-[10px] border-b border-[#E5E0D8] dark:border-[#333230]">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Member Since</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] dark:divide-[#333230] text-[#1A1A18] dark:text-white">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926]/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-[10px] text-[#8C8279] dark:text-[#A0988E]">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-xs border ${
                        c.status === 'VIP'
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold">{c.ordersCount} orders</td>
                  <td className="py-3 px-4 font-serif font-bold text-sm text-[#1A1A18] dark:text-[#D4AF37]">
                    ${c.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-[#8C8279] dark:text-[#A0988E]">{c.joinedDate}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(c)}
                      className="px-3 py-1 bg-[#F0EBE1] dark:bg-[#2A2926] text-[#1A1A18] dark:text-white hover:bg-[#1A1A18] hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-[#1A1A18] rounded-xs text-xs font-semibold transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8] dark:border-[#333230]">
              <div className="flex items-center gap-3">
                <img src={selectedCustomer.avatar} alt={selectedCustomer.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#1A1A18] dark:text-white">
                    {selectedCustomer.name}
                  </h3>
                  <span className="text-xs text-[#8C8279] dark:text-[#A0988E]">{selectedCustomer.email}</span>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-[#8C8279]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F9F8F6] dark:bg-[#2A2926] rounded-xs border border-[#E5E0D8] dark:border-[#333230]">
                <span className="text-[10px] uppercase text-[#8C8279] block">Total Orders</span>
                <span className="font-serif text-xl font-bold text-[#1A1A18] dark:text-white">
                  {selectedCustomer.ordersCount}
                </span>
              </div>
              <div className="p-3 bg-[#F9F8F6] dark:bg-[#2A2926] rounded-xs border border-[#E5E0D8] dark:border-[#333230]">
                <span className="text-[10px] uppercase text-[#8C8279] block">Total Lifetime Value</span>
                <span className="font-serif text-xl font-bold text-[#D4AF37]">
                  ${selectedCustomer.totalSpent.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#1A1A18] dark:text-white">
              <div>
                <span className="font-bold text-[10px] uppercase text-[#8C8279] block">Primary Address</span>
                <p>{selectedCustomer.address}</p>
              </div>
              <div>
                <span className="font-bold text-[10px] uppercase text-[#8C8279] block">Phone</span>
                <p>{selectedCustomer.phone}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E0D8] dark:border-[#333230] flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] text-xs font-semibold rounded-xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCustomersPage;
