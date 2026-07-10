"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getNoticeTitles, getNoticeDetails } from "@/app/actions/notice-board";
import { motion, AnimatePresence } from "framer-motion";

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [activeNotice, setActiveNotice] = useState(null);
    const [loadingList, setLoadingList] = useState(true);
    const [loadingDetails, setLoadingDetails] = useState(false);

    // Fetch notice titles on mount
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const list = await getNoticeTitles();
                setNotices(list || []);
                if (list && list.length > 0) {
                    const firstId = list[0].id;
                    setActiveId(firstId);

                    // Fetch details of the first notice
                    setLoadingDetails(true);
                    const details = await getNoticeDetails(firstId);
                    setActiveNotice(details);
                    setLoadingDetails(false);
                }
            } catch (err) {
                console.error("Error fetching notice titles:", err);
            } finally {
                setLoadingList(false);
            }
        };
        fetchInitialData();
    }, []);

    // Fetch full details of a specific notice when clicked
    const handleSelectNotice = async (id) => {
        if (id === activeId || loadingDetails) return;
        setActiveId(id);
        setLoadingDetails(true);
        try {
            const details = await getNoticeDetails(id);
            setActiveNotice(details);
        } catch (err) {
            console.error("Error fetching notice details:", err);
        } finally {
            setLoadingDetails(false);
        }
    };

    return (
        <section className="py-20 md:py-28 bg-[#fffcf5] overflow-hidden relative" id="notices">
            {/* Custom Scrollbar Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .notice-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .notice-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .notice-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                .notice-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}} />

            {/* Background Decorative Blurs */}
            <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#f5e9d2] rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none -translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col items-start mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-[2px] w-12 bg-[#98221b]"></div>
                        <span className="text-[#98221b] tracking-[0.2em] text-xs md:text-sm font-bold uppercase">
                            Notice Board
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#3b271a]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        सूचना पट्ट
                    </h2>
                </div>

                {loadingList ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-[#98221b]/20 border-t-[#98221b] rounded-full animate-spin"></div>
                    </div>
                ) : notices.length === 0 ? (
                    <div className="bg-[#fcfaf8]/60 border border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-500">
                        <span className="text-4xl mb-4 block">📰</span>
                        <p className="font-semibold text-lg">कोई सूचना उपलब्ध नहीं है</p>
                        <p className="text-sm mt-1 text-slate-400">No announcements in the Notice Board yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Left Side: Scrollable Titles Column */}
                        <div className="col-span-1 lg:col-span-4 flex flex-col gap-3 max-h-[460px] overflow-y-auto pr-3 notice-scrollbar">
                            {notices.map((notice) => (
                                <button
                                    key={notice.id}
                                    onClick={() => handleSelectNotice(notice.id)}
                                    style={{ fontFamily: "var(--font-cinzel), serif" }}
                                    className={`w-full text-center py-5 px-6 rounded-2xl transition-all duration-300 text-sm md:text-base font-semibold border flex items-center justify-center min-h-[80px] shadow-sm cursor-pointer ${activeId === notice.id
                                        ? "bg-[#98221b] border-[#98221b] text-white font-bold scale-[1.02]"
                                        : "bg-[#fcfaf8]/70 border-slate-100 hover:border-slate-200 text-[#3b271a] hover:bg-[#f0eae2]/80"
                                        }`}
                                >
                                    {notice.title}
                                </button>
                            ))}
                        </div>

                        {/* Right Side: Active Notice Detail Card */}
                        <div className="col-span-1 lg:col-span-8 bg-[#fcfaf8] border border-slate-100 rounded-3xl p-6 md:p-10 shadow-md min-h-[460px] flex items-center justify-center relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {loadingDetails ? (
                                    <motion.div
                                        key="loader"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center gap-3"
                                    >
                                        <div className="w-8 h-8 border-3 border-[#f3b007]/20 border-t-[#f3b007] rounded-full animate-spin"></div>
                                        <span className="text-xs text-slate-400">Loading Notice Details...</span>
                                    </motion.div>
                                ) : activeNotice ? (
                                    <motion.div
                                        key={activeNotice.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full h-full"
                                    >
                                        {/* Notice Image Column */}
                                        <div className="w-full md:w-1/2 max-w-[280px] shrink-0">
                                            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white rotate-[-1deg] bg-white">
                                                {activeNotice.image ? (
                                                    <Image
                                                        src={activeNotice.image}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, 280px"
                                                        alt={activeNotice.title}
                                                        priority
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-[#f1f5f9] flex flex-col items-center justify-center text-[#98221b]/60">
                                                        <span className="text-5xl mb-2">📰</span>
                                                        <span className="text-[10px] uppercase font-bold tracking-wider">Shree Ramleela</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Notice Text Details Column */}
                                        <div className="flex-1 flex flex-col justify-center text-center md:text-left pt-2">
                                            <h3 className="text-xl md:text-2xl font-bold text-[#3b271a] leading-snug mb-4">
                                                {activeNotice.title}
                                            </h3>

                                            {activeNotice.description ? (
                                                <p className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                                    {activeNotice.description}
                                                </p>
                                            ) : (
                                                <p className="text-slate-400 text-sm italic">
                                                    No details description provided.
                                                </p>
                                            )}

                                            {activeNotice.publishDate && (
                                                <span className="text-[11px] font-semibold text-slate-400 mt-6 block">
                                                    PUBLISHED ON: {new Date(activeNotice.publishDate).toLocaleDateString("en-IN", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric"
                                                    })}
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-slate-400 text-sm">Select a notice to view details.</div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                )}
            </div>
        </section>
    );
};

export default NoticeBoard;