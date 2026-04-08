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
                    I have <strong className="text-[#267799]">1+ years of experience</strong> as a <strong className="text-[#267799]">Full‑Stack Developer</strong>, building web applications from UI to backend APIs.
                    <br />
                    <br />
                    I’m currently pursuing a <strong className="text-[#267799]">Computer Science degree</strong> at <strong className="text-[#267799]">PUC‑Rio</strong>, focusing on <br/>building well‑structured products that balance{" "}
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