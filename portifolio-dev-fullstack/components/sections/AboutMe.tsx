"use client";
import Image from "next/image";

export default function AboutMe() {
    return (
    <section
        id="about-me"
        className="relative min-h-screen w-full p-20 bg-white text-black dark:bg-black dark:text-white"
        >

        <main className="flex flex-col items-start">

            <h4 className="font-bold text-6xl">About Me</h4>
            <br />
            <br />

            <div id="about-me-content w-40">
            My name is Pedro Consales Margaronis. I’m 20 years old and based in Rio de Janeiro, Brazil.
            <br />
            <br />
            I have 1+ years of experience as a Full‑Stack Developer, building web applications from UI to backend APIs.
            <br />
            <br />
            I’m currently pursuing a Computer Science degree at PUC‑Rio, with a focus on 
            <br />
            creating well‑structured products
            that balance performance, usability, security and reliability.
            <br />
            <br />
            My main stack includes Django, React, and Next.js, plus backend tools like FastAPI and ORMs. 
            <br />
            I have academinc experinece with Java, C# and OOP architecture, so it's a bit familiar
            <br />
            I also like to work with C
            and low level languages even thoght I never used in a professional way.
            <br />
            <br />
            I have hands‑on experience integrating AI features into applications (such as semantic search and embeddings)
            <br />
            to help users find information faster and get clearer, more relevant results.
            <br/>
            <br/>
            Fun fact: when I’m not shipping features, I’m probably chasing waves — surfing keeps my brain in “debug mode,” but happier.
            </div>


            {/* foto "absolute" no canto direito */}
            <div className="pointer-events-none absolute right-20 top-40 hidden lg:block">
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