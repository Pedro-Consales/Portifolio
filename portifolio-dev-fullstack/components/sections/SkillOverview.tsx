"use client";

import React from "react";
import {
  FaReact,
  FaDatabase,
  FaTools,
  FaCode,
  FaServer,
  FaGitAlt,
  FaCss3
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiFirebase,
  SiFigma,
  SiNotion,
  SiDjango,
  SiPython,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiVercel,
  SiRender,
  SiDocker,
  SiGooglecloud,
  SiGitkraken,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { DiJava, DiDotnet } from "react-icons/di";
import { FaReact as FaReactIcon } from "react-icons/fa";

import MagicBento, { BentoCardData } from "../react-bits/MagicBento/MagicBento";
import { useLanguage, type Lang } from "../i18n/LanguageProvider";

const skillCards: Omit<BentoCardData, "description">[] = [
  {
    title: "Frontend",
    icon: <FaReact size={18} />,
    skills: [
      { name: "React",        icon: <FaReactIcon size={12} /> },
      { name: "Next.js",      icon: <SiNextdotjs size={12} /> },
      { name: "JavaScript",   icon: <SiJavascript size={12} /> },
      { name: "TypeScript",   icon: <SiTypescript size={12} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={12} /> },
      { name: "HTML5",        icon: <SiHtml5 size={12} /> },
      { name: "CSS3",         icon: <FaCss3 size={12} /> },
    ],
  },
  {
    title: "Backend",
    icon: <FaServer size={18} />,
    skills: [
      { name: "Django",    icon: <SiDjango size={12} /> },
      { name: "Python",    icon: <SiPython size={12} /> },
      { name: "Node.js",   icon: <SiNodedotjs size={12} /> },
      { name: "REST APIs", icon: <FaServer size={12} /> },
      { name: "ORMs",      icon: <FaDatabase size={12} /> },
    ],
  },
  {
    title: "Database",
    icon: <FaDatabase size={18} />,
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql size={12} /> },
      { name: "MySQL",      icon: <SiMysql size={12} /> },
      { name: "Supabase",   icon: <SiSupabase size={12} /> },
      { name: "Firebase",   icon: <SiFirebase size={12} /> },
    ],
  },
  {
    title: "DevOps",
    icon: <FaGitAlt size={18} />,
    skills: [
      { name: "Git",          icon: <SiGit size={12} /> },
      { name: "GitHub",       icon: <SiGithub size={12} /> },
      { name: "GitKraken",    icon: <SiGitkraken size={12} /> },
      { name: "Vercel",       icon: <SiVercel size={12} /> },
      { name: "Render",       icon: <SiRender size={12} /> },
      { name: "Docker",       icon: <SiDocker size={12} /> },
      { name: "Google Cloud", icon: <SiGooglecloud size={12} /> },
    ],
  },
  {
    title: "Tools",
    icon: <FaTools size={18} />,
    skills: [
      { name: "Figma",   icon: <SiFigma size={12} /> },
      { name: "VS Code", icon: <VscVscode size={12} /> },
      { name: "Notion",  icon: <SiNotion size={12} /> },
    ],
  },
  {
    title: "Languages",
    icon: <FaCode size={18} />,
    skills: [
      { name: "Python",     icon: <SiPython size={12} /> },
      { name: "JavaScript", icon: <SiJavascript size={12} /> },
      { name: "TypeScript", icon: <SiTypescript size={12} /> },
      { name: "Java",       icon: <DiJava size={20} /> },
      { name: "C",          icon: <FaCode size={12} /> },
      { name: "C#",         icon: <DiDotnet size={12} /> },
    ],
  },
];

// Títulos e descrições dos cards por idioma, na mesma ordem de `skillCards`.
const COPY: Record<Lang, {
  heading: React.ReactNode;
  subtitle: string;
  cards: { title: string; description: string }[];
}> = {
  en: {
    heading: <><span className="text-[#267799] font-bold">Skill</span>{" "}Overview</>,
    subtitle: "Technologies, tools, and foundations I work with on a daily basis",
    cards: [
      { title: "Frontend", description: "Building responsive and dynamic user interfaces." },
      { title: "Backend", description: "Server-side logic, APIs and scalable architectures." },
      { title: "Database", description: "Managing and designing efficient data storage solutions." },
      { title: "DevOps", description: "Version control, CI/CD, deployment and cloud infrastructure." },
      { title: "Tools", description: "Design, coding and productivity tools used daily." },
      { title: "Languages", description: "Programming languages I'm fluent in." },
    ],
  },
  pt: {
    heading: <>Visão geral das{" "}<span className="text-[#267799] font-bold">Skills</span></>,
    subtitle: "Tecnologias, ferramentas e fundamentos com que trabalho no dia a dia",
    cards: [
      { title: "Frontend", description: "Construção de interfaces responsivas e dinâmicas." },
      { title: "Backend", description: "Lógica de servidor, APIs e arquiteturas escaláveis." },
      { title: "Banco de Dados", description: "Modelagem e gestão de soluções eficientes de armazenamento de dados." },
      { title: "DevOps", description: "Controle de versão, CI/CD, deploy e infraestrutura em nuvem." },
      { title: "Ferramentas", description: "Ferramentas de design, código e produtividade que uso diariamente." },
      { title: "Linguagens", description: "Linguagens de programação que domino." },
    ],
  },
};

export default function SkillOverview() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const cards: BentoCardData[] = skillCards.map((card, i) => ({ ...card, ...t.cards[i] }));

  return (
    <section id="skill-overview" className="w-full px-6 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-24">
      <main className="flex flex-col justify-center items-center gap-10 sm:gap-14 lg:gap-20">

        <div className="flex flex-col justify-center items-center gap-2 text-center max-w-3xl">
          <h4 className="font-bold text-4xl sm:text-5xl lg:text-6xl">
            {t.heading}
          </h4>
          <p className="text-[#4A5568] dark:text-slate-300 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        <MagicBento
          cards={cards}
          glowColor="38, 119, 153"
          enableSpotlight
          enableBorderGlow
          spotlightRadius={320}
        />

      </main>
    </section>
  );
}
