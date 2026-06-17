"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import PCMKeycapLogo from "./PCMKeycapLogo";
import ResumeWithLang from "./ResumeWithLang";

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

type SocialKeyProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
  dark: boolean;
};

function SocialKey({ href, label, icon, dark }: SocialKeyProps) {
  const [hovered, setHovered] = useState(false);
  const [down, setDown] = useState(false);

  const ink = dark ? "#f4f2ec" : "#18181b";
  const paper = dark ? "#16171b" : "#ffffff";

  const dx = 4, dy = 5, bw = 2, r = 12;
  const pressX = down ? dx : hovered ? dx * 0.55 : 0;
  const pressY = down ? dy : hovered ? dy * 0.55 : 0;
  const duration = down ? "0.05s" : "0.13s";

  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setDown(false); }}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        width: 44,
        height: 44,
        marginRight: dx,
        marginBottom: dy,
        textDecoration: "none",
        outline: "none",
        flexShrink: 0,
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
          width: "100%",
          height: "100%",
          border: `${bw}px solid ${ink}`,
          borderRadius: r,
          backgroundColor: paper,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translate(${pressX}px, ${pressY}px)`,
          transition: `transform ${duration} cubic-bezier(0.3, 0.7, 0.4, 1)`,
          willChange: "transform",
          color: ink,
          fontSize: 20,
        }}
      >
        {icon}
      </span>
    </a>
  );
}

export default function Footer() {
  const dark = useDarkMode();
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const muted = dark ? "rgba(244,242,236,0.45)" : "rgba(24,24,27,0.45)";
  const ink = dark ? "#f4f2ec" : "#18181b";

  const SOCIALS: SocialKeyProps[] = [
    {
      href: "https://github.com/Pedro-Consales",
      label: "GitHub",
      icon: <FaGithub />,
      dark,
    },
    {
      href: "https://www.linkedin.com/in/pedro-consales-922b3b325/",
      label: "LinkedIn",
      icon: <FaLinkedin />,
      dark,
    },
    {
      href: "mailto:pedromarg@outlook.com",
      label: "Email",
      icon: <FaEnvelope />,
      dark,
    },
  ];

  return (
    <footer
      style={{
        borderTop: `1px solid ${border}`,
        fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      }}
      className="bg-white dark:bg-black"
    >
      {/* main row */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 24px 32px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        {/* left — logo + name + role */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <PCMKeycapLogo width={84} height={32} fontPx={19} dx={3} dy={4} bw={2} r={9} />
          <div style={{ paddingTop: 2 }}>
            <p
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: 17,
                letterSpacing: "-0.02em",
                color: ink,
                lineHeight: 1.2,
              }}
            >
              Pedro Consales Margaronis
            </p>
            <p
              style={{
                margin: "4px 0 0",
                fontWeight: 500,
                fontSize: 13,
                color: muted,
                letterSpacing: "0.01em",
              }}
            >
              Full Stack Software Engineer
            </p>
          </div>
        </div>

        {/* right — social keycap icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, paddingTop: 2 }}>
          {SOCIALS.map((s) => (
            <SocialKey key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* divider */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div style={{ height: 1, backgroundColor: border }} />
      </div>

      {/* resume button — mobile only (header hides it on small screens) */}
      <div
        className="flex md:hidden"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "20px 24px 0",
        }}
      >
        <ResumeWithLang />
      </div>

      {/* copyright row */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px 24px 24px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: muted,
            fontWeight: 500,
          }}
        >
          Copyright © {new Date().getFullYear()} Pedro Consales Margaronis
        </p>
      </div>
    </footer>
  );
}
