import prisma from "@/lib/prisma";
import Image from "next/image";

export const metadata = {
    title: "Achievements | Shree RamLeela Seva Trust",
    description: "Awards and milestones of the Shree RamLeela Seva Trust.",
};

export default async function AchievementsPage() {
    const achievements = await prisma.achievement.findMany({
        where: { published: true },
        orderBy: { year: "desc" },
    });

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b55924]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F5E9D2]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#F5E9D2] mb-4" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        Achievements & Milestones
                    </h1>
                    <div className="w-24 h-1 bg-[#b55924] mx-auto rounded-full mb-6"></div>
                    <p className="text-[#F5E9D2]/70 max-w-2xl mx-auto">
                        Celebrating the recognition and awards received for our continuous efforts in preserving and showcasing our cultural heritage.
                    </p>
                </div>

                {achievements.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                        <p className="text-[#F5E9D2]/50 text-lg">No achievements have been published yet.</p>
                    </div>
                ) : (
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#b55924]/50 to-transparent md:-translate-x-1/2"></div>

                        <div className="space-y-12">
                            {achievements.map((item, index) => (
                                <div key={item.id} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start`}>
                                    
                                    {/* Timeline dot */}
                                    <div className="absolute left-[20px] md:left-1/2 top-0 w-10 h-10 -translate-x-1/2 rounded-full bg-[#1a0a00] border-4 border-[#b55924] flex items-center justify-center shadow-[0_0_15px_rgba(181,89,36,0.5)] z-10">
                                        <span className="text-xl">🏆</span>
                                    </div>

                                    {/* Empty space for alternating layout on desktop */}
                                    <div className="hidden md:block md:w-1/2"></div>

                                    {/* Content Card */}
                                    <div className="w-full md:w-1/2 pl-16 md:pl-0">
                                        <div className={`bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 hover:bg-white/10 transition-colors duration-300 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                                            
                                            {item.year && (
                                                <div className="inline-block px-3 py-1 rounded-full bg-[#b55924]/20 text-[#b55924] text-sm font-bold tracking-wider mb-4">
                                                    {item.year}
                                                </div>
                                            )}
                                            
                                            <h3 className="text-2xl font-bold text-[#F5E9D2] mb-3" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                                                {item.title}
                                            </h3>
                                            
                                            {item.image && (
                                                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 border border-white/10">
                                                    <Image 
                                                        src={item.image} 
                                                        alt={item.title} 
                                                        fill 
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            
                                            {item.description && (
                                                <p className="text-[#F5E9D2]/70 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}