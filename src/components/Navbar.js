"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "../constants/index.js";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const threshold = pathname === "/" ? (window.innerHeight + 750) : 10;
            const isScrolled = window.scrollY > threshold;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
            <div className="inner">
                {/* Brand Logo & Text */}
                <Link className="logo" href="/">
                    <Image
                        src="/images/srst_logo.png"
                        alt="Shree RamLeela Seva Trust Logo"
                        width={100}
                        height={75}
                        className="object-contain"
                        style={{ height: "auto" }}
                        priority
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="desktop">
                    <ul>
                        {navLinks.map(({ link, name }) => {
                            const isActive = pathname === link || (link.startsWith("/#") && pathname === "/");
                            return (
                                <li key={name} className={`group ${isActive ? "active" : ""}`}>
                                    <Link href={link}>
                                        <span>{name}</span>
                                        <span className="underline" />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Contact Button */}
                <Link href="/donation" className="contact-btn group">
                    <div className="inner">
                        <svg
                            className="lucide lucide-hand-heart button-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
                            <path d="m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95" />
                            <path d="m2 15 6 6" />
                            <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91" />
                        </svg>
                        <span>Donate</span>
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;