import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { Logo } from './Logo';

export const MenuDrawer: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen, setIsWhyOpen, setIsShippingOpen, goShop } = useStore();

  if (!isMenuOpen) return null;

  const links = [
    {
      title: 'Shop Collection',
      action: () => {
        setIsMenuOpen(false);
        goShop();
      }
    },
    {
      title: 'Manifesto & Why',
      action: () => {
        setIsMenuOpen(false);
        setIsWhyOpen(true);
      }
    },
    {
      title: 'Shipping & Returns',
      action: () => {
        setIsMenuOpen(false);
        setIsShippingOpen(true);
      }
    },
    {
      title: 'HX Studio Website',
      href: 'https://hashtagsx.com',
      external: true
    },
    {
      title: 'Work & Projects',
      href: 'https://hashtagsx.com/work',
      external: true
    },
    {
      title: 'Careers',
      href: 'https://hashtagsx.com/careers',
      external: true
    },
    {
      title: "Let's Talk",
      href: 'mailto:haseeburrehman5124@gmail.com',
      external: true
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={() => {
          sound.playClick();
          setIsMenuOpen(false);
        }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#0c0c0d] text-cream border-l border-white/10 shadow-2xl p-8 flex flex-col justify-between">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <Logo variant="full" className="h-auto" />
            <button
              onClick={() => {
                sound.playClick();
                setIsMenuOpen(false);
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-[#eb3324] transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <nav className="space-y-4 my-8">
            {links.map((link, i) => (
              <div key={i}>
                {link.action ? (
                  <button
                    onClick={() => {
                      sound.playClick();
                      link.action();
                    }}
                    className="group flex items-center justify-between w-full text-2xl font-black font-heading tracking-tight hover:text-[#eb3324] transition-colors text-left"
                  >
                    <span>{link.title}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </button>
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between w-full text-2xl font-black font-heading tracking-tight hover:text-[#eb3324] transition-colors"
                  >
                    <span>{link.title}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </a>
                )}
              </div>
            ))}
          </nav>

          <div className="border-t border-white/10 pt-6 space-y-4">
            <div className="flex items-center gap-4 text-xs font-mono opacity-80">
              <a href="https://www.instagram.com/hashtagsx1/" target="_blank" rel="noreferrer" className="hover:text-[#eb3324]">
                Instagram
              </a>
            </div>

            <div className="text-[11px] font-mono opacity-50">
              © 2026 HashtagsX Studio. All rights reserved.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
