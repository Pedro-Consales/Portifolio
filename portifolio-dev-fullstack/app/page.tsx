import Hero from "../components/sections/Hero";
import FadeInSection from "@/components/FadeInSection"
import About from "../components/sections/AboutMe"
// import Skills from "@/components/Skills"
// import Projects from "@/components/Projects"

export default function Home() {
  return (
    <main>
      <Hero />

      <FadeInSection>
        <About />
      </FadeInSection>

    </main>
  );
}