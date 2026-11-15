import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from 'lucide-react';
import { HERO_SLIDES } from '../data/products';
import { Language, ThreePieceCategory } from '../types/store';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  language: Language;
  onExploreCategory: (category: ThreePieceCategory) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ language, onExploreCategory }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isBn = language === 'bn';
  const currentSlide = HERO_SLIDES[activeIndex];

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const trustFeatures = [
    {
      icon: Truck,
      title: isBn ? 'দ্রুত ডেলিভারি' : 'Fast Delivery',
      desc: isBn ? 'সারা বাংলাদেশ জুড়ে' : 'All Over Bangladesh',
    },
    {
      icon: ShieldCheck,
      title: isBn ? 'নিরাপদ পেমেন্ট' : 'Secure Payment',
      desc: isBn ? '১০০% নিরাপদ ও ক্যাশ অন ডেলিভারি' : '100% Secure & COD Available',
    },
    {
      icon: RotateCcw,
      title: isBn ? 'সহজ রিটার্ন' : 'Easy Return',
      desc: isBn ? '৭ দিনের মধ্যে সহজ পরিবর্তন' : 'Within 7 Days Guarantee',
    },
    {
      icon: Headphones,
      title: isBn ? '২৪/৭ সাপোর্ট' : '24/7 Support',
      desc: isBn ? 'আপনার সেবায় সর্বদা নিয়োজিত' : 'Always Here for You',
    },
  ];

  return (
    <section id="hero" className="w-full">
      {/* Main Hero Banner */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full h-[460px] sm:h-[520px] lg:h-[560px] overflow-hidden bg-[#2A0510]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <ResilientImage
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-center"
              fallbackTitle="Emfa Fashion"
            />
            {/* Measured contrast scrim for crisp readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A040B]/90 via-[#2D0713]/65 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A040B]/60 via-transparent to-[#1A040B]/25" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Typography & CTA */}
        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 sm:px-10 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSlide.id}-${language}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl"
            >
              <p className="font-display italic text-2xl sm:text-3xl text-[#F0C44B] mb-2 tracking-wide">
                {isBn ? currentSlide.kickerBn : currentSlide.kicker}
              </p>

              <h1
                className="font-display font-bold text-white leading-[1.08] tracking-tight mb-3"
                style={{ fontSize: 'clamp(2.35rem, 4.5vw, 3.9rem)', textWrap: 'balance' }}
              >
                {isBn ? currentSlide.titleBn : currentSlide.title}
              </h1>

              <p className="text-base sm:text-lg text-[#F7ECEF] font-medium mb-4">
                {isBn ? currentSlide.subtitleBn : currentSlide.subtitle}
              </p>

              {/* Ornamental Gold Divider + Iconic Bengali Tagline */}
              <div className="flex items-center gap-3 mb-4 max-w-md">
                <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#F0C44B]/80" />
                <span className="text-[#F0C44B] text-xs tracking-[0.2em]" aria-hidden="true">
                  ✦
                </span>
                <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#F0C44B]/80" />
              </div>

              <p className="font-bengali text-lg sm:text-xl text-[#FCE8B2] font-medium mb-7 tracking-wide">
                {currentSlide.bengaliTagline}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onExploreCategory(currentSlide.filterCategory)}
                  className="group inline-flex items-center gap-2.5 bg-[#F0C44B] hover:bg-[#F7D166] text-[#2A0510] font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg shadow-black/25 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{isBn ? currentSlide.ctaLabelBn : currentSlide.ctaLabel}</span>
                  <span className="w-6 h-6 rounded-full bg-[#2A0510] text-[#F0C44B] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Left / Right Magnetic Carousel Controls */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.12, backgroundColor: 'rgba(110, 15, 42, 0.85)' }}
          whileTap={{ scale: 0.92 }}
          onClick={handlePrev}
          aria-label="Previous slide"
          className="hidden sm:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/35 border border-white/25 text-white items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.12, backgroundColor: 'rgba(110, 15, 42, 0.85)' }}
          whileTap={{ scale: 0.92 }}
          onClick={handleNext}
          aria-label="Next slide"
          className="hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/35 border border-white/25 text-white items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* Slide Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? 'w-7 bg-[#F0C44B]'
                  : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 4-Column Trust Proposition Strip */}
      <div className="bg-white border-b border-[#6E0F2A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trustFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className={`group flex items-center gap-3.5 px-3 py-2 rounded-xl hover:bg-[#FAF7F4] transition-colors ${
                    idx < 3 ? 'lg:border-r lg:border-[#6E0F2A]/10' : ''
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-[#6E0F2A]/8 text-[#6E0F2A] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-[#6E0F2A] group-hover:text-[#F0C44B]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#2A0510] truncate">{feat.title}</p>
                    <p className="text-xs text-[#6B5A5F] truncate">{feat.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
