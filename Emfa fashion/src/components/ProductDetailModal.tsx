import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Heart,
  ShoppingBag,
  Zap,
  Check,
  Minus,
  Plus,
  ZoomIn,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { ColorSwatch, Language, Product, StitchOption } from '../types/store';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: Product | null;
  initialSwatch: ColorSwatch | null;
  language: Language;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (
    product: Product,
    swatch: ColorSwatch,
    stitch: StitchOption,
    quantity: number
  ) => void;
  onExpressOrder: (
    product: Product,
    swatch: ColorSwatch,
    stitch: StitchOption,
    quantity: number
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialSwatch,
  language,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
  onExpressOrder,
}) => {
  const [selectedSwatch, setSelectedSwatch] = useState<ColorSwatch | null>(null);
  const [stitchOption, setStitchOption] = useState<StitchOption>(StitchOption.UNSTITCHED);
  const [quantity, setQuantity] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSwatch(initialSwatch ?? product.swatches[0]);
      setStitchOption(StitchOption.UNSTITCHED);
      setQuantity(1);
    }
  }, [product, initialSwatch]);

  if (!product) return null;

  const isBn = language === 'bn';
  const activeSwatch = selectedSwatch ?? product.swatches[0];
  const specs = isBn ? product.specsBn : product.specs;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={isBn ? product.nameBn : product.name}
          className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#6E0F2A]/15 my-auto"
        >
          {/* Close button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.08, rotate: 90 }}
            whileTap={{ scale: 0.92 }}
            onClick={onClose}
            aria-label="Close product details"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/95 text-[#2A0510] shadow-md flex items-center justify-center hover:bg-[#6E0F2A] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            {/* Left Gallery with Interactive Embroidery Zoom */}
            <div className="md:col-span-6 bg-[#F3ECE6] relative flex flex-col justify-between">
              <div
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
                className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[300px] overflow-hidden cursor-zoom-in"
              >
                <div
                  className="w-full h-full transition-transform duration-300 ease-out"
                  style={{
                    transformOrigin: zoomOrigin,
                    transform: isZooming ? 'scale(1.55)' : 'scale(1)',
                  }}
                >
                  <ResilientImage
                    src={activeSwatch.image}
                    alt={isBn ? product.nameBn : product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute bottom-3 left-3 bg-[#2A0510]/80 text-white text-[11px] font-medium px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1.5 pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5 text-[#F0C44B]" />
                  <span>{isBn ? 'কাজ দেখতে মাউস ধরুন' : 'Hover to inspect embroidery'}</span>
                </div>

                {product.discountPercent > 0 && (
                  <span className="absolute top-4 left-4 bg-[#6E0F2A] text-white text-xs font-bold px-3 py-1 rounded-md tabular-nums">
                    -{product.discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* Right Contiguous Purchase Module */}
            <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between gap-5 max-h-[85vh] overflow-y-auto">
              <div className="space-y-4">
                {/* Clean metadata */}
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#7A646A] font-medium pr-10">
                  <span>{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>SKU: {product.sku}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-semibold">
                    {isBn ? 'স্টকে আছে' : 'In Stock'}
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-[#2A0510] leading-snug">
                    {isBn ? product.nameBn : product.name}
                  </h2>
                  <div className="flex items-baseline gap-3 mt-2 tabular-nums">
                    <span className="text-2xl font-bold text-[#6E0F2A]">
                      ৳ {product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-[#9C8B90] line-through">
                      ৳ {product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700">
                      {isBn
                        ? `সাশ্রয় ৳ ${(product.originalPrice - product.price).toLocaleString()}`
                        : `Save ৳ ${(product.originalPrice - product.price).toLocaleString()}`}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#4D3B40] leading-relaxed">
                  {isBn ? product.descriptionBn : product.description}
                </p>

                {/* Color Selection */}
                <div>
                  <p className="text-xs font-semibold text-[#2A0510] mb-2">
                    {isBn ? 'রঙ নির্বাচন করুন:' : 'Color:'}{' '}
                    <span className="font-normal text-[#6B5A5F]">
                      {isBn ? activeSwatch.nameBn : activeSwatch.name}
                    </span>
                  </p>
                  <div className="flex items-center gap-2.5">
                    {product.swatches.map((swatch) => {
                      const active = swatch.name === activeSwatch.name;
                      return (
                        <button
                          key={swatch.name}
                          type="button"
                          onClick={() => setSelectedSwatch(swatch)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                            active
                              ? 'border-[#6E0F2A] bg-[#6E0F2A]/6 text-[#4A091B]'
                              : 'border-[#6E0F2A]/15 text-[#5A474D] hover:border-[#6E0F2A]/40'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/15"
                            style={{ backgroundColor: swatch.hex }}
                          />
                          <span>{isBn ? swatch.nameBn : swatch.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Stitching / Size Selection */}
                <div>
                  <p className="text-xs font-semibold text-[#2A0510] mb-2">
                    {isBn ? 'সেলাই ও সাইজ:' : 'Stitching & Size:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(StitchOption).map((option) => {
                      const active = stitchOption === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setStitchOption(option)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-[#6E0F2A] text-white border-[#6E0F2A]'
                              : 'bg-white text-[#4A383D] border-[#6E0F2A]/20 hover:border-[#6E0F2A]'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3-Piece Fabric Breakdown */}
                <div className="bg-[#FAF7F4] rounded-xl p-3.5 border border-[#6E0F2A]/10 space-y-1.5 text-xs">
                  <div className="flex justify-between gap-2">
                    <span className="text-[#7A646A]">{isBn ? 'কামিজ:' : 'Kameez:'}</span>
                    <span className="font-medium text-[#2A0510] text-right">{specs.kameez}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#7A646A]">{isBn ? 'সেলোয়ার:' : 'Salwar:'}</span>
                    <span className="font-medium text-[#2A0510] text-right">{specs.salwar}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#7A646A]">{isBn ? 'ওড়না:' : 'Dupatta:'}</span>
                    <span className="font-medium text-[#2A0510] text-right">{specs.dupatta}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#7A646A]">{isBn ? 'কারুকাজ:' : 'Craft:'}</span>
                    <span className="font-medium text-[#2A0510] text-right">{specs.work}</span>
                  </div>
                </div>
              </div>

              {/* Quantity & Primary Purchase CTAs */}
              <div className="space-y-3 pt-2 border-t border-[#6E0F2A]/10">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#6E0F2A]/20 rounded-lg h-11 bg-[#FAF7F4]">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="w-10 h-full flex items-center justify-center text-[#4A091B] hover:bg-[#6E0F2A]/10 rounded-l-lg transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm font-bold tabular-nums text-[#2A0510]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                      aria-label="Increase quantity"
                      className="w-10 h-full flex items-center justify-center text-[#4A091B] hover:bg-[#6E0F2A]/10 rounded-r-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Bag */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      onAddToCart(product, activeSwatch, stitchOption, quantity);
                      onClose();
                    }}
                    className="flex-1 h-11 px-4 rounded-lg border border-[#6E0F2A] text-[#6E0F2A] hover:bg-[#6E0F2A]/6 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isBn ? 'ব্যাগে যোগ করুন' : 'Add to Bag'}</span>
                  </motion.button>

                  {/* Wishlist Toggle */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => onToggleWishlist(product.id)}
                    aria-label="Save to wishlist"
                    className={`w-11 h-11 rounded-lg border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                      isWishlisted
                        ? 'bg-[#6E0F2A] border-[#6E0F2A] text-white'
                        : 'border-[#6E0F2A]/20 text-[#6E0F2A] hover:border-[#6E0F2A]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </motion.button>
                </div>

                {/* Primary Express Order CTA */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onExpressOrder(product, activeSwatch, stitchOption, quantity);
                    onClose();
                  }}
                  className="w-full h-12 rounded-lg bg-[#6E0F2A] hover:bg-[#520A1E] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#6E0F2A]/20 transition-colors cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-[#F0C44B]" />
                  <span className="tabular-nums">
                    {isBn
                      ? `এখনই অর্ডার করুন — ৳ ${(product.price * quantity).toLocaleString()}`
                      : `Order Now — ৳ ${(product.price * quantity).toLocaleString()}`}
                  </span>
                </motion.button>

                <div className="flex items-center justify-between text-[11px] text-[#6B5A5F] pt-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#6E0F2A]" />
                    {isBn ? 'ঢাকায় ২৪-৪৮ ঘণ্টায় ডেলিভারি' : '24-48h Delivery in Dhaka'}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6E0F2A]" />
                    {isBn ? 'পণ্য হাতে পেয়ে টাকা দিন' : 'Cash on Delivery'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
