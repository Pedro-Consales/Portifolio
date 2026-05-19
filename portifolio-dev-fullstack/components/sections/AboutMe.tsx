"use client";
import ProfileCard from "../react-bits/ProfileCard/ProfileCard";

export default function AboutMe() {
  return (
    <section
      id="about-me"
      className="relative min-h-screen w-full px-6 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-24 pt-28 sm:pt-32 lg:pt-40 bg-white text-black dark:bg-black dark:text-white"
    >
      <main className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
        <div className="flex-1">
          <h4 className="font-bold text-4xl sm:text-5xl lg:text-6xl">About Me</h4>
          <div className="mt-8 leading-relaxed text-base sm:text-lg">
            <em>
              My name is Pedro Consales Margaronis. I&apos;m 20 years old and based in Rio de Janeiro, Brazil.
              <br />
              <br />
              I have <strong className="text-[#267799]">1+ years of experience</strong> as a <strong className="text-[#267799]">Full‑Stack Developer</strong>, building web applications from UI to backend APIs.
              <br />
              <br />
              I&apos;m currently pursuing a <strong className="text-[#267799]">Computer Science degree</strong> at <strong className="text-[#267799]">PUC‑Rio</strong>, focusing on{" "}
              building well‑structured products that balance{" "}
              <strong className="text-[#267799]">performance</strong>, <strong className="text-[#267799]">usability</strong>, <strong className="text-[#267799]">security</strong>, and <strong className="text-[#267799]">reliability</strong>.
              <br />
              <br />
              My main stack includes <strong className="text-[#267799]">Django</strong>, <strong className="text-[#267799]">React</strong>, and <strong className="text-[#267799]">Next.js</strong>, plus backend tools like <strong className="text-[#267799]">FastAPI</strong> and ORMs.
              <br />
              I also have academic experience with <strong className="text-[#267799]">Java</strong>, <strong className="text-[#267799]">C#</strong>, and <strong className="text-[#267799]">OOP</strong>, so those concepts are familiar.
              <br />
              I enjoy working with <strong className="text-[#267799]">C</strong> and other <strong className="text-[#267799]">low‑level languages</strong>, even though I haven&apos;t used them professionally yet.
              <br />
              <br />
              I have hands‑on experience integrating <strong className="text-[#267799]">AI features</strong> into applications (e.g., <strong className="text-[#267799]">semantic search</strong> and <strong className="text-[#267799]">embeddings</strong>) to help users find information faster and get clearer, more relevant results.
              <br />
              <br />
              Fun fact: when I&apos;m not shipping features, I&apos;m probably chasing waves — surfing keeps my brain in &quot;debug mode,&quot; but happier.
            </em>
          </div>
        </div>

        <div className="w-full lg:w-auto flex justify-center lg:justify-end shrink-0">
          <ProfileCard
            avatarUrl="/profile-card-pic.jpg"
            name="Pedro Consales"
            title="Full Stack Engineer"
            handle="pedro-consales"
            status="Available"
            contactText="Contact"
            behindGlowColor="rgba(38, 119, 153, 0.55)"
            avatarScale={0.9}
            avatarOffsetY={40}
            onContactClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      </main>
    </section>
  );
}
