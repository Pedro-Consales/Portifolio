"use client";

import { useState, useEffect } from "react";

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

type WordmarkKeyProps = {
  width?: number;
  height?: number;
  dx?: number;
  dy?: number;
  bw?: number;
  r?: number;
  fontPx?: number;
  dark?: boolean;
  /** Force the pressed-down state from code (used by the intro animation). */
  pressed?: boolean;
};

function WordmarkKey({
  width = 112,
  height = 42,
  dx = 4,
  dy = 4,
  bw = 2,
  r = 11,
  fontPx = 26,
  dark = false,
  pressed = false,
}: WordmarkKeyProps) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const ink = dark ? "#f4f2ec" : "#18181b";
  const paper = dark ? "#16171b" : "#ffffff";

  const down = active || pressed;
  const pressX = down ? dx : hovered ? dx * 0.55 : 0;
  const pressY = down ? dy : hovered ? dy * 0.55 : 0;
  const duration = down ? "0.06s" : "0.13s";

  return (
    <div
      style={{ position: "relative", width: width + dx, height: height + dy, flexShrink: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      aria-hidden="true"
    >
      {/* extrude / depth layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height,
          border: `${bw}px solid ${ink}`,
          borderRadius: r,
          transform: `translate(${dx}px, ${dy}px)`,
          backgroundColor: ink,
        }}
      />
      {/* face layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height,
          border: `${bw}px solid ${ink}`,
          borderRadius: r,
          backgroundColor: paper,
          display: "flex",
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
            fontSize: fontPx,
            fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
            lineHeight: 1,
            letterSpacing: "0.04em",
            color: ink,
            transform: "translateY(-0.02em)",
            userSelect: "none",
            display: "block",
          }}
        >
          PCM
        </span>
      </div>
    </div>
  );
}

type PCMKeycapLogoProps = Omit<WordmarkKeyProps, "dark">;

export default function PCMKeycapLogo(props: PCMKeycapLogoProps) {
  const dark = useDarkMode();
  return <WordmarkKey dark={dark} {...props} />;
}
