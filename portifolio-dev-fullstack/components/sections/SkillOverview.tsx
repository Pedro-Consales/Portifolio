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

// Card order matches the bento layout:
//   [Backend] [Database] [Frontend——]
//   [DevOps———————]      [Frontend——]
//   [DevOps———————] [Tools] [Languages]
const skillCards: BentoCardData[] = [
  {
    color: '#0d2d3b',
    label: 'Server',
    title: 'Backend',
    description: 'Server-side logic, APIs and scalable architectures.',
    icon: <FaServer size={15} />,
    skills: [
      { name: 'Django',    icon: <SiDjango size={11} /> },
      { name: 'Python',    icon: <SiPython size={11} /> },
      { name: 'Node.js',   icon: <SiNodedotjs size={11} /> },
      { name: 'REST APIs', icon: <FaServer size={11} /> },
      { name: 'ORMs',      icon: <FaDatabase size={11} /> },
    ],
  },
  {
    color: '#0d2d3b',
    label: 'Storage',
    title: 'Database',
    description: 'Efficient data storage and management solutions.',
    icon: <FaDatabase size={15} />,
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql size={11} /> },
      { name: 'MySQL',      icon: <SiMysql size={11} /> },
      { name: 'Supabase',   icon: <SiSupabase size={11} /> },
      { name: 'Firebase',   icon: <SiFirebase size={11} /> },
    ],
  },
  {
    color: '#0a2535',
    label: 'UI / Web',
    title: 'Frontend',
    description: 'Building responsive and dynamic user interfaces.',
    icon: <FaReact size={15} />,
    skills: [
      { name: 'React',        icon: <FaReactIcon size={11} /> },
      { name: 'Next.js',      icon: <SiNextdotjs size={11} /> },
      { name: 'JavaScript',   icon: <SiJavascript size={11} /> },
      { name: 'TypeScript',   icon: <SiTypescript size={11} /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss size={11} /> },
      { name: 'HTML5',        icon: <SiHtml5 size={11} /> },
      { name: 'CSS3',         icon: <FaCss3 size={11} /> },
    ],
  },
  {
    color: '#0a2535',
    label: 'Infra',
    title: 'DevOps',
    description: 'Version control, CI/CD, deployment and cloud infrastructure.',
    icon: <FaGitAlt size={15} />,
    skills: [
      { name: 'Git',          icon: <SiGit size={11} /> },
      { name: 'GitHub',       icon: <SiGithub size={11} /> },
      { name: 'GitKraken',    icon: <SiGitkraken size={11} /> },
      { name: 'Vercel',       icon: <SiVercel size={11} /> },
      { name: 'Render',       icon: <SiRender size={11} /> },
      { name: 'Docker',       icon: <SiDocker size={11} /> },
      { name: 'Google Cloud', icon: <SiGooglecloud size={11} /> },
    ],
  },
  {
    color: '#0d2d3b',
    label: 'Daily',
    title: 'Tools',
    description: 'Design, coding and productivity tools I use every day.',
    icon: <FaTools size={15} />,
    skills: [
      { name: 'Figma',   icon: <SiFigma size={11} /> },
      { name: 'VS Code', icon: <VscVscode size={11} /> },
      { name: 'Notion',  icon: <SiNotion size={11} /> },
    ],
  },
  {
    color: '#0d2d3b',
    label: 'Code',
    title: 'Languages',
    description: 'Programming languages I\'m fluent in.',
    icon: <FaCode size={15} />,
    skills: [
      { name: 'Python',     icon: <SiPython size={11} /> },
      { name: 'JavaScript', icon: <SiJavascript size={11} /> },
      { name: 'TypeScript', icon: <SiTypescript size={11} /> },
      { name: 'Java',       icon: <DiJava size={14} /> },
      { name: 'C',          icon: <FaCode size={11} /> },
      { name: 'C#',         icon: <DiDotnet size={11} /> },
    ],
  },
];

export default function SkillOverview() {
  return (
    <section id="skill-overview" className="w-full px-6 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-24">
      <main className="flex flex-col justify-center items-center gap-10 sm:gap-14 lg:gap-16">

        <div className="flex flex-col justify-center items-center gap-2 text-center max-w-3xl">
          <h4 className="font-bold text-4xl sm:text-5xl lg:text-6xl">
            <span className="text-[#267799] font-bold">Skill</span>{" "}Overview
          </h4>
          <p className="text-[#4A5568] dark:text-slate-300 text-sm sm:text-base">
            Technologies, tools, and foundations I work with on a daily basis
          </p>
        </div>

        <MagicBento
          cards={skillCards}
          glowColor="38, 119, 153"
          enableStars
          enableSpotlight
          enableBorderGlow
          clickEffect
          enableMagnetism
          particleCount={10}
          spotlightRadius={320}
        />

      </main>
    </section>
  );
}
