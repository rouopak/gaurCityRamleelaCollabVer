"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const fallbackEvents = [
    {
        id: "ev-1",
        title: "Grand Ram Rajyabhishek",
        hindiTitle: "भव्य राम राज्याभिषेक",
        year: 2024,
        description: "मर्यादा पुरुषोत्तम श्री राम के राज्याभिषेक का भव्य और अलौकिक मंचन, जिसमें समस्त अयोध्या हर्षोल्लास से सराबोर उठी। Gaur City residents witnessed a spectacular display of devotion and culture.",
        image: "/images/achievements/yoga/1.jpg",
    },
    {
        id: "ev-2",
        title: "Golden Lanka Dahan",
        hindiTitle: "स्वर्ण लंका दहन",
        year: 2023,
        description: "वीर हनुमान जी द्वारा रावण की लंका के दहन का अद्भुत और रोमांचकारी दृश्य, जिसने दर्शकों को भक्ति रस से भावविभोर कर दिया। The scene featured stunning pyrotechnics and performances.",
        image: "/images/achievements/yoga/2.jpg",
    },
    {
        id: "ev-3",
        title: "Sita Swayamvar & Dhanush Bhanjan",
        hindiTitle: "सीता स्वयंवर एवं धनुष भंजन",
        year: 2022,
        description: "प्रभु श्री राम द्वारा शिव धनुष के भंजन और माता सीता के वरण की अलौकिक लीला, जो त्याग और मर्यादा का अनुपम उदाहरण है। A stellar presentation of ancient grace and music.",
        image: "/images/achievements/yoga/3.jpg",
    },
    {
        id: "ev-4",
        title: "Bharat Milap & Shanti Sandesh",
        hindiTitle: "भरत मिलाप एवं शांति सन्देश",
        year: 2021,
        description: "चित्रकूट में प्रभु श्री राम और भ्राता भरत के भावुक मिलन की मार्मिक प्रस्तुति, जिसने भाई-भाई के निश्चल प्रेम की पराकाष्ठा को दर्शाया। A tear-inducing display of pure familial love.",
        image: "/images/achievements/yoga/4.jpg",
    }
];

export default function Past4EventsClient({ initialEvents, availableYears = [] }) {
    const router = useRouter();

    // If no events are configured in database, use fallback past events
    const displayEvents = initialEvents && initialEvents.length > 0
        ? [...initialEvents].slice(0, 4)
        : fallbackEvents;

    // State for the expanded panel
    const [hoveredId, setHoveredId] = useState(displayEvents[0]?.id || null);

    const handleCardClick = (event) => {
        setHoveredId(event.id);
    };

    return (
        <section className="py-20 md:py-28 bg-[#fffcf5] overflow-hidden relative" id="events">
            {/* Background Decorative Blurs */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#f5e9d2] rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#f5e9d2] rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col items-start mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-[2px] w-12 bg-[#98221b]"></div>
                        <span className="text-[#98221b] tracking-[0.2em] text-xs md:text-sm font-bold uppercase">
                            Glimpses of the Past
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#3b271a]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        विगत आयोजन
                    </h2>
                </div>

                {/* Film Reel / Expanding Accordion Grid */}
                <div className="flex flex-col md:flex-row gap-4 h-[550px] w-full max-w-6xl mx-auto rounded-3xl overflow-hidden p-2 bg-[#fcfaf8] border border-slate-200/60 shadow-lg relative">
                    
                    {/* Decorative Film Strip Edges (Top & Bottom for Mobile, Left & Right for Desktop) */}
                    <div className="absolute left-0 inset-y-0 w-2 hidden md:flex flex-col justify-between py-6 pointer-events-none opacity-20">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-slate-900 rounded-sm"></div>
                        ))}
                    </div>
                    <div className="absolute right-0 inset-y-0 w-2 hidden md:flex flex-col justify-between py-6 pointer-events-none opacity-20">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-slate-900 rounded-sm"></div>
                        ))}
                    </div>

                    {displayEvents.map((event, index) => {
                        const isActive = hoveredId === event.id;
                        const eventImage = event.images && event.images[0] ? event.images[0] : event.image;
                        const hasYearFile = availableYears.includes(event.year);

                        return (
                            <motion.div
                                key={event.id}
                                layout
                                onHoverStart={() => setHoveredId(event.id)}
                                onClick={() => handleCardClick(event)}
                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 20
                                }}
                                className={`relative h-full rounded-2xl overflow-hidden cursor-pointer border border-transparent transition-all duration-300 ${
                                    isActive
                                        ? "flex-[3.5] md:flex-[5] shadow-xl border-[#98221b]/20"
                                        : "flex-[1] md:flex-[1.2] opacity-70 hover:opacity-95"
                                }`}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    {eventImage ? (
                                        <Image
                                            src={eventImage}
                                            alt={event.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out"
                                            sizes="(max-width: 768px) 100vw, 40vw"
                                            priority={index === 0}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-tr from-[#3b271a] to-[#98221b] flex items-center justify-center">
                                            <span className="text-white/20 text-7xl font-bold font-serif">{event.year}</span>
                                        </div>
                                    )}
                                    {/* Cinematic overlay gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-80'}`}></div>
                                </div>

                                {/* Vertical rotated year & title for collapsed state */}
                                <AnimatePresence>
                                    {!isActive && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, transition: { delay: 0.1 } }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 z-10 flex flex-col justify-between items-center py-8 text-white pointer-events-none"
                                        >
                                            <span className="text-xl md:text-2xl font-bold text-[#f5e9d2]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                                                {event.year}
                                            </span>
                                            
                                            {/* Rotated text for desktop */}
                                            <h3 
                                                className="hidden md:block text-lg font-bold tracking-widest uppercase text-white/70 origin-center rotate-[-90deg] whitespace-nowrap"
                                                style={{ fontFamily: "var(--font-cinzel), serif" }}
                                            >
                                                {event.hindiTitle || event.title}
                                            </h3>

                                            {/* Horizontal text for mobile */}
                                            <h3 
                                                className="md:hidden text-sm font-semibold tracking-wider text-center text-white/80 px-2 line-clamp-1"
                                                style={{ fontFamily: "var(--font-cinzel), serif" }}
                                            >
                                                {event.hindiTitle || event.title}
                                            </h3>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Detailed expanded view content */}
                                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 text-white">
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.4 } }}
                                                exit={{ opacity: 0, y: 20 }}
                                                className="flex flex-col items-start max-w-xl"
                                            >
                                                {/* Badge/Year */}
                                                <div className="flex items-center gap-2 mb-4">
                                                    <span className="bg-[#98221b] text-[#f5e9d2] text-xs font-bold px-3.5 py-1 rounded-full tracking-widest">
                                                        YEAR {event.year}
                                                    </span>
                                                    {/* Removed Dedicated Page tag */}
                                                </div>

                                                {/* Titles */}
                                                <h3 
                                                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight" 
                                                    style={{ fontFamily: "var(--font-cinzel), serif" }}
                                                >
                                                    {event.hindiTitle || event.title}
                                                </h3>
                                                
                                                {event.hindiTitle && event.title && (
                                                    <h4 className="text-sm md:text-base font-semibold tracking-wider text-[#ffa875] mb-4 uppercase">
                                                        {event.title}
                                                    </h4>
                                                )}

                                                {/* Description */}
                                                <p className="text-slate-200 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3 md:line-clamp-none">
                                                    {event.description}
                                                </p>

                                                {hasYearFile && (
                                                    <Link
                                                        href={`/prevEvent/yearWise/year${event.year}`}
                                                        className="inline-flex items-center gap-2 bg-[#98221b] hover:bg-[#b55924] text-[#f5e9d2] text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md mb-4"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        View Gallery &rarr;
                                                    </Link>
                                                )}

                                                {/* Shimmering Gold Bottom Line ornament */}
                                                <div className="w-24 h-[1px] bg-gradient-to-r from-[#ffa875] to-transparent"></div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Traditional Decorative Border outline inside active panel */}
                                <div className={`absolute inset-4 border border-[#f5e9d2]/20 rounded-xl pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
