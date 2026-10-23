"use client";

import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { useLanguage, type Lang } from "../i18n/LanguageProvider";

type Experience = {
  type: "work" | "education";
  date: string;
  title: string;
  subtitle: string;
  description: string;
};

const COPY: Record<Lang, { title: string; experiences: Experience[] }> = {
  en: {
    title: "Experiences",
    experiences: [
      {
        type: "work",
        date: "Feb 2026 - Present",
        title: "Full-Stack Software Engineer",
        subtitle: "Instituto ECOA PUC-Rio · Internship",
        description:
          "Delivery-phase internship program in partnership with Petrobras, turning Discovery/Ideation initiatives into production-ready corporate solutions. Leading end-to-end development—from data modeling and architectural decisions to final delivery",
      },
      {
        type: "work",
        date: "Apr 2025 - Feb 2026",
        title: "Software Developer & Researcher",
        subtitle: "Instituto ECOA PUC-Rio · Internship",
        description:
          "Internship program in partnership with Petrobras (aka: Ignição - Discovery), focused on building scalable MVPs for real business challenges (4 projects delivered).",
      },
      {
        type: "education",
        date: "2024 - Present (ETC: 2027.2)",
        title: "Computer Science",
        subtitle: "PUC-Rio · Rio de Janeiro, Brazil",
        description: "Strong university that gives a wide learning skills about almost every aspect in tecnology.",
      },
    ],
  },
  pt: {
    title: "Experiências",
    experiences: [
      {
        type: "work",
        date: "Fev 2026 - Atual",
        title: "Engenheiro de Software Full-Stack",
        subtitle: "Instituto ECOA PUC-Rio · Estágio",
        description:
          "Programa de estágio da fase de Delivery em parceria com a Petrobras, transformando iniciativas de Discovery/Ideação em soluções corporativas prontas para produção. Lidero o desenvolvimento de ponta a ponta, da modelagem de dados e decisões de arquitetura até a entrega final.",
      },
      {
        type: "work",
        date: "Abr 2025 - Fev 2026",
        title: "Desenvolvedor de Software & Pesquisador",
        subtitle: "Instituto ECOA PUC-Rio · Estágio",
        description:
          "Programa de estágio em parceria com a Petrobras (Ignição - Discovery), focado em construir MVPs escaláveis para desafios reais de negócio (4 projetos entregues).",
      },
      {
        type: "education",
        date: "2024 - Atual (previsão: 2027.2)",
        title: "Ciência da Computação",
        subtitle: "PUC-Rio · Rio de Janeiro, Brasil",
        description: "Uma universidade forte, que oferece um aprendizado amplo sobre praticamente todos os aspectos da tecnologia.",
      },
    ],
  },
};

export default function Timeline() {
  const { resolvedTheme } = useTheme();
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const cardStyle = isDark
    ? { background: "#1f2937", color: "#f9fafb", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }
    : { background: "#ffffff", color: "#111827", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" };

  const arrowStyle = (isWork: boolean) => ({
    borderRight: `7px solid ${isWork ? "#267799" : "#6b7280"}`,
  });

  const workIconStyle = { background: "#267799", color: "#fff" };
  const eduIconStyle = { background: "#6b7280", color: "#fff" };

  return (
    <section
      id="timeline"
      className="bg-white dark:bg-black w-full px-6 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-24" // CHANGED: responsive padding
    >
      <div className="max-w-6xl mx-auto"> {/* CHANGED: constrain width */}
        <h4 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-10">{t.title}</h4> {/* CHANGED: responsive title + spacing */}

        <VerticalTimeline lineColor={isDark ? "#374151" : "#e5e7eb"}>
          {t.experiences.map((item, i) => {
            const isWork = item.type === "work";
            return (
              <VerticalTimelineElement
                key={i}
                date={item.date}
                contentStyle={cardStyle}
                contentArrowStyle={arrowStyle(isWork)}
                iconStyle={isWork ? workIconStyle : eduIconStyle}
                icon={isWork ? <Briefcase size={18} /> : <GraduationCap size={18} />}
              >
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <h4 className="text-sm font-medium opacity-60 mt-1">{item.subtitle}</h4>
                <p className="text-sm opacity-70 mt-2">{item.description}</p>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>
    </section>
  );
}