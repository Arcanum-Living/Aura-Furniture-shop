"use client";

import React from 'react';
import { Newspaper, Download, Mail, Users, CheckCircle } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export const AdminNewsletterPage: React.FC = () => {
  const { subscribers, exportSubscribersCSV } = useAdmin();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18] dark:text-white">
            Newsletter Subscribers
          </h1>
          <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
            Subscribers for AURA Furniture editorial dispatch & private catalog reveals.
          </p>
        </div>

        <button
          onClick={exportSubscribersCSV}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] text-xs font-semibold rounded-xs shadow-xs hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" />
          <span>Export Subscribers CSV</span>
        </button>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 rounded-xs shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8C8279] block">Total Subscribers</span>
          <div className="font-serif text-2xl text-[#1A1A18] dark:text-white flex items-center justify-between">
            <span>{subscribers.length + 1280}</span>
            <Users className="w-5 h-5 text-[#D4AF37]" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 rounded-xs shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8C8279] block">New This Month</span>
          <div className="font-serif text-2xl text-emerald-700 dark:text-emerald-400 flex items-center justify-between">
            <span>+142</span>
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 rounded-xs shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8C8279] block">Deliverability Rate</span>
          <div className="font-serif text-2xl text-[#1A1A18] dark:text-white flex items-center justify-between">
            <span>99.4%</span>
            <Mail className="w-5 h-5 text-[#8C8279]" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F9F8F6] dark:bg-[#2A2926] text-[#8C8279] dark:text-[#A0988E] uppercase tracking-wider text-[10px] border-b border-[#E5E0D8] dark:border-[#333230]">
              <tr>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">Subscribed Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] dark:divide-[#333230] text-[#1A1A18] dark:text-white">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926]/50">
                  <td className="py-3 px-4 font-semibold">{sub.email}</td>
                  <td className="py-3 px-4 text-[#8C8279]">{sub.subscribedDate}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-xs uppercase">
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminNewsletterPage;
