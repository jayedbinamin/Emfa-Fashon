import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Language } from '../types/store';

interface HeaderProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  cartCount: number;
  wishlistCount: number;
  ordersCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  cartCount,
  wishlistCount,
  ordersCount,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onOpenOrders,
  onNavigateSection,
}) => {
  const [showPromoBar, setShowPromoBar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isBn = language === 'bn';

  const navItems = [
    { id: 'hero', label: isBn ? 'হোম' : 'Home', action: () => onNavigateSection('hero') },
    { id: 'collections', label: isBn ? 'কালেকশন' : 'Collections', action: () => onNavigateSection('collections') },
    { id: 'categories', label: isBn ? 'ক্যাটাগরি' : 'Categories', action: () => onNavigateSection('categories') },
    {
      id: 'wishlist',
      label: isBn ? `পছন্দ (${wishlistCount})` : `Wishlist (${wishlistCount})`,
      action: onOpenWishlist,
    },
    {
      id: 'orders',
      label: isBn ? `অর্ডার (${ordersCount})` : `Orders (${ordersCount})`,
      action: onOpenOrders,
    },
  ];

  return (
    <>
      <AnimatePresence>
        {showPromoBar && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="bg-[#4E091D] text-[#FAF7F4] text-xs h-9 px-4 sm:px-6 flex items-center justify-between border-b border-[#6E0F2A]"
          >
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
              <p className="truncate font-medium tracking-wide">
                {isBn
                  ? 'সারা বাংলাদেশে দ্রুত ডেলিভারি · ক্যাশ অন ডেলিভারি সুবিধা · ৭ দিনে সহজ রিটার্ন'
                  : 'Fast Delivery Across Bangladesh · Cash on Delivery · 7-Day Easy Return'}
              </p>

              <div className="flex items-center gap-3 shrink-0">
                <div
                  role="group"
                  aria-label="Language switch"
                  className="flex items-center gap-1 text-[11px] font-semibold"
                >
                  <button
                    type="button"
                    onClick={() => onToggleLanguage('en')}
                    className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                      language === 'en'
                        ? 'bg-[#F0C44B] text-[#2A0510]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleLanguage('bn')}
                    className={`px-1.5 py-0.5 rounded transition-colors font-bengali cursor-pointer ${
                      language === 'bn'
                        ? 'bg-[#F0C44B] text-[#2A0510]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    বাংলা
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPromoBar(false)}
                  aria-label="Dismiss announcement"
                  className="text-white/70 hover:text-white transition-colors p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-md border-b border-[#6E0F2A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('hero');
            }}
            className="font-display text-2xl sm:text-[26px] font-bold tracking-tight text-[#4A091B] whitespace-nowrap shrink-0 transition-transform duration-200 hover:scale-[1.02]"
          >
            Emfa Fashion
          </a>

          {/* Zone 2: 5 single-line navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#3A282D]"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.action}
                className="nav-underline hover:text-[#6E0F2A] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 tabular-nums"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Search + Primary Bag Action */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={onOpenSearch}
              aria-label={isBn ? 'প্রোডাক্ট খুঁজুন' : 'Search three-piece collections'}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-[#3A282D] hover:text-[#6E0F2A] hover:bg-[#6E0F2A]/8 transition-colors cursor-pointer"
            >
              <Search className="w-[18px] h-[18px]" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenCart}
              className="h-10 px-4 rounded-lg bg-[#6E0F2A] hover:bg-[#520A1E] text-white text-sm font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="tabular-nums">
                {isBn ? `ব্যাগ (${cartCount})` : `Bag (${cartCount})`}
              </span>
            </motion.button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-[#3A282D] hover:bg-[#6E0F2A]/8 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden bg-[#FAF7F4] border-t border-[#6E0F2A]/10 px-4 py-3 flex flex-col gap-1"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.action();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-2.5 px-3 rounded-lg text-sm font-medium text-[#3A282D] hover:bg-[#6E0F2A]/8 hover:text-[#6E0F2A] transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
