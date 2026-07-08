"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { footerLinks, pastEvents, socialLinks } from "../constants/index.js";

const Footer = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            className="relative w-full text-[#fffaf0] pt-16 pb-8 px-6 md:px-12 lg:px-20 overflow-hidden"
            style={{
                background: "linear-gradient(rgba(89, 32, 2, 0.6), rgba(89, 32, 2, 0.67)), url('/images/footerImg.png') center/cover no-repeat",
                backgroundAttachment: "scroll"
            }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-[#fffaf0]/15">
                {/* Brand & Hindi Description */}
                <div className="flex flex-col space-y-6">
                    <Link href="/">
                        <Image
                            src="/images/srst_logo.png"
                            alt="Shree RamLeela Seva Trust Logo"
                            width={120}
                            height={120}
                            className="object-none"
                            style={{ height: "auto" }}
                        />
                    </Link>
                    <p className="text-sm md:text-base leading-relaxed text-[#fffaf0]/80 font-medium max-w-xs">
                        श्री रामलीला सेवा ट्रस्ट ग्रेटर नोएडा वेस्ट (रजि. न. 703) गत वर्षों में इस क्षेत्र में रामलीला आयोजित करता रहा है। जो कि इस क्षेत्र का पहला बड़ा आयोजन है।
                    </p>
                </div>

                {/* Useful Links */}
                <div className="flex flex-col space-y-6">
                    <h4 className="text-lg md:text-xl font-bold uppercase tracking-wider text-[#fffaf0]">Useful Links</h4>
                    <ul className="flex flex-col space-y-3">
                        {footerLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.link}
                                    className="text-sm md:text-base text-[#fffaf0]/75 hover:text-[#fffaf0] transition-colors duration-200"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Past Events */}
                <div className="flex flex-col space-y-6">
                    <h4 className="text-lg md:text-xl font-bold uppercase tracking-wider text-[#fffaf0]">Past Events</h4>
                    <ul className="flex flex-col space-y-3">
                        {pastEvents.map((event) => (
                            <li key={event.name}>
                                <Link
                                    href={event.link}
                                    className="text-sm md:text-base text-[#fffaf0]/75 hover:text-[#fffaf0] transition-colors duration-200"
                                >
                                    {event.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info & Socials */}
                <div className="flex flex-col space-y-6 relative">
                    <h4 className="text-lg md:text-xl font-bold uppercase tracking-wider text-[#fffaf0]">Contact Info</h4>
                    <div className="flex flex-col space-y-4">
                        {/* Phone */}
                        <a
                            href="tel:+919643976677"
                            className="flex items-center gap-3 text-sm md:text-base text-[#fffaf0]/80 hover:text-[#fffaf0] transition-colors duration-200 group"
                        >
                            <svg className="w-5 h-5 text-[#ff4c00] shrink-0 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span>+91 96439 76677</span>
                        </a>

                        {/* Email */}
                        <a
                            href="mailto:shreeramleela.gnw@gmail.com"
                            className="flex items-center gap-3 text-sm md:text-base text-[#fffaf0]/80 hover:text-[#fffaf0] transition-colors duration-200 group"
                        >
                            <svg className="w-5 h-5 text-[#ff4c00] shrink-0 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className="break-all">shreeramleela.gnw@gmail.com</span>
                        </a>
                    </div>

                    {/* Social links */}
                    <div className="flex gap-3 pt-2">
                        {socialLinks.map((social) => {
                            let iconSvg = null;
                            if (social.icon === "facebook") {
                                iconSvg = (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                                    </svg>
                                );
                            } else if (social.icon === "twitter") {
                                iconSvg = (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                );
                            } else if (social.icon === "youtube") {
                                iconSvg = (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                );
                            } else if (social.icon === "instagram") {
                                iconSvg = (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                );
                            }
                            return (
                                <a
                                    key={social.name}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex justify-center items-center rounded-lg border border-[#fffaf0]/30 hover:border-[#fffaf0] w-10 h-10 transition-all duration-300 hover:scale-105 hover:bg-[#fffaf0]/10"
                                    title={social.name}
                                >
                                    {iconSvg}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom copyright row */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 text-xs md:text-sm font-semibold text-[#fffaf0]/75">
                <p className="text-center md:text-left mb-4 md:mb-0">
                    All Rights Reserved © Shree Ram Leela GNW 2025
                </p>
            </div>

            {/* Floating Whatsapp Button */}
            <a
                href="https://wa.me/919643976677"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 left-6 z-50 flex items-center justify-center bg-[#25d366] rounded-full w-14 h-14 shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group"
                title="Chat with us on WhatsApp"
            >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.116-2.886-6.98C16.59 1.897 14.116.865 11.48.865 6.042.865 1.623 5.284 1.618 10.724c-.001 1.702.463 3.364 1.343 4.819l-.993 3.633 3.738-.98c1.472.84 3.09 1.267 4.671 1.267zm9.055-6.721c-.245-.122-1.452-.717-1.678-.8-.225-.082-.389-.122-.552.122-.163.245-.634.8-.777.96-.143.16-.286.18-.531.057-.245-.122-1.036-.381-1.974-1.217-.73-.65-1.223-1.454-1.366-1.7-.143-.245-.015-.377.108-.499.111-.11.245-.286.368-.429.123-.143.163-.245.245-.409.082-.163.041-.307-.02-.429-.062-.122-.552-1.329-.756-1.821-.198-.478-.4-.413-.552-.421-.143-.008-.306-.01-.47-.01-.163 0-.429.062-.654.307-.225.245-.859.839-.859 2.045 0 1.206.879 2.372.999 2.535.122.163 1.729 2.64 4.19 3.705.586.253 1.043.404 1.399.517.59.187 1.125.161 1.549.098.472-.07 1.452-.593 1.656-1.165.204-.572.204-1.063.143-1.165-.062-.102-.225-.163-.47-.286z" />
                </svg>
            </a>

            {/* Back to Top Vertical Button */}
            <button
                onClick={handleScrollToTop}
                className="absolute right-6 bottom-24 hidden lg:flex flex-col items-center gap-2 select-none outline-none group text-[#ff4c00] hover:text-[#fffaf0] transition-colors duration-300"
            >
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] [writing-mode:vertical-lr] transform rotate-180">
                    GO BACK TOP
                </span>
                <div className="w-0.5 h-16 bg-[#ff4c00] group-hover:bg-[#fffaf0] transition-colors duration-300" />
            </button>
        </footer>
    );
};

export default Footer;