"use client";

import {
  FaCode,
  FaGithub,
  FaTerminal,
  FaCamera,
  FaArrowUpRightFromSquare,
  FaDatabase,
  FaBuildingColumns,
  FaGraduationCap
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
  SiNextdotjs,
  SiTypescript,
  SiSupabase,
  SiSqlite,
  SiTypeorm,
  SiMercadopago,
  SiOpenai,
  SiGooglecloud,
} from "react-icons/si";

import { FaCloud } from "react-icons/fa6";

import Image from "next/image";
import Link from "next/link";
import { useLanguage, type Lang } from "../i18n/LanguageProvider";

const COPY: Record<Lang, {
  heading: string;
  noImage: string;
  liveDemo: string;
  confidential: string;
  public: string;
}> = {
  en: {
    heading: "Projects",
    noImage: "No image",
    liveDemo: "Live Demo",
    confidential: "Source Code is Confidential",
    public: "Source Code is Public",
  },
  pt: {
    heading: "Projetos",
    noImage: "Sem imagem",
    liveDemo: "Ver Demo",
    confidential: "Código-fonte Confidencial",
    public: "Código-fonte Público",
  },
};

type Tech = {
  name: string;
  icon: React.ReactNode;
};

type TechGroup = {
  label: string;
  tech: Tech[];
};

export interface Project {
  logo?: string;
  title: Record<Lang, string>;
  github_link?: string;
  demo_link?: string;
  description: Record<Lang, string>;
  tech?: Tech[];
  techGroups?: TechGroup[];
  status: string;
  security: string;
}

function TechChip({ tech }: { tech: Tech }) {
  return (
    <span
      className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#CBD5E0] bg-[#FFFFFF] text-[12px] text-slate-300 dark:border-[#267799] dark:bg-[#162024]"
    >
      <span className="text-[#6B8BA4] dark:text-sky-400">{tech.icon}</span>
      <p className="text-[#374151] dark:text-slate-100">{tech.name}</p>
    </span>
  );
}

function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const t = COPY[lang];
  const title = project.title[lang];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#EAF0F6] dark:bg-[#1f1f1f]">
      {project.logo ? (
        <div className="relative w-full h-96 bg-white/5">
          <Image
            src={project.logo}
            alt={`${title} logo`}
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
            <span className="text-sm">{t.noImage}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 p-6">

        <h2 className="text-xl font-semibold text-[#1A2233] dark:text-slate-100">{title}</h2>

        {project.techGroups ? (
          <div className="flex flex-col gap-3">
            {project.techGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-[#1A2233] dark:text-slate-100">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.tech.map((tech) => (
                    <TechChip key={tech.name} tech={tech} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {project.tech?.map((tech) => (
              <TechChip key={tech.name} tech={tech} />
            ))}
          </div>
        )}

        <p className="mt-2 text-[#1A2233] dark:text-slate-100">{project.description[lang]}</p>

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
                <span>{t.liveDemo}</span>
              </span>
            </Link>
          )}
        </div>

        {project.security === "confidential" ? (
          <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-800 font-semibold dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-200">
            <span className="h-2 w-2 rounded-full bg-amber-400 dark:bg-yellow-400" />
            <span>{t.confidential}</span>
          </span>
        ) : (
          <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 font-semibold dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>{t.public}</span>
          </span>
        )}

      </div>
    </div>
  );
}

export default function Projects() {
  const { lang } = useLanguage();

  const projectlist: Project[] = [
    {
      logo: "/dropai-fundo_azul-v.png",
      title: { en: "dropaí - Surf Contest Management", pt: "dropaí - Gestão de Campeonatos de Surf" },
      github_link: "https://github.com/dropaiorg",
      tech: [
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "React", icon: <SiReact /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "TypeORM", icon: <SiTypeorm /> },
        { name: "PostgreSQL", icon: <SiPostgresql /> },
        { name: "Supabase", icon: <SiSupabase /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
        { name: "Mercado Pago", icon: <SiMercadopago /> },
        { name: "OpenAI", icon: <SiOpenai /> },
        { name: "Google Cloud", icon: <SiGooglecloud /> },
      ],
      description: {
        en: "Together with a team, I am constantly evolving a surf championship management platform that helps surf associations run their competitions. Our purpose is to make professional competition management accessible to everyone: a platform built around great usability that anyone can operate without being an expert, replacing paper, spreadsheets and multiple decentralized means of organization with one centralized place for organizers, judges and athletes. It started as two separate apps, a Next.js site and a Django app with server-side rendering, and we migrated everything into a single full-stack Next.js + TypeScript codebase with TypeORM on PostgreSQL. It models complex competition rules such as heat structures, brackets, scoring and rankings, and covers the whole event: athlete registration with Mercado Pago payments and refunds, judge invitations, live heat judging, OBS broadcast overlays and PDF reports. It also features SWELL (Speech Writing Evaluation for Live Leaderboards), a unique feature that only we have, a pioneering idea in the surf world that did not exist before us: judges simply speak a score and speech-to-text records it on the athlete's wave. As this is a confidential project, the source code is not available, but you can see the organization on GitHub.",
        pt: "Junto com uma equipe, evoluo constantemente uma plataforma de gestão de campeonatos de surf que ajuda associações de surf a organizar suas competições. Nosso propósito é tornar a gestão profissional de competições acessível a todos: uma plataforma construída em torno de uma ótima usabilidade, que qualquer pessoa consegue operar sem ser especialista, substituindo papel, planilhas e múltiplos meios descentralizados de organização por um único lugar centralizado para organizadores, juízes e atletas. Começou como dois apps separados, um site em Next.js e um app Django com renderização no servidor, e migramos tudo para uma única base full-stack em Next.js + TypeScript com TypeORM sobre PostgreSQL. A plataforma modela regras complexas de competição, como estrutura de baterias, chaveamentos, pontuação e rankings, e cobre o evento inteiro: inscrição de atletas com pagamentos e reembolsos via Mercado Pago, convites para juízes, julgamento de baterias ao vivo, overlays de transmissão para OBS e relatórios em PDF. Também conta com o SWELL (Speech Writing Evaluation for Live Leaderboards), uma funcionalidade única que só nós temos, uma ideia pioneira no mundo do surf que não existia antes de nós: o juiz simplesmente fala a nota e o speech-to-text a registra na onda do atleta. Por ser um projeto confidencial, o código-fonte não está disponível, mas você pode ver a organização no GitHub.",
      },
      status: "in-progress",
      security: "confidential",
    },
    {
      logo: "/bee-logo-v.png",
      title: { en: "Bee (Busca Especializada por Expertise/Expertise Specialized Search)", pt: "Bee (Busca Especializada por Expertise/Expertise Specialized Search)" },
      tech: [
        { name: "Django", icon: <SiDjango /> },
        { name: "Python", icon: <SiPython /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "Bootstrap", icon: <SiBootstrap /> },
        { name: "HTML", icon: <SiHtml5 /> },
        { name: "PostgreSQL", icon: <SiPostgresql /> },
        { name: "SQLite", icon: <SiSqlite /> },
        { name: "Banco de Dados Vetorial", icon: <FaDatabase /> },
        { name: "CNPq", icon: <FaBuildingColumns /> },
        { name: "Lattes", icon: <FaGraduationCap /> },
      ],
      description: {
        en: "A project I started during my first internship that was later selected by Petrobras to evolve into a real-world application. It enables semantic search over a database with 8.9M+ Brazilian researchers, matching them by academic and professional background using embeddings for information retrieval (Semantic Search). The first version is complete, and I'm now redesigning it to be more scalable and maintainable with improved data and search pipelines. Planned as an open-source project;",
        pt: "Um projeto que comecei no meu primeiro estágio e que depois foi selecionado pela Petrobras para evoluir para uma aplicação real. Ele permite busca semântica em uma base com mais de 8,9 milhões de pesquisadores brasileiros, conectando-os por formação acadêmica e profissional com embeddings para recuperação de informação (Busca Semântica). A primeira versão está concluída, e agora estou redesenhando o projeto para ser mais escalável e manutenível, com pipelines de dados e de busca aprimorados. Planejado como um projeto open source.",
      },
      status: "in-progress",
      security: "confidential",
    },
    {
        logo: "/Portifolio-prjct.jpeg",
        title: { en: "Portifolio", pt: "Portfólio" },
        github_link: "https://github.com/Pedro-Consales/Portifolio",
        tech: [
            { name: "Next.js", icon: <SiNextdotjs /> },    
            { name: "React", icon: <SiReact /> },           
            { name: "TypeScript", icon: <SiTypescript /> }, 
        ],
        description: {
          en: "My personal portfolio website showcasing my projects, skills, and experience as a Full-Stack Developer — built with Next.js, TypeScript, and Tailwind CSS.",
          pt: "Meu site de portfólio pessoal, que apresenta meus projetos, habilidades e experiência como Desenvolvedor Full-Stack, construído com Next.js, TypeScript e Tailwind CSS.",
        },
        status: "completed",
        security: "public",
      },
    {
      logo: "/lbs-compiler-reademe.jpeg",
      title: { en: "LBS---Compiler", pt: "LBS---Compiler" },
      github_link: "https://github.com/Pedro-Consales/LBS---Compiler",
      tech: [
        { name: "C", icon: <FaCode /> },
        { name: "Assembly", icon: <FaTerminal /> }
      ],
      description: {
        en: "This project began after a university class introduced LBS, a simplified low-level language with Assembly-like abstractions. I implemented a small compiler for LBS that translates sample .txt programs into executable output. Building it helped me understand how programs map to machine-level operations and strengthened fundamentals such as parsing, and core data structures.",
        pt: "Este projeto começou depois que uma disciplina da faculdade apresentou a LBS, uma linguagem de baixo nível simplificada com abstrações parecidas com Assembly. Implementei um pequeno compilador para LBS que traduz programas de exemplo em .txt para uma saída executável. Construí-lo me ajudou a entender como programas se traduzem em operações de máquina e fortaleceu fundamentos como parsing e estruturas de dados essenciais.",
      },
      status: "completed",
      security: "public",
    },
    {
      logo: "/isee-v-light.png",
      title: { en: "Isee - Partnership Status Dashboard", pt: "Isee - Painel de Status de Parcerias" },
      tech: [
        { name: "Django", icon: <SiDjango /> },
        { name: "Python", icon: <SiPython /> },
        { name: "React", icon: <SiReact /> },
        { name: "TypeScript", icon: <SiJavascript /> },
        { name: "PostgreSQL", icon: <SiPostgresql /> },
      ],
      description: {
        en: "An interactive analytics dashboard built to compare companies and support partner selection. It consolidates key performance indicators into clear charts and filters, enabling quick exploration of scenarios and data-driven decisions through a single, visual interface.",
        pt: "Um dashboard analítico interativo criado para comparar empresas e apoiar a seleção de parceiros. Ele consolida os principais indicadores de desempenho em gráficos e filtros claros, permitindo explorar cenários rapidamente e tomar decisões baseadas em dados por meio de uma interface única e visual.",
      },
      status: "completed",
      security: "confidential",
    },
    {
      logo: "/plin-v-light.png",
      title: { en: "Plin - Sector Portilofio Notificator", pt: "Plin - Notificador de Portfólio do Setor" },
      tech: [
        { name: "Django", icon: <SiDjango /> },
        { name: "Python", icon: <SiPython /> },
        { name: "React", icon: <SiReact /> },
        { name: "TypeScript", icon: <SiJavascript /> },
        { name: "PostgreSQL", icon: <SiPostgresql /> },
        { name: "MS SharePoint", icon: <FaCloud /> },
      ],
      description: {
        en: "An internal notification and monitoring tool that keeps teams aligned on portfolio updates (new guidelines, documents, and process changes) across departments. SharePoint publications, categorizes and routes alerts to the right stakeholders, and provides a centralized view of what changed and when—reducing missed communications and speeding up compliance and decision-making.",
        pt: "Uma ferramenta interna de notificação e monitoramento que mantém as equipes alinhadas sobre as atualizações do portfólio (novas diretrizes, documentos e mudanças de processo) entre departamentos. Ela acompanha as publicações do SharePoint, categoriza e direciona alertas para as pessoas certas, e oferece uma visão centralizada do que mudou e quando, reduzindo comunicações perdidas e acelerando o compliance e a tomada de decisão.",
      },
      status: "completed",
      security: "confidential",
    },
    {
      logo: "/roloi-v-light.png",
      title: { en: "Roloi - SmartWatch OS simulation", pt: "Roloi - Simulação de SO para Smartwatch" },
      demo_link: "https://mars-project-t5d8.onrender.com/",
      github_link: "https://github.com/Pedro-Consales/Mars_Project",
      tech: [
        { name: "Django", icon: <SiDjango /> },
        { name: "Python", icon: <SiPython /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
        { name: "HTML", icon: <SiHtml5 /> },
      ],
      description: {
        en: "A smartwatch OS simulation built for a fictional Mars colonization scenario. The interface displays 6-day weather forecasts and dust storm alerts pulled from NASA's InSight Mars Weather API, alongside astronaut vital monitoring. Built with Django and deployed on Render, it was a creative exercise in API integration, UI design, and thinking beyond conventional web applications. First django project, where i was learning how to use the framework",
        pt: "Uma simulação de sistema operacional de smartwatch criada para um cenário fictício de colonização de Marte. A interface mostra previsões do tempo de 6 dias e alertas de tempestades de poeira vindos da API InSight Mars Weather da NASA, junto com o monitoramento dos sinais vitais dos astronautas. Feito com Django e publicado no Render, foi um exercício criativo de integração de APIs, design de interface e de pensar além das aplicações web convencionais. Meu primeiro projeto em Django, onde eu estava aprendendo a usar o framework.",
      },
      status: "completed",
      security: "public",
    },
  ];

  return (
    <section id="projects">
      <main className="flex flex-col justify-center items-center py-20">
        <div className="font-bold text-6xl">
          <h4>{COPY[lang].heading}</h4>
        </div>

        {/* 
          Correção: adicionado px-4 para mobile não encostar nas bordas,
          e w-full garante que o grid ocupe toda a largura em telas pequenas.
          grid-cols-1 já estava correto, mas o px-6 original pode causar
          overflow em telas muito estreitas — px-4 é mais seguro.
        */}
        <div className="w-full max-w-6xl px-4 sm:px-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {projectlist.map((project) => (
            <ProjectCard key={project.title.en} project={project} lang={lang} />
          ))}

        </div>
      </main>
    </section>
  );
}