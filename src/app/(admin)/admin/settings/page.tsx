"use client";

import React, { useState } from "react";
import { Save, Shield, Store, Bell } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings } = useAdmin();

  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
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
            Settings Saved ✓
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">

        {/* Store Information */}
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
                Store Email
              </label>
              <input
                type="email"
                value={formData.storeEmail}
                onChange={(e) => setFormData({ ...formData, storeEmail: e.target.value })}
                className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.001"
                value={formData.taxRate}
                onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                Default Shipping Fee ($)
              </label>
              <input
                type="number"
                value={formData.defaultShippingFee}
                onChange={(e) =>
                  setFormData({ ...formData, defaultShippingFee: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
              Store Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
            />
          </div>
        </div>

        {/* Administrator Profile */}
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
                className="w-full px-3 py-2 bg-[#E5E0D8]/40 dark:bg-[#2A2926]/40 border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#8C8279] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E0D8] dark:border-[#333230] text-[#1A1A18] dark:text-white">
            <Bell className="w-4 h-4 text-[#D4AF37]" />
            <h2 className="font-serif text-base font-semibold">Notification Preferences</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-[#F9F8F6] dark:bg-[#2A2926] rounded-xs border border-[#E5E0D8] dark:border-[#333230] cursor-pointer">
              <div>
                <div className="font-medium text-[#1A1A18] dark:text-white">Email Notifications</div>
                <div className="text-[11px] text-[#8C8279]">
                  Receive emails for high-value orders and low stock triggers.
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.emailNotifications}
                onChange={(e) =>
                  setFormData({ ...formData, emailNotifications: e.target.checked })
                }
                className="w-4 h-4 accent-[#1A1A18] dark:accent-[#D4AF37]"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-[#F9F8F6] dark:bg-[#2A2926] rounded-xs border border-[#E5E0D8] dark:border-[#333230] cursor-pointer">
              <div>
                <div className="font-medium text-[#1A1A18] dark:text-white">Order Notifications</div>
                <div className="text-[11px] text-[#8C8279]">
                  Get notified when new orders are placed.
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.orderNotifications}
                onChange={(e) =>
                  setFormData({ ...formData, orderNotifications: e.target.checked })
                }
                className="w-4 h-4 accent-[#1A1A18] dark:accent-[#D4AF37]"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-[#F9F8F6] dark:bg-[#2A2926] rounded-xs border border-[#E5E0D8] dark:border-[#333230] cursor-pointer">
              <div>
                <div className="font-medium text-[#1A1A18] dark:text-white">Low Stock Alerts</div>
                <div className="text-[11px] text-[#8C8279]">
                  Trigger low stock badges when items reach threshold.
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.lowStockNotifications}
                onChange={(e) =>
                  setFormData({ ...formData, lowStockNotifications: e.target.checked })
                }
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
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
