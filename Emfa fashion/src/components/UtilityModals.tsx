import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Heart, ShoppingBag, Package, ArrowRight, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ColorSwatch, Language, OrderRecord, Product } from '../types/store';
import { ResilientImage } from './ResilientImage';

interface SearchModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  onSelectProduct: (product: Product, swatch: ColorSwatch) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  language,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const isBn = language === 'bn';

  const matches = PRODUCTS.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.nameBn.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-start justify-center pt-16 px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-[#6E0F2A]/15 overflow-hidden"
          >
            <div className="p-4 border-b border-[#6E0F2A]/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#6E0F2A] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  isBn
                    ? 'কটন, লন, সিল্ক, শিফন অথবা জর্জেট খুঁজুন...'
                    : 'Search Cotton, Lawn, Silk, Chiffon, or Georgette...'
                }
                className="flex-1 text-sm text-[#2A0510] placeholder:text-[#9C8B90] focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="w-8 h-8 rounded-full hover:bg-[#FAF7F4] flex items-center justify-center text-[#4A091B] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1.5">
              {matches.length === 0 ? (
                <p className="text-center text-sm text-[#7A646A] py-8">
                  {isBn ? 'কোনো থ্রি পিস পাওয়া যায়নি।' : 'No matching three-piece sets found.'}
                </p>
              ) : (
                matches.map((product) => (
                  <motion.button
                    key={product.id}
                    type="button"
                    whileHover={{ x: 4, backgroundColor: '#FAF7F4' }}
                    onClick={() => {
                      onSelectProduct(product, product.swatches[0]);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-xl flex items-center gap-3.5 text-left transition-colors cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F3ECE6] shrink-0">
                      <ResilientImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] uppercase tracking-wider text-[#7A646A]">
                        {product.category}
                      </p>
                      <p className="font-display text-sm font-bold text-[#2A0510] truncate">
                        {isBn ? product.nameBn : product.name}
                      </p>
                    </div>
                    <div className="text-right shrink-0 tabular-nums">
                      <p className="text-sm font-bold text-[#6E0F2A]">
                        ৳ {product.price.toLocaleString()}
                      </p>
                      <span className="text-[11px] text-[#7A646A] inline-flex items-center gap-1">
                        {isBn ? 'দেখুন' : 'View'} <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface WishlistModalProps {
  isOpen: boolean;
  language: Language;
  wishlistIds: string[];
  onClose: () => void;
  onRemoveWishlist: (id: string) => void;
  onQuickView: (product: Product, swatch: ColorSwatch) => void;
  onAddToCart: (product: Product, swatch: ColorSwatch) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  language,
  wishlistIds,
  onClose,
  onRemoveWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const isBn = language === 'bn';
  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF7F4] rounded-2xl w-full max-w-lg shadow-2xl border border-[#6E0F2A]/15 overflow-hidden"
          >
            <div className="px-6 py-4 bg-white border-b border-[#6E0F2A]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#6E0F2A] fill-[#6E0F2A]" />
                <h2 className="font-display text-lg font-bold text-[#2A0510]">
                  {isBn ? 'পছন্দের তালিকা' : 'Saved Wishlist'}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close wishlist"
                className="w-8 h-8 rounded-full hover:bg-[#FAF7F4] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 max-h-[65vh] overflow-y-auto space-y-3">
              {savedProducts.length === 0 ? (
                <div className="text-center py-10">
                  <Heart className="w-10 h-10 text-[#6E0F2A]/30 mx-auto mb-3" />
                  <p className="text-sm font-medium text-[#4A383D]">
                    {isBn
                      ? 'এখনো কোনো প্রোডাক্ট পছন্দের তালিকায় যোগ করা হয়নি।'
                      : 'No favorites saved yet. Tap the heart on any dress to save it.'}
                  </p>
                </div>
              ) : (
                savedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl p-3 border border-[#6E0F2A]/10 flex items-center gap-3.5"
                  >
                    <div
                      onClick={() => {
                        onQuickView(product, product.swatches[0]);
                        onClose();
                      }}
                      className="w-16 h-16 rounded-lg overflow-hidden bg-[#F3ECE6] shrink-0 cursor-pointer"
                    >
                      <ResilientImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm font-bold text-[#2A0510] truncate">
                        {isBn ? product.nameBn : product.name}
                      </h4>
                      <p className="text-sm font-bold text-[#6E0F2A] tabular-nums mt-0.5">
                        ৳ {product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(product, product.swatches[0]);
                          onRemoveWishlist(product.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#6E0F2A] text-white text-xs font-semibold hover:bg-[#520A1E] flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{isBn ? 'ব্যাগ' : 'Add'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveWishlist(product.id)}
                        aria-label="Remove from wishlist"
                        className="w-8 h-8 rounded-lg hover:bg-red-50 text-[#9C8B90] hover:text-red-700 flex items-center justify-center cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface OrdersModalProps {
  isOpen: boolean;
  language: Language;
  orders: OrderRecord[];
  onClose: () => void;
}

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  language,
  orders,
  onClose,
}) => {
  const isBn = language === 'bn';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF7F4] rounded-2xl w-full max-w-xl shadow-2xl border border-[#6E0F2A]/15 overflow-hidden"
          >
            <div className="px-6 py-4 bg-white border-b border-[#6E0F2A]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#6E0F2A]" />
                <h2 className="font-display text-lg font-bold text-[#2A0510]">
                  {isBn ? 'আপনার অর্ডারসমূহ' : 'Order History & Tracking'}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close orders"
                className="w-8 h-8 rounded-full hover:bg-[#FAF7F4] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 max-h-[68vh] overflow-y-auto space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-10">
                  <Package className="w-10 h-10 text-[#6E0F2A]/30 mx-auto mb-3" />
                  <p className="text-sm text-[#4A383D]">
                    {isBn
                      ? 'এখনো কোনো অর্ডার সম্পন্ন হয়নি। প্রোডাক্ট বেছে নিয়ে অর্ডার করুন।'
                      : 'No orders placed yet. Select any three-piece set to place your first order.'}
                  </p>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.orderId}
                    className="bg-white rounded-xl p-4 border border-[#6E0F2A]/12 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-[#6E0F2A]/10 pb-2.5">
                      <div>
                        <span className="font-display font-bold text-base text-[#2A0510] tabular-nums">
                          #{order.orderId}
                        </span>
                        <p className="text-[11px] text-[#7A646A]">
                          {new Date(order.createdAt).toLocaleString()} · {order.paymentMethod}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between gap-2 text-[#3A282D]">
                          <span>
                            {isBn ? item.nameBn : item.name} × {item.quantity} ({item.stitchOption})
                          </span>
                          <span className="font-semibold tabular-nums">
                            ৳ {(item.unitPrice * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#6E0F2A]/10 text-xs">
                      <span className="text-[#6B5A5F] truncate max-w-[60%]">
                        {order.customerName} · {order.address}
                      </span>
                      <span className="font-bold text-sm text-[#6E0F2A] tabular-nums">
                        {isBn ? 'মোট:' : 'Total:'} ৳ {order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
