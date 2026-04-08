"use client";

import Link from "next/link";
import ThemeToggle from "./theme-provider/ThemeToogle";
import { useActiveSection, scrollToSection } from "@/hooks/useActiveSection";

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
    { label: "Hero",     href: "/#",         sectionId: "hero" },
    { label: "About Me", href: "/#about-me", sectionId: "about-me" },
    { label: "Time Line", href: "/#timeline", sectionId: "timeline" },
    { label: "Skills", href: "/#skill-overview", sectionId: "skill-overview" },
    { label: "Projects", href: "/#projects", sectionId: "projects" },
  ],
}: HeaderProps) {
  const activeSection = useActiveSection(["hero", "about-me", "timeline", "skill-overview", "projects"]);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className={[
            "pointer-events-auto flex h-[78px] w-full max-w-[1100px] items-center justify-between rounded-full px-6 backdrop-blur-xl",
            "border border-black/10 bg-white/60 text-black shadow-[0_18px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/5",
            "dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)] dark:ring-white/10",
          ].join(" ")}
      >
        <Link href="/" aria-label={brand} className="flex items-center gap-3 font-semibold tracking-tight">
          PCM
        </Link>

        <div className="flex items-center gap-8">
          {links.map((l) => {
            const isActive = l.sectionId === activeSection;
            const linkClass = [
              "relative rounded-xl px-2 py-2 text-lg font-medium transition",
              "text-black/80 hover:text-black hover:bg-black/5",
              "dark:text-white/85 dark:hover:text-white dark:hover:bg-white/10",
              isActive
                ? "after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2px] after:rounded-full after:bg-current after:transition-all"
                : "",
            ].join(" ");


            if (l.sectionId) {
              return (
                <button
                  key={l.href}
                  onClick={() => scrollToSection(l.sectionId!)}
                  className={linkClass}
                >
                  {l.label}
                </button>
              );
            }

            // rotas reais (/docs, etc) continuam usando Link
            return (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            );
          })}

          
        </div>

        <div className="flex flex-row jutify-center items-center gap-2">
          <ThemeToggle /> 

          <Link
            href="/_Brasil Curriclo Vittae - Pedro Consales_2026.1.pdf" 
            target="_blank" 
            rel="noreferrer"
            className={[
              "inline-flex items-center rounded-full px-6 py-2.5 font-semibold transition", 
              "bg-[#7EC2D6] text-white hover:bg-[#6db6cc] shadow-sm", 
              "dark:bg-[#267799] dark:hover:bg-[#1f6683]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7EC2D6] dark:focus-visible:ring-[#267799] focus-visible:ring-offset-transparent", // CHANGED: accessibility
            ].join(" ")}
          >
            Resume
          </Link>
        </div>
      </nav>
    </header>
  );
}