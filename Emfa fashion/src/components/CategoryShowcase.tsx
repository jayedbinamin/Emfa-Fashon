import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CATEGORY_TILES, PRODUCTS } from '../data/products';
import { Language, ThreePieceCategory } from '../types/store';
import { ResilientImage } from './ResilientImage';

interface CategoryShowcaseProps {
  language: Language;
  onSelectCategory: (category: ThreePieceCategory) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  language,
  onSelectCategory,
}) => {
  const isBn = language === 'bn';

  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Split Editorial Promo Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Promo Left: Special Offer Up To 25% Off */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onSelectCategory(ThreePieceCategory.SILK)}
          className="group relative h-56 sm:h-60 rounded-2xl overflow-hidden bg-[#0E3A2F] cursor-pointer shadow-sm hover:shadow-xl hover:shadow-[#0E3A2F]/20 transition-shadow duration-300"
        >
          <ResilientImage
            src={PRODUCTS[2].image}
            alt="Special festive offer"
            className="w-full h-full object-cover object-right transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#092920]/95 via-[#0F3F32]/82 to-transparent" />
          <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-center max-w-xs">
            <p className="font-display italic text-xl text-[#F0C44B] mb-1">
              {isBn ? 'বিশেষ উৎসব ছাড়' : 'Special Offer'}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
              {isBn ? 'সর্বোচ্চ ২৫% পর্যন্ত ছাড়' : 'UP TO 25% OFF'}
            </h3>
            <span className="inline-flex items-center gap-2 bg-[#F0C44B] group-hover:bg-[#F7D166] text-[#2A0510] text-xs font-bold px-4 py-2 rounded-full w-fit transition-colors">
              <span>{isBn ? 'এখনই দেখুন' : 'Shop Now'}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </motion.div>

        {/* Promo Right: Best Quality Best Price */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onSelectCategory(ThreePieceCategory.GEORGETTE)}
          className="group relative h-56 sm:h-60 rounded-2xl overflow-hidden bg-[#4E091D] cursor-pointer shadow-sm hover:shadow-xl hover:shadow-[#4E091D]/20 transition-shadow duration-300"
        >
          <ResilientImage
            src={PRODUCTS[3].image}
            alt="Best quality three piece collection"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D0716]/95 via-[#5A0B21]/80 to-transparent" />
          <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-center max-w-xs">
            <p className="font-display italic text-xl text-[#F0C44B] mb-1">
              {isBn ? 'সেরা মান, সাশ্রয়ী দাম' : 'Best Quality'}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mb-1.5">
              {isBn ? 'সেরা বাজেট কালেকশন' : 'Best Price'}
            </h3>
            <p className="text-xs text-[#F7ECEF]/85 mb-4">
              {isBn ? 'বুদ্ধিমত্তার সাথে পছন্দ করুন, আভিজাত্যে সাজুন' : 'Shop Smart, Dress Better'}
            </p>
            <span className="inline-flex items-center gap-2 bg-[#F0C44B] group-hover:bg-[#F7D166] text-[#2A0510] text-xs font-bold px-4 py-2 rounded-full w-fit transition-colors">
              <span>{isBn ? 'এখনই কিনুন' : 'Shop Now'}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </motion.div>
      </div>

      {/* Shop by Category 5-Card Interactive Row */}
      <div>
        <div className="flex items-center justify-center gap-4 mb-7">
          <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#6E0F2A]/35" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2A0510] text-center">
            {isBn ? 'ফ্যাব্রিক অনুযায়ী খুঁজুন' : 'Shop by Category'}
          </h2>
          <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#6E0F2A]/35" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORY_TILES.map((tile) => (
            <motion.button
              key={tile.category}
              type="button"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectCategory(tile.category)}
              className="group relative h-44 rounded-xl overflow-hidden text-left border border-[#6E0F2A]/15 hover:border-[#F0C44B] shadow-sm hover:shadow-lg transition-[border-color,box-shadow] duration-250 cursor-pointer"
            >
              <ResilientImage
                src={tile.image}
                alt={tile.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E040C]/92 via-[#1E040C]/40 to-transparent transition-opacity duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-3.5 flex flex-col justify-end">
                <p className="text-[11px] text-[#FCE8B2] font-medium opacity-90 mb-0.5">
                  {isBn ? tile.subtitleBn : tile.subtitle}
                </p>
                <p className="font-display text-base font-bold text-white leading-snug mb-1.5">
                  {isBn ? tile.titleBn : tile.title}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F0C44B]">
                  <span>{isBn ? 'কালেকশন দেখুন' : 'Shop Now'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
