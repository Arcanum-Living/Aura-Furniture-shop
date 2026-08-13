"use client";

import React, { useState } from 'react';
import { Save, Shield, Store, Bell, Globe, Mail, DollarSign } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, addNotification } = useAdmin();

  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    addNotification({
      title: 'Settings Saved',
      message: 'Store configuration and administrative preferences have been updated.',
      type: 'success',
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18] dark:text-white">
            System & Store Settings
          </h1>
          <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
            Configure Atelier brand details, administrative credentials, and operational preferences.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xs border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
            Settings Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* General Store Details */}
        <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E0D8] dark:border-[#333230] text-[#1A1A18] dark:text-white">
            <Store className="w-4 h-4 text-[#D4AF37]" />
            <h2 className="font-serif text-base font-semibold">Store Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                Storefront Name
              </label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="AUD ($)">AUD ($)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                Timezone
              </label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
              >
                <option value="America/New_York (EST)">America/New_York (EST)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                <option value="Europe/Paris (CET)">Europe/Paris (CET)</option>
                <option value="Asia/Tokyo (JST)">Asia/Tokyo (JST)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Admin Profile Details */}
        <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E0D8] dark:border-[#333230] text-[#1A1A18] dark:text-white">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <h2 className="font-serif text-base font-semibold">Administrator Profile</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                Admin Name
              </label>
              <input
                type="text"
                value={formData.adminName}
                onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={formData.adminEmail}
                onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                Role Title
              </label>
              <input
                type="text"
                disabled
                value={formData.adminRole}
                className="w-full px-3 py-2 bg-[#E5E0D8]/40 dark:bg-[#2A2926]/40 border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#8C8279] dark:text-[#8C8279] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Notifications & Toggles */}
        <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E0D8] dark:border-[#333230] text-[#1A1A18] dark:text-white">
            <Bell className="w-4 h-4 text-[#D4AF37]" />
            <h2 className="font-serif text-base font-semibold">Notification Preferences</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-[#F9F8F6] dark:bg-[#2A2926] rounded-xs border border-[#E5E0D8] dark:border-[#333230] cursor-pointer">
              <div>
                <div className="font-medium text-[#1A1A18] dark:text-white">Email Alert Notifications</div>
                <div className="text-[11px] text-[#8C8279]">Receive emails when high-value orders or low stock triggers occur.</div>
              </div>
              <input
                type="checkbox"
                checked={formData.emailNotifications}
                onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                className="w-4 h-4 accent-[#1A1A18] dark:accent-[#D4AF37]"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-[#F9F8F6] dark:bg-[#2A2926] rounded-xs border border-[#E5E0D8] dark:border-[#333230] cursor-pointer">
              <div>
                <div className="font-medium text-[#1A1A18] dark:text-white">Low Stock Warning Thresholds</div>
                <div className="text-[11px] text-[#8C8279]">Trigger low stock badges in inventory manager when items reach threshold.</div>
              </div>
              <input
                type="checkbox"
                checked={formData.lowStockThresholdAlerts}
                onChange={(e) => setFormData({ ...formData, lowStockThresholdAlerts: e.target.checked })}
                className="w-4 h-4 accent-[#1A1A18] dark:accent-[#D4AF37]"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] font-semibold text-xs rounded-xs shadow-xs hover:opacity-90 transition-opacity"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminSettingsPage;
