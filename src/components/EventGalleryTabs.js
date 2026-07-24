"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import eventGallery from "@/data/eventGallery.json";

export default function EventGalleryTabs({ year }) {
    const galleryData = eventGallery[year];

    // Check if data is a flat array (no day-wise grouping)
    const isFlat = Array.isArray(galleryData);

    // For flat arrays, render a simple grid without tabs
    if (isFlat) {
        const images = galleryData || [];
        return (
            <div className="w-full">
                {images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {images.map((img, idx) => (
                            <motion.div
                                key={`flat-${idx}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="relative aspect-video md:aspect-square w-full rounded-2xl overflow-hidden shadow-xl border border-amber-900/10"
                            >
                                <Image
                                    src={img}
                                    alt={`Gallery Image for ${year} - ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex items-center justify-center py-20 bg-white/40 rounded-2xl border border-amber-900/10 border-dashed">
                        <p className="text-[#4d1700]/50 font-medium">No images available yet.</p>
                    </div>
                )}
            </div>
        );
    }

    // Day-wise object: extract days and render with tabs
    const data = galleryData || {};
    const days = Object.keys(data).sort((a, b) => {
        const numA = parseInt(a.replace("day", ""), 10);
        const numB = parseInt(b.replace("day", ""), 10);
        return numA - numB;
    });

    const [activeDay, setActiveDay] = useState(days[0] || "day1");
    const currentImages = data[activeDay] || [];

    return (
        <div className="w-full">
            {/* Tabs Header */}
            <div className="flex flex-wrap gap-3 mb-10 justify-center md:justify-start">
                {days.map((day) => {
                    const isActive = activeDay === day;
                    const dayNum = day.replace("day", "");
                    return (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day)}
                            className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 border-2 ${
                                isActive 
                                    ? "bg-[#4d1700] border-[#4d1700] text-white shadow-md scale-105" 
                                    : "bg-transparent border-[#4d1700] text-[#4d1700] hover:bg-[#4d1700]/10"
                            }`}
                        >
                            Day {dayNum}
                        </button>
                    );
                })}
            </div>

            {/* Gallery Content with elegant entrance animation */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeDay}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {currentImages.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {currentImages.map((img, idx) => (
                                    <motion.div 
                                        key={`${activeDay}-${idx}`} 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        className="relative aspect-video md:aspect-square w-full rounded-2xl overflow-hidden shadow-xl border border-amber-900/10"
                                    >
                                        <Image
                                            src={img}
                                            alt={`Gallery Image for ${year} ${activeDay} - ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="w-full flex items-center justify-center py-20 bg-white/40 rounded-2xl border border-amber-900/10 border-dashed">
                                <p className="text-[#4d1700]/50 font-medium">No images available for this day yet.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

