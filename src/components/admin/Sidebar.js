"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

const navItems = [
    {
        name: "Dashboard",
        href: "/admin",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        name: "Events",
        href: "/admin/events",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        name: "Members",
        href: "/admin/members",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
    {
        name: "Achievements",
        href: "/admin/achievements",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        ),
    },
    {
        name: "Press Releases",
        href: "/admin/press-releases",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
        ),
    },
    {
        name: "Partners",
        href: "/admin/partners",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const isActive = (href) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    return (
        <aside
            className={`fixed left-0 top-0 h-screen z-50 flex flex-col transition-all duration-300 border-r border-[#F5E9D2]/10 ${collapsed ? "w-[72px]" : "w-64"
                }`}
            style={{
                background: "linear-gradient(180deg, #1a0a00 0%, #2d1400 100%)",
            }}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 py-5 border-b border-[#F5E9D2]/10">
                <div className="relative w-10 h-10 shrink-0">
                    <Image
                        src="/images/srst_logo.png"
                        fill
                        className="object-contain"
                        alt="Logo"
                    />
                </div>
                {!collapsed && (
                    <div className="overflow-hidden">
                        <h2 className="text-[#F5E9D2] font-bold text-sm truncate"
                            style={{ fontFamily: "var(--font-cinzel), serif" }}>
                            Shree Ramleela Seva Trust
                        </h2>
                        <p className="text-[#F5E9D2]/40 text-[10px] truncate">
                            Admin Panel
                        </p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive(item.href)
                            ? "bg-[#b55924]/20 text-[#F5E9D2]"
                            : "text-[#F5E9D2]/50 hover:text-[#F5E9D2]/80 hover:bg-[#F5E9D2]/5"
                            }`}
                    >
                        <span className={`shrink-0 ${isActive(item.href) ? "text-[#b55924]" : ""}`}>
                            {item.icon}
                        </span>
                        {!collapsed && (
                            <span className="text-sm font-medium truncate">
                                {item.name}
                            </span>
                        )}
                        {isActive(item.href) && !collapsed && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#b55924]" />
                        )}
                    </Link>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="border-t border-[#F5E9D2]/10 p-3 space-y-1">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#F5E9D2]/50 hover:text-[#F5E9D2]/80 hover:bg-[#F5E9D2]/5 transition-all duration-200"
                >
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {!collapsed && <span className="text-sm">View Site</span>}
                </Link>

                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
                >
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {!collapsed && <span className="text-sm">Sign Out</span>}
                </button>

                {/* Collapse toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center gap-3 px-3 py-2 rounded-xl text-[#F5E9D2]/30 hover:text-[#F5E9D2]/60 hover:bg-[#F5E9D2]/5 transition-all duration-200 cursor-pointer"
                >
                    <svg
                        className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>
            </div>
        </aside>
    );
}
