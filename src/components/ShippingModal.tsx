import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';

export const ShippingModal: React.FC = () => {
  const { isShippingOpen, setIsShippingOpen } = useStore();

  if (!isShippingOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={() => {
          sound.playClick();
          setIsShippingOpen(false);
        }}
      />

      <div className="relative w-full max-w-2xl bg-cream dark:bg-[#141416] text-black dark:text-cream rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 p-6 sm:p-10 z-10">
        <button
          onClick={() => {
            sound.playClick();
            setIsShippingOpen(false);
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl sm:text-3xl font-black font-heading mb-6 uppercase text-[#eb3324]">
          Shipping & Returns Policy
        </h3>

        <div className="space-y-6 text-sm text-black/80 dark:text-cream/80 leading-relaxed">
          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-2xl bg-[#eb3324]/10 text-[#eb3324] flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base mb-1">Nationwide Shipping</h4>
              <p>
                We deliver across Pakistan. Orders over Rs 10,000 qualify for free shipping, otherwise delivery is Rs 250. Standard delivery times range from 3-7 business days depending on destination.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-2xl bg-[#eb3324]/10 text-[#eb3324] flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base mb-1">14-Day Hassle-Free Returns</h4>
              <p>
                If your piece does not fit or meet your expectations, return it within 14 days of delivery in its original unworn condition with tags attached for a full refund or exchange.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-2xl bg-[#eb3324]/10 text-[#eb3324] flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base mb-1">Quality Guarantee</h4>
              <p>
                All HashtagsX garments are rigorously inspected. In the unlikely event of a manufacturing defect, contact us for an immediate replacement.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 text-center">
          <button
            onClick={() => {
              sound.playClick();
              setIsShippingOpen(false);
            }}
            className="px-8 py-3 rounded-full bg-[#eb3324] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#c41d10] transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
