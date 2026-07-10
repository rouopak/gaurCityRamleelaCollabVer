import prisma from "@/lib/prisma";
import Image from "next/image";

export const metadata = {
    title: "Committee Members | Shree RamLeela Seva Trust",
    description: "Meet the dedicated members of the Shree RamLeela Seva Trust committee.",
};

export default async function MembersPage() {
    const members = await prisma.member.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
    });

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#4d1700] mb-4" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        Committee Members
                    </h1>
                    <div className="w-24 h-1 bg-[#b55924] mx-auto rounded-full mb-6"></div>
                    <p className="text-[#4d1700]/70 max-w-2xl mx-auto">
                        Meet the dedicated individuals who make the Gaur City RamLeela possible through their selfless service and devotion.
                    </p>
                </div>

                {members.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                        <p className="text-[#4d1700]/50 text-lg">No members have been added yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className="group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#b55924]/20"
                            >
                                <div className="aspect-[4/5] relative bg-black/40 overflow-hidden">
                                    {member.photo ? (
                                        <Image
                                            src={member.photo}
                                            alt={member.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-[#4d1700]/20 text-6xl font-bold">
                                            {member.name.charAt(0)}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-xl font-bold text-[#ffffff] mb-1" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                                            {member.name}
                                        </h3>
                                        <p className="text-[#ffa875] font-medium text-sm tracking-wide uppercase">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}