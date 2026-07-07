"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const PartnersClient = ({ partners }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Triple the partners list to guarantee a seamless loop on all screen widths
    const loopPartners = [...partners, ...partners, ...partners];

    if (partners.length === 0) return null;

    return (
        <section className="w-full py-12 bg-white/30 border-y border-[#4d1700]/10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-[#4d1700]/80">
                    Our Partners
                </h3>
            </div>
            
            <div className="relative w-full overflow-hidden select-none py-2">
                {/* Smooth left/right fade gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#fffaf0] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#fffaf0] to-transparent z-10 pointer-events-none" />

                <div className={`flex w-max items-center gap-12 md:gap-20 ${mounted ? "animate-marquee" : ""}`}>
                    {loopPartners.map((partner, index) => (
                        <div
                            key={`${partner.id}-${index}`}
                            className="flex items-center justify-center bg-white border border-[#4d1700]/5 shadow-sm rounded-xl px-8 py-4 h-16 w-36 md:w-44 transition-all duration-300 hover:scale-105 shrink-0"
                        >
                            {partner.logo ? (
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    width={120}
                                    height={60}
                                    className="object-contain max-h-10 w-auto filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                                    priority={index < 5}
                                />
                            ) : (
                                <span className="font-bold text-[#4d1700]/50 uppercase tracking-wider text-xs text-center line-clamp-2">
                                    {partner.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersClient;
