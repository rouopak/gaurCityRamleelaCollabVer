import prisma from "@/lib/prisma";
import Image from "next/image";

export const metadata = {
    title: "Press Releases | Shree RamLeela Seva Trust",
    description: "Latest news and press coverage about Gaur City RamLeela.",
};

export default async function PressReleasesPage() {
    const releases = await prisma.pressRelease.findMany({
        where: { published: true },
        orderBy: { publishDate: "desc" },
    });

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#F5E9D2] mb-4" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        Press Releases
                    </h1>
                    <div className="w-24 h-1 bg-[#b55924] mx-auto rounded-full mb-6"></div>
                    <p className="text-[#F5E9D2]/70 max-w-2xl mx-auto">
                        Stay updated with the latest news, media coverage, and official announcements from the Shree RamLeela Seva Trust.
                    </p>
                </div>

                {releases.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                        <p className="text-[#F5E9D2]/50 text-lg">No press releases have been published yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {releases.map((item) => (
                            <article 
                                key={item.id} 
                                className="flex flex-col bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#b55924]/10 group"
                            >
                                {item.image ? (
                                    <div className="relative w-full aspect-video overflow-hidden border-b border-white/10">
                                        <Image 
                                            src={item.image} 
                                            alt={item.title} 
                                            fill 
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                ) : (
                                    <div className="relative w-full aspect-video bg-black/40 flex items-center justify-center border-b border-white/10">
                                        <span className="text-4xl">📰</span>
                                    </div>
                                )}
                                
                                <div className="flex flex-col flex-1 p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <svg className="w-4 h-4 text-[#b55924]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <time className="text-sm text-[#b55924] font-medium tracking-wide">
                                            {new Date(item.publishDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </time>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-[#F5E9D2] mb-3 line-clamp-2" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                                        {item.title}
                                    </h3>
                                    
                                    {item.content && (
                                        <p className="text-[#F5E9D2]/70 text-sm line-clamp-4 leading-relaxed mb-6 flex-1">
                                            {item.content}
                                        </p>
                                    )}
                                    
                                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center text-[#b55924] text-sm font-semibold group-hover:text-[#F5E9D2] transition-colors">
                                        Read Full Release
                                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}