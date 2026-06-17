"use client";

import { useEffect, useState } from "react";

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const update = () => setDark(document.documentElement.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return dark;
}

const BLUE = "#3d88a6";
const BLUE_LINE = "#2c6c87";
const BLUE_DEEP = "#24576e";

const RESUME_URLS = {
  en: "/CV_Pedro_Consales_EN-US(Jun2026).pdf",
  pt: "/CV_Pedro_Consales_PT-BR(Jun2026).pdf",
} as const;

type Lang = keyof typeof RESUME_URLS;

function LangKey({
  label,
  active,
  dark,
  onClick,
}: {
  label: string;
  active: boolean;
  dark: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [down, setDown] = useState(false);

  const ink = dark ? "#f4f2ec" : "#18181b";
  const paper = dark ? "#16171b" : "#ffffff";

  const dx = 2, dy = 3, bw = 2, r = 7;
  const full = active || down;
  const partial = hovered && !active;
  const pressX = full ? dx : partial ? dx * 0.55 : 0;
  const pressY = full ? dy : partial ? dy * 0.55 : 0;
  const duration = down || active ? "0.06s" : "0.13s";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setDown(false); }}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      aria-pressed={active}
      style={{
        position: "relative",
        display: "inline-flex",
        height: 26,
        marginRight: dx,
        marginBottom: dy,
        padding: 0,
        border: 0,
        background: "transparent",
        cursor: "pointer",
        outline: "none",
      }}
    >
      {/* depth */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          border: `${bw}px solid ${ink}`,
          borderRadius: r,
          transform: `translate(${dx}px, ${dy}px)`,
          backgroundColor: ink,
        }}
      />
      {/* face */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          padding: "0 8px",
          border: `${bw}px solid ${ink}`,
          borderRadius: r,
          backgroundColor: paper,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translate(${pressX}px, ${pressY}px)`,
          transition: `transform ${duration} cubic-bezier(0.3, 0.7, 0.4, 1)`,
          willChange: "transform",
        }}
      >
        <span
          style={{
            fontWeight: active ? 700 : 600,
            fontSize: 11,
            fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
            lineHeight: 1,
            letterSpacing: "0.02em",
            color: active ? BLUE : ink,
            userSelect: "none",
          }}
        >
          {label}
        </span>
      </span>
      {/* blue underline when active */}
      {active && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: -(dy + 2),
            width: "60%",
            height: 2,
            borderRadius: 2,
            background: BLUE,
          }}
        />
      )}
    </button>
  );
}

function ResumeKeycap({ href, dark }: { href: string; dark: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [down, setDown] = useState(false);

  void dark; // resolved theme handled by blue tokens (same in both modes)

  const dx = 3, dy = 4, bw = 2, r = 10;
  const pressX = down ? dx : hovered ? dx * 0.55 : 0;
  const pressY = down ? dy : hovered ? dy * 0.55 : 0;
  const duration = down ? "0.05s" : "0.13s";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setDown(false); }}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        height: 34,
        marginRight: dx,
        marginBottom: dy,
        textDecoration: "none",
        outline: "none",
        flexShrink: 0,
      }}
    >
      {/* depth — darkest blue */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          border: `${bw}px solid ${BLUE_DEEP}`,
          borderRadius: r,
          transform: `translate(${dx}px, ${dy}px)`,
          backgroundColor: BLUE_DEEP,
        }}
      />
      {/* face — blue fill, white text */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          padding: "0 14px",
          border: `${bw}px solid ${BLUE_LINE}`,
          borderRadius: r,
          backgroundColor: BLUE,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translate(${pressX}px, ${pressY}px)`,
          transition: `transform ${duration} cubic-bezier(0.3, 0.7, 0.4, 1)`,
          willChange: "transform",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 14,
            fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
            lineHeight: 1,
            letterSpacing: "-0.01em",
            color: "#ffffff",
            userSelect: "none",
          }}
        >
          Resume
        </span>
      </span>
    </a>
  );
}

export default function ResumeWithLang() {
  const dark = useDarkMode();
  const [lang, setLang] = useState<Lang>("en");

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {/* language toggle — EN | PT */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <LangKey label="EN" active={lang === "en"} dark={dark} onClick={() => setLang("en")} />
        <LangKey label="PT" active={lang === "pt"} dark={dark} onClick={() => setLang("pt")} />
      </div>

      {/* Resume keycap */}
      <ResumeKeycap href={RESUME_URLS[lang]} dark={dark} />
    </div>
  );
}
