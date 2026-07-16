import prisma from "@/lib/prisma";
import Image from "next/image";

export const metadata = {
    title: "Press Releases | Shree RamLeela Seva Trust",
    description: "Latest news and press coverage about Gaur City RamLeela.",
};

export default async function PressReleasesPage() {
    const dbReleases = await prisma.pressRelease.findMany({
        where: { published: true },
        orderBy: { publishDate: "desc" },
    });

    const staticReleases = Array.from({ length: 33 }, (_, i) => ({
        id: `static-${i + 1}`,
        image: `/images/pressReleases/${i + 1}.jpg`,
        title: `Archived Press Release ${i + 1}`,
        publishDate: null,
        content: null
    }));

    const releases = [...dbReleases, ...staticReleases];

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#4d1700] mb-4" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        Press Releases
                    </h1>
                    <div className="w-24 h-1 bg-[#b55924] mx-auto rounded-full mb-6"></div>
                    <p className="text-[#4d1700]/70 max-w-2xl mx-auto">
                        Stay updated with the latest news, media coverage, and official announcements from the Shree RamLeela Seva Trust.
                    </p>
                </div>

                {releases.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                        <p className="text-[#4d1700]/50 text-lg">No press releases have been published yet.</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {releases.map((item) => (
                            item.image && (
                                <div
                                    key={item.id}
                                    className="relative w-full overflow-hidden rounded-2xl border border-white/10 hover:shadow-2xl hover:shadow-[#b55924]/20 transition-all duration-300 hover:-translate-y-2 group break-inside-avoid"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title || "Press Release"}
                                        width={800}
                                        height={1200}
                                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}