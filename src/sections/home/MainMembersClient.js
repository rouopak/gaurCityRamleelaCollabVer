"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const fallbackMembers = [
    {
        id: "fb-1",
        name: "Shri Devendra Singh",
        role: "President / अध्यक्ष",
        photo: null,
    },
    {
        id: "fb-2",
        name: "Shri Mukesh Kumar",
        role: "General Secretary / महासचिव",
        photo: null,
    },
    {
        id: "fb-3",
        name: "Shri Sanjay Sharma",
        role: "Treasurer / कोषाध्यक्ष",
        photo: null,
    },
    {
        id: "fb-4",
        name: "Shri Anil Chaudhary",
        role: "Vice President / उपाध्यक्ष",
        photo: null,
    }
];

export default function MainMembersClient({ initialMembers }) {
    // If no members are configured in database, use fallback pillars of the Trust
    const displayMembers = initialMembers && initialMembers.length > 0
        ? [...initialMembers, ...fallbackMembers].slice(0, 4)
        : fallbackMembers;

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1], // elegant custom ease out
            }
        }
    };

    return (
        <section className="py-20 md:py-28 bg-[#fffcf5] overflow-hidden relative" id="committee">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-[#f5e9d2] rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#f5e9d2] rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-[2px] w-8 bg-[#98221b]"></div>
                        <span className="text-[#98221b] tracking-[0.2em] text-xs md:text-sm font-bold uppercase">
                            PATRON & MEMBERS
                        </span>
                        <div className="h-[2px] w-8 bg-[#98221b]"></div>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#3b271a]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        संरक्षक एवं सदस्य
                    </h2>
                    <div className="w-20 h-[3px] bg-[#98221b]/80 mt-4 rounded-full"></div>
                </div>

                {/* Grid of Cards with Staggered Entrance Animation */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
                >
                    {displayMembers.map((member) => (
                        <motion.div
                            key={member.id}
                            variants={cardVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="relative group bg-[#fcfaf8] p-5 rounded-2xl border border-slate-200/60 shadow-md cursor-pointer hover:shadow-xl hover:border-[#98221b]/30 flex flex-col justify-between"
                        >
                            {/* Traditional Ornate Corner Frames - Animated on hover */}
                            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#98221b]/20 group-hover:border-[#98221b] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all duration-300"></div>
                            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#98221b]/20 group-hover:border-[#98221b] group-hover:translate-x-[2px] group-hover:translate-y-[-2px] transition-all duration-300"></div>
                            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#98221b]/20 group-hover:border-[#98221b] group-hover:translate-x-[-2px] group-hover:translate-y-[2px] transition-all duration-300"></div>
                            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#98221b]/20 group-hover:border-[#98221b] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-300"></div>

                            {/* Outer/Inner Dual Border Layout */}
                            <div className="border border-slate-100 p-2.5 rounded-xl bg-[#fffefc] h-full flex flex-col justify-between transition-colors duration-300 group-hover:border-[#98221b]/10">

                                {/* Photo / Avatar Frame */}
                                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#f8f5f0] mb-5 group/img border border-slate-100 flex items-center justify-center">
                                    {member.photo ? (
                                        <Image
                                            src={member.photo}
                                            alt={member.name}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-110"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#98221b]/5 to-[#f8f5f0] flex flex-col items-center justify-center text-center p-4">
                                            <div className="w-16 h-16 rounded-full bg-[#98221b]/10 flex items-center justify-center mb-3 group-hover/img:scale-105 transition-transform duration-500">
                                                <span className="text-[#98221b] text-2xl font-bold font-serif">
                                                    {member.name.charAt(0)}
                                                </span>
                                            </div>
                                            <span className="text-[9px] uppercase tracking-widest text-[#98221b]/40 font-bold">SRST Guardian</span>
                                        </div>
                                    )}
                                    {/* Shimmer overlay effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover/img:translate-x-[150%] transition-transform duration-1000 ease-out"></div>

                                    {/* Traditional Indian Arch Pattern Overlay on Photo */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#3b271a]/80 via-[#3b271a]/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                                        <span className="text-white/80 text-[10px] uppercase tracking-widest font-semibold">जय श्री राम</span>
                                    </div>
                                </div>

                                {/* Typography / Details */}
                                <div className="text-center pb-2">
                                    <h3
                                        className="text-lg font-bold text-[#3b271a] group-hover:text-[#98221b] transition-colors duration-300"
                                        style={{ fontFamily: "var(--font-cinzel), serif" }}
                                    >
                                        {member.name}
                                    </h3>
                                    <p className="text-xs text-[#b55924] font-semibold tracking-wide uppercase mt-1.5">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
