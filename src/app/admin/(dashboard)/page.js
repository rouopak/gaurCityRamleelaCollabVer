import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
    const [
        eventCount,
        memberCount,
        achievementCount,
        pressReleaseCount,
        partnerCount,
    ] = await Promise.all([
        prisma.event.count(),
        prisma.member.count(),
        prisma.achievement.count(),
        prisma.pressRelease.count(),
        prisma.partner.count(),
    ]);

    const stats = [
        { name: "Events", count: eventCount, href: "/admin/events", icon: "📅" },
        { name: "Members", count: memberCount, href: "/admin/members", icon: "👥" },
        { name: "Achievements", count: achievementCount, href: "/admin/achievements", icon: "🏆" },
        { name: "Press Releases", count: pressReleaseCount, href: "/admin/press-releases", icon: "📰" },
        { name: "Partners", count: partnerCount, href: "/admin/partners", icon: "🤝" },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#F5E9D2]"
                    style={{ fontFamily: "var(--font-cinzel), serif" }}>
                    Dashboard
                </h1>
                <p className="text-[#F5E9D2]/50 text-sm mt-1">
                    Welcome to the Shree RamLeela Seva Trust Admin Panel
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {stats.map((stat) => (
                    <Link key={stat.name} href={stat.href}>
                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[#F5E9D2]/50 text-xs font-medium uppercase tracking-wider">
                                        {stat.name}
                                    </p>
                                    <p className="text-3xl font-bold text-[#F5E9D2] mt-2">
                                        {stat.count}
                                    </p>
                                </div>
                                <div className="text-3xl opacity-60">
                                    {stat.icon}
                                </div>
                            </div>
                            {stat.badge > 0 && (
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="admin-badge admin-badge-yellow">
                                        {stat.badge} unread
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
