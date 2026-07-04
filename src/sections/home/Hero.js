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
        
        // 2. text scrolls to the top right and shrinks to fit the empty space beside the temple
        tl.fromTo(textRef.current, 
            { x: "0vw", y: "0vh", scale: 1 }, 
            { x: "30vw", y: "-40vh", scale: 0.45, duration: 1, ease: "power1.inOut" }, 
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
                animate={{ x: [-20, 20, -20], y: [-15, 15, -15], scale: 1.05 }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 z-10"
            >
                <Image src="/images/Layer3.png" fill priority className="object-cover" alt="Mid Background" />
            </motion.div>

            {/* Shadow Gradient for Text Contrast */}
            <div className="absolute bottom-0 w-full h-[60vh] bg-gradient-to-t from-[#4d1700] via-[#4d1700]/60 to-transparent z-30 pointer-events-none" />

            {/* Main Content (Ram, Sita, Laxman & Text) */}
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pt-[15vh] md:pt-[20vh] px-5 pointer-events-none">
                
                <div ref={mainImgRef} className="relative w-full max-w-[400px] md:max-w-[450px] aspect-[4/3] flex items-center justify-center origin-center">
                    {/* Pulsing Glow behind main image - Intensified */}
                    <motion.div
                        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-[85%] h-[85%] bg-[#ffb703] rounded-full blur-[50px] md:blur-[80px] z-0"
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

                <div ref={textRef} className="text-center mt-4 z-20 px-4 origin-top">
                    <h1 className="font-['var(--font-cinzel)',_serif] text-2xl md:text-4xl lg:text-5xl leading-tight font-extrabold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f0f0f0] to-[#b0b0b0] drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
                        Traditional Indian Performance <br className="hidden md:block" /> of Ramayan
                    </h1>
                    <h2 className="font-['var(--font-cinzel)',_serif] text-lg md:text-xl lg:text-2xl text-white italic mt-3 font-semibold tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        Shree Ramleela Seva Trust
                    </h2>
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