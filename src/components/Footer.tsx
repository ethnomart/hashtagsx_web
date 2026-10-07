import React from 'react';
import { useStore } from '../context/StoreContext';
import { sound } from '../utils/sound';
import { Play } from 'lucide-react';

export const Footer: React.FC = () => {
  const { replayPreloader, setIsWhyOpen, setIsShippingOpen, openPrivacy } = useStore();

  return (
    <footer className="mx-auto mb-10 px-4 text-xs font-bold lg:px-6 max-w-[1700px] select-none text-white transition-colors duration-300">
      
      {/* Top Divider Line */}
      <div className="mb-6 h-[4px] md:h-[5px] w-full bg-white"></div>

      {/* Manifesto Headline + Giant Year Mark */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:gap-8 items-start">
        <div className="flex-1 text-[2.75rem] leading-[0.95] font-[900] tracking-tighter text-balance md:text-[5.5vw] uppercase font-heading text-white">
          <p className="text-white">Made to be worn.</p>
          <p className="text-black/70">Or judged. Or both.</p>
        </div>
        <div>
          <p className="text-[35vw] leading-[0.8] font-[900] tracking-tighter md:text-[12.5vw] text-white font-heading">
            ©26
          </p>
        </div>
      </div>

      {/* Mid Statement Paragraph */}
      <div className="mt-16 mb-6 md:mt-28">
        <p className="max-w-[56ch] tracking-tight text-balance text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white">
          Created by the <strong className="font-bold text-white underline">HashtagsX</strong> team, this store and signature collection celebrates our collective creativity and passion for apparel. Carefully designed.
        </p>
      </div>

      {/* Thin Horizontal Rule */}
      <hr className="mb-6 h-[2px] w-full bg-white border-none opacity-80" />

      {/* Multi-Column Footer Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-12 gap-x-6 gap-y-10 uppercase tracking-wider text-xs text-white">
        
        {/* Col 1: Studio link & Replay */}
        <div className="col-span-2 sm:col-span-1 md:col-span-3 flex flex-col justify-between space-y-3">
          <div>
            <a
              href="https://hashtagsx.com"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:underline font-extrabold block mb-2"
            >
              HASHTAGSX STUDIO
            </a>
            <div className="text-[11px] opacity-90 font-normal normal-case">
              Montevideo, Uruguay.
            </div>
          </div>

          <button
            onClick={() => {
              sound.playWhoosh();
              replayPreloader();
            }}
            className="inline-flex items-center gap-1.5 hover:underline font-extrabold text-[11px] pt-4 cursor-pointer text-left text-white"
          >
            <Play className="w-3 h-3 fill-current" />
            REPLAY LAUNCH INTRO
          </button>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="col-span-1 md:col-span-3 space-y-2">
          <div>
            <button
              onClick={() => {
                sound.playClick();
                setIsWhyOpen(true);
              }}
              className="hover:underline font-extrabold cursor-pointer"
            >
              WHY
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                sound.playClick();
                setIsShippingOpen(true);
              }}
              className="hover:underline font-extrabold cursor-pointer"
            >
              SHIPPING &amp; RETURNS
            </button>
          </div>
          <div>
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                sound.playClick();
                openPrivacy();
              }}
              className="hover:underline opacity-90"
            >
              PRIVACY POLICY
            </a>
          </div>
        </div>

        {/* Col 3: Social Channels */}
        <div className="col-span-1 md:col-span-3 space-y-2">
          <div>
            <a href="https://www.instagram.com/hashtagsx1/" target="_blank" rel="noreferrer" className="hover:underline opacity-90">
              INSTAGRAM
            </a>
          </div>
        </div>

        {/* Col 4: Contact */}
        <div className="col-span-2 sm:col-span-1 md:col-span-3 space-y-2 text-right sm:text-left">
          <div className="font-extrabold">CONTACT</div>
          <div>
            <a
              href="https://www.instagram.com/hashtagsx1/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline opacity-90 normal-case"
            >
              Instagram: @hashtagsx1
            </a>
          </div>
          <div>
            <a href="mailto:hello@hashtagsx.com" className="hover:underline font-extrabold">
              LET'S TALK
            </a>
          </div>
        </div>

      </div>

      </div>

      {/* Bottom Copyright Row */}
      <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono opacity-90 text-white">
        <div>© 2026 HASHTAGSX STUDIO. ALL RIGHTS RESERVED.</div>
        <div>DESIGNED &amp; ENGINEERED FOR DAILY WEAR.</div>
      </div>

    </footer>
  );
};
