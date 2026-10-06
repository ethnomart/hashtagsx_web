import React from 'react';
import { useStore } from '../context/StoreContext';
import { sound } from '../utils/sound';

export const Hero: React.FC = () => {
  const { setIsWhyOpen, setIsShippingOpen } = useStore();

  return (
    <section className="px-4 lg:px-6 pt-4 pb-8 md:pt-6 md:pb-12 text-[#eb3324] dark:text-[#ff453a] transition-colors duration-300">
      <div className="max-w-[1700px] mx-auto">
        
        {/* Giant HASHTAGSX. Logo SVG / Typography Banner */}
        <div className="relative mb-4 md:mb-6 select-none overflow-hidden">
          <svg
            width="100%"
            viewBox="0 0 1480 270"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto max-h-[38vw] min-h-[70px] overflow-visible"
            aria-label="HASHTAGSX"
          >
            <text
              x="0"
              y="230"
              fontFamily="'Space Grotesk', 'Neue Haas Grotesk', -apple-system, sans-serif"
              fontWeight="900"
              fontSize="270"
              letterSpacing="-0.04em"
              fill="currentColor"
            >
              HASHTAGSX.
            </text>
            
            {/* Registered Trademark Circle (R) */}
            <g transform="translate(1420, 220)">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="4" fill="none" />
              <text
                x="20"
                y="27"
                textAnchor="middle"
                fontSize="20"
                fontWeight="900"
                fontFamily="sans-serif"
                fill="currentColor"
              >
                R
              </text>
            </g>
          </svg>
        </div>

        {/* Solid Horizontal Dividing Line */}
        <div id="hero-line" className="mb-6 h-[4px] md:h-[5px] w-full bg-current origin-left"></div>

        {/* 4-Column Structured Sub-Header */}
        <div
          id="hero-content"
          className="mb-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-12 gap-x-6 gap-y-6 text-xs font-bold tracking-tight"
        >
          {/* Column 1: Brand Identifier */}
          <div className="col-span-1 md:col-span-3">
            <h1 className="uppercase font-extrabold tracking-wider text-xs md:text-sm" id="hero-title">
              HASHTAGSX
            </h1>
          </div>

          {/* Column 2: Why & Paragraph */}
          <div className="col-span-1 sm:col-span-2 md:col-span-5">
            <button
              onClick={() => {
                sound.playWhoosh();
                setIsWhyOpen(true);
              }}
              className="mb-3 uppercase font-extrabold tracking-wider text-xs md:text-sm hover:underline cursor-pointer flex items-center gap-1"
              id="hero-subtitle"
            >
              WHY
            </button>
            <p
              id="hero-paragraph"
              className="text-xs md:text-sm leading-relaxed tracking-tight max-w-md font-normal opacity-95 text-black dark:text-cream/90"
            >
              Created by the <strong className="font-bold text-black dark:text-white">HashtagsX</strong> team, this store and signature collection celebrates our collective creativity and passion for apparel. Carefully designed.
            </p>
          </div>

          {/* Column 3: Links */}
          <div className="col-span-1 md:col-span-3 flex flex-col justify-start space-y-3">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline uppercase tracking-wider text-xs md:text-sm font-extrabold max-w-fit"
              id="hero-link"
              href="https://hashtagsx.com"
            >
              VISIT HX STUDIO
            </a>
            <button
              onClick={() => {
                sound.playClick();
                setIsShippingOpen(true);
              }}
              className="hover:underline uppercase tracking-wider text-xs md:text-sm font-extrabold max-w-fit text-left cursor-pointer"
              id="hero-shipping-returns-link"
            >
              SHIPPING &amp; RETURNS
            </button>
          </div>

          {/* Column 4: Year Copyright */}
          <div className="col-span-1 flex justify-end font-extrabold text-xs md:text-sm tracking-wider" id="hero-copyright">
            © 2026
          </div>
        </div>

      </div>
    </section>
  );
};
