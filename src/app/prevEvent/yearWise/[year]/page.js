import prisma from "@/lib/prisma";
import { getAvailableYearFiles } from "@/app/actions/yearFiles";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }) {
    const { year: rawYear } = await params;
    const yearNum = parseInt(rawYear.replace(/^year/i, ""), 10);
    return {
        title: `RamLeela Event ${yearNum || rawYear} | Shree RamLeela Seva Trust`,
        description: `Explore memories and highlights from our ${yearNum || rawYear} RamLeela celebration.`,
    };
}

export default async function YearPage({ params }) {
    const { year: rawYear } = await params;
    // Strip leading 'year' if present, e.g. "year2024" -> 2024
    const yearStr = rawYear.replace(/^year/i, "");
    const yearNum = parseInt(yearStr, 10);

    if (isNaN(yearNum)) {
        notFound();
    }

    const availableYears = await getAvailableYearFiles();
    if (!availableYears.includes(yearNum)) {
        notFound();
    }

    // Try to load dynamic component if year file has specific export
    let CustomYearComponent = null;
    try {
        const mod = await import(`../year${yearNum}.js`);
        if (mod && mod.default) {
            CustomYearComponent = mod.default;
        }
    } catch (e) {
        console.warn(`No custom React export in year${yearNum}.js, falling back to default layout.`, e);
    }

    const event = await prisma.event.findUnique({
        where: { year: yearNum },
    });

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-[#fffcf5]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/prevEvent"
                        className="inline-flex items-center gap-2 text-[#98221b] hover:text-[#b55924] font-medium transition-colors mb-6"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Past Events
                    </Link>
                </div>

                {CustomYearComponent ? (
                    <CustomYearComponent event={event} year={yearNum} />
                ) : (
                    <div className="space-y-12">
                        {/* Header */}
                        <div className="text-center">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[#b55924]/20 border border-[#b55924]/50 text-[#4d1700] font-bold text-xl mb-4">
                                YEAR {yearNum}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-[#4d1700] mb-4" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                                {event?.title || `RamLeela Celebration ${yearNum}`}
                            </h1>
                            <div className="w-24 h-1 bg-[#b55924] mx-auto rounded-full mb-6"></div>
                            {event?.description && (
                                <p className="text-[#4d1700]/80 max-w-3xl mx-auto text-lg leading-relaxed">
                                    {event.description}
                                </p>
                            )}
                        </div>

                        {/* Event Images */}
                        {event?.images && event.images.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {event.images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-white/20 group">
                                        <Image
                                            src={img}
                                            alt={`${event.title || 'Event'} image ${idx + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center bg-white/50 backdrop-blur-md rounded-2xl border border-amber-900/10">
                                <p className="text-[#4d1700]/60">Glimpses and photo gallery for {yearNum} will be updated soon.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
