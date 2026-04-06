"use client";



import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import FaultyTerminal from "../react-bits/FaultyTerminal/FaultyTerminal";



export default function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const tint_theme = !mounted || resolvedTheme === "dark" ? "#2a6984" : "#c2c0c0";

  return (
    <section id="hero" className="w-full min-h-screen m-0">
      
      <div className="relative h-screen w-full">
        <FaultyTerminal
          className="flex items-center justify-center h-full w-full"
          style={{ width: "100%", height: "100%" }}
          scale={4.0}
          gridMul={[2, 1]}
          digitSize={0.7}
          timeScale={0.5}
          pause={false}
          scanlineIntensity={0.5}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint={tint_theme}
          //#A7EF9E
          mouseReact
          mouseStrength={0.5}
          dpr={2}
          pageLoadAnimation
          brightness={0.6}
        />


        {/* overlay central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-2">
          
          <div className="flex flex-col gap-10">
            <div className="text-white text-center text-5xl font-bold">
              <p>Hello! My name is</p>
              <p>Pedro Consales Margaronis</p>
            </div>
            <div className="text-white text-center font-bold">
              <p className="text-lg md:text-xl font-semibold text-white/90">
                I'm a{" "}
                <span className="text-[#A7EF9E] font-extrabold tracking-tight">
                  Full Stack Software Engineer
                </span>{" "}
                and a Computer Science student at PUC-Rio.
                <br />
                I build web projects from ideation to deployment, solving real-world problems.
                <br />
                I primarily work with modern frameworks such as Django and React.
              </p>

              <p className="mt-3 text-base md:text-lg font-semibold text-white/80">
                Based in Rio de Janeiro, Brazil 🇧🇷
              </p>
            </div>
          </div>

          <div className="text-white">

            <div className="flex flex-row gap-2 text-3xl">
              
              <a 
                href = "https://github.com/Pedro-Consales" 
                target="_blank"  
                aria-label="GitHub" 
                className="pointer-events-auto">

                <FaGithub/>
              </a>


              <a 
                href = "https://www.linkedin.com/in/pedro-consales-922b3b325/" 
                target="_blank"  
                aria-label="Linkedin" 
                className="pointer-events-auto">

                <FaLinkedin/>
              </a>
              
            </div>
            
          </div>

        </div>




      </div>

      {/* gradient */}
      <div className={`
        pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b 
        
        from-black/0
        via-black/5 via-40%
        via-black/100 via-100%
        to-white 
        
        dark:to-black dark:h-40`} /> 

    </section>
  );
}

