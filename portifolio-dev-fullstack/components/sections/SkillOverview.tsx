"use client";

import { FaReact } from "react-icons/fa";

// components/SkillCard.tsx
type SkillCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    skills: string[];
  };
  
  export function SkillCard({ icon, title, description, skills }: SkillCardProps) {
    return (
      <div className="rounded-2xl border border-white/8 bg-[#2a6984] p-6 font-mono">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-sky-400/15 border border-sky-400/30 flex items-center justify-center text-sky-400">
            {icon}
          </div>
          <h3 className="text-[17px] font-medium text-slate-100">{title}</h3>
        </div>
  
        <p className="text-[13px] text-[#7a9ab0] mb-4 leading-relaxed">{description}</p>
  
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/12 bg-white/4 text-[12px] text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  }

export default function SkillOverview(){
    return(
        <section>
            <main className="flex justify-center">
                <div className="grid grid-flow-col grid-rows-3 gap-4">

                    <SkillCard
                    icon={<FaReact size={18} />}
                    title="Frontend"
                    description="Building responsive and dynamic user interfaces."
                    skills={["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS"]}
                    />
                    <div>
                        oi
                    </div>
                    <div>
                        oi
                    </div>
                    <div>
                        oi
                    </div>
                    <div>
                        oi
                    </div>
                    <div>
                        oi
                    </div>
                </div>
            </main>
        </section>
    );
}