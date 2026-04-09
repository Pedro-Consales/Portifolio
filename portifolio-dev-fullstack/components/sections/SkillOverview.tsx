"use client";

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

type Skill = {
  name: string;
  icon: React.ReactNode;
};

type SkillCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  skills: Skill[];
};

function SkillCard({ icon, title, description, skills }: SkillCardProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#EAF0F6] dark:bg-[#1b4c61] p-5 sm:p-6 font-mono"> {/* CHANGED: responsive padding */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-sky-400/15 border border-[#829cb0] flex items-center justify-center text-[#7695ad] dark:text-sky-400">
          {icon}
        </div>
        <h3 className="text-[16px] sm:text-[17px] font-medium text-[#1A2233] dark:text-slate-100"> {/* CHANGED: responsive title */}
          {title}
        </h3>
      </div>

      <p className="text-[13px] text-[#4A5568] dark:text-[#7a9ab0] mb-4 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#CBD5E0] bg-[#FFFFFF] text-[12px] text-slate-600 dark:bg-[#162024] dark:border-[#267799]" // CHANGED: light text color was too faint
          >
            <span className="text-[#6B8BA4] dark:text-sky-400">{skill.icon}</span>
            <p className="text-[#374151] dark:text-slate-100">{skill.name}</p>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillOverview() {
  return (
    <section id="skill-overview" className="w-full px-6 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-24"> {/* CHANGED: responsive section padding */}
      <main className="flex flex-col justify-center items-center gap-10 sm:gap-14 lg:gap-20"> {/* CHANGED: responsive gaps */}
        <div className="flex flex-col justify-center items-center gap-2 text-center max-w-3xl"> {/* CHANGED: center + readable width */}
          <h4 className="font-bold text-4xl sm:text-5xl lg:text-6xl"> {/* CHANGED: responsive title */}
            <span className="text-[#267799] font-bold">Skill</span>{" "}Overview
          </h4>
          <p className="text-[#4A5568] dark:text-slate-300 text-sm sm:text-base"> {/* CHANGED: responsive subtitle */}
            Technologies, tools, and foundations I work with on a daily basis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full"> {/* CHANGED: 1 col on mobile */}
          <SkillCard
            icon={<FaReact size={18} />}
            title="Frontend"
            description="Building responsive and dynamic user interfaces."
            skills={[
              { name: "React", icon: <FaReactIcon size={12} /> },
              { name: "Next.js", icon: <SiNextdotjs size={12} /> },
              { name: "JavaScript", icon: <SiJavascript size={12} /> },
              { name: "TypeScript", icon: <SiTypescript size={12} /> },
              { name: "Tailwind CSS", icon: <SiTailwindcss size={12} /> },
              { name: "HTML5", icon: <SiHtml5 size={12} /> },
              { name: "CSS3", icon: <FaCss3 size={12} /> },
            ]}
          />

          <SkillCard
            icon={<FaServer size={18} />}
            title="Backend"
            description="Server-side logic, APIs and scalable architectures."
            skills={[
              { name: "Django", icon: <SiDjango size={12} /> },
              { name: "Python", icon: <SiPython size={12} /> },
              { name: "Node.js", icon: <SiNodedotjs size={12} /> },
              { name: "REST APIs", icon: <FaServer size={12} /> },
              { name: "ORMs", icon: <FaDatabase size={12} /> },
            ]}
          />

          <SkillCard
            icon={<FaDatabase size={18} />}
            title="Database"
            description="Managing and designing efficient data storage solutions."
            skills={[
              { name: "PostgreSQL", icon: <SiPostgresql size={12} /> },
              { name: "MySQL", icon: <SiMysql size={12} /> },
              { name: "Supabase", icon: <SiSupabase size={12} /> },
              { name: "Firebase", icon: <SiFirebase size={12} /> },
            ]}
          />

          <SkillCard
            icon={<FaGitAlt size={18} />}
            title="DevOps"
            description="Version control, CI/CD, deployment and cloud infrastructure."
            skills={[
              { name: "Git", icon: <SiGit size={12} /> },
              { name: "GitHub", icon: <SiGithub size={12} /> },
              { name: "GitKraken", icon: <SiGitkraken size={12} /> },
              { name: "Vercel", icon: <SiVercel size={12} /> },
              { name: "Render", icon: <SiRender size={12} /> },
              { name: "Docker", icon: <SiDocker size={12} /> },
              { name: "Google Cloud", icon: <SiGooglecloud size={12} /> },
            ]}
          />

          <SkillCard
            icon={<FaTools size={18} />}
            title="Tools"
            description="Design, coding and productivity tools used daily."
            skills={[
              { name: "Figma", icon: <SiFigma size={12} /> },
              { name: "VS Code", icon: <VscVscode size={12} /> },
              { name: "Notion", icon: <SiNotion size={12} /> },
            ]}
          />

          <SkillCard
            icon={<FaCode size={18} />}
            title="Languages"
            description="Programming languages I'm fluent in."
            skills={[
              { name: "Python", icon: <SiPython size={12} /> },
              { name: "JavaScript", icon: <SiJavascript size={12} /> },
              { name: "TypeScript", icon: <SiTypescript size={12} /> },
              { name: "Java", icon: <DiJava size={20} /> },
              { name: "C", icon: <FaCode size={12} /> },
              { name: "C#", icon: <DiDotnet size={12} /> },
            ]}
          />
        </div>
      </main>
    </section>
  );
}