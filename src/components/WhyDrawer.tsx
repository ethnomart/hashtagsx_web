import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { Logo } from './Logo';

export const WhyDrawer: React.FC = () => {
  const { isWhyOpen, setIsWhyOpen, goShop } = useStore();

  if (!isWhyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={() => {
          sound.playClick();
          setIsWhyOpen(false);
        }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-cream dark:bg-[#121214] text-black dark:text-cream border-l border-black/10 dark:border-white/10 shadow-2xl p-8 sm:p-12 overflow-y-auto flex flex-col justify-between no-scrollbar">
          
          <div>
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-6 mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#eb3324] font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                The HashtagsX Manifesto
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsWhyOpen(false);
                }}
                className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading leading-tight tracking-tight uppercase mb-6 text-[#eb3324]">
              Why We Make <br />
              <span>Apparel</span>
            </h2>

            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-black/80 dark:text-cream/80 font-normal">
              <p>
                Created by the <strong className="text-black dark:text-white font-bold">HashtagsX</strong> team, this store and signature collection celebrates our collective creativity, experimental typography, and passion for enduring garments.
              </p>

              <div className="p-6 rounded-2xl bg-[#eb3324]/10 border border-[#eb3324]/20">
                <p className="font-heading font-bold text-lg text-[#eb3324] italic">
                  “Made to be worn. Or judged. Or both.”
                </p>
              </div>

              <h3 className="text-xl font-bold font-heading pt-4 border-t border-black/10 dark:border-white/10">
                1. Obsession with Form & Substance
              </h3>
              <p>
                Every piece is constructed using heavyweight 240+ GSM organic cotton, reinforced box stitching, and customized hardware. We reject fast fashion in favor of collectible micro-batches.
              </p>

              <h3 className="text-xl font-bold font-heading pt-4 border-t border-black/10 dark:border-white/10">
                2. Typographic Discipline
              </h3>
              <p>
                Our graphics aren't decorative noise; they are specimen sheets, grid structures, and mathematical alignments born from our digital design studio roots.
              </p>

              <h3 className="text-xl font-bold font-heading pt-4 border-t border-black/10 dark:border-white/10">
                3. Ethical Atelier
              </h3>
              <p>
                Crafted in Portugal and Uruguay with eco-conscious water-based discharge inks and certified ethical labor standards.
              </p>
            </div>
          </div>

          <div className="pt-8 mt-12 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            <Logo variant="badge" />
            <button
              onClick={() => {
                sound.playClick();
                setIsWhyOpen(false);
                goShop();
              }}
              className="px-6 py-3 rounded-full bg-[#eb3324] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#c41d10] transition-colors"
            >
              Shop Collection
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
