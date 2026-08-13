"use client";

import React from "react";
import { X } from "lucide-react";
import { AdminProvider, useAdmin } from "../../context/AdminContext";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

const AdminLayoutInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobileSidebarOpen, setIsMobileSidebarOpen } = useAdmin();

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#121210] text-[#1A1A18] dark:text-[#E5E0D8] font-sans antialiased flex flex-col lg:flex-row transition-colors">

      {/* Desktop Persistent Left Sidebar */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay Sheet Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
          />
          <div className="relative flex-1 max-w-xs w-full bg-[#1A1A18] text-white flex flex-col shadow-2xl z-10 animate-in slide-in-from-left">
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#8C8279] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8 animate-in fade-in duration-300">
          {children}
        </main>
      </div>

    </div>
  );
};

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AdminProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminProvider>
  );
};
