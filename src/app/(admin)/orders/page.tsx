"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Filter, Eye, MoreHorizontal, Truck } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { AdminOrder } from '@/data/adminMockData';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState<'All' | 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'>('All');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());

    const matchesTab = selectedTab === 'All' || o.status === selectedTab;

    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: AdminOrder['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300';
      case 'Shipped':
        return 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300';
      case 'Processing':
        return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300';
      case 'Confirmed':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300';
      case 'Pending':
        return 'bg-stone-100 text-stone-800 border-stone-300 dark:bg-stone-800 dark:text-stone-300';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18] dark:text-white">
          Orders Management
        </h1>
        <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
          Track, process, and update status for customer orders.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#E5E0D8] dark:border-[#333230] pb-2 text-xs">
        {(['All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const).map((tab) => {
          const count = tab === 'All' ? orders.length : orders.filter((o) => o.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-3 py-1.5 rounded-xs font-semibold whitespace-nowrap transition-colors ${
                selectedTab === tab
                  ? 'bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18]'
                  : 'text-[#8C8279] hover:text-[#1A1A18] dark:hover:text-white'
              }`}
            >
              {tab} ({count})
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-4 rounded-xs shadow-xs flex items-center justify-between text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8279]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order #, customer name, email..."
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
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] dark:divide-[#333230] text-[#1A1A18] dark:text-white">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926]/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#1A1A18] dark:text-[#D4AF37]">
                    <Link href={`/admin/orders/${ord.id}`} className="hover:underline">
                      {ord.orderNumber}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img src={ord.customerAvatar} alt={ord.customerName} className="w-7 h-7 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="font-semibold">{ord.customerName}</div>
                        <div className="text-[10px] text-[#8C8279] dark:text-[#A0988E]">{ord.customerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#8C8279] dark:text-[#A0988E] whitespace-nowrap">{ord.date}</td>
                  <td className="py-3 px-4">
                    <div>
                      <span className="font-medium">{ord.paymentMethod}</span>
                      <span className={`block text-[10px] font-semibold ${ord.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {ord.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold">${ord.total.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-xs ${getStatusBadge(ord.status)}`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right relative">
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === ord.id ? null : ord.id)}
                      className="p-1 hover:bg-[#F0EBE1] dark:hover:bg-[#333230] rounded-xs text-[#8C8279]"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {activeMenuId === ord.id && (
                      <div className="absolute right-4 mt-1 w-44 bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] shadow-xl rounded-xs p-1.5 z-30 text-left space-y-1 animate-in fade-in">
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            router.push(`/admin/orders/${ord.id}`);
                          }}
                          className="w-full text-left px-2.5 py-1.5 hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] rounded-xs flex items-center gap-2 text-xs"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#8C8279]" />
                          View Order Details
                        </button>
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            updateOrderStatus(ord.id, 'Shipped');
                          }}
                          className="w-full text-left px-2.5 py-1.5 hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] rounded-xs flex items-center gap-2 text-xs"
                        >
                          <Truck className="w-3.5 h-3.5 text-[#8C8279]" />
                          Mark Shipped
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#8C8279]">
                    No orders found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminOrdersPage;
