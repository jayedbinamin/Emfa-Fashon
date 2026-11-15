import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, CheckCircle2, Facebook, Instagram, Youtube, PhoneCall } from 'lucide-react';
import { Language, ThreePieceCategory } from '../types/store';

interface FooterProps {
  language: Language;
  onSelectCategory: (cat: ThreePieceCategory) => void;
  onOpenOrders: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onSelectCategory,
  onOpenOrders,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const isBn = language === 'bn';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="mt-8">
      {/* Maroon Newsletter Bar */}
      <div className="bg-gradient-to-r from-[#580A20] via-[#6E0F2A] to-[#4E091D] text-white py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: -6, scale: 1.08 }}
              className="w-12 h-12 rounded-xl border border-[#F0C44B]/40 bg-white/8 flex items-center justify-center shrink-0"
            >
              <Mail className="w-6 h-6 text-[#F0C44B]" />
            </motion.div>
            <div>
              <h3 className="font-display text-xl font-bold">
                {isBn ? 'আমাদের নিউজলেটারে যুক্ত হোন' : 'Subscribe to our Newsletter'}
              </h3>
              <p className="text-xs sm:text-sm text-[#F7ECEF]/80">
                {isBn
                  ? 'নতুন কালেকশন ও উৎসবের বিশেষ ছাড়ের খবর সবার আগে পান!'
                  : 'Get the latest three-piece drops and special festive offers!'}
              </p>
            </div>
          </div>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-white/12 border border-[#F0C44B]/40 px-4 py-2.5 rounded-lg text-sm font-medium text-[#FCE8B2]"
            >
              <CheckCircle2 className="w-4 h-4 text-[#F0C44B]" />
              <span>
                {isBn
                  ? 'ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।'
                  : 'Thank you for subscribing to Emfa Fashion updates!'}
              </span>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="w-full md:w-auto flex items-center bg-white rounded-lg p-1 shadow-md max-w-md"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isBn ? 'আপনার ইমেইল লিখুন' : 'Enter your email address'}
                className="flex-1 min-w-[200px] px-3.5 py-2 text-sm text-[#2A0510] placeholder:text-[#9C8B90] focus:outline-none bg-transparent"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2 rounded-md bg-[#F0C44B] hover:bg-[#F7D166] text-[#2A0510] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                {isBn ? 'সাবস্ক্রাইব' : 'Subscribe'}
              </motion.button>
            </form>
          )}
        </div>
      </div>

      {/* Main Dark Luxury Footer */}
      <div className="bg-[#140E10] text-[#E6DDE0] py-12 px-4 sm:px-6 border-t border-white/8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-3">
            <div>
              <h4 className="font-display text-2xl font-bold text-white tracking-tight">
                Emfa Fashion
              </h4>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#F0C44B] mt-0.5">
                Wear The Elegance
              </p>
            </div>
            <p className="text-xs text-[#B5A4A9] leading-relaxed max-w-xs">
              {isBn
                ? 'বাংলাদেশি নারীদের রুচিশীল ও আভিজাত্যপূর্ণ থ্রি পিসের নির্ভরযোগ্য ঠিকানা। প্রতিটি পোশাকে নিখুঁত বুনন ও আরামের নিশ্চয়তা।'
                : 'Curated women’s Cotton, Swiss Lawn, Katan Silk, and Georgette three-piece ensembles crafted with artisanal embroidery across Bangladesh.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#F0C44B] pt-1">
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="tabular-nums">+880 1700-000000 · Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h5 className="text-sm font-bold text-white mb-3">
              {isBn ? 'কালেকশন' : 'Collections'}
            </h5>
            <ul className="space-y-2 text-xs text-[#B5A4A9]">
              {[
                ThreePieceCategory.COTTON,
                ThreePieceCategory.LAWN,
                ThreePieceCategory.SILK,
                ThreePieceCategory.CHIFFON,
                ThreePieceCategory.GEORGETTE,
              ].map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat)}
                    className="hover:text-[#F0C44B] hover:translate-x-1 transition-all cursor-pointer"
                  >
                    {cat} Three Piece
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="text-sm font-bold text-white mb-3">
              {isBn ? 'কাস্টমার কেয়ার' : 'Customer Care'}
            </h5>
            <ul className="space-y-2 text-xs text-[#B5A4A9]">
              <li>
                <button
                  type="button"
                  onClick={onOpenOrders}
                  className="hover:text-[#F0C44B] hover:translate-x-1 transition-all cursor-pointer"
                >
                  {isBn ? 'অর্ডার ট্র্যাক করুন' : 'Track Your Order'}
                </button>
              </li>
              <li>{isBn ? 'ঢাকার ভেতর ২৪-৪৮ ঘণ্টায় ডেলিভারি' : '24–48h Delivery in Dhaka'}</li>
              <li>{isBn ? '৭ দিনের সহজ রিটার্ন পলিসি' : '7-Day Easy Return Policy'}</li>
              <li>{isBn ? '১০০% আসল কাপড়ের নিশ্চয়তা' : '100% Authentic Fabric Guarantee'}</li>
            </ul>
          </div>

          {/* Connect & Payment Methods */}
          <div className="space-y-4">
            <div>
              <h5 className="text-sm font-bold text-white mb-3">
                {isBn ? 'আমাদের সাথে যুক্ত থাকুন' : 'Connect With Us'}
              </h5>
              <div className="flex items-center gap-2.5">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Youtube, label: 'YouTube' },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href="#hero"
                      aria-label={social.label}
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F0C44B] text-white hover:text-[#2A0510] flex items-center justify-center transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-bold text-white mb-2.5">
                {isBn ? 'পেমেন্ট মাধ্যম' : 'Payment Methods'}
              </h5>
              <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                <span className="px-2.5 py-1 rounded bg-white text-[#1A1F71]">VISA</span>
                <span className="px-2.5 py-1 rounded bg-white text-[#EB001B]">Mastercard</span>
                <span className="px-2.5 py-1 rounded bg-[#E2136E] text-white">bKash</span>
                <span className="px-2.5 py-1 rounded bg-[#F6921E] text-white">Nagad</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#9C8B90]">
          <p>© 2026 Emfa Fashion. All Rights Reserved.</p>
          <p>Wear The Elegance · Handcrafted in Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};
