'use client'
import React, { createContext, useContext, useState, useRef } from 'react';
import { Product, CartItem } from '@/types';
import {
  addCartItem,
  getCartCount,
  getCartSubtotal,
  removeCartItem,
  updateCartItemQuantity,
} from '@/lib/cart';
import { createPersistedStore, jsonCodec, usePersistedStore } from '@/lib/persistedStore';

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface ShopContextType {
  user: User | null;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  /** `lineKey` comes from `getCartLineKey(item)` — one product in one colour. */
  removeFromCart: (lineKey: string) => void;
  updateQuantity: (lineKey: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  notificationMessage: string | null;
  showNotification: (msg: string) => void;
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isUser = (value: unknown): value is User | null =>
  value === null ||
  (isObject(value) && typeof value.name === 'string' && typeof value.email === 'string');

const isCart = (value: unknown): value is CartItem[] =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      isObject(item) &&
      typeof item.quantity === 'number' &&
      isObject(item.product) &&
      typeof item.product.id === 'string' &&
      typeof item.product.price === 'number'
  );

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((id) => typeof id === 'string');

// Module-level stores: read from localStorage only in the browser, after hydration.
const userStore = createPersistedStore<User | null>('aura_user', null, jsonCodec<User | null>(null, isUser));
const cartStore = createPersistedStore<CartItem[]>('aura_cart', [], jsonCodec<CartItem[]>([], isCart));
const wishlistStore = createPersistedStore<string[]>('aura_wishlist', [], jsonCodec<string[]>([], isStringArray));

const NOTIFICATION_DURATION_MS = 3000;

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = usePersistedStore(userStore);
  const cart = usePersistedStore(cartStore);
  const wishlist = usePersistedStore(wishlistStore);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const notificationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNotification = (msg: string) => {
    // Restart the timer so an older toast's timeout can't hide a newer message early.
    if (notificationTimer.current) clearTimeout(notificationTimer.current);
    setNotificationMessage(msg);
    notificationTimer.current = setTimeout(() => {
      setNotificationMessage(null);
      notificationTimer.current = null;
    }, NOTIFICATION_DURATION_MS);
  };

  const loginUser = (email: string, name?: string) => {
    const formattedName = name || email.split('@')[0].replace('.', ' ');
    const newUser: User = {
      email,
      name: formattedName.charAt(0).toUpperCase() + formattedName.slice(1),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };
    userStore.set(newUser);
    showNotification(`Welcome back, ${newUser.name}`);
  };

  const logoutUser = () => {
    userStore.set(null);
    showNotification('Logged out successfully');
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    cartStore.set((prev) => addCartItem(prev, product, quantity, selectedColor));
    showNotification(`Added "${product.name}" to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (lineKey: string) => {
    cartStore.set((prev) => removeCartItem(prev, lineKey));
  };

  const updateQuantity = (lineKey: string, delta: number) => {
    cartStore.set((prev) => updateCartItemQuantity(prev, lineKey, delta));
  };

  const clearCart = () => {
    cartStore.set([]);
  };

  const toggleWishlist = (productId: string) => {
    // Decide first, then update and notify: state updaters must stay free of side effects.
    const isSaved = wishlistStore.get().includes(productId);
    wishlistStore.set((prev) =>
      isSaved ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
    showNotification(isSaved ? 'Removed from Wishlist' : 'Added to Wishlist');
  };

  const removeFromWishlist = (productId: string) => {
    wishlistStore.set((prev) => prev.filter((id) => id !== productId));
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = getCartCount(cart);
  const cartSubtotal = getCartSubtotal(cart);

  return (
    <ShopContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        quickViewProduct,
        setQuickViewProduct,
        notificationMessage,
        showNotification,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
