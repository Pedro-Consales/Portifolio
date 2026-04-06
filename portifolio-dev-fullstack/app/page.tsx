import Hero from "../components/sections/Hero";
import FadeInSection from "@/components/FadeInSection"
import About from "../components/sections/AboutMe"
import Timeline from "@/components/sections/TimeLine";
import SkillOverview from "@/components/sections/SkillOverview";
// import Skills from "@/components/Skills"
// import Projects from "@/components/Projects"

export default function Home() {
  return (
    <main>
      <Hero />

      <FadeInSection>
        <About />
        <Timeline />
        <SkillOverview />
      </FadeInSection>

    </main>
  );
}