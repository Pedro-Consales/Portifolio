import Hero from "../components/sections/Hero";
import FadeInSection from "@/components/FadeInSection"
import About from "../components/sections/AboutMe"
import Timeline from "@/components/sections/TimeLine";
import SkillOverview from "@/components/sections/SkillOverview";
import Projects from "@/components/sections/Projects";


export default function Home() {
  return (
    <main>
      <Hero />

      <FadeInSection>
        <About />
      </FadeInSection>

      <FadeInSection>
        <Timeline />
      </FadeInSection>

      <FadeInSection>
        <SkillOverview />
      </FadeInSection>
      
      <FadeInSection>
        <Projects />
      </FadeInSection>
      
        
        

    </main>
  );
}