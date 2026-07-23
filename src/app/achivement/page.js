import prisma from "@/lib/prisma";
import Image from "next/image";
import staticAchievements from "@/data/achievements.json";

export const metadata = {
    title: "Achievements | Shree RamLeela Seva Trust",
    description: "Awards, milestones and recognition of the Shree RamLeela Seva Trust for preserving and showcasing our cultural heritage.",
};

export default async function AchievementsPage() {
    // Admin-portal achievements come first (priority 1)
    const dbAchievements = await prisma.achievement.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b55924]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#4d1700]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#4d1700] mb-4" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        Achievements &amp; Milestones
                    </h1>
                    <div className="w-24 h-1 bg-[#b55924] mx-auto rounded-full mb-6"></div>
                    <p className="text-[#4d1700]/70 max-w-2xl mx-auto">
                        Celebrating the recognition and awards received for our continuous efforts in preserving and showcasing our cultural heritage.
                    </p>
                </div>

                {/* ─── Admin Portal Achievements (shown on top) ─── */}
                {dbAchievements.length > 0 && (
                    <div className="mb-20">
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                            {dbAchievements.map((item) => (
                                <div
                                    key={item.id}
                                    className="break-inside-avoid group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#b55924]/20"
                                >
                                    {item.image && (
                                        <div className="relative w-full aspect-video overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        {item.year && (
                                            <div className="inline-block px-3 py-1 rounded-full bg-[#b55924]/20 text-[#b55924] text-sm font-bold tracking-wider mb-3">
                                                {item.year}
                                            </div>
                                        )}
                                        <h3 className="text-xl font-bold text-[#4d1700] mb-2" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="text-[#4d1700]/70 leading-relaxed text-sm">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ─── Static Achievements ─── */}
                <div className="space-y-24">
                    {staticAchievements.map((section) => (
                        <div key={section.id}>
                            {/* Section Header */}
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-[#4d1700] mb-3" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                                    {section.title}
                                </h2>
                                <div className="w-16 h-1 bg-[#b55924] mx-auto rounded-full mb-4"></div>
                                {section.description && (
                                    <p className="text-[#4d1700]/70 max-w-2xl mx-auto">
                                        {section.description}
                                    </p>
                                )}
                            </div>

                            {/* Image Gallery - Masonry-style like Press Releases */}
                            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                                {section.images.map((imgSrc, imgIndex) => (
                                    <div
                                        key={`${section.id}-${imgIndex}`}
                                        className="break-inside-avoid relative w-full overflow-hidden rounded-2xl border border-white/10 hover:shadow-2xl hover:shadow-[#b55924]/20 transition-all duration-300 hover:-translate-y-2 group"
                                    >
                                        <Image
                                            src={imgSrc}
                                            alt={`${section.title} - ${imgIndex + 1}`}
                                            width={800}
                                            height={600}
                                            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}