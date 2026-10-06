import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { NumberFlow } from './NumberFlow';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Menu, Sun, Moon, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

export const Header: React.FC = () => {
  const {
    totalCartCount,
    setIsCartOpen,
    isMenuOpen,
    setIsMenuOpen,
    setIsWhyOpen,
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="bg-[#0c0c0d] text-white dark:bg-black dark:text-white py-1.5 px-4 text-xs font-mono overflow-hidden border-b border-black/10 dark:border-white/10 select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="mx-6 tracking-wider font-semibold text-[#eb3324]">HASHTAGSX® SIGNATURE COLLECTION 2026</span>
          <span className="mx-6 opacity-40">/</span>
          <span className="mx-6 tracking-wider">WORLDWIDE EXPRESS SHIPPING</span>
          <span className="mx-6 opacity-40">/</span>
          <span className="mx-6 tracking-wider font-semibold text-[#eb3324]">MADE TO BE WORN. OR JUDGED. OR BOTH.</span>
          <span className="mx-6 opacity-40">/</span>
          <span className="mx-6 tracking-wider">LIMITED EDITION RUNS</span>
          <span className="mx-6 opacity-40">/</span>
          <span className="mx-6 tracking-wider font-semibold text-[#eb3324]">HASHTAGSX® SIGNATURE COLLECTION 2026</span>
          <span className="mx-6 opacity-40">/</span>
          <span className="mx-6 tracking-wider">WORLDWIDE EXPRESS SHIPPING</span>
        </div>
      </div>

      <header
        className={'sticky top-0 z-40 w-full transition-all duration-300 border-b border-black/10 dark:border-white/10 ' + (
          isScrolled
            ? 'bg-cream/95 dark:bg-[#0c0c0d]/95 backdrop-blur-md py-3 shadow-sm'
            : 'bg-cream dark:bg-[#0c0c0d] py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              sound.playClick();
            }}
          >
            <Logo variant="full" className="h-auto" />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-tight">
            <button
              onClick={() => {
                const el = document.getElementById('product-catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
                sound.playClick();
              }}
              className="hover:text-[#eb3324] transition-colors flex items-center gap-1 group font-heading font-semibold"
            >
              Shop
              <span className="w-1.5 h-1.5 rounded-full bg-[#eb3324] opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
            <button
              onClick={() => {
                sound.playWhoosh();
                setIsWhyOpen(true);
              }}
              className="hover:text-[#eb3324] transition-colors font-heading font-semibold flex items-center gap-1"
            >
              Why
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </button>
            <a
              href="https://hashtagsx.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#eb3324] transition-colors opacity-70 hover:opacity-100 text-xs font-mono uppercase font-bold"
            >
              hx.studio
            </a>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-black/80 dark:text-cream/80"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleSound}
              aria-label="Toggle Sound"
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-black/80 dark:text-cream/80"
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#eb3324]" /> : <VolumeX className="w-4 h-4 opacity-40" />}
            </button>

            <button
              onClick={() => {
                sound.playWhoosh();
                setIsCartOpen(true);
              }}
              className="group flex items-center gap-2 bg-black text-cream dark:bg-cream dark:text-black px-3.5 py-2 rounded-full text-xs font-mono font-semibold transition-transform duration-200 active:scale-95 shadow-sm hover:ring-2 hover:ring-[#eb3324]/50"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag (</span>
              <NumberFlow value={totalCartCount} padZeroes={2} className="font-bold text-[#eb3324] dark:text-[#eb3324]" />
              <span>)</span>
            </button>

            <button
              onClick={() => {
                sound.playWhoosh();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="border border-black/15 dark:border-white/20 px-3.5 py-2 rounded-full text-xs font-mono font-semibold hover:bg-black/5 dark:hover:bg-white/10 transition-all flex items-center gap-1.5"
            >
              <Menu className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
