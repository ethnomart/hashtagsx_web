import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../context/StoreContext';

const PRELOADER_IMAGES = [
  'https://outfit.hellohello.is/preloader/image-01.jpg',
  'https://outfit.hellohello.is/preloader/image-02.jpg',
  'https://outfit.hellohello.is/preloader/image-03.jpg',
  'https://outfit.hellohello.is/preloader/image-04.jpg',
  'https://outfit.hellohello.is/preloader/image-05.jpg',
  'https://outfit.hellohello.is/preloader/image-06.jpg'
];

export const Preloader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { isPreloaderComplete, setIsPreloaderComplete } = useStore();

  useEffect(() => {
    if (isPreloaderComplete || !containerRef.current || !counterRef.current) return;

    const container = containerRef.current;
    const counter = counterRef.current;
    const cards = gsap.utils.toArray<HTMLElement>(cardsContainerRef.current?.querySelectorAll('img') || []);
    const paths = gsap.utils.toArray<SVGPathElement>(svgRef.current?.querySelectorAll('path') || []);

    gsap.set(cards, { scale: 0, rotate: 0, willChange: 'transform' });
    gsap.set(paths, { yPercent: 110, willChange: 'transform, opacity' });
    gsap.set(counter, { innerText: '000', yPercent: 0, autoAlpha: 1 });
    gsap.set(container, { clipPath: 'inset(0% 0% 0% 0%)' });

    if (cardsContainerRef.current) cardsContainerRef.current.classList.remove('invisible');
    if (svgRef.current) svgRef.current.classList.remove('invisible');

    const introTl = gsap.timeline({
      defaults: { duration: 0.6, ease: 'power3.out', force3D: true }
    });

    introTl
      .fromTo(
        cards,
        { scale: 0, rotate: 0 },
        {
          scale: 1,
          rotate: () => gsap.utils.random(-22, 22),
          stagger: { each: 0.18, from: 'start' }
        }
      )
      .fromTo(
        paths,
        { yPercent: 110 },
        { yPercent: 0, stagger: { each: 0.15, from: 'random' } },
        '<'
      );

    const masterTl = gsap.timeline({
      delay: 0.3,
      defaults: { force3D: true },
      onComplete: () => {
        gsap.set(cards, { willChange: 'none' });
        gsap.set(paths, { willChange: 'none' });
      }
    });

    const counterObj = { val: 0 };

    masterTl
      .to(counterObj, {
        val: 100,
        duration: 2.8,
        ease: 'circ.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = String(Math.round(counterObj.val)).padStart(3, '0');
          }
        }
      })
      .to(counter, { yPercent: -100, duration: 0.9, autoAlpha: 0, ease: 'circ.inOut' }, '<88%')
      .to(paths, { yPercent: -120, duration: 1.1, ease: 'expo.inOut', stagger: { each: 0.07, from: 'random' } }, '<')
      .to(cards, { scale: 0, rotate: () => gsap.utils.random(-25, 25), duration: 0.6, ease: 'expo.inOut', stagger: { each: 0.08, from: 'end' } }, '<')
      .to(container, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.3, ease: 'power3.inOut' }, '<25%')
      .call(() => {
        setIsPreloaderComplete(true);
        document.documentElement.classList.add('loaded');
      }, undefined, '<60%');

    return () => {
      introTl.kill();
      masterTl.kill();
    };
  }, [isPreloaderComplete, setIsPreloaderComplete]);

  if (isPreloaderComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0c0c0d] text-[#f5f4ef] select-none pointer-events-auto"
      style={{ clipPath: 'inset(0% 0% 0% 0%)', contain: 'layout paint style' }}
    >
      <div
        ref={cardsContainerRef}
        className="invisible fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{ contain: 'layout paint style' }}
      >
        {PRELOADER_IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="absolute aspect-[9/12] w-[45vw] sm:w-[28vw] md:w-[13vw] max-w-[210px] object-cover rounded shadow-2xl border border-white/10 ring-1 ring-black/40"
            loading="eager"
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center">
        <div className="overflow-hidden mb-6 flex justify-center w-full">
          <svg
            ref={svgRef}
            viewBox="0 0 1200 240"
            xmlns="http://www.w3.org/2000/svg"
            className="invisible w-full max-w-[90vw] md:max-w-[720px] fill-cream mix-blend-difference overflow-visible"
          >
            <path d="M 50 15 L 1150 15 L 1150 27 L 50 27 Z" />
            <path d="M 60 50 L 95 50 L 95 105 L 155 105 L 155 50 L 190 50 L 190 190 L 155 190 L 155 135 L 95 135 L 95 190 L 60 190 Z" />
            <path d="M 215 190 L 255 50 L 295 50 L 335 190 L 298 190 L 290 160 L 260 160 L 252 190 Z M 266 135 L 284 135 L 275 92 Z" />
            <path d="M 350 160 Q 360 190 395 190 Q 430 190 430 165 Q 430 135 385 125 Q 350 115 350 85 Q 350 50 395 50 Q 435 50 445 80 L 415 90 Q 410 75 395 75 Q 380 75 380 85 Q 380 98 420 108 Q 460 118 460 155 Q 460 195 395 195 Q 345 195 325 155 Z" />
            <path d="M 470 50 L 505 50 L 505 105 L 565 105 L 565 50 L 600 50 L 600 190 L 565 190 L 565 135 L 505 135 L 505 190 L 470 190 Z" />
            <path d="M 610 50 L 700 50 L 700 78 L 670 78 L 670 190 L 638 190 L 638 78 L 610 78 Z" />
            <path d="M 710 190 L 750 50 L 790 50 L 830 190 L 793 190 L 785 160 L 755 160 L 747 190 Z M 761 135 L 779 135 L 770 92 Z" />
            <path d="M 915 120 L 950 120 L 950 185 Q 925 195 890 195 Q 840 195 840 120 Q 840 50 890 50 Q 930 50 945 85 L 915 95 Q 905 75 890 75 Q 868 75 868 120 Q 868 168 890 168 Q 912 168 922 155 L 922 142 L 890 142 Z" />
            <path d="M 970 160 Q 980 190 1015 190 Q 1050 190 1050 165 Q 1050 135 1005 125 Q 970 115 970 85 Q 970 50 1015 50 Q 1055 50 1065 80 L 1035 90 Q 1030 75 1015 75 Q 1000 75 1000 85 Q 1000 98 1040 108 Q 1080 118 1080 155 Q 1080 195 1015 195 Q 965 195 945 155 Z" />
            {/* Letter X in Red */}
            <path d="M 1090 50 L 1125 50 L 1155 110 L 1185 50 L 1220 50 L 1175 118 L 1225 190 L 1190 190 L 1155 128 L 1120 190 L 1085 190 L 1135 118 Z" fill="#eb3324" />
            <path d="M 50 215 L 1150 215 L 1150 227 L 50 227 Z" />
          </svg>
        </div>

        <div className="overflow-hidden flex items-center justify-center">
          <div
            ref={counterRef}
            className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-cream/90"
          >
            000
          </div>
        </div>

        <div className="mt-4 text-[11px] uppercase tracking-[0.35em] text-[#eb3324] font-semibold font-mono">
          Loading Signature Experience · 2026
        </div>
      </div>
    </div>
  );
};
