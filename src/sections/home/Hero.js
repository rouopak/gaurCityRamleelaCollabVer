"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const Hero = () => {
    // Refs for GSAP
    const containerRef = useRef(null);
    const mainImgRef = useRef(null);
    const textRef = useRef(null);
    const layer1Ref = useRef(null);
    const layer2Ref = useRef(null);

    // GSAP ScrollTrigger Animation
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=1500", // Increased scroll distance for a slower transition
                scrub: 1, // Smooth scrubbing
                pin: true, // Pin the Hero section while scrolling
            }
        });

        // 1. mainImg disappears
        tl.fromTo(mainImgRef.current,
            { opacity: 1 },
            { opacity: 0, duration: 1, ease: "power1.inOut" },
            0
        );

        // 2. text disappears (no motion)
        tl.fromTo(textRef.current,
            { opacity: 1 },
            { opacity: 0, duration: 1, ease: "power1.inOut" },
            0
        );

        // 3. layer2 scrolls up from the bottom (moves a bit higher/slower for parallax)
        tl.fromTo(layer2Ref.current,
            { yPercent: 100 },
            { yPercent: 40, duration: 1, ease: "power1.inOut" },
            0
        );

        // 4. layer1Top scrolls up from the bottom to cover most of the screen
        tl.fromTo(layer1Ref.current,
            { yPercent: 100 },
            { yPercent: 10, duration: 1, ease: "power1.inOut" },
            0
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden -mt-20 md:-mt-24">
            {/* Layer 4 - Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image src="/images/Layer4Bg.png" fill priority className="object-cover" alt="Background" />
            </div>

            {/* Layer 3 - Auto Parallax */}
            <motion.div
                animate={{ y: [0, -12] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute inset-0 z-10"
            >
                <Image src="/images/Layer3.png" fill priority className="object-cover" alt="Mid Background" />
            </motion.div>



            {/* Main Content (Ram, Sita, Laxman & Text) */}
            <div className="absolute inset-0 z-40 flex flex-col md:flex-row-reverse items-center justify-between pt-[12vh] md:pt-[10vh] px-6 md:px-12 lg:px-24 pointer-events-none">

                <div ref={mainImgRef} className="relative w-full md:w-[56%] max-w-[750px] md:max-w-[850px] lg:max-w-[950px] aspect-[4/3] flex items-center justify-center origin-center mb-8 md:mb-0 shrink-0">
                    {/* Pulsing Glow behind main image - Intensified */}
                    <motion.div
                        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-[85%] h-[85%] bg-[#fff3d4] rounded-full blur-[50px] md:blur-[80px] z-0"
                    />
                    {/* Floating mainImg */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-full h-full z-10"
                    >
                        <Image
                            src="/images/mainImg.png"
                            fill
                            priority
                            className="object-contain"
                            alt="Ram, Sita and Laxman"
                        />
                    </motion.div>
                </div>

                <div ref={textRef} className="text-left z-20 w-full md:w-[48%] flex flex-col items-center md:items-start origin-center pointer-events-auto text-center md:text-left mt-[-20px] md:mt-0">

                    {/* Subheading: KEEPING OUR HERITAGE ALIVE */}
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <div className="h-[1px] w-6 md:w-10 bg-[#98221b]"></div>
                        <span className="text-[#98221b] tracking-[0.25em] text-[10px] md:text-xs font-bold uppercase font-['var(--font-sans)']">
                            Shree RamLeela Seva Trust
                        </span>
                        <div className="h-[1px] w-4 md:w-6 bg-[#98221b]"></div>
                    </div>

                    {/* Main Headings */}
                    <h1 className="leading-tight font-bold tracking-wide w-full mb-6" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        <span className="text-[#3b271a] block text-3xl md:text-4xl lg:text-[42px] mb-1 md:mb-2 drop-shadow-sm whitespace-nowrap">Traditional Indian</span>
                        <span className="text-[#3b271a] block text-3xl md:text-4xl lg:text-[42px] mb-2 md:mb-4 drop-shadow-sm whitespace-nowrap">Performance of</span>
                        <span className="text-[#830404] block text-4xl md:text-6xl lg:text-[90px] drop-shadow-sm"> Ramayan</span>
                    </h1>

                    {/* CTA Button */}
                    <a href="/about" className="bg-[#811915] text-[#F5E9D2] px-6 py-3 md:px-8 md:py-3.5 rounded text-xs md:text-sm tracking-widest font-bold uppercase hover:bg-[#6b1411] transition-all duration-300 flex items-center gap-2 group shadow-lg">
                        KNOW MORE
                        <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

            </div>

            {/* Layer 2 - Midground behind Layer 1 */}
            <div ref={layer2Ref} className="absolute inset-0 z-[45] pointer-events-none">
                <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full"
                >
                    <Image src="/images/Layer2.png" fill priority className="object-cover object-bottom" alt="Midground" />
                    {/* Gradient Overlay for Layer2 to push it into the background smoothly */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4d1700]/60 to-transparent z-10 pointer-events-none" />
                </motion.div>
            </div>

            {/* Layer 1 - Overlapping Foreground coming from below via GSAP */}
            <div ref={layer1Ref} className="absolute inset-0 z-50 pointer-events-none">
                <Image src="/images/Layer1Top.png" fill priority className="object-cover object-bottom" alt="Foreground" />
            </div>
        </section>
    );
};

export default Hero;