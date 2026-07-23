"use client";

import Image from "next/image";
import EventGalleryTabs from "@/components/EventGalleryTabs";

export default function Year2024Page({ event }) {
    const title = event?.title || "Grand Ram Rajyabhishek 2024";
    const description = event?.description || "In 2024, Shree RamLeela Seva Trust celebrated the grandest RamLeela at Gaur City with unprecedented enthusiasm, grand stagecraft, and divine cultural performances.";
    const images = event?.images && event.images.length > 0 ? event.images : [
        "/images/achievements/yoga/1.jpg",
        "/images/achievements/yoga/2.jpg",
        "/images/achievements/yoga/3.jpg",
    ];

    return (
        <div className="space-y-12">
            {/* Main Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl p-4 md:p-6 shadow-xl border border-amber-900/10">
                {/* Main Image */}
                <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden shadow-md lg:col-span-5">
                    <Image 
                        src={images[0] || "/images/achievements/yoga/1.jpg"} 
                        alt={title} 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>
                {/* Right Side Text Box */}
                <div className="flex flex-col h-full p-4 lg:p-8 lg:col-span-7">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#f5e9d2] text-[#98221b] font-bold text-sm uppercase tracking-widest mb-4 w-max">
                        Recent Event • 2024
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#4d1700]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        {title}
                    </h1>
                    <p className="text-amber-900/80 text-base md:text-lg leading-relaxed mb-6">
                        {description}
                    </p>
                    
                    {/* Blank text box area */}
                    <div className="flex-grow w-full min-h-[150px] border-2 border-dashed border-amber-900/20 rounded-xl p-6 bg-amber-50/50 flex flex-col justify-start">
                        {/* Empty space for content */}
                    </div>
                </div>
            </div>

            {/* Highlights Grid */}
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#4d1700] mb-6" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                    2024 Event Highlights & Glimpses
                </h2>
                <EventGalleryTabs year="2024" />
            </div>
        </div>
    );
}
