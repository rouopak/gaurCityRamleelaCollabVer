"use client";

import Image from "next/image";
import EventGalleryTabs from "@/components/EventGalleryTabs";

export default function Year2024Page({ event }) {
    const title = event?.title || "श्री रामलीला महोत्सव 2024";
    const description = event?.description || "श्री रामलीला सेवा ट्रस्ट ग्रेटर नोएडा वेस्ट (रजि. न. 703) गत वर्षों में इस क्षेत्र में रामलीला आयोजित करता रहा है। जो कि इस क्षेत्र का पहला बड़ा आयोजन है। श्री रामलीला सेवा ट्रस्ट द्वारा आयोजित रामलीला आयोजनों की सफलता का श्रेय ट्रस्ट के सभी सदस्यों को जाता है। यह कार्यक्रम एक अथक मेहनत और व्यापक योजना के परिणामस्वरूप सफल हुए।";
    const images = event?.images && event.images.length > 0 ? event.images : [
        "/images/events/2024/day3/1.jpg",
        "/images/events/2024/day5/1.jpg",
        "/images/events/2024/day10/1.jpg",
    ];

    return (
        <div className="space-y-12">
            {/* Main Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl p-4 md:p-6 shadow-xl border border-amber-900/10">
                {/* Main Image */}
                <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden shadow-md lg:col-span-5">
                    <Image 
                        src={images[0] || "/images/events/2024/day3/1.jpg"} 
                        alt={title} 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>
                {/* Right Side Text Box */}
                <div className="flex flex-col h-full p-4 lg:p-8 lg:col-span-7">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#f5e9d2] text-[#98221b] font-bold text-sm uppercase tracking-widest mb-4 w-max">
                        Event • 12 Oct, 2024
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#4d1700]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        {title}
                    </h1>
                    <p className="text-amber-900/80 text-base md:text-lg leading-relaxed mb-6">
                        {description}
                    </p>
                    
                    {/* Event Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-auto">
                        <div className="text-center p-3 rounded-xl bg-amber-50/80 border border-amber-900/10">
                            <div className="text-2xl font-bold text-[#98221b]">11</div>
                            <div className="text-xs text-amber-900/60 font-medium">Days</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-amber-50/80 border border-amber-900/10">
                            <div className="text-2xl font-bold text-[#98221b]">101</div>
                            <div className="text-xs text-amber-900/60 font-medium">Photos</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-amber-50/80 border border-amber-900/10">
                            <div className="text-2xl font-bold text-[#98221b]">2024</div>
                            <div className="text-xs text-amber-900/60 font-medium">Year</div>
                        </div>
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
