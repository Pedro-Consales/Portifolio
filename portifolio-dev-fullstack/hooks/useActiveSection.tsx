// hooks/useActiveSection.ts
"use client";

import { useEffect, useState } from "react";

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); // CHANGED: ensure consistent alignment at top
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