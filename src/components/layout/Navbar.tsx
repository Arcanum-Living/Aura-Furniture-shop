import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, User, LogOut, CheckCircle2 } from 'lucide-react';
import { useShop } from '../../../context/ShopContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
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

  const isHomePage = location.pathname === '/';

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
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine text color and background based on scroll and current route
  const navBgClass = isScrolled
    ? 'bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E5E0D8] py-4 shadow-xs'
    : isHomePage
    ? 'bg-transparent text-[#1A1A18] border-b border-[#E5E0D8]/60 py-5'
    : 'bg-[#F9F8F6] border-b border-[#E5E0D8] py-5 text-[#1A1A18]';

  const textColorClass = 'text-[#1A1A18]';
  const logoColorClass = 'text-[#1A1A18]';

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          
          {/* Left Nav (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-[11px] tracking-[0.2em] uppercase font-semibold">
            <Link
              to="/shop"
              className={`${textColorClass} hover:text-[#8C8279] transition-colors relative group py-1`}
            >
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1A1A18] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              to="/collections"
              className={`${textColorClass} hover:text-[#8C8279] transition-colors relative group py-1`}
            >
              Collections
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1A1A18] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              to="/about"
              className={`${textColorClass} hover:text-[#8C8279] transition-colors relative group py-1`}
            >
              Studio
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1A1A18] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              to="/journal"
              className={`${textColorClass} hover:text-[#8C8279] transition-colors relative group py-1`}
            >
              Journal
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1A1A18] transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Center Brand Logo */}
          <div className="flex-1 md:flex-initial text-center md:text-left">
            <Link
              to="/"
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
              to="/wishlist"
              aria-label="Wishlist"
              className={`hidden sm:block ${textColorClass} hover:opacity-70 transition-opacity p-1 relative`}
              id="nav-wishlist-btn"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8C8279] text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
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
                  to="/login"
                  aria-label="Login / Sign In"
                  className={`${textColorClass} hover:opacity-70 transition-opacity p-1 focus:outline-hidden block`}
                  id="nav-user-btn"
                >
                  <User className="w-5 h-5 stroke-[1.5]" />
                </Link>
              )}

              {/* User Dropdown Menu if Logged In */}
              {user && isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-[#E5E0D8] rounded-xs shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2.5 border-b border-[#E5E0D8] bg-[#F9F8F6]">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1A18]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{user.name}</span>
                    </div>
                    <div className="text-[10px] text-[#8C8279] truncate mt-0.5">{user.email}</div>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/wishlist"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="px-4 py-2 text-xs text-[#1A1A18] hover:bg-[#F9F8F6] flex items-center justify-between"
                    >
                      Saved Items
                      <span className="text-[10px] font-bold text-[#8C8279]">{wishlist.length}</span>
                    </Link>
                    <Link
                      to="/cart"
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
                </div>
              )}
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className={`${textColorClass} hover:opacity-70 transition-opacity p-1 relative focus:outline-hidden`}
              id="nav-cart-btn"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#1A1A18] text-white text-[10px] font-medium flex items-center justify-center border border-white/20">
                  {cartCount}
                </span>
              )}
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
