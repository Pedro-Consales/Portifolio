// hooks/useActiveSection.ts
"use client";

import { useEffect, useState } from "react";

// Eased programmatic scroll (replaces the browser's native "smooth", which uses
// a fixed, robotic-feeling curve). Uses requestAnimationFrame + easeInOutCubic,
// offsets for the sticky header, and bails out the moment the user grabs the
// scroll themselves — so it feels fluid instead of step-by-step.
let scrollRaf: number | null = null;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const html = document.documentElement;
  const header = document.querySelector("header");
  const offset = header ? header.getBoundingClientRect().height : 0;

  const startY = window.scrollY;
  const targetY = Math.max(0, el.getBoundingClientRect().top + startY - offset);
  const dist = targetY - startY;
  if (Math.abs(dist) < 2) return;

  if (scrollRaf !== null) cancelAnimationFrame(scrollRaf);

  // Distance-scaled duration (clamped) so short and long jumps both feel right.
  const duration = Math.min(1100, Math.max(500, Math.abs(dist) * 0.45));
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // Override the CSS scroll-behavior:smooth so our easing fully owns the motion
  // (otherwise each frame's scrollTo would get re-smoothed and fight us).
  const prevBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";

  let startTime: number | null = null;
  let cancelled = false;
  const cancel = () => { cancelled = true; };
  const passive = { passive: true } as const;
  window.addEventListener("wheel", cancel, passive);
  window.addEventListener("touchstart", cancel, passive);

  const cleanup = () => {
    html.style.scrollBehavior = prevBehavior;
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    scrollRaf = null;
  };

  const step = (now: number) => {
    if (cancelled) return cleanup();
    if (startTime === null) startTime = now;
    const p = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, startY + dist * easeInOutCubic(p));
    if (p < 1) scrollRaf = requestAnimationFrame(step);
    else cleanup();
  };
  scrollRaf = requestAnimationFrame(step);
}

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? ""); // CHANGED: default to first section (Hero)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((x): x is { id: string; el: HTMLElement } => Boolean(x.el));

    if (elements.length === 0) return;

    const visibility = new Map<string, number>(); // CHANGED: track intersection ratios

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0); // CHANGED: store ratio per section
        }

        // CHANGED: choose the most visible intersecting section (stable, works when scrolling back up)
        let bestId = activeSection;
        let bestRatio = -1;

        for (const { id } of elements) {
          const ratio = visibility.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        // CHANGED: avoid noisy state updates
        if (bestId && bestId !== activeSection) setActiveSection(bestId);
      },
      {
        root: null,
        
        rootMargin: "-96px 0px -55% 0px", 
       
        threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
      }
    );

    elements.forEach(({ el }) => observer.observe(el));

    return () => observer.disconnect(); 

  }, [sectionIds, activeSection]);

  return activeSection;
}