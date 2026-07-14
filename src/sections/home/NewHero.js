"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const NewHero = () => {
    // Refs for GSAP
    const containerRef = useRef(null);
    const mainImgRef = useRef(null);
    const textRef = useRef(null);
    const titleRef = useRef(null);
    const layer1Ref = useRef(null);
    const layer2Ref = useRef(null);
    const ramjiRef = useRef(null);
    const ravanRef = useRef(null);
    const bgRef = useRef(null);
    const silverRef = useRef(null);
    const goldRef = useRef(null);



    // GSAP ScrollTrigger Animation
    useGSAP(() => {
        // Initialize background scale so GSAP doesn't overwrite it
        gsap.set(bgRef.current, { scale: 1.15 });

        // Floating Background Animation (Continuous Loop)
        gsap.to(bgRef.current, {
            y: 10,
            x: 15,
            rotation: 0.5,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=1500", // Increased scroll distance for a slower transition
                scrub: 1, // Smooth scrubbing
                pin: true, // Pin the Hero section while scrolling
            }
        });

        // 1. secondary text elements fade out
        const q = gsap.utils.selector(containerRef);
        tl.fromTo(q(".subheading, .heading-line, .cta-btn"),
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.8, ease: "power1.inOut" },
            0
        );

        // 2. title image shrinks, goes up, and crossfades from silver to gold
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

        if (!isMobile) {
            tl.to(titleRef.current,
                {
                    scale: 0.5,
                    y: "30vh",
                    x: "-20vw",
                    duration: 1,
                    ease: "power1.inOut",
                    transformOrigin: "left bottom"
                },
                0
            );

            // Crossfade to Gold by fading out the Silver layer
            tl.to(silverRef.current, {
                autoAlpha: 0,
                duration: 1,
                ease: "power1.inOut"
            }, 0);
        } else {
            tl.to(titleRef.current,
                {
                    scale: 0.5,
                    y: "35vh",
                    x: 0,
                    duration: 1,
                    ease: "power1.inOut",
                    transformOrigin: "center bottom"
                },
                0
            );

            tl.to(silverRef.current, {
                autoAlpha: 0,
                duration: 1,
                ease: "power1.inOut"
            }, 0);
        }

        // 3. Characters fade out or move when scrolling (optional, but good for parallax)
        tl.to([ramjiRef.current, ravanRef.current], {
            yPercent: 15,
            autoAlpha: 0,
            duration: 1,
            ease: "power1.inOut"
        }, 0);

        // 4. mainImg scrolls up from the bottom
        tl.fromTo(mainImgRef.current,
            { yPercent: 100 },
            { yPercent: 0, duration: 1, ease: "power1.inOut" },
            0
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden -mt-20 md:-mt-24 bg-black">
            {/* Layer 4 - Background */}
            <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none scale-[1.15]">
                <Image src="/images/hero2/stagebg.png" fill priority className="object-cover" alt="Background" />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/45 z-10"></div>
            </div>

            {/* Ramji Image */}
            <div ref={ramjiRef} className="hidden md:block absolute bottom-0 left-[3%] z-30 pointer-events-none">
                <img src="/images/hero2/ramji.png" className="h-[55vh] md:h-[65vh] lg:h-[75vh] w-auto origin-bottom-left drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]" alt="Ramji" />
            </div>

            {/* Ravan Image */}
            <div ref={ravanRef} className="hidden md:block absolute bottom-0 right-0 z-30 pointer-events-none">
                <img src="/images/hero2/ravan.png" className="h-[65vh] md:h-[75vh] lg:h-[85vh] w-auto origin-bottom-right drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]" alt="Ravan" />
            </div>

            {/* Main Content (Text) */}
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-start pt-[24vh] md:pt-[26vh] lg:pt-[24vh] px-4 pointer-events-none">

                <div ref={textRef} className="text-center z-20 w-full flex flex-col items-center origin-center pointer-events-auto">

                    {/* Subheading: Branding */}
                    <div className="subheading flex items-center justify-center gap-3 md:gap-4 mb-2 md:mb-3 w-full">
                        <span className="text-[#F5E9D2] tracking-[0.15em] md:tracking-[0.25em] text-sm md:text-lg lg:text-[16px] font-light uppercase font-['var(--font-sans)'] drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)]">
                            Shree RamLeela Seva Trust
                        </span>
                    </div>

                    {/* Main Headings */}
                    <h1 className="leading-tight font-bold tracking-wide flex flex-col items-center w-full mb-6" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        <span className="heading-line text-[#e8b975] block text-xl md:text-3xl lg:text-[32px] mb-1 drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)] whitespace-nowrap">Traditional Indian Performance of</span>
                        <div ref={titleRef} className="relative w-[80%] max-w-[500px] lg:max-w-[700px] xl:max-w-[800px] h-[70px] md:h-[110px] lg:h-[150px] mt-2 md:mt-4">
                            {/* Gold Image Layer (Original saturated text) */}
                            <div ref={goldRef} className="absolute inset-0 z-0 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] saturate-[1.2]">
                                <Image
                                    src="/images/ramayanText.png"
                                    fill
                                    className="object-contain object-center"
                                    alt="Ramayan Title Gold"
                                    priority
                                />
                            </div>

                            {/* Silver Image Layer (Fades out when scrolling) */}
                            <div ref={silverRef} className="absolute inset-0 z-10 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] saturate-[0.1] brightness-150">
                                <Image
                                    src="/images/ramayanText.png"
                                    fill
                                    className="object-contain object-center"
                                    alt="Ramayan Title Silver"
                                    priority
                                />
                            </div>
                        </div>
                    </h1>

                    {/* CTA Button */}
                    <a href="https://www.youtube.com/@SRSTgnw/streams" target="_blank" rel="noopener noreferrer" className="cta-btn bg-[#811915] text-[#F5E9D2] px-6 py-3 md:px-8 md:py-3 rounded text-xs md:text-sm tracking-widest font-bold uppercase hover:bg-[#6b1411] transition-all duration-300 flex items-center gap-2 group shadow-[0_15px_30px_rgba(0,0,0,0.8)] mt-2 lg:mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                        Watch Live Stream
                    </a>
                </div>

            </div>

            {/* MainImg - Overlapping Foreground coming from below via GSAP */}
            <div ref={mainImgRef} className="absolute bottom-0 left-0 md:left-auto right-0 z-50 pointer-events-none flex justify-center md:justify-end w-full md:w-auto h-[60vh] md:h-[80vh] lg:h-[90vh]">
                <img src="/images/hero2/mainImg.png" className="h-full w-auto object-bottom object-center md:object-right drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" alt="Main Characters" />
            </div>
        </section>
    );
};

export default NewHero;