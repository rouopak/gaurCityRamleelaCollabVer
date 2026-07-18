import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import oldMembersData from "@/data/old_members.json";

export const metadata = {
    title: "Committee Members | Shree RamLeela Seva Trust",
    description: "Meet the dedicated members of the Shree RamLeela Seva Trust committee.",
};

export default async function MembersPage({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const pageStr = resolvedSearchParams?.page || "1";
    const currentPage = parseInt(pageStr, 10);
    const ITEMS_PER_PAGE = 16;

    const dbMembers = await prisma.member.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
    });

    const oldMembers = oldMembersData.map((m, index) => ({
        id: `old-${index}`,
        name: m.name,
        role: m.designation,
        photo: m.photo ? `/images/members/${m.photo}` : null,
    }));

    const allMembers = [...dbMembers, ...oldMembers];
    const totalPages = Math.ceil(allMembers.length / ITEMS_PER_PAGE);
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedMembers = allMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

                {allMembers.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                        <p className="text-[#4d1700]/50 text-lg">No members have been added yet.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                            {paginatedMembers.map((member) => (
                                <div
                                    key={member.id}
                                    className="group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#b55924]/20 flex flex-col"
                                >
                                    <div className="aspect-[4/5] relative bg-black/5 overflow-hidden">
                                        {member.photo ? (
                                            <Image
                                                src={member.photo}
                                                alt={member.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-[#4d1700]/20 text-6xl font-bold bg-[#f5e6df]">
                                                {member.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow bg-white/30 backdrop-blur-sm border-t border-white/20">
                                        <h3 className="text-xl font-bold text-[#4d1700] mb-1" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                                            {member.name}
                                        </h3>
                                        <p className="text-[#fa4b1c] font-medium text-sm tracking-wide uppercase">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                {Array.from({ length: totalPages }).map((_, i) => {
                                    const pageNumber = i + 1;
                                    const isActive = pageNumber === currentPage;
                                    return (
                                        <Link
                                            key={pageNumber}
                                            href={`/members?page=${pageNumber}`}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-all duration-300 ${
                                                isActive
                                                    ? 'bg-[#b55924] text-white shadow-lg'
                                                    : 'bg-white/10 text-[#4d1700] hover:bg-[#b55924]/20 border border-white/20'
                                            }`}
                                        >
                                            {pageNumber}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}