// components/sections/Timeline.tsx
"use client";

import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    type: "work",
    date: "Feb 2026 - Present",
    title: "Full-Stack Software Engineer",
    subtitle: "Instituto ECOA PUC-Rio · Internship",
    description: "    Delivery-phase internship program in partnership with Petrobras, turning Discovery/Ideation initiatives into production-ready corporate solutions. Leading end-to-end development—from data modeling and architectural decisions to final delivery",
  },
  {
    type: "work",
    date: "Apr 2025 - Feb 2026",
    title: "Software Developer & Researcher",
    subtitle: "Instituto ECOA PUC-Rio · Internship",
    description: "Internship program in partnership with Petrobras (aka: Ignição - Discovery), focused on building scalable MVPs for real business challenges (4 projects delivered).",
  },
  {
    type: "education",
    date: "2024 - Present (ETC: 2027.2)",
    title: "Computer Science",
    subtitle: "PUC-Rio · Rio de Janeiro, Brazil",
    description: "Strong university that gives a wide learning skills about almost every aspect in tecnology.",
  },
];

export default function Timeline() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  // estilos que mudam com o tema
  const cardStyle = isDark
    ? { background: "#1f2937", color: "#f9fafb", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }
    : { background: "#ffffff", color: "#111827", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" };

  const arrowStyle = (isWork: boolean) => ({
    borderRight: `7px solid ${isWork ? "#267799" : "#6b7280"}`,
  });

  const workIconStyle  = { background: "#267799", color: "#fff" };
  const eduIconStyle   = { background: "#6b7280", color: "#fff" };

  return (
    <section id="timeline" className="bg-white flex flex-col p-20 gap-25 items-start dark:bg-black">
        
        <h4 className="font-bold text-6xl">Experiences</h4>

        <div className="max-w-5xl mx-auto px-6">
       

            <VerticalTimeline lineColor={isDark ? "#374151" : "#e5e7eb"}>
            {experiences.map((item, i) => {
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