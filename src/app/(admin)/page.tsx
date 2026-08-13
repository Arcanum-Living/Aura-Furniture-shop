"use client";

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Download, RefreshCw } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { CategoryChart } from '@/components/admin/CategoryChart';
import { LowStockAlert } from '@/components/admin/LowStockAlert';
import { RecentOrders } from '@/components/admin/RecentOrders';
import { TopProducts } from '@/components/admin/TopProducts';

export const AdminDashboardHome: React.FC = () => {
  const { dateRange, setDateRange } = useAdmin();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Welcome Bar & Date Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
            AURA MANAGEMENT ATELIER
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18] dark:text-white mt-0.5">
            Executive Dashboard
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Refresh Data */}
          <button
            onClick={handleRefresh}
            className="p-2 border border-[#E5E0D8] dark:border-[#333230] rounded-xs hover:bg-[#F0EBE1] dark:hover:bg-[#2A2926] text-[#1A1A18] dark:text-white transition-colors"
            title="Refresh Dashboard Data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Date Range Selector */}
          <div className="relative inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-xs font-medium text-[#1A1A18] dark:text-white shadow-xs">
            <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="Today">Today</option>
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
              <option value="Last 90 days">Last 90 days</option>
              <option value="Custom Range">Custom Range</option>
            </select>
          </div>

          {/* Export Report CTA */}
          <button
            onClick={() => alert('Executive analytics report generated and saved.')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] hover:opacity-90 rounded-xs transition-opacity"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>

        </div>
      </div>

      {/* KPI Cards */}
      <DashboardStats />

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <CategoryChart />
        </div>
      </div>

      {/* Inventory Low Stock Alert Banner */}
      <LowStockAlert />

      {/* Bottom Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
        <div className="lg:col-span-1">
          <TopProducts />
        </div>
      </div>

    </div>
  );
};

export default AdminDashboardHome;
