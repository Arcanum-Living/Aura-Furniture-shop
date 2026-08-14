"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Boxes,
  ShoppingBag,
  Users,
  MessageSquare,
  Mail,
  Newspaper,
  BookOpen,
  Layers,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  User,
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

export const AdminSidebar: React.FC = () => {
  const {
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    setIsMobileSidebarOpen,
    settings,
    messages,
    orders,
  } = useAdmin();

  const pathname = usePathname();
  const router = useRouter();

  const unreadMessagesCount = messages.filter((m) => m.status === "Unread").length;
  const pendingOrdersCount = orders.filter(
    (o) => o.status === "Pending" || o.status === "Processing"
  ).length;

  const navGroups = [
    {
      title: "OVERVIEW",
      items: [{ label: "Dashboard", path: "/admin", icon: LayoutDashboard }],
    },
    {
      title: "CATALOG",
      items: [
        { label: "Products", path: "/admin/products", icon: Package },
        { label: "Categories", path: "/admin/categories", icon: FolderTree },
        { label: "Inventory", path: "/admin/inventory", icon: Boxes },
      ],
    },
    {
      title: "SALES",
      items: [
        {
          label: "Orders",
          path: "/admin/orders",
          icon: ShoppingBag,
          badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
        },
        { label: "Customers", path: "/admin/customers", icon: Users },
      ],
    },
    {
      title: "ENGAGEMENT",
      items: [
        { label: "Reviews", path: "/admin/reviews", icon: MessageSquare },
        {
          label: "Messages",
          path: "/admin/messages",
          icon: Mail,
          badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
        },
        { label: "Newsletter", path: "/admin/newsletter", icon: Newspaper },
      ],
    },
    {
      title: "CONTENT",
      items: [
        { label: "Journal", path: "/admin/journal", icon: BookOpen },
        { label: "Collections", path: "/admin/collections", icon: Layers },
      ],
    },
    {
      title: "SYSTEM",
      items: [{ label: "Settings", path: "/admin/settings", icon: Settings }],
    },
  ];

  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const isActive = (path: string) =>
    path === "/admin" ? pathname === "/admin" : pathname.startsWith(path);

  return (
    <aside
      className={`relative flex flex-col bg-white dark:bg-[#121210] text-[#1A1A18] dark:text-[#E5E0D8] border-r border-[#E5E0D8] dark:border-[#262522] transition-all duration-300 z-30 shrink-0 h-full ${
        isSidebarCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-[#E5E0D8] dark:border-[#262522] shrink-0">
        <Link
          href="/admin"
          className="flex items-center gap-3 overflow-hidden group focus:outline-hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div className="w-8 h-8 rounded-xs bg-[#D4AF37] text-[#1A1A18] font-serif font-bold text-lg flex items-center justify-center shrink-0">
            A
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-serif italic text-lg tracking-[0.15em] text-[#1A1A18] dark:text-white font-semibold">
                AURA
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#D4AF37] font-bold uppercase -mt-1">
                ADMIN ATELIER
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden lg:flex w-6 h-6 items-center justify-center rounded-xs text-[#8C8279] hover:text-[#1A1A18] hover:bg-[#F0EBE1] dark:hover:text-white dark:hover:bg-[#2A2926] transition-colors"
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Nav Links */}
      <div className="admin-sidebar-nav flex-1 min-h-0 overflow-y-auto py-4 px-3 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {!isSidebarCollapsed && (
              <div className="px-3 text-[10px] font-bold tracking-[0.25em] text-[#8C8279] uppercase mb-2">
                {group.title}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xs text-xs font-medium transition-all group relative ${
                    active
                      ? "bg-[#F0EBE1] text-[#1A1A18] dark:bg-[#2A2926] dark:text-white border-l-2 border-[#D4AF37] shadow-xs"
                      : "text-[#6B635B] hover:bg-[#F0EBE1] hover:text-[#1A1A18] dark:text-[#B0A89F] dark:hover:bg-[#232220] dark:hover:text-white"
                  } ${isSidebarCollapsed ? "justify-center px-0" : ""}`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0 stroke-[1.75]" />
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                  {"badge" in item && item.badge !== undefined && (
                    <span
                      className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-xs bg-[#D4AF37] text-[#1A1A18] ${
                        isSidebarCollapsed ? "absolute -top-1 -right-1 px-1 py-0 text-[8px]" : ""
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* View Live Store */}
      <div className="p-3 border-t border-[#E5E0D8] dark:border-[#262522] shrink-0">
        <Link
          href="/"
          target="_blank"
          className={`flex items-center gap-2 px-3 py-2 text-xs text-[#8C8279] hover:text-[#1A1A18] hover:bg-[#F0EBE1] dark:hover:text-white dark:hover:bg-[#232220] rounded-xs transition-colors ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}
          title="View Live Store"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          {!isSidebarCollapsed && <span className="truncate">View Live Store</span>}
        </Link>
      </div>

      {/* Admin Profile Footer */}
      <div className="relative p-3 border-t border-[#E5E0D8] dark:border-[#262522] bg-[#F9F8F6] dark:bg-[#141412] shrink-0">
        <div
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className={`flex items-center gap-3 p-2 rounded-xs cursor-pointer hover:bg-[#F0EBE1] dark:hover:bg-[#232220] transition-colors ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-semibold text-xs shrink-0">
            VS
          </div>
          {!isSidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-[#1A1A18] dark:text-white truncate flex items-center gap-1">
                <span>{settings.adminName}</span>
                <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
              </div>
              <div className="text-[10px] text-[#8C8279] truncate">{settings.adminRole}</div>
            </div>
          )}
        </div>

        {isProfileOpen && (
          <div className="absolute bottom-16 left-3 right-3 bg-white dark:bg-[#232220] border border-[#E5E0D8] dark:border-[#333230] rounded-xs shadow-2xl p-1.5 z-50 text-xs text-[#1A1A18] dark:text-white animate-in fade-in slide-in-from-bottom-2">
            <div className="px-3 py-2 border-b border-[#E5E0D8] dark:border-[#333230] mb-1">
              <div className="font-medium truncate">{settings.adminEmail}</div>
              <div className="text-[10px] text-[#8C8279]">Role: {settings.adminRole}</div>
            </div>
            <button
              onClick={() => {
                setIsProfileOpen(false);
                router.push("/admin/settings");
              }}
              className="w-full text-left px-3 py-2 hover:bg-[#F0EBE1] dark:hover:bg-[#333230] rounded-xs flex items-center gap-2 text-[#1A1A18] dark:text-[#E5E0D8]"
            >
              <User className="w-3.5 h-3.5" />
              Profile Settings
            </button>
            <button
              onClick={() => {
                setIsProfileOpen(false);
                router.push("/");
              }}
              className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-600 dark:hover:bg-rose-950/40 dark:text-rose-400 rounded-xs flex items-center gap-2 mt-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out Admin
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
