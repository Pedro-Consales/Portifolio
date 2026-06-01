"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./theme-provider/ThemeToogle";
import { useActiveSection, scrollToSection } from "@/hooks/useActiveSection";
import PCMKeycapLogo from "./PCMKeycapLogo";
import NavKeycap from "./NavKeycap";

type HeaderLink = {
  label: string;
  href: string;
  sectionId?: string;
};

type HeaderProps = {
  brand?: string;
  links?: HeaderLink[];
};

export default function Header({
  brand = "React Bits",
  links = [
    { label: "Hero", href: "/#", sectionId: "hero" },
    { label: "About Me", href: "/#about-me", sectionId: "about-me" },
    { label: "Time Line", href: "/#timeline", sectionId: "timeline" },
    { label: "Skills", href: "/#skill-overview", sectionId: "skill-overview" },
    { label: "Projects", href: "/#projects", sectionId: "projects" },
  ],
}: HeaderProps) {
  const activeSection = useActiveSection(["hero", "about-me", "timeline", "skill-overview", "projects"]);

  // Trava por clique: a seção clicada afunda imediatamente e a tela desliza até ela.
  // `isLocking` ignora o scroll-spy durante o scroll programático, para que as
  // seções intermediárias não fiquem piscando pressionadas no caminho.
  const [locked, setLocked] = useState<string | null>(null);
  const [isLocking, setIsLocking] = useState(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNavClick = (sectionId?: string) => {
    if (!sectionId) return;
    setLocked(sectionId);
    setIsLocking(true);
    if (lockTimer.current) clearTimeout(lockTimer.current);
    // fallback: solta a guarda mesmo se o scroll-spy não pousar exatamente na seção
    lockTimer.current = setTimeout(() => setIsLocking(false), 1200);
    scrollToSection(sectionId);
  };

  // Chegou na seção travada → encerra a guarda mais cedo.
  useEffect(() => {
    if (isLocking && activeSection === locked) {
      setIsLocking(false);
      if (lockTimer.current) clearTimeout(lockTimer.current);
    }
  }, [isLocking, activeSection, locked]);

  // Sem scroll programático e o usuário rolou para outra seção → libera a trava.
  useEffect(() => {
    if (!isLocking && locked && activeSection !== locked) setLocked(null);
  }, [isLocking, activeSection, locked]);

  useEffect(() => () => {
    if (lockTimer.current) clearTimeout(lockTimer.current);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 w-full", // CHANGED: barra cheia, fixada no topo (não flutua)
        "border-b border-black/10 bg-white/70 text-black backdrop-blur-md", // CHANGED: fundo um pouco mais transparente + blur
        "dark:border-white/10 dark:bg-black/60 dark:text-white",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[64px] sm:h-[84px] w-full max-w-[1280px] items-center justify-between px-4 sm:px-8"
      >
        <button
          aria-label={brand}
          onClick={() => scrollToSection("hero")}
          className="flex items-center bg-transparent border-0 p-0 cursor-pointer"
        >
          <PCMKeycapLogo />
        </button>

        <div className="hidden md:flex items-center gap-3 lg:gap-4"> {/* CHANGED: hide nav keycaps on small screens */}
          {links.map((l) => (
            <NavKeycap
              key={l.href}
              label={l.label}
              locked={l.sectionId === locked}
              present={!isLocking && l.sectionId !== locked && l.sectionId === activeSection}
              onClick={() => handleNavClick(l.sectionId)}
            />
          ))}
        </div>

        <div className="flex flex-row justify-center items-center gap-2 sm:gap-3"> {/* CHANGED: fix typo + responsive gap */}
          <ThemeToggle />

          <Link
            href="/_Brasil Curriclo Vittae - Pedro Consales_2026.1.pdf"
            target="_blank"
            rel="noreferrer"
            className={[
              "inline-flex items-center rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold transition", // CHANGED: responsive sizing
              "bg-[#7EC2D6] text-white hover:bg-[#6db6cc] shadow-sm",
              "dark:bg-[#267799] dark:hover:bg-[#1f6683]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7EC2D6] dark:focus-visible:ring-[#267799] focus-visible:ring-offset-transparent",
            ].join(" ")}
          >
            Resume
          </Link>
        </div>
      </nav>
    </header>
  );
}