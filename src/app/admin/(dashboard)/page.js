import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
    let stats = [];
    try {
        const counts = await prisma.$queryRawUnsafe(`
            SELECT 
                (SELECT COUNT(*)::int FROM "Event") as event_count,
                (SELECT COUNT(*)::int FROM "Member") as member_count,
                (SELECT COUNT(*)::int FROM "Achievement") as achievement_count,
                (SELECT COUNT(*)::int FROM "PressRelease") as press_release_count,
                (SELECT COUNT(*)::int FROM "Partner") as partner_count,
                (SELECT COUNT(*)::int FROM "NoticeBoard") as notice_board_count
        `);
        const data = counts[0] || {};
        stats = [
            { name: "Events", count: data.event_count || 0, href: "/admin/events", icon: "📅" },
            { name: "Members", count: data.member_count || 0, href: "/admin/members", icon: "👥" },
            { name: "Achievements", count: data.achievement_count || 0, href: "/admin/achievements", icon: "🏆" },
            { name: "Press Releases", count: data.press_release_count || 0, href: "/admin/press-releases", icon: "📰" },
            { name: "Partners", count: data.partner_count || 0, href: "/admin/partners", icon: "🤝" },
            { name: "Notice Board", count: data.notice_board_count || 0, href: "/admin/notice-board", icon: "📋" },
        ];
    } catch (e) {
        console.error("Failed to load dashboard stats:", e);
        stats = [
            { name: "Events", count: 0, href: "/admin/events", icon: "📅" },
            { name: "Members", count: 0, href: "/admin/members", icon: "👥" },
            { name: "Achievements", count: 0, href: "/admin/achievements", icon: "🏆" },
            { name: "Press Releases", count: 0, href: "/admin/press-releases", icon: "📰" },
            { name: "Partners", count: 0, href: "/admin/partners", icon: "🤝" },
            { name: "Notice Board", count: 0, href: "/admin/notice-board", icon: "📋" },
        ];
    }

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
