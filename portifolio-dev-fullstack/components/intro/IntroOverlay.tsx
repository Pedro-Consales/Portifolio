"use client";

/**
 * IntroOverlay — "opening the app" splash that plays once per session.
 *
 * IMPORTANT: this renders a full-screen solid cover on the SERVER too (initial
 * phase = "cover"), so the very first paint is the cover — never a flash of the
 * real Hero before the animation. The play/skip decision happens in a layout
 * effect (before paint), so returning visitors get the cover removed with no
 * visible flicker. A <noscript> rule in the layout hides the cover when JS is
 * off, so the page is never permanently blocked.
 *
 * Sequence (~2s):
 *   1. PCM keycap pops in; a cursor flies in from the corner.
 *   2. Cursor reaches the keycap and clicks — the keycap presses down.
 *   3. A circular iris closes into the keycap, revealing the real Hero.
 *
 * Header coordination is via introStore (no event-timing races):
 *   playing → header tucks up (hidden behind cover) · revealed → header drops.
 *
 * Respects prefers-reduced-motion and only plays once per tab session.
 */

import { useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import PCMKeycapLogo from "../PCMKeycapLogo";
import { setIntroState } from "./introStore";

const SESSION_KEY = "pcm_intro_done";

// useLayoutEffect on the client (runs before paint → no flash), useEffect on
// the server (avoids the SSR warning since this component is server-rendered).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Phase = "cover" | "press" | "leave" | "reveal" | "done";

// Two single, continuous movements (no intermediate keyframes → not robotic):
// one ease-out tween IN from the corner to the keycap, then after the click a
// single ease-in tween OUT back to that exact same corner. Same point/params
// both ways. Driven by phase so each leg is one clean A→B tween.
const CURSOR_IN = 200; // corner offset X from center (start = end)
const CURSOR_DOWN = 150; // corner offset Y from center (start = end)
const CURSOR_KX = 10; // landing offset on the keycap
const CURSOR_KY = 14;

function Cursor({ dark, phase }: { dark: boolean; phase: Phase }) {
  const fill = dark ? "#ffffff" : "#18181b";
  const stroke = dark ? "#0d0f12" : "#ffffff";

  const leaving = phase === "leave" || phase === "reveal";
  const clicking = phase === "press";

  const target = leaving
    ? { x: CURSOR_IN, y: CURSOR_DOWN, opacity: 0, scale: 1 } // single move OUT
    : { x: CURSOR_KX, y: CURSOR_KY, opacity: 1, scale: clicking ? 0.82 : 1 }; // IN / hover / click

  const transition = leaving
    ? { duration: 0.5, ease: [0.45, 0, 0.55, 1] as [number, number, number, number] } // accelerate out
    : clicking
      ? { duration: 0.12, ease: "easeOut" as const } // snappy click squish
      : { duration: 0.7, delay: 0.15, ease: [0.16, 0.62, 0.23, 1] as [number, number, number, number] }; // glide in

  return (
    <motion.div
      initial={{ opacity: 0, x: CURSOR_IN, y: CURSOR_DOWN, scale: 1 }}
      animate={target}
      transition={transition}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        zIndex: 2,
        pointerEvents: "none",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
      }}
    >
      <svg width="34" height="40" viewBox="0 0 22 27" fill="none">
        <path
          d="M2 2 L2 21 L7 16 L10.5 24.5 L14 23 L10.5 14 L18 14 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

export default function IntroOverlay() {
  const { resolvedTheme } = useTheme();
  const [phase, setPhase] = useState<Phase>("cover");
  // Theme-dependent bits (glow, cursor colors) must NOT render during the
  // SSR/first-paint pass, or `resolvedTheme` (undefined on the server, resolved
  // on the client) produces a hydration mismatch. They join after mount — still
  // inside the cover, so it's visually seamless.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useIsoLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (reduced || seen) {
      setIntroState("skipped");
      setPhase("done"); // remove the cover before paint → no flicker
      return;
    }

    setIntroState("playing");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setPhase("press"), 1100); // cursor arrived → click
    const t2 = setTimeout(() => setPhase("leave"), 1450); // cursor glides back out
    const t3 = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setIntroState("revealed"); // header drops now
      setPhase("reveal");
    }, 2050); // cursor already gone → iris opens the Hero
    const t4 = setTimeout(() => setPhase("done"), 2900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (phase === "done") document.body.style.overflow = "";
  }, [phase]);

  if (phase === "done") return null;

  const dark = resolvedTheme === "dark";
  const glow = dark
    ? "radial-gradient(ellipse 60% 50% at 50% 46%, rgba(61,136,166,0.18) 0%, rgba(10,10,10,0) 70%)"
    : "radial-gradient(ellipse 60% 50% at 50% 46%, rgba(61,136,166,0.10) 0%, rgba(255,255,255,0) 70%)";
  const revealing = phase === "reveal";

  return (
    <motion.div
      id="pcm-intro-cover"
      aria-hidden="true"
      // bg via Tailwind so it's the correct theme color from the very first
      // paint (next-themes sets the .dark class before hydration).
      className="bg-white dark:bg-[#0a0a0a]"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        willChange: "clip-path",
      }}
      initial={{ clipPath: "circle(150% at 50% 50%)" }}
      animate={{ clipPath: revealing ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)" }}
      transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
    >
      {mounted && (
        <div style={{ position: "absolute", inset: 0, background: glow, pointerEvents: "none" }} />
      )}

      <motion.div
        initial={{ scale: 0.35, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <PCMKeycapLogo
          width={260}
          height={96}
          fontPx={56}
          dx={8}
          dy={10}
          bw={3.5}
          r={22}
          pressed={phase === "press" || phase === "leave" || phase === "reveal"}
        />
      </motion.div>

      {mounted && <Cursor dark={dark} phase={phase} />}
    </motion.div>
  );
}
