"use client";
import Image from "next/image";

export default function AboutMe() {
    return (
    <section
        id="about-me"
        className="relative min-h-screen w-full p-20 pt-40 bg-white text-black dark:bg-black dark:text-white"
        >

        <main className="flex flex-col items-start">

            <h4 className="font-bold text-6xl">About Me</h4>
            <br />
            <br />

            <div id="about-me-content w-40">
                <em>
                    My name is Pedro Consales Margaronis. I’m 20 years old and based in Rio de Janeiro, Brazil.
                    <br />
                    <br />
                    I have <strong>1+ years of experience</strong> as a <strong>Full‑Stack Developer</strong>, building web applications from UI to backend APIs.
                    <br />
                    <br />
                    I’m currently pursuing a <strong>Computer Science degree</strong> at <strong>PUC‑Rio</strong>, focusing on <br/>building well‑structured products that balance{" "}
                    <strong>performance</strong>, <strong>usability</strong>, <strong>security</strong>, and <strong>reliability</strong>.
                    <br />
                    <br />
                    My main stack includes <strong>Django</strong>, <strong>React</strong>, and <strong>Next.js</strong>, plus backend tools like <strong>FastAPI</strong> and ORMs.
                    <br />
                    I also have academic experience with <strong>Java</strong>, <strong>C#</strong>, and <strong>OOP</strong>, so those concepts are familiar.
                    <br />
                    I enjoy working with <strong>C</strong> and other <strong>low‑level languages</strong>, even though I haven’t used them professionally yet.
                    <br />
                    <br />
                    I have hands‑on experience integrating <strong>AI features</strong> into applications (e.g., <strong>semantic search</strong> and <strong>embeddings</strong>) to help users find information faster and get clearer, more relevant results.
                    <br />
                    <br />
                    Fun fact: when I’m not shipping features, I’m probably chasing waves — surfing keeps my brain in “debug mode,” but happier.
                </em>
            </div>


            {/* foto "absolute" no canto direito */}
            <div className="pointer-events-none absolute right-50 top-50 hidden lg:block">
                <div className="h-64 w-64 overflow-hidden rounded-3xl border border-black/10 bg-black/5 shadow-[0_18px_60px_rgba(0,0,0,0.12)] backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
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