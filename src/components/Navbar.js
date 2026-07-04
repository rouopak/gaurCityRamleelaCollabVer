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
                        src="/images/temp_logo.png"
                        alt="Shree RamLeela Seva Trust Logo"
                        width={100}
                        height={100}
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
                        <span>Donate</span>
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;