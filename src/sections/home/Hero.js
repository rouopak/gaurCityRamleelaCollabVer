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
    const titleRef = useRef(null);
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
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 1, ease: "power1.inOut" },
            0
        );

        // 2. secondary text elements fade out
        const q = gsap.utils.selector(containerRef);
        tl.fromTo(q(".subheading, .heading-line, .cta-btn"),
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.8, ease: "power1.inOut" },
            0
        );

        // 3. title image shrinks by 50% and goes up by 50px (only on desktop)
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        if (!isMobile) {
            tl.fromTo(titleRef.current,
                { scale: 1, y: 0 },
                {
                    scale: 0.5,
                    y: -50,
                    duration: 1,
                    ease: "power1.inOut",
                    transformOrigin: "left center"
                },
                0
            );
        }

        // 4. layer2 scrolls up from the bottom (moves a bit higher/slower for parallax)
        tl.fromTo(layer2Ref.current,
            { yPercent: 100 },
            { yPercent: 40, duration: 1, ease: "power1.inOut" },
            0
        );

        // 5. layer1Top scrolls up from the bottom to cover most of the screen
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
                className="absolute inset-0 z-10 hidden md:block"
            >
                <Image src="/images/Layer3.png" fill priority className="object-cover" alt="Mid Background" />
            </motion.div>



            {/* Main Content (Ram, Sita, Laxman & Text) */}
            <div className="absolute inset-0 z-40 flex flex-col md:flex-row-reverse items-center justify-center md:justify-between md:pt-[10vh] px-6 md:px-12 lg:px-24 pointer-events-none">

                <div ref={mainImgRef} className="hidden md:flex relative w-full md:w-[56%] max-w-[750px] md:max-w-[850px] lg:max-w-[950px] aspect-[4/3] items-center justify-center origin-center mb-8 md:mb-0 shrink-0">
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

                <div ref={textRef} className="text-left z-20 w-full md:w-[48%] flex flex-col items-center md:items-start origin-center pointer-events-auto text-center md:text-left mt-0">

                    {/* Subheading: Branding */}
                    {/* md:-ml-20 pulls the container 5rem to the left (w-16=4rem + gap-4=1rem), keeping the text perfectly left-aligned with the main heading while the left line hangs beautifully outside. */}
                    <div className="subheading flex flex-nowrap items-center justify-center md:justify-start gap-3 md:gap-4 mb-4 md:mb-6 w-full md:-ml-20">
                        <div className="h-[2px] md:h-[3px] w-8 md:w-16 shrink-0 bg-gradient-to-r from-transparent to-[#98221b] rounded-full"></div>
                        <span className="text-[#98221b] whitespace-nowrap tracking-[0.15em] md:tracking-[0.25em] text-sm md:text-xl lg:text-2xl font-extrabold uppercase font-['var(--font-sans)'] drop-shadow-md" style={{ textShadow: "0 2px 4px rgba(255, 255, 255, 0.7)" }}>
                            Shree RamLeela Seva Trust
                        </span>
                        <div className="h-[2px] md:h-[3px] w-8 md:w-32 lg:w-48 shrink bg-gradient-to-l from-transparent to-[#98221b] rounded-full"></div>
                    </div>

                    {/* Main Headings */}
                    <h1 className="leading-tight font-bold tracking-wide w-full mb-6" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        <span className="heading-line text-[#3b271a] block text-3xl md:text-4xl lg:text-[42px] mb-1 md:mb-2 drop-shadow-sm whitespace-nowrap">Traditional Indian</span>
                        <span className="heading-line text-[#3b271a] block text-3xl md:text-4xl lg:text-[42px] mb-2 md:mb-4 drop-shadow-sm whitespace-nowrap">Performance of</span>
                        <div ref={titleRef} className="relative w-full h-[80px] md:h-[100px] lg:h-[120px] mt-2 md:mt-4">
                            <Image
                                src="/images/ramayanText.png"
                                fill
                                className="object-contain object-center md:object-left"
                                alt="Ramayan Title"
                                style={{ filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.35))" }}
                                priority
                            />
                        </div>
                    </h1>

                    {/* CTA Button */}
                    <a href="https://www.youtube.com/@SRSTgnw/streams" target="_blank" rel="noopener noreferrer" className="cta-btn bg-[#811915] text-[#F5E9D2] px-6 py-3 md:px-8 md:py-3.5 rounded text-xs md:text-sm tracking-widest font-bold uppercase hover:bg-[#6b1411] transition-all duration-300 flex items-center gap-2 group shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                        Watch Live Stream
                    </a>
                </div>

            </div>

            {/* Layer 2 - Midground behind Layer 1 */}
            <div ref={layer2Ref} className="absolute inset-0 z-[45] pointer-events-none hidden md:block">
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