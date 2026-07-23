"use client";

import Image from "next/image";

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl p-4 md:p-6 shadow-xl border border-amber-900/10">
                {/* Main Image */}
                <div className="relative aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden shadow-md">
                    <Image 
                        src={images[0] || "/images/achievements/yoga/1.jpg"} 
                        alt={title} 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>
                {/* Right Side Text Box */}
                <div className="flex flex-col justify-center p-4 lg:p-8">
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
                    <div className="w-full min-h-[150px] border-2 border-dashed border-amber-900/20 rounded-xl p-6 bg-amber-50/50 flex flex-col justify-start">
                        {/* Empty space for content */}
                    </div>
                </div>
            </div>

            {/* Highlights Grid */}
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#4d1700] mb-6" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                    2024 Event Highlights & Glimpses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {images.map((img, i) => (
                        <div key={i} className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-xl border border-amber-900/10 group">
                            <Image
                                src={img}
                                alt={`2024 RamLeela image ${i + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <span className="text-white text-sm font-medium">Gaur City Ramleela 2024 - View {i + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
