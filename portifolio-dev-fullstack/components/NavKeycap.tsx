"use client";

import { useEffect, useState } from "react";

// Detecta o tema lendo a classe `dark` no <html> (mesma abordagem do PCMKeycapLogo).
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

// Azul do sistema de keycaps (handoff PCM): borda do sublinhado da seção ativa.
const BLUE = "#3d88a6";

type NavKeycapProps = {
  label: string;
  /** Seção travada por clique: face totalmente afundada + sublinhado, imediato. */
  locked?: boolean;
  /** Seção atual via scroll: apenas o nível de hover (afundamento parcial). */
  present?: boolean;
  onClick?: () => void;
  h?: number;
  padX?: number;
  dx?: number;
  dy?: number;
  bw?: number;
  r?: number;
  fontPx?: number;
};

export default function NavKeycap({
  label,
  locked = false,
  present = false,
  onClick,
  h = 44,
  padX = 16,
  dx = 4,
  dy = 5,
  bw = 2,
  r = 12,
  fontPx = 16,
}: NavKeycapProps) {
  const dark = useDarkMode();
  const [hovered, setHovered] = useState(false);
  const [down, setDown] = useState(false);

  const ink = dark ? "#f4f2ec" : "#18181b";
  const paper = dark ? "#16171b" : "#ffffff";

  // Travado (clique) ou mouse pressionado = afundamento total.
  // Presente (scroll) ou hover = afundamento parcial.
  const full = locked || down;
  const partial = present || hovered;
  const pressX = full ? dx : partial ? dx * 0.55 : 0;
  const pressY = full ? dy : partial ? dy * 0.55 : 0;
  const duration = down || locked ? "0.06s" : "0.13s";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setDown(false);
      }}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      aria-current={locked || present ? "page" : undefined}
      style={{
        position: "relative",
        display: "inline-flex",
        height: h,
        marginRight: dx,
        marginBottom: dy,
        padding: 0,
        border: 0,
        background: "transparent",
        cursor: "pointer",
        outline: "none",
      }}
    >
      {/* extrude / camada de profundidade */}
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
          padding: `0 ${padX}px`,
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
            fontWeight: locked ? 700 : 600,
            fontSize: fontPx,
            fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
            lineHeight: 1,
            letterSpacing: "-0.01em",
            color: ink,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          {label}
        </span>
      </span>
      {/* sublinhado azul da seção travada por clique (face continua branca) */}
      {locked && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: -(dy + 2),
            width: "58%",
            height: 3,
            borderRadius: 3,
            background: BLUE,
          }}
        />
      )}
    </button>
  );
}
