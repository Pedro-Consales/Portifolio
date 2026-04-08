"use client";
import Image from "next/image";

export default function AboutMe() {
  return (
    <section
      id="about-me"
      className="relative min-h-screen w-full px-6 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-24 pt-28 sm:pt-32 lg:pt-40 bg-white text-black dark:bg-black dark:text-white" // CHANGED: responsive padding + top spacing
    >
      <main className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16"> {/* CHANGED: stack on mobile, side-by-side on lg */}
        <div className="flex-1">
          <h4 className="font-bold text-4xl sm:text-5xl lg:text-6xl">About Me</h4> {/* CHANGED: responsive title */}
          <div className="mt-8 leading-relaxed text-base sm:text-lg"> {/* CHANGED: spacing + responsive text */}
            <em>
              My name is Pedro Consales Margaronis. I’m 20 years old and based in Rio de Janeiro, Brazil.
              <br />
              <br />
              I have <strong className="text-[#267799]">1+ years of experience</strong> as a <strong className="text-[#267799]">Full‑Stack Developer</strong>, building web applications from UI to backend APIs.
              <br />
              <br />
              I’m currently pursuing a <strong className="text-[#267799]">Computer Science degree</strong> at <strong className="text-[#267799]">PUC‑Rio</strong>, focusing on <br className="hidden sm:block" /> {/* CHANGED: avoid awkward break on mobile */}
              building well‑structured products that balance{" "}
              <strong className="text-[#267799]">performance</strong>, <strong className="text-[#267799]">usability</strong>, <strong className="text-[#267799]">security</strong>, and <strong className="text-[#267799]">reliability</strong>.
              <br />
              <br />
              My main stack includes <strong className="text-[#267799]">Django</strong>, <strong className="text-[#267799]">React</strong>, and <strong className="text-[#267799]">Next.js</strong>, plus backend tools like <strong className="text-[#267799]">FastAPI</strong> and ORMs.
              <br />
              I also have academic experience with <strong className="text-[#267799]">Java</strong>, <strong className="text-[#267799]">C#</strong>, and <strong className="text-[#267799]">OOP</strong>, so those concepts are familiar.
              <br />
              I enjoy working with <strong className="text-[#267799]">C</strong> and other <strong className="text-[#267799]">low‑level languages</strong>, even though I haven’t used them professionally yet.
              <br />
              <br />
              I have hands‑on experience integrating <strong className="text-[#267799]">AI features</strong> into applications (e.g., <strong className="text-[#267799]">semantic search</strong> and <strong className="text-[#267799]">embeddings</strong>) to help users find information faster and get clearer, more relevant results.
              <br />
              <br />
              Fun fact: when I’m not shipping features, I’m probably chasing waves — surfing keeps my brain in “debug mode,” but happier.
            </em>
          </div>
        </div>

        {/* photo: inline on mobile/tablet, sticky-ish on desktop */}
        <div className="w-full lg:w-[320px] flex justify-center lg:justify-end"> {/* CHANGED: responsive container */}
          <div className="pointer-events-none w-56 h-56 sm:w-64 sm:h-64 overflow-hidden rounded-3xl border border-black/10 bg-black/5 shadow-[0_18px_60px_rgba(0,0,0,0.12)] backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)]"> {/* CHANGED: responsive sizing */}
            <Image
              src="/profile-picture.png"
              alt="Pedro Consales Margaronis"
              width={512}
              height={512}
              className="h-full w-full object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
      </main>
    </section>
  );
}