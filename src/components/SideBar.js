"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navLinks } from "../constants/index.js";

const SideBar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        const timer = setTimeout(() => setIsMobile(mediaQuery.matches), 0);
        const handleMediaQueryChange = (event) => setIsMobile(event.matches);
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        return () => {
            clearTimeout(timer);
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    if (!isMobile) return null;

    return (
        <div className="w-full relative z-50" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
            {/* Top Bar (Visible on mobile) */}
            <div className="flex justify-between items-center w-full px-5 py-3 bg-[#fffaf0] fixed top-0 left-0 right-0 z-40 shadow-sm">
                <Link className="logo" href="/">
                    <Image
                        src="/images/srst_logo.png"
                        alt="Shree RamLeela Seva Trust Logo"
                        width={80}
                        height={60}
                        className="object-contain"
                        style={{ height: "auto" }}
                        priority
                    />
                </Link>
                <button 
                    className="flex items-center justify-center p-2 text-[#4d1700]"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsSidebarOpen(false)}>
                <div 
                    className={`absolute top-0 right-0 w-[280px] h-full bg-[#fffaf0] shadow-2xl transform transition-transform duration-300 flex flex-col ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-end p-5">
                        <button onClick={() => setIsSidebarOpen(false)} className="text-[#4d1700] p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <nav className="flex flex-col flex-1 pb-8 px-6 justify-between overflow-y-auto">
                        <div className="flex flex-col flex-1 justify-evenly space-y-4">
                            {navLinks.map(({ link, name }) => {
                                const isActive = pathname === link || (link.startsWith("/#") && pathname === "/");
                                return (
                                    <Link 
                                        key={name} 
                                        href={link} 
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={`text-xl uppercase tracking-[0.15em] font-bold transition-all duration-300 transform text-center ${isActive ? "text-[#b55924] scale-105" : "text-[#4d1700] hover:text-[#b55924] hover:scale-105"}`}
                                    >
                                        {name}
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="pt-6 mt-4 border-t border-[#e5e5e5] flex justify-center w-full">
                            <Link 
                                href="/donation" 
                                onClick={() => setIsSidebarOpen(false)}
                                className="flex items-center justify-center space-x-3 bg-[#b55924] hover:bg-[#8e451b] text-white py-4 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 w-full"
                            >
                                <svg className="lucide lucide-hand-heart" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
                                    <path d="m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95" />
                                    <path d="m2 15 6 6" />
                                    <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91" />
                                </svg>
                                <span className="font-bold text-lg uppercase tracking-wider">Donate Now</span>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default SideBar;