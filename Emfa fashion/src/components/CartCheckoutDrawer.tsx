import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Tag,
  Truck,
} from 'lucide-react';
import { COUPONS } from '../data/products';
import {
  CartItem,
  DeliveryZone,
  Language,
  OrderRecord,
  PaymentMethod,
} from '../types/store';
import { ResilientImage } from './ResilientImage';

interface CartCheckoutDrawerProps {
  isOpen: boolean;
  initialView: 'cart' | 'checkout';
  language: Language;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onOrderComplete: (order: OrderRecord) => void;
}

export const CartCheckoutDrawer: React.FC<CartCheckoutDrawerProps> = ({
  isOpen,
  initialView,
  language,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'receipt'>('cart');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>(DeliveryZone.INSIDE_DHAKA);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD);
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(initialView === 'checkout' && items.length > 0 ? 'checkout' : 'cart');
      setFormError(null);
    }
  }, [isOpen, initialView, items.length]);

  const isBn = language === 'bn';

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountRate = appliedCoupon && COUPONS[appliedCoupon] ? COUPONS[appliedCoupon].discountRate : 0;
  const discount = Math.round(subtotal * discountRate);
  const freeDeliveryThreshold = 3000;
  const baseDelivery = deliveryZone === DeliveryZone.INSIDE_DHAKA ? 70 : 130;
  const deliveryCharge = subtotal >= freeDeliveryThreshold || items.length === 0 ? 0 : baseDelivery;
  const total = Math.max(0, subtotal - discount + deliveryCharge);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponMessage(
        isBn
          ? `${code} কুপন যুক্ত হয়েছে (${COUPONS[code].discountRate * 100}% ছাড়)`
          : `${code} applied — ${COUPONS[code].label}`
      );
    } else {
      setCouponMessage(
        isBn
          ? 'সঠিক কুপন নয়। EID10 অথবা EMFA15 ব্যবহার করুন।'
          : 'Invalid code. Try EID10 or EMFA15.'
      );
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setFormError(
        isBn
          ? 'অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং পূর্ণ ঠিকানা লিখুন।'
          : 'Please enter your full name, phone number, and delivery address.'
      );
      return;
    }

    const orderId = `EF-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderRecord = {
      orderId,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      deliveryZone,
      paymentMethod,
      items: items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        nameBn: item.product.nameBn,
        swatchName: isBn ? item.selectedSwatch.nameBn : item.selectedSwatch.name,
        stitchOption: item.stitchOption,
        quantity: item.quantity,
        unitPrice: item.product.price,
        image: item.selectedSwatch.image,
      })),
      subtotal,
      discount,
      deliveryCharge,
      total,
      status: 'Confirmed — Preparing Shipment',
      notes: notes.trim() || undefined,
    };

    setConfirmedOrder(newOrder);
    onOrderComplete(newOrder);
    setStep('receipt');
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponMessage(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex justify-end"
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            aria-label="Shopping Bag and Checkout"
            className="w-full max-w-md bg-[#FAF7F4] h-full shadow-2xl flex flex-col border-l border-[#6E0F2A]/15"
          >
            {/* Drawer Header */}
            <div className="px-6 py-4 bg-white border-b border-[#6E0F2A]/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {step === 'checkout' && (
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    aria-label="Back to bag"
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#FAF7F4] text-[#4A091B] cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <ShoppingBag className="w-5 h-5 text-[#6E0F2A]" />
                <h2 className="font-display text-lg font-bold text-[#2A0510]">
                  {step === 'cart'
                    ? isBn
                      ? 'আপনার শপিং ব্যাগ'
                      : 'Your Shopping Bag'
                    : step === 'checkout'
                    ? isBn
                      ? 'অর্ডার সম্পন্ন করুন'
                      : 'Express Checkout'
                    : isBn
                    ? 'অর্ডার নিশ্চিত হয়েছে'
                    : 'Order Confirmed'}
                </h2>
              </div>

              <motion.button
                type="button"
                whileHover={{ rotate: 90 }}
                onClick={onClose}
                aria-label="Close drawer"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#4A091B] hover:bg-[#6E0F2A]/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Free Delivery Progress Notice */}
            {step !== 'receipt' && items.length > 0 && (
              <div className="px-6 py-2.5 bg-[#4E091D] text-white text-xs flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#F0C44B] shrink-0" />
                {subtotal >= freeDeliveryThreshold ? (
                  <span>
                    {isBn
                      ? 'অভিনন্দন! আপনি ফ্রি হোম ডেলিভারি পাচ্ছেন।'
                      : 'Unlocked: Free Home Delivery across Bangladesh!'}
                  </span>
                ) : (
                  <span className="tabular-nums">
                    {isBn
                      ? `ফ্রি ডেলিভারির জন্য আরও ৳ ${(freeDeliveryThreshold - subtotal).toLocaleString()} এর পণ্য যোগ করুন`
                      : `Add ৳ ${(freeDeliveryThreshold - subtotal).toLocaleString()} more for Free Delivery`}
                  </span>
                )}
              </div>
            )}

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {step === 'cart' && (
                <>
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <div className="w-16 h-16 rounded-2xl bg-[#6E0F2A]/8 text-[#6E0F2A] flex items-center justify-center mb-4">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-[#2A0510] mb-2">
                        {isBn ? 'আপনার ব্যাগটি খালি' : 'Your Bag is Empty'}
                      </h3>
                      <p className="text-sm text-[#6B5A5F] max-w-xs mb-6">
                        {isBn
                          ? 'পছন্দের কটন, লন, সিল্ক অথবা জর্জেট থ্রি পিস বেছে নিয়ে ব্যাগে যোগ করুন।'
                          : 'Browse our curated Cotton, Lawn, Silk, and Georgette three-piece collections to begin your order.'}
                      </p>
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg bg-[#6E0F2A] text-white text-sm font-semibold hover:bg-[#520A1E] transition-colors cursor-pointer"
                      >
                        {isBn ? 'কালেকশন দেখুন' : 'Explore Collections'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <AnimatePresence>
                        {items.map((item) => (
                          <motion.div
                            key={item.key}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 40 }}
                            className="bg-white rounded-xl p-3 border border-[#6E0F2A]/10 flex gap-3.5"
                          >
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F3ECE6] shrink-0">
                              <ResilientImage
                                src={item.selectedSwatch.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="font-display text-sm font-bold text-[#2A0510] truncate">
                                    {isBn ? item.product.nameBn : item.product.name}
                                  </h4>
                                  <button
                                    type="button"
                                    onClick={() => onRemoveItem(item.key)}
                                    aria-label="Remove item"
                                    className="text-[#9C8B90] hover:text-red-700 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                                <p className="text-xs text-[#6B5A5F] mt-0.5 truncate">
                                  {isBn ? item.selectedSwatch.nameBn : item.selectedSwatch.name} ·{' '}
                                  {item.stitchOption}
                                </p>
                              </div>

                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center border border-[#6E0F2A]/20 rounded-md bg-[#FAF7F4]">
                                  <button
                                    type="button"
                                    onClick={() => onUpdateQuantity(item.key, -1)}
                                    aria-label="Decrease quantity"
                                    className="w-7 h-7 flex items-center justify-center text-[#4A091B] hover:bg-[#6E0F2A]/10 cursor-pointer"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-7 text-center text-xs font-bold tabular-nums">
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => onUpdateQuantity(item.key, 1)}
                                    aria-label="Increase quantity"
                                    className="w-7 h-7 flex items-center justify-center text-[#4A091B] hover:bg-[#6E0F2A]/10 cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <span className="text-sm font-bold text-[#6E0F2A] tabular-nums">
                                  ৳ {(item.product.price * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {/* Coupon Form */}
                      <form onSubmit={handleApplyCoupon} className="pt-2">
                        <label className="block text-xs font-semibold text-[#4A091B] mb-1.5">
                          {isBn ? 'প্রোমো কোড (যেমন: EID10)' : 'Promo Code (try EID10 or EMFA15)'}
                        </label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Tag className="w-3.5 h-3.5 text-[#7A646A] absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value)}
                              placeholder="EID10"
                              className="w-full h-10 pl-8 pr-3 rounded-lg bg-white border border-[#6E0F2A]/20 text-xs uppercase focus:outline-none focus:border-[#6E0F2A]"
                            />
                          </div>
                          <button
                            type="submit"
                            className="px-4 h-10 rounded-lg bg-[#2A0510] text-white text-xs font-semibold hover:bg-[#4A091B] transition-colors cursor-pointer"
                          >
                            {isBn ? 'প্রয়োগ' : 'Apply'}
                          </button>
                        </div>
                        {couponMessage && (
                          <p className="text-xs mt-1.5 font-medium text-[#6E0F2A]">
                            {couponMessage}
                          </p>
                        )}
                      </form>
                    </div>
                  )}
                </>
              )}

              {step === 'checkout' && (
                <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 font-medium">
                      {formError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#2A0510] mb-1">
                      {isBn ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={isBn ? 'যেমন: তানজিলা আক্তার' : 'e.g. Tanjila Akter'}
                      className="w-full h-10 px-3 rounded-lg bg-white border border-[#6E0F2A]/20 text-sm focus:outline-none focus:border-[#6E0F2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A0510] mb-1">
                      {isBn ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full h-10 px-3 rounded-lg bg-white border border-[#6E0F2A]/20 text-sm focus:outline-none focus:border-[#6E0F2A] tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A0510] mb-1.5">
                      {isBn ? 'ডেলিভারি এলাকা' : 'Delivery Zone'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.values(DeliveryZone).map((zone) => {
                        const active = deliveryZone === zone;
                        return (
                          <button
                            key={zone}
                            type="button"
                            onClick={() => setDeliveryZone(zone)}
                            className={`py-2.5 px-3 rounded-lg border text-xs font-semibold text-left transition-all cursor-pointer ${
                              active
                                ? 'border-[#6E0F2A] bg-[#6E0F2A]/8 text-[#4A091B]'
                                : 'border-[#6E0F2A]/15 bg-white text-[#5A474D]'
                            }`}
                          >
                            <div>{zone}</div>
                            <div className="text-[11px] font-normal text-[#7A646A] tabular-nums">
                              {subtotal >= freeDeliveryThreshold
                                ? isBn
                                  ? 'ফ্রি ডেলিভারি'
                                  : 'Free Shipping'
                                : zone === DeliveryZone.INSIDE_DHAKA
                                ? '৳ 70'
                                : '৳ 130'}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A0510] mb-1">
                      {isBn ? 'পূর্ণ ডেলিভারি ঠিকানা *' : 'Full Delivery Address *'}
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={
                        isBn
                          ? 'বাসা নং, রোড নং, এলাকা, থানা ও জেলা'
                          : 'House, Road, Area, Thana & District'
                      }
                      className="w-full p-3 rounded-lg bg-white border border-[#6E0F2A]/20 text-sm focus:outline-none focus:border-[#6E0F2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A0510] mb-1.5">
                      {isBn ? 'পেমেন্ট পদ্ধতি' : 'Payment Method'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.values(PaymentMethod).map((method) => {
                        const active = paymentMethod === method;
                        return (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`py-2 px-3 rounded-lg border text-xs font-semibold text-left transition-all cursor-pointer ${
                              active
                                ? 'border-[#6E0F2A] bg-[#6E0F2A] text-white'
                                : 'border-[#6E0F2A]/15 bg-white text-[#4A383D] hover:border-[#6E0F2A]/40'
                            }`}
                          >
                            {method}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A0510] mb-1">
                      {isBn ? 'বিশেষ নির্দেশনা (ঐচ্ছিক)' : 'Order Note (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={
                        isBn ? 'যেমন: বিকেল ৫টার পর ডেলিভারি' : 'e.g. Call before delivery'
                      }
                      className="w-full h-10 px-3 rounded-lg bg-white border border-[#6E0F2A]/20 text-sm focus:outline-none focus:border-[#6E0F2A]"
                    />
                  </div>
                </form>
              )}

              {step === 'receipt' && confirmedOrder && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-5 border border-[#6E0F2A]/15 space-y-4"
                >
                  <div className="flex items-center gap-3 text-emerald-700">
                    <CheckCircle2 className="w-8 h-8 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider">
                        {confirmedOrder.status}
                      </p>
                      <h3 className="font-display text-xl font-bold text-[#2A0510] tabular-nums">
                        Order #{confirmedOrder.orderId}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#5A474D] leading-relaxed">
                    {isBn
                      ? `ধন্যবাদ ${confirmedOrder.customerName}! আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে। আমাদের প্রতিনিধি শীঘ্রই ${confirmedOrder.phone} নম্বরে যোগাযোগ করবেন।`
                      : `Thank you, ${confirmedOrder.customerName}! Your order has been confirmed. Our team will reach out to ${confirmedOrder.phone} before dispatch.`}
                  </p>

                  <div className="border-t border-b border-[#6E0F2A]/10 py-3 space-y-2 text-xs">
                    {confirmedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between gap-2">
                        <span className="text-[#2A0510]">
                          {isBn ? item.nameBn : item.name} × {item.quantity} ({item.swatchName})
                        </span>
                        <span className="font-semibold tabular-nums">
                          ৳ {(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1 text-xs tabular-nums">
                    <div className="flex justify-between text-[#6B5A5F]">
                      <span>{isBn ? 'ডেলিভারি চার্জ' : 'Delivery Charge'}</span>
                      <span>৳ {confirmedOrder.deliveryCharge.toLocaleString()}</span>
                    </div>
                    {confirmedOrder.discount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>{isBn ? 'ছাড়' : 'Discount'}</span>
                        <span>-৳ {confirmedOrder.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-[#6E0F2A] pt-1">
                      <span>{isBn ? 'সর্বমোট' : 'Total Payable'}</span>
                      <span>৳ {confirmedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full h-11 rounded-lg bg-[#6E0F2A] text-white text-sm font-semibold hover:bg-[#520A1E] transition-colors cursor-pointer"
                  >
                    {isBn ? 'শপিং চালিয়ে যান' : 'Continue Shopping'}
                  </button>
                </motion.div>
              )}
            </div>

            {/* Footer Totals + Action */}
            {step !== 'receipt' && items.length > 0 && (
              <div className="px-6 py-4 bg-white border-t border-[#6E0F2A]/10 space-y-3">
                <div className="space-y-1 text-xs tabular-nums">
                  <div className="flex justify-between text-[#6B5A5F]">
                    <span>{isBn ? 'সাবটোটাল' : 'Subtotal'}</span>
                    <span>৳ {subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>
                        {isBn ? 'কুপন ছাড়' : 'Coupon Discount'} ({appliedCoupon})
                      </span>
                      <span>-৳ {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#6B5A5F]">
                    <span>
                      {isBn ? 'ডেলিভারি চার্জ' : 'Delivery'} ({deliveryZone})
                    </span>
                    <span>
                      {deliveryCharge === 0
                        ? isBn
                          ? 'ফ্রি'
                          : 'Free'
                        : `৳ ${deliveryCharge.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#2A0510] pt-1 border-t border-[#6E0F2A]/10">
                    <span>{isBn ? 'মোট মূল্য' : 'Total'}</span>
                    <span className="text-[#6E0F2A]">৳ {total.toLocaleString()}</span>
                  </div>
                </div>

                {step === 'cart' ? (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep('checkout')}
                    className="w-full h-12 rounded-lg bg-[#6E0F2A] hover:bg-[#520A1E] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>{isBn ? 'অর্ডার করতে এগিয়ে যান' : 'Proceed to Order'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    form="checkout-form"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-12 rounded-lg bg-[#6E0F2A] hover:bg-[#520A1E] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>
                      {isBn
                        ? `অর্ডার নিশ্চিত করুন (৳ ${total.toLocaleString()})`
                        : `Confirm Order (৳ ${total.toLocaleString()})`}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#F0C44B]" />
                  </motion.button>
                )}
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
