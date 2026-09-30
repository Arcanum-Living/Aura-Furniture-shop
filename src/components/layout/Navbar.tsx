'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Search, Heart, ShoppingBag, Menu, X, User, LogOut, CheckCircle2 } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { DURATION, EASE_OUT, HoverUnderline } from '@/components/motion';

/** Shared entrance/exit for the small anchored menus hanging off the bar. */
const dropdownMotion = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: DURATION.fast, ease: EASE_OUT },
};

/** Count pills: a quick, weightless fade-and-settle as the number changes. */
const badgeMotion = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.2, ease: EASE_OUT },
};

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'Studio' },
  { href: '/journal', label: 'Journal' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const {
    user,
    logoutUser,
    cartCount,
    wishlist,
    setIsSearchOpen,
    setIsCartOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useShop();

  const isHomePage = pathname === '/';

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // rAF-throttled so the bar's transparent → solid crossfade stays smooth
    // even while the browser is firing scroll events at full rate.
    let frame = 0;

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 40);
        frame = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Determine text color and background based on scroll and current route
  const navBgClass = isScrolled
    ? 'bg-[#F9F8F6]/85 backdrop-blur-md border-b border-[#E5E0D8] py-4 shadow-md'
    : isHomePage
    ? 'bg-transparent backdrop-blur-0 text-[#1A1A18] border-b border-[#E5E0D8]/60 py-5 shadow-none'
    : 'bg-[#F9F8F6] backdrop-blur-0 border-b border-[#E5E0D8] py-5 text-[#1A1A18] shadow-none';

  const textColorClass = 'text-[#1A1A18]';
  const logoColorClass = 'text-[#1A1A18]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-[background-color,backdrop-filter,border-color,box-shadow,padding] duration-500 ease-out ${navBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          
          {/* Left Nav (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-[11px] tracking-[0.2em] uppercase font-semibold">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${textColorClass} hover:text-[#8C8279] transition-colors py-1`}
              >
                <HoverUnderline>{link.label}</HoverUnderline>
              </Link>
            ))}
          </nav>

          {/* Center Brand Logo */}
          <div className="flex-1 md:flex-initial text-center md:text-left">
            <Link
              href="/"
              className={`font-serif italic text-3xl tracking-[0.1em] text-[#1A1A18] inline-block transition-colors`}
              id="brand-logo"
            >
              AURA
            </Link>
          </div>

          {/* Right Nav / Actions (Desktop & Mobile) */}
          <div className="flex items-center space-x-5 sm:space-x-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className={`${textColorClass} hover:opacity-70 transition-opacity p-1 focus:outline-hidden`}
              id="nav-search-btn"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className={`hidden sm:block ${textColorClass} hover:opacity-70 transition-opacity p-1 relative group`}
              id="nav-wishlist-btn"
            >
              <Heart className="w-5 h-5 stroke-[1.5] transition-transform duration-300 ease-out group-hover:scale-110" />
              <AnimatePresence>
                {wishlist.length > 0 && (
                  <motion.span
                    key={wishlist.length}
                    {...badgeMotion}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8C8279] text-white text-[9px] font-bold flex items-center justify-center"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* User Account Icon / Menu */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label="User Account"
                  className={`${textColorClass} hover:opacity-80 transition-opacity p-1 flex items-center gap-1.5 focus:outline-hidden`}
                  id="nav-user-btn"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-[#1A1A18]/30">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                </button>
              ) : (
                <Link
                  href="/login"
                  aria-label="Login / Sign In"
                  className={`${textColorClass} hover:opacity-70 transition-opacity p-1 focus:outline-hidden block`}
                  id="nav-user-btn"
                >
                  <User className="w-5 h-5 stroke-[1.5]" />
                </Link>
              )}

              {/* User Dropdown Menu if Logged In */}
              <AnimatePresence>
                {user && isUserMenuOpen && (
                  <motion.div
                    {...dropdownMotion}
                    className="absolute right-0 mt-3 w-56 origin-top bg-white border border-[#E5E0D8] rounded-xs shadow-xl py-2 z-50"
                  >
                  <div className="px-4 py-2.5 border-b border-[#E5E0D8] bg-[#F9F8F6]">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1A18]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{user.name}</span>
                    </div>
                    <div className="text-[10px] text-[#8C8279] truncate mt-0.5">{user.email}</div>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/wishlist"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="px-4 py-2 text-xs text-[#1A1A18] hover:bg-[#F9F8F6] flex items-center justify-between"
                    >
                      Saved Items
                      <span className="text-[10px] font-bold text-[#8C8279]">{wishlist.length}</span>
                    </Link>
                    <Link
                      href="/cart"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="px-4 py-2 text-xs text-[#1A1A18] hover:bg-[#F9F8F6] flex items-center justify-between"
                    >
                      Shopping Cart
                      <span className="text-[10px] font-bold text-[#8C8279]">{cartCount}</span>
                    </Link>
                  </div>
                  <div className="border-t border-[#E5E0D8] pt-1">
                    <button
                      onClick={() => {
                        logoutUser();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-700 hover:bg-rose-50 flex items-center gap-2 transition-colors font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className={`${textColorClass} hover:opacity-70 transition-opacity p-1 relative focus:outline-hidden group`}
              id="nav-cart-btn"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5] transition-transform duration-300 ease-out group-hover:scale-110" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    {...badgeMotion}
                    className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#1A1A18] text-white text-[10px] font-medium flex items-center justify-center border border-white/20"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className={`md:hidden ${textColorClass} hover:opacity-70 transition-opacity p-1 focus:outline-hidden`}
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.5]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
