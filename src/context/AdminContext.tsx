'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AdminProduct,
  AdminOrder,
  AdminCategory,
  AdminCustomer,
  AdminReview,
  AdminMessage,
  AdminSubscriber,
  AdminJournalArticle,
  AdminCollection,
  initialProducts,
  initialOrders,
  initialCategories,
  initialCustomers,
  initialReviews,
  initialMessages,
  initialSubscribers,
  initialJournalArticles,
  initialCollections,
  initialSettings,
} from '../data/adminMockData';
import { useShop } from './ShopContext';
import { createPersistedStore, jsonCodec, usePersistedStore } from '@/lib/persistedStore';

const isArray = <T,>(value: unknown): value is T[] => Array.isArray(value);

// Hydration-safe localStorage stores: the server and the hydration render use the
// seed data, then the browser switches to whatever the admin saved.
const adminProductsStore = createPersistedStore<AdminProduct[]>(
  'aura_admin_products',
  initialProducts,
  jsonCodec<AdminProduct[]>(initialProducts, isArray<AdminProduct>)
);
const adminOrdersStore = createPersistedStore<AdminOrder[]>(
  'aura_admin_orders',
  initialOrders,
  jsonCodec<AdminOrder[]>(initialOrders, isArray<AdminOrder>)
);

// Stored as a plain 'dark' / 'light' string because the pre-paint script in the
// root layout reads the same key. No saved value means "follow the system".
const adminThemeStore = createPersistedStore<boolean>('aura_admin_theme', false, {
  parse: (raw) =>
    raw ? raw === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches,
  serialize: (isDark) => (isDark ? 'dark' : 'light'),
});

interface AdminContextType {
  // Theme & Layout
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;

  // Date Filter State
  dateRange: string;
  setDateRange: (range: string) => void;

  // Global Search
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;

  // Products CRUD
  products: AdminProduct[];
  addProduct: (product: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt' | 'salesCount' | 'revenue'>) => void;
  updateProduct: (id: string, updated: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;

  // Orders CRUD
  orders: AdminOrder[];
  updateOrderStatus: (id: string, status: AdminOrder['status']) => void;

  // Categories CRUD
  categories: AdminCategory[];
  addCategory: (category: Omit<AdminCategory, 'id' | 'productCount' | 'createdAt'>) => void;

  // Inventory CRUD
  updateStock: (productId: string, newStock: number) => void;

  // Customers
  customers: AdminCustomer[];

  // Reviews CRUD
  reviews: AdminReview[];
  updateReviewStatus: (id: string, status: AdminReview['status']) => void;
  deleteReview: (id: string) => void;

  // Messages CRUD
  messages: AdminMessage[];
  markMessageAsRead: (id: string) => void;
  replyToMessage: (id: string, replyText: string) => void;

  // Newsletter
  subscribers: AdminSubscriber[];
  exportSubscribersCSV: () => void;

  // Journal Articles
  journalArticles: AdminJournalArticle[];
  addJournalArticle: (article: Omit<AdminJournalArticle, 'id' | 'publishedDate'>) => void;

  // Collections
  collections: AdminCollection[];
  addCollection: (collection: Omit<AdminCollection, 'id' | 'productCount'>) => void;

  // Settings
  settings: typeof initialSettings;
  updateSettings: (newSettings: Partial<typeof initialSettings>) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showNotification } = useShop();

  // Dark mode: light during SSR and hydration, then the saved/system value.
  const isDarkMode = usePersistedStore(adminThemeStore);

  // Sidebar Layout State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Filters
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Data Collections
  const products = usePersistedStore(adminProductsStore);
  const setProducts = adminProductsStore.set;

  const orders = usePersistedStore(adminOrdersStore);
  const setOrders = adminOrdersStore.set;

  const [categories, setCategories] = useState<AdminCategory[]>(initialCategories);
  const [customers] = useState<AdminCustomer[]>(initialCustomers);
  const [reviews, setReviews] = useState<AdminReview[]>(initialReviews);
  const [messages, setMessages] = useState<AdminMessage[]>(initialMessages);
  const [subscribers] = useState<AdminSubscriber[]>(initialSubscribers);
  const [journalArticles, setJournalArticles] = useState<AdminJournalArticle[]>(initialJournalArticles);
  const [collections, setCollections] = useState<AdminCollection[]>(initialCollections);
  const [settings, setSettings] = useState(initialSettings);

  // Apply the theme class. It reads the store directly rather than `isDarkMode`,
  // so the light hydration snapshot never strips the class the pre-paint script
  // already applied. `isDarkMode` is a dependency so toggles and other tabs re-run it.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', adminThemeStore.get());
  }, [isDarkMode]);

  // Scope the theme to the admin area: drop the class when the admin tree
  // unmounts so navigating back to the public site never renders it dark.
  useEffect(() => {
    return () => document.documentElement.classList.remove('dark');
  }, []);

  const toggleDarkMode = () => adminThemeStore.set((prev) => !prev);

  // Product CRUD
  const addProduct = (newProd: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt' | 'salesCount' | 'revenue'>) => {
    const today = new Date().toISOString().split('T')[0];
    const created: AdminProduct = {
      ...newProd,
      id: `prod-${Date.now()}`,
      createdAt: today,
      updatedAt: today,
      salesCount: 0,
      revenue: 0,
    };
    setProducts((prev) => [created, ...prev]);
    showNotification(`Product "${created.name}" created successfully`);
  };

  const updateProduct = (id: string, updated: Partial<AdminProduct>) => {
    const today = new Date().toISOString().split('T')[0];
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated, updatedAt: today } : p))
    );
    showNotification('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showNotification(`Deleted product "${prod?.name || id}"`);
  };

  const duplicateProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;
    const today = new Date().toISOString().split('T')[0];
    const copy: AdminProduct = {
      ...target,
      id: `prod-${Date.now()}`,
      name: `${target.name} (Copy)`,
      slug: `${target.slug}-copy`,
      sku: `${target.sku}-CP`,
      createdAt: today,
      updatedAt: today,
    };
    setProducts((prev) => [copy, ...prev]);
    showNotification(`Duplicated product "${target.name}"`);
  };

  // Orders
  const updateOrderStatus = (id: string, status: AdminOrder['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status } : ord))
    );
    showNotification(`Order ${id} status updated to ${status}`);
  };

  // Categories
  const addCategory = (cat: Omit<AdminCategory, 'id' | 'productCount' | 'createdAt'>) => {
    const created: AdminCategory = {
      ...cat,
      id: `cat-${Date.now()}`,
      productCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCategories((prev) => [...prev, created]);
    showNotification(`Category "${created.name}" created`);
  };

  // Inventory
  const updateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const status = newStock === 0 ? 'Out of Stock' : p.status === 'Out of Stock' ? 'Published' : p.status;
          return { ...p, stock: newStock, status };
        }
        return p;
      })
    );
    showNotification(`Stock quantity updated to ${newStock}`);
  };

  // Reviews
  const updateReviewStatus = (id: string, status: AdminReview['status']) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    showNotification(`Review status marked as ${status}`);
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showNotification('Review removed');
  };

  // Messages
  const markMessageAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: m.status === 'Unread' ? 'Read' : m.status } : m))
    );
  };

  const replyToMessage = (id: string, replyText: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'Replied', replyText } : m))
    );
    showNotification('Reply sent successfully to customer');
  };

  // Newsletter CSV export
  const exportSubscribersCSV = () => {
    const csvHeader = 'Email,Subscribed Date,Status\n';
    const csvRows = subscribers.map((s) => `${s.email},${s.subscribedDate},${s.status}`).join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AURA_Subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showNotification('Newsletter subscribers exported to CSV');
  };

  // Journal
  const addJournalArticle = (art: Omit<AdminJournalArticle, 'id' | 'publishedDate'>) => {
    const created: AdminJournalArticle = {
      ...art,
      id: `art-${Date.now()}`,
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };
    setJournalArticles((prev) => [created, ...prev]);
    showNotification(`Article "${created.title}" published`);
  };

  // Collections
  const addCollection = (col: Omit<AdminCollection, 'id' | 'productCount'>) => {
    const created: AdminCollection = {
      ...col,
      id: `col-${Date.now()}`,
      productCount: 0,
    };
    setCollections((prev) => [...prev, created]);
    showNotification(`Collection "${created.name}" created`);
  };

  // Settings
  const updateSettings = (newSettings: Partial<typeof initialSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showNotification('AURA Admin Settings updated successfully');
  };

  return (
    <AdminContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        dateRange,
        setDateRange,
        globalSearchQuery,
        setGlobalSearchQuery,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        orders,
        updateOrderStatus,
        categories,
        addCategory,
        updateStock,
        customers,
        reviews,
        updateReviewStatus,
        deleteReview,
        messages,
        markMessageAsRead,
        replyToMessage,
        subscribers,
        exportSubscribersCSV,
        journalArticles,
        addJournalArticle,
        collections,
        addCollection,
        settings,
        updateSettings,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
