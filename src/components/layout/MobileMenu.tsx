"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Heart, User } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export const MobileMenu: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    wishlist,
    user,
    logoutUser,
  } = useShop();

  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname, setIsMobileMenuOpen]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const menuLinks = [
    {
      label: "Shop Furniture",
      path: "/shop",
      subtitle: "Browse catalog & filters",
    },
    {
      label: "Collections",
      path: "/collections",
      subtitle: "Living, Bedroom, Dining & Light",
    },
    {
      label: "Studio & About",
      path: "/about",
      subtitle: "The AURA philosophy",
    },
    {
      label: "Our Craft",
      path: "/craft",
      subtitle: "Artisanal materials & process",
    },
    {
      label: "Interior Design",
      path: "/interior-design",
      subtitle: "Bespoke spatial consultations",
    },
    {
      label: "Journal",
      path: "/journal",
      subtitle: "Design stories & inspirations",
    },
    {
      label: "Care Guide",
      path: "/care-guide",
      subtitle: "Maintenance for timber & stone",
    },
    {
      label: "Contact",
      path: "/contact",
      subtitle: "Inquire or visit our NYC studio",
    },
  ];

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#F9F8F6] flex flex-col justify-between overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-[#E5E0D8]">
            <Link
              href="/"
              className="font-serif text-2xl tracking-[0.25em] uppercase font-semibold text-[#1A1A18]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AURA
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#1A1A18] hover:opacity-70 transition-opacity"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Nav Items List */}
          <div className="px-6 py-8 flex-1 flex flex-col justify-center space-y-6">
            {menuLinks.map((link, idx) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link
                  href={link.path}
                  className="group flex items-center justify-between py-2 text-[#1A1A18] border-b border-[#E5E0D8]/60 pb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div>
                    <span className="block font-serif text-2xl font-medium tracking-wide group-hover:text-[#8C8279] transition-colors">
                      {link.label}
                    </span>

                    <span className="block text-xs text-[#8C8279] mt-0.5 tracking-wider font-light">
                      {link.subtitle}
                    </span>
                  </div>

                  <ArrowRight className="w-5 h-5 text-[#8C8279] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer Quick Links inside Mobile Menu */}
          <div className="p-6 bg-[#F0EBE1] border-t border-[#E5E0D8] space-y-4">
            <div className="flex items-center justify-between text-xs tracking-widest text-[#1A1A18]">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 font-medium">
                    <User className="w-4 h-4 text-[#8C8279]" />
                    <span>{user.name.toUpperCase()}</span>
                  </div>

                  <button
                    onClick={() => {
                      logoutUser();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-[10px] text-rose-700 underline font-semibold"
                  >
                    SIGN OUT
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center space-x-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4 text-[#8C8279]" />
                  <span>SIGN IN / REGISTER</span>
                </Link>
              )}

              <Link
                href="/wishlist"
                className="flex items-center space-x-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-4 h-4 text-[#8C8279]" />
                <span>SAVED ({wishlist.length})</span>
              </Link>

              <Link
                href="/faq"
                className="hover:underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ & SUPPORT
              </Link>
            </div>

            <div className="text-[11px] text-[#8C8279] tracking-wider text-center pt-2 border-t border-[#E5E0D8]">
              125 Design District Ave, NYC â€¢ hello@auradesign.com
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
