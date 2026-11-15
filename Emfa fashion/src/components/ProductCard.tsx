import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Eye, Check } from 'lucide-react';
import { ColorSwatch, Language, Product } from '../types/store';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: Product;
  language: Language;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product, swatch: ColorSwatch) => void;
  onQuickAdd: (product: Product, swatch: ColorSwatch) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onQuickAdd,
}) => {
  const [selectedSwatch, setSelectedSwatch] = useState<ColorSwatch>(product.swatches[0]);
  const [justAdded, setJustAdded] = useState(false);

  const isBn = language === 'bn';

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedSwatch);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white rounded-2xl border border-[#6E0F2A]/10 hover:border-[#6E0F2A]/25 hover:shadow-xl hover:shadow-[#4A091B]/10 transition-[box-shadow,border-color] duration-300 flex flex-col overflow-hidden"
    >
      {/* Image Frame (70% card focal weight) */}
      <div
        onClick={() => onQuickView(product, selectedSwatch)}
        className="relative aspect-[4/3] w-full bg-[#F3ECE6] overflow-hidden cursor-pointer silk-sheen"
      >
        <ResilientImage
          src={selectedSwatch.image}
          alt={isBn ? product.nameBn : product.name}
          fallbackTitle={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
        />

        {/* Single discount marker */}
        {product.discountPercent > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-[#6E0F2A] text-white text-xs font-bold px-2.5 py-1 rounded-md tabular-nums shadow-sm">
            -{product.discountPercent}%
          </span>
        )}

        {/* Wishlist toggle with spring scale */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-colors cursor-pointer ${
            isWishlisted
              ? 'bg-[#6E0F2A] text-white'
              : 'bg-white/90 text-[#4A091B] hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Hover Quick View Reveal Bar */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none group-hover:pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product, selectedSwatch);
            }}
            className="w-full py-2 px-3 rounded-lg bg-[#2A0510]/88 hover:bg-[#2A0510] text-white text-xs font-semibold backdrop-blur-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#F0C44B]" />
            <span>{isBn ? 'বিস্তারিত ও সাইজ দেখুন' : 'Quick View & Select Size'}</span>
          </button>
        </div>
      </div>

      {/* Product Metadata & Actions */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Clean unboxed metadata (Zero-Pill discipline) */}
          <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-wider text-[#7A646A] font-medium mb-1">
            <span>
              {product.category} <span aria-hidden="true">·</span>{' '}
              {isBn ? 'থ্রি পিস' : '3-Piece'}
            </span>
            <span className="tabular-nums">★ {product.rating.toFixed(1)}</span>
          </div>

          <h3
            onClick={() => onQuickView(product, selectedSwatch)}
            className="font-display text-base font-semibold text-[#2A0510] group-hover:text-[#6E0F2A] transition-colors line-clamp-1 cursor-pointer"
          >
            {isBn ? product.nameBn : product.name}
          </h3>

          {/* Interactive Color Swatches */}
          <div className="flex items-center gap-2 mt-2">
            {product.swatches.map((swatch) => {
              const isSelected = swatch.name === selectedSwatch.name;
              return (
                <button
                  key={swatch.name}
                  type="button"
                  onClick={() => setSelectedSwatch(swatch)}
                  title={isBn ? swatch.nameBn : swatch.name}
                  aria-label={`Select color ${swatch.name}`}
                  className={`w-4 h-4 rounded-full transition-transform duration-150 hover:scale-125 cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-offset-2 ring-[#6E0F2A] scale-110'
                      : 'ring-1 ring-black/15'
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                />
              );
            })}
            <span className="text-xs text-[#6B5A5F] truncate">
              {isBn ? selectedSwatch.nameBn : selectedSwatch.name}
            </span>
          </div>
        </div>

        {/* Price Baseline + Add to Cart CTA */}
        <div className="pt-2 border-t border-[#6E0F2A]/8 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="text-lg font-bold text-[#6E0F2A]">
              ৳ {product.price.toLocaleString()}
            </span>
            <span className="text-xs text-[#9C8B90] line-through">
              ৳ {product.originalPrice.toLocaleString()}
            </span>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleAddClick}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-[#6E0F2A] hover:bg-[#520A1E] text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{isBn ? 'যোগ হয়েছে' : 'Added'}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{isBn ? 'অর্ডার / ব্যাগ' : 'Add to Cart'}</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};
