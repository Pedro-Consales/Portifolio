"use client";

import Link from "next/link";
import ThemeToggle from "./theme-provider/ThemeToogle";

type HeaderLink = {
  label: string;
  href: string;
};

type HeaderProps = {
  brand?: string;
  links?: HeaderLink[];
};

export default function Header({
  brand = "React Bits",
  links = [
    { label: "Hero", href: "/#" },
    { label: "About Me", href: "/#about-me" },
    { label: "Docs", href: "/docs" },
  ],
}: HeaderProps) {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className={[
            "pointer-events-auto flex h-[78px] w-full max-w-[1100px] items-center justify-between rounded-full px-6 backdrop-blur-xl",
            // LIGHT (default)
            "border border-black/10 bg-white/60 text-black shadow-[0_18px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/5",
            // DARK
            "dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)] dark:ring-white/10",
          ].join(" ")}
      >
        <Link href="/" aria-label={brand} className="flex items-center gap-3 font-semibold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5">
            <svg width="22" height="22" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <path
                d="M13 3.2c5.4 0 9.8 4.4 9.8 9.8S18.4 22.8 13 22.8 3.2 18.4 3.2 13 7.6 3.2 13 3.2Z"
                stroke="currentColor"
                strokeOpacity="0.2"
                strokeWidth="1.6"
              />
              <path
                d="M5.2 10.2c2.8-2.6 7.5-4.1 12.4-3.3 4.9.8 7.9 3.6 7.2 6.4-.7 2.8-4.9 4.4-9.8 3.6-4.9-.8-9-3.7-9.8-6.7Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <circle cx="13" cy="13" r="1.8" fill="currentColor" />
            </svg>
          </span>

          <span className="text-xl leading-none">{brand}</span>
        </Link>

        <div className="flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl px-2 py-2 text-lg font-medium transition
              text-black/80 hover:text-black hover:bg-black/5
              dark:text-white/85 dark:hover:text-white dark:hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}


          
        <ThemeToggle /> {/* ← adiciona aqui */}
        </div>
      </nav>
    </header>
  );
}