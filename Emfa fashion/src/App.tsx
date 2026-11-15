import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { ArrowRight, ArrowUpDown, CheckCircle2, Search, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from './data/products';
import {
  CartItem,
  ColorSwatch,
  Language,
  OrderRecord,
  Product,
  StitchOption,
  ThreePieceCategory,
} from './types/store';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartCheckoutDrawer } from './components/CartCheckoutDrawer';
import { OrdersModal, SearchModal, WishlistModal } from './components/UtilityModals';
import { Footer } from './components/Footer';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

const STORAGE_KEYS = {
  CART: 'emfa_fashion_cart_v1',
  WISHLIST: 'emfa_fashion_wishlist_v1',
  ORDERS: 'emfa_fashion_orders_v1',
  LANG: 'emfa_fashion_lang_v1',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() =>
    readStorage<Language>(STORAGE_KEYS.LANG, 'en')
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(STORAGE_KEYS.CART, [])
  );
  const [wishlistIds, setWishlistIds] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.WISHLIST, [])
  );
  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    readStorage<OrderRecord[]>(STORAGE_KEYS.ORDERS, [])
  );

  const [activeCategory, setActiveCategory] = useState<ThreePieceCategory>(
    ThreePieceCategory.ALL
  );
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showAllProducts, setShowAllProducts] = useState(false);

  const [detailModal, setDetailModal] = useState<{
    product: Product | null;
    swatch: ColorSwatch | null;
  }>({ product: null, swatch: null });

  const [cartDrawer, setCartDrawer] = useState<{
    isOpen: boolean;
    view: 'cart' | 'checkout';
  }>({ isOpen: false, view: 'cart' });

  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.LANG, JSON.stringify(language));
    document.documentElement.lang = language;
  }, [language]);

  const isBn = language === 'bn';

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCategory = (category: ThreePieceCategory) => {
    setActiveCategory(category);
    if (category !== ThreePieceCategory.ALL) {
      setShowAllProducts(true);
    }
    scrollToSection('collections');
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      triggerToast(
        exists
          ? isBn
            ? 'পছন্দের তালিকা থেকে সরানো হয়েছে'
            : 'Removed from wishlist'
          : isBn
          ? 'পছন্দের তালিকায় যুক্ত হয়েছে'
          : 'Saved to your wishlist'
      );
      return next;
    });
  };

  const upsertCartItem = (
    product: Product,
    swatch: ColorSwatch,
    stitch: StitchOption,
    quantity: number
  ) => {
    const key = `${product.id}__${swatch.name}__${stitch}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { key, product, selectedSwatch: swatch, stitchOption: stitch, quantity }];
    });
  };

  const handleQuickAdd = (product: Product, swatch: ColorSwatch) => {
    upsertCartItem(product, swatch, StitchOption.UNSTITCHED, 1);
    triggerToast(
      isBn
        ? `${product.nameBn} আপনার ব্যাগে যোগ করা হয়েছে`
        : `${product.name} added to your bag`
    );
  };

  const handleAddFromModal = (
    product: Product,
    swatch: ColorSwatch,
    stitch: StitchOption,
    quantity: number
  ) => {
    upsertCartItem(product, swatch, stitch, quantity);
    setCartDrawer({ isOpen: true, view: 'cart' });
  };

  const handleExpressOrder = (
    product: Product,
    swatch: ColorSwatch,
    stitch: StitchOption,
    quantity: number
  ) => {
    upsertCartItem(product, swatch, stitch, quantity);
    setCartDrawer({ isOpen: true, view: 'checkout' });
  };

  const handleUpdateQuantity = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const handleOrderComplete = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
  };

  const filteredProducts = useMemo(() => {
    const base =
      activeCategory === ThreePieceCategory.ALL
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCategory);

    const sorted = [...base].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return Number(b.isNewArrival) - Number(a.isNewArrival);
    });

    if (!showAllProducts && activeCategory === ThreePieceCategory.ALL && sortBy === 'featured') {
      return sorted.slice(0, 4);
    }
    return sorted;
  }, [activeCategory, sortBy, showAllProducts]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FAF7F4] text-[#1F1518]">
        <Header
          language={language}
          onToggleLanguage={setLanguage}
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.length}
          ordersCount={orders.length}
          onOpenCart={() => setCartDrawer({ isOpen: true, view: 'cart' })}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenWishlist={() => setWishlistOpen(true)}
          onOpenOrders={() => setOrdersOpen(true)}
          onNavigateSection={scrollToSection}
        />

        <main className="flex-1">
          {/* Section 1: Hero Showcase + 4-Item Trust Proposition Strip */}
          <HeroSection language={language} onExploreCategory={handleSelectCategory} />

          {/* Section 2: Interactive Three-Piece Collection Grid */}
          <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6">
            {/* Editorial Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-1.5">
                  <span className="h-[1px] w-8 bg-[#D49A2A]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#6E0F2A]">
                    {isBn ? 'আমাদের কালেকশন' : 'Our Collection'}
                  </span>
                  <span className="h-[1px] w-8 bg-[#D49A2A]" />
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2A0510]">
                  {isBn ? 'নতুন থ্রি পিস ' : 'New '}
                  <span className="text-[#6E0F2A]">{isBn ? 'কালেকশন' : 'Arrivals'}</span>
                </h2>
              </div>

              <div className="flex items-center justify-center md:justify-end gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowAllProducts((prev) => !prev)}
                  className="inline-flex items-center gap-2 bg-[#6E0F2A] hover:bg-[#520A1E] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>
                    {showAllProducts
                      ? isBn
                        ? 'সংক্ষিপ্ত দেখুন'
                        : 'Show Featured (4)'
                      : isBn
                      ? `সবগুলো দেখুন (${PRODUCTS.length})`
                      : `View All Products (${PRODUCTS.length})`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Interactive Filter & Sort Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-7 pb-4 border-b border-[#6E0F2A]/10">
              {/* Segmented Category Tabs */}
              <div
                role="tablist"
                aria-label="Filter by fabric category"
                className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0"
              >
                {Object.values(ThreePieceCategory).map((category) => {
                  const active = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveCategory(category)}
                      className={`relative px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'text-white'
                          : 'text-[#4D3B40] hover:text-[#6E0F2A] hover:bg-[#6E0F2A]/6'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="categoryActiveBg"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 bg-[#6E0F2A] rounded-lg -z-0"
                        />
                      )}
                      <span className="relative z-10">{category}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Search Trigger + Sort Select */}
              <div className="flex items-center gap-2.5 shrink-0">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSearchOpen(true)}
                  className="h-9 px-3 rounded-lg bg-white border border-[#6E0F2A]/15 hover:border-[#6E0F2A]/40 text-xs text-[#5A474D] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-[#6E0F2A]" />
                  <span>{isBn ? 'খুঁজুন...' : 'Search...'}</span>
                </motion.button>

                <div className="relative flex items-center">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#6E0F2A] absolute left-3 pointer-events-none" />
                  <select
                    aria-label="Sort products"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="h-9 pl-8 pr-3 rounded-lg bg-white border border-[#6E0F2A]/15 text-xs font-medium text-[#2A0510] focus:outline-none focus:border-[#6E0F2A] cursor-pointer"
                  >
                    <option value="featured">{isBn ? 'নতুন ও জনপ্রিয়' : 'Featured'}</option>
                    <option value="price-asc">{isBn ? 'কম থেকে বেশি দাম' : 'Price: Low to High'}</option>
                    <option value="price-desc">{isBn ? 'বেশি থেকে কম দাম' : 'Price: High to Low'}</option>
                    <option value="rating">{isBn ? 'সর্বোচ্চ রেটিং' : 'Top Rated'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    language={language}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={(prod, swatch) =>
                      setDetailModal({ product: prod, swatch })
                    }
                    onQuickAdd={handleQuickAdd}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-14 bg-white rounded-2xl border border-[#6E0F2A]/10 mt-4">
                <SlidersHorizontal className="w-8 h-8 text-[#6E0F2A]/40 mx-auto mb-2" />
                <p className="text-sm text-[#5A474D]">
                  {isBn
                    ? 'এই ক্যাটাগরিতে কোনো থ্রি পিস পাওয়া যায়নি।'
                    : 'No three-piece sets found in this category.'}
                </p>
              </div>
            )}
          </section>

          {/* Section 3: Promotional Split Banners & Shop by Category */}
          <CategoryShowcase
            language={language}
            onSelectCategory={handleSelectCategory}
          />
        </main>

        {/* Section 4: Newsletter & Footer */}
        <Footer
          language={language}
          onSelectCategory={handleSelectCategory}
          onOpenOrders={() => setOrdersOpen(true)}
        />

        {/* Interactive Modals & Drawers */}
        <ProductDetailModal
          product={detailModal.product}
          initialSwatch={detailModal.swatch}
          language={language}
          isWishlisted={
            detailModal.product ? wishlistIds.includes(detailModal.product.id) : false
          }
          onClose={() => setDetailModal({ product: null, swatch: null })}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddFromModal}
          onExpressOrder={handleExpressOrder}
        />

        <CartCheckoutDrawer
          isOpen={cartDrawer.isOpen}
          initialView={cartDrawer.view}
          language={language}
          items={cart}
          onClose={() => setCartDrawer((prev) => ({ ...prev, isOpen: false }))}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveCartItem}
          onOrderComplete={handleOrderComplete}
        />

        <SearchModal
          isOpen={searchOpen}
          language={language}
          onClose={() => setSearchOpen(false)}
          onSelectProduct={(prod, swatch) => setDetailModal({ product: prod, swatch })}
        />

        <WishlistModal
          isOpen={wishlistOpen}
          language={language}
          wishlistIds={wishlistIds}
          onClose={() => setWishlistOpen(false)}
          onRemoveWishlist={handleToggleWishlist}
          onQuickView={(prod, swatch) => setDetailModal({ product: prod, swatch })}
          onAddToCart={handleQuickAdd}
        />

        <OrdersModal
          isOpen={ordersOpen}
          language={language}
          orders={orders}
          onClose={() => setOrdersOpen(false)}
        />

        {/* Non-blocking Confirmation Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-5 right-5 z-50 bg-[#2A0510] text-white px-4 py-3 rounded-xl shadow-xl border border-[#F0C44B]/30 flex items-center gap-2.5 text-xs sm:text-sm font-medium"
            >
              <CheckCircle2 className="w-4 h-4 text-[#F0C44B] shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
