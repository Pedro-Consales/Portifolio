"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

export interface BentoCardData {
  title: string;
  description: string;
  icon?: React.ReactNode;
  skills?: SkillItem[];
}

export interface BentoProps {
  cards: BentoCardData[];
  glowColor?: string;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  spotlightRadius?: number;
}

const DEFAULT_GLOW_COLOR = '38, 119, 153';
const DEFAULT_SPOTLIGHT_RADIUS = 300;

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number
) => {
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--glow-x', `${((mouseX - rect.left) / rect.width) * 100}%`);
  card.style.setProperty('--glow-y', `${((mouseY - rect.top) / rect.height) * 100}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({ gridRef, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
  useEffect(() => {
    if (!gridRef?.current) return;

    const spotlight = document.createElement('div');
    spotlight.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.12) 0%,
        rgba(${glowColor}, 0.06) 20%,
        rgba(${glowColor}, 0.02) 40%,
        transparent 65%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);

    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const inside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll('.bento-card');

      if (!inside) {
        gsap.to(spotlight, { opacity: 0, duration: 0.3 });
        cards.forEach(c => (c as HTMLElement).style.setProperty('--glow-intensity', '0'));
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDist = Infinity;

      cards.forEach(card => {
        const el = card as HTMLElement;
        const cr = el.getBoundingClientRect();
        const cx = cr.left + cr.width / 2;
        const cy = cr.top + cr.height / 2;
        const dist = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(cr.width, cr.height) / 2);
        minDist = Math.min(minDist, dist);

        let intensity = 0;
        if (dist <= proximity) intensity = 1;
        else if (dist <= fadeDistance) intensity = (fadeDistance - dist) / (fadeDistance - proximity);

        updateCardGlowProperties(el, e.clientX, e.clientY, intensity, spotlightRadius);
      });

      gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });

      const targetOpacity =
        minDist <= proximity
          ? 0.7
          : minDist <= fadeDistance
            ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.7
            : 0;

      gsap.to(spotlight, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.15 : 0.4 });
    };

    const handleMouseLeave = () => {
      gridRef.current?.querySelectorAll('.bento-card').forEach(c => {
        (c as HTMLElement).style.setProperty('--glow-intensity', '0');
      });
      gsap.to(spotlight, { opacity: 0, duration: 0.3 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlight.parentNode?.removeChild(spotlight);
    };
  }, [gridRef, spotlightRadius, glowColor]);

  return null;
};

const MagicBento: React.FC<BentoProps> = ({
  cards,
  glowColor = DEFAULT_GLOW_COLOR,
  enableSpotlight = true,
  enableBorderGlow = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style>{`
        .bento-card--glow::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.9)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 35%,
            transparent 65%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
          transition: filter 0.2s ease;
        }

        .bento-card--glow:hover::after {
          filter: brightness(1.5);
        }
      `}</style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div
        ref={gridRef}
        className="bento-section grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className={`bento-card relative rounded-2xl border border-white/8 bg-[#EAF0F6] dark:bg-[#1b4c61] p-5 sm:p-6 font-mono overflow-hidden ${enableBorderGlow ? 'bento-card--glow' : ''}`}
            style={{
              '--glow-x': '50%',
              '--glow-y': '50%',
              '--glow-intensity': '0',
              '--glow-radius': '200px',
            } as React.CSSProperties}
          >
            <div className="flex items-center gap-3 mb-2">
              {card.icon && (
                <div className="w-10 h-10 rounded-xl bg-sky-400/15 border border-[#829cb0] flex items-center justify-center text-[#7695ad] dark:text-sky-400">
                  {card.icon}
                </div>
              )}
              <h3 className="text-[16px] sm:text-[17px] font-medium text-[#1A2233] dark:text-slate-100">
                {card.title}
              </h3>
            </div>

            <p className="text-[13px] text-[#4A5568] dark:text-[#7a9ab0] mb-4 leading-relaxed">
              {card.description}
            </p>

            {card.skills && card.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {card.skills.map(skill => (
                  <span
                    key={skill.name}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#CBD5E0] bg-[#FFFFFF] text-[12px] text-slate-600 dark:bg-[#162024] dark:border-[#267799]"
                  >
                    <span className="text-[#6B8BA4] dark:text-sky-400">{skill.icon}</span>
                    <p className="text-[#374151] dark:text-slate-100">{skill.name}</p>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default MagicBento;
