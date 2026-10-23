"use client";
import Image from "next/image";
import { useLanguage, type Lang } from "../i18n/LanguageProvider";

function B({ children }: { children: React.ReactNode }) {
  return <strong className="text-[#267799]">{children}</strong>;
}

const COPY: Record<Lang, { title: string; body: React.ReactNode }> = {
  en: {
    title: "About Me",
    body: (
      <>
        My name is Pedro Consales Margaronis. I’m 20 years old and based in Rio de Janeiro, Brazil.
        <br />
        <br />
        I have <B>1+ years of experience</B> as a <B>Full‑Stack Developer</B>, building web applications from UI to backend APIs.
        <br />
        <br />
        I’m currently pursuing a <B>Computer Science degree</B> at <B>PUC‑Rio</B>, focusing on <br className="hidden sm:block" /> {/* CHANGED: avoid awkward break on mobile */}
        building well‑structured products that balance{" "}
        <B>performance</B>, <B>usability</B>, <B>security</B>, and <B>reliability</B>.
        <br />
        <br />
        My main stack includes <B>Django/DRF</B>, <B>React</B>, and <B>Next.js</B>, plus backend tools like <B>REST API</B> and <B>ORMs</B>.
        <br />
        I also have academic experience with <B>Java</B>, <B>C#</B>, and <B>OOP</B>, so those concepts are familiar.
        <br />
        I enjoy working with <B>C</B> and other <B>low‑level languages</B>, even though I haven’t used them professionally yet.
        <br />
        <br />
        I have hands‑on experience integrating <B>AI features</B> into applications (e.g., <B>semantic search</B> and <B>embeddings</B>) to help users find information faster and get clearer, more relevant results.
        <br />
        <br />
        Fun fact: when I’m not shipping features, I’m probably chasing waves — surfing keeps my brain in “debug mode,” but happier.
      </>
    ),
  },
  pt: {
    title: "Sobre Mim",
    body: (
      <>
        Meu nome é Pedro Consales Margaronis. Tenho 20 anos e moro no Rio de Janeiro, Brasil.
        <br />
        <br />
        Tenho <B>mais de 1 ano de experiência</B> como <B>Desenvolvedor Full‑Stack</B>, construindo aplicações web da interface às APIs de backend.
        <br />
        <br />
        Atualmente curso <B>Ciência da Computação</B> na <B>PUC‑Rio</B>, com foco em <br className="hidden sm:block" />
        construir produtos bem estruturados que equilibram{" "}
        <B>performance</B>, <B>usabilidade</B>, <B>segurança</B> e <B>confiabilidade</B>.
        <br />
        <br />
        Minha stack principal inclui <B>Django/DRF</B>, <B>React</B> e <B>Next.js</B>, além de ferramentas de backend como <B>REST API</B> e <B>ORMs</B>.
        <br />
        Também tenho experiência acadêmica com <B>Java</B>, <B>C#</B> e <B>POO</B>, então esses conceitos são familiares para mim.
        <br />
        Gosto de trabalhar com <B>C</B> e outras <B>linguagens de baixo nível</B>, mesmo ainda não as tendo usado profissionalmente.
        <br />
        <br />
        Tenho experiência prática integrando <B>funcionalidades de IA</B> em aplicações (por exemplo, <B>busca semântica</B> e <B>embeddings</B>) para ajudar usuários a encontrar informações mais rápido e obter resultados mais claros e relevantes.
        <br />
        <br />
        Curiosidade: quando não estou entregando features, provavelmente estou atrás de ondas — o surf deixa meu cérebro em “modo debug”, só que mais feliz.
      </>
    ),
  },
};

export default function AboutMe() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <section
      id="about-me"
      className="relative min-h-screen w-full px-6 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-24 pt-28 sm:pt-32 lg:pt-40 bg-white text-black dark:bg-black dark:text-white" // CHANGED: responsive padding + top spacing
    >
      <main className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16"> {/* CHANGED: stack on mobile, side-by-side on lg */}
        <div className="flex-1">
          <h4 className="font-bold text-4xl sm:text-5xl lg:text-6xl">{t.title}</h4> {/* CHANGED: responsive title */}
          <div className="mt-8 leading-relaxed text-base sm:text-lg"> {/* CHANGED: spacing + responsive text */}
            <em>{t.body}</em>
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
