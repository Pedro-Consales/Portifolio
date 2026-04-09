"use client";

import {
  FaCode,
  FaGithub,
  FaTerminal,
  FaCamera,
  FaArrowUpRightFromSquare
} from "react-icons/fa6";

import {
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiPostgresql,
  SiDjango,
  SiPython,
  SiBootstrap,
  SiReact,
} from "react-icons/si";

import { FaCloud } from "react-icons/fa6";

import Image from "next/image";
import Link from "next/link";

type Tech = {
  name: string;
  icon: React.ReactNode;
};

export interface Project {
  logo?: string;
  title: string;
  github_link?: string;
  demo_link?: string;
  description: string;
  tech: Tech[];
  status: string;
  security: string;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="w-full h-full overflow-hidden rounded-2xl border border-white/10 bg-[#EAF0F6] dark:bg-[#1f1f1f]">
      {project.logo ? (
        <div className="relative w-full h-96 bg-white/5">
          <Image
            src={project.logo}
            alt={`${project.title} logo`}
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>
      ) : (
        <div className="w-full h-96 bg-white/5 grid place-items-center">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <FaCamera className="text-4xl" />
            <span className="text-sm">No image</span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 p-6">

        <h2 className="text-xl font-semibold text-[#1A2233] dark:text-slate-100">{project.title}</h2>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech.name}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#CBD5E0] bg-[#FFFFFF] text-[12px] text-slate-300 dark:border-[#267799] dark:bg-[#162024]"
            >
              <span className="text-[#6B8BA4] dark:text-sky-400">{tech.icon}</span>
              <p className="text-[#374151] dark:text-slate-100">{tech.name}</p>
            </span>
          ))}
        </div>

        <p className="mt-2 text-[#1A2233] dark:text-slate-100">{project.description}</p>

        <div className="flex flex-col gap-2">
          {project.github_link && (
            <Link href={project.github_link} target="_blank">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#CBD5E0] bg-[#FFFFFF] text-slate-300 font-semibold dark:border-[#267799] dark:bg-[#162024]">
                <span className="text-[#1A2233] dark:text-sky-400">
                  <FaGithub />
                </span>
                <span className="text-[#1A2233] dark:text-sky-400">GitHub</span>
              </span>
            </Link>
          )}

          {project.demo_link && (
            <Link href={project.demo_link} target="_blank">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold
                bg-[#7EC2D6] text-white border border-[#6db6cc]
                dark:bg-[#00D4FF] dark:text-[#0a0a0a] dark:border-[#00D4FF]
                hover:bg-[#6db6cc] dark:hover:bg-[#00bfe8] transition">
                <FaArrowUpRightFromSquare className="text-sm" />
                <span>Live Demo</span>
              </span>
            </Link>
          )}
        </div>

        {project.security === "confidential" ? (
          <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-800 font-semibold dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-200">
            <span className="h-2 w-2 rounded-full bg-amber-400 dark:bg-yellow-400" />
            <span>Source Code is Confidential</span>
          </span>
        ) : (
          <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 font-semibold dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>Source Code is Public</span>
          </span>
        )}

      </div>
    </div>
  );
}

export default function Projects() {

  const projectlist: Project[] = [
    {
      logo: "/dropai-fundo_azul-v.png",
      title: "dropaí - Surf Contest Management",
      github_link: "https://github.com/dropaiorg",
      tech: [
        { name: "Django", icon: <SiDjango /> },
        { name: "Python", icon: <SiPython /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
        { name: "HTML", icon: <SiHtml5 /> },
        { name: "PostgreSQL", icon: <SiPostgresql /> }
      ],
      description: "I am developing, together with a team, a surf championship management platform to support surf associations in organizing their competitions. It includes modeling of complex rules such as heat structures and brackets, rankings, scoring, and athlete progression. The goal is to optimize processes that are still manual through a practical and centralized solution with structured competition rules. As this is a confidential project, source code is not avaliable, you can see the organization at GitHub",
      status: "in-progress",
      security: "confidential",
    },
    {
      logo: "/bee-logo-v.png",
      title: "Bee (Busca Especializada por Expertise/Expertise Specialized Search)",
      tech: [
        { name: "Django", icon: <SiDjango /> },
        { name: "Python", icon: <SiPython /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "Bootstrap", icon: <SiBootstrap /> },
        { name: "HTML", icon: <SiHtml5 /> },
        { name: "PostgreSQL", icon: <SiPostgresql /> },
      ],
      description: "A project I started during my first internship that was later selected by Petrobras to evolve into a real-world application. It enables semantic search over a database with 8.9M+ Brazilian researchers, matching them by academic and professional background using embeddings for information retrieval (Semantic Search). The first version is complete, and I'm now redesigning it to be more scalable and maintainable with improved data and search pipelines. Planned as an open-source project;",
      status: "in-progress",
      security: "confidential",
    },
    {
      logo: "/lbs-compiler-reademe.jpeg",
      title: "LBS---Compiler",
      github_link: "https://github.com/Pedro-Consales/LBS---Compiler",
      tech: [
        { name: "C", icon: <FaCode /> },
        { name: "Assembly", icon: <FaTerminal /> }
      ],
      description: "This project began after a university class introduced LBS, a simplified low-level language with Assembly-like abstractions. I implemented a small compiler for LBS that translates sample .txt programs into executable output. Building it helped me understand how programs map to machine-level operations and strengthened fundamentals such as parsing, and core data structures.",
      status: "completed",
      security: "public",
    },
    {
      logo: "/isee-v-light.png",
      title: "Isee - Partnership Status Dashboard",
      tech: [
        { name: "Django", icon: <SiDjango /> },
        { name: "Python", icon: <SiPython /> },
        { name: "React", icon: <SiReact /> },
        { name: "TypeScript", icon: <SiJavascript /> },
        { name: "PostgreSQL", icon: <SiPostgresql /> },
      ],
      description: "An interactive analytics dashboard built to compare companies and support partner selection. It consolidates key performance indicators into clear charts and filters, enabling quick exploration of scenarios and data-driven decisions through a single, visual interface.",
      status: "completed",
      security: "confidential",
    },
    {
      logo: "/plin-v-light.png",
      title: "Plin - Sector Portilofio Notificator",
      tech: [
        { name: "Django", icon: <SiDjango /> },
        { name: "Python", icon: <SiPython /> },
        { name: "React", icon: <SiReact /> },
        { name: "TypeScript", icon: <SiJavascript /> },
        { name: "PostgreSQL", icon: <SiPostgresql /> },
        { name: "MS SharePoint", icon: <FaCloud /> },
      ],
      description: "An internal notification and monitoring tool that keeps teams aligned on portfolio updates (new guidelines, documents, and process changes) across departments. SharePoint publications, categorizes and routes alerts to the right stakeholders, and provides a centralized view of what changed and when—reducing missed communications and speeding up compliance and decision-making.",
      status: "completed",
      security: "confidential",
    },
    {
      logo: "/roloi-v-light.png",
      title: "Roloi - SmartWatch OS simulation",
      demo_link: "https://mars-project-t5d8.onrender.com/",
      github_link: "https://github.com/Pedro-Consales/Mars_Project",
      tech: [
        { name: "Django", icon: <SiDjango /> },
        { name: "Python", icon: <SiPython /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
        { name: "HTML", icon: <SiHtml5 /> },
      ],
      description: "A smartwatch OS simulation built for a fictional Mars colonization scenario. The interface displays 6-day weather forecasts and dust storm alerts pulled from NASA's InSight Mars Weather API, alongside astronaut vital monitoring. Built with Django and deployed on Render, it was a creative exercise in API integration, UI design, and thinking beyond conventional web applications. First django project, where i was learning how to use the framework",
      status: "completed",
      security: "public",
    },
  ];

  return (
    <section id="projects">
      <main className="flex flex-col justify-center items-center py-20">
        <div className="font-bold text-6xl">
          <h4>Projects</h4>
        </div>

        {/* 
          Correção: adicionado px-4 para mobile não encostar nas bordas,
          e w-full garante que o grid ocupe toda a largura em telas pequenas.
          grid-cols-1 já estava correto, mas o px-6 original pode causar
          overflow em telas muito estreitas — px-4 é mais seguro.
        */}
        <div className="w-full max-w-6xl px-4 sm:px-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch auto-rows-fr">

          {projectlist.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}

        </div>
      </main>
    </section>
  );
}