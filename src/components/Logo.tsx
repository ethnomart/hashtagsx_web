import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'badge' | 'red-card';
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-7', variant = 'full' }) => {
  if (variant === 'red-card') {
    return (
      <div className={'bg-[#eb3324] text-white p-3 rounded-lg flex flex-col items-center justify-center select-none shadow-md border border-white/20 ' + className}>
        <div className="w-full h-1 bg-white mb-2 rounded-full opacity-95"></div>
        <div className="flex items-center justify-between w-full font-black tracking-tight text-2xl leading-none px-1">
          <span>H</span>
          <span>X</span>
          <span className="font-mono text-xl">#</span>
        </div>
        <div className="w-full bg-white text-[#eb3324] mt-2 py-0.5 rounded text-[9px] font-extrabold tracking-[0.3em] text-center uppercase">
          HASHTAGSX
        </div>
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div className="w-8 h-8 rounded bg-[#eb3324] text-white flex flex-col justify-between p-1 shadow-sm flex-shrink-0">
        <div className="w-full h-0.5 bg-white rounded-full"></div>
        <div className="flex items-center justify-between text-[11px] font-black leading-none px-0.5">
          <span>H</span>
          <span>X</span>
          <span className="text-[10px]">#</span>
        </div>
        <div className="w-full bg-white text-[#eb3324] text-[4px] font-extrabold tracking-widest text-center rounded-[1px] py-[0.5px]">
          HX
        </div>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={'inline-flex items-center gap-2 border border-[#eb3324]/30 dark:border-[#eb3324]/40 px-3 py-1.5 rounded-full bg-[#eb3324]/10 ' + className}>
        <div className="w-4 h-4 bg-[#eb3324] rounded-full flex items-center justify-center text-[8px] font-bold text-white">#</div>
        <span className="font-heading font-bold text-xs uppercase tracking-widest text-[#eb3324]">HashtagsX</span>
      </div>
    );
  }

  return (
    <div className={'inline-flex items-center select-none cursor-pointer ' + className}>
      <img src="/logo-full.png" alt="HASHTAGSX" className="h-12 md:h-14 w-auto dark:hidden" />
      <img src="/logo-full-light.png" alt="HASHTAGSX" className="h-12 md:h-14 w-auto hidden dark:block" />
    </div>
  );
};
