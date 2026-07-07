import prisma from "@/lib/prisma";
import Image from "next/image";

export const metadata = {
    title: "Past Events | Shree RamLeela Seva Trust",
    description: "Explore our past RamLeela events and memories.",
};

export default async function PastEventsPage() {
    const events = await prisma.event.findMany({
        where: { published: true },
        orderBy: { year: "desc" },
    });

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#F5E9D2] mb-4" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        Past Events
                    </h1>
                    <div className="w-24 h-1 bg-[#b55924] mx-auto rounded-full mb-6"></div>
                    <p className="text-[#F5E9D2]/70 max-w-2xl mx-auto">
                        Relive the glorious moments of our past RamLeela celebrations through the years.
                    </p>
                </div>

                {events.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                        <p className="text-[#F5E9D2]/50 text-lg">No events have been published yet.</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {events.map((event, index) => (
                            <div key={event.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}>
                                {/* Text Content */}
                                <div className="w-full lg:w-1/3 space-y-4 text-center lg:text-left">
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#b55924]/20 border border-[#b55924]/50 text-[#F5E9D2] font-semibold text-xl mb-2">
                                        {event.year}
                                    </div>
                                    <h2 className="text-3xl font-bold text-[#F5E9D2]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                                        {event.title}
                                    </h2>
                                    {event.description && (
                                        <p className="text-[#F5E9D2]/70 leading-relaxed text-sm">
                                            {event.description}
                                        </p>
                                    )}
                                </div>

                                {/* Images Grid */}
                                <div className="w-full lg:w-2/3">
                                    {event.images && event.images.length > 0 ? (
                                        <div className={`grid gap-4 ${event.images.length === 1 ? 'grid-cols-1' : event.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
                                            {event.images.map((img, i) => (
                                                <div key={i} className={`relative rounded-xl overflow-hidden shadow-2xl border border-white/10 group ${
                                                    i === 0 && event.images.length > 2 ? 'md:col-span-2 md:row-span-2 aspect-video' : 'aspect-square'
                                                }`}>
                                                    <Image 
                                                        src={img} 
                                                        alt={`${event.title} image ${i + 1}`} 
                                                        fill 
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-video rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            <span className="text-[#F5E9D2]/30">No images available</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}