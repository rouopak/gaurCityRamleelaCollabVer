"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { usePathname } from "next/navigation";

const PreLoader = () => {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const isLastAdminRef = useRef(null);

    useEffect(() => {
        const isCurrentAdmin = pathname?.startsWith("/admin");
        
        // 1. Initial mount handling
        if (isLastAdminRef.current === null) {
            isLastAdminRef.current = isCurrentAdmin;
            
            if (isCurrentAdmin) {
                sessionStorage.removeItem("visited");
                const timer = setTimeout(() => setLoading(false), 1800);
                return () => clearTimeout(timer);
            } else {
                const hasVisited = sessionStorage.getItem("visited");
                if (hasVisited) {
                    const timer = setTimeout(() => setLoading(false), 0);
                    return () => clearTimeout(timer);
                } else {
                    const timer = setTimeout(() => {
                        setLoading(false);
                        sessionStorage.setItem("visited", "true");
                    }, 2500);
                    return () => clearTimeout(timer);
                }
            }
            return;
        }

        // 2. Subsequent navigation boundary checks (Admin <-> Home)
        if (isLastAdminRef.current !== isCurrentAdmin) {
            isLastAdminRef.current = isCurrentAdmin;
            
            // Asynchronously reset loading to true to avoid React cascading render warnings
            const resetTimer = setTimeout(() => {
                setLoading(true);
            }, 0);

            const timer = setTimeout(() => {
                setLoading(false);
                if (!isCurrentAdmin) {
                    sessionStorage.setItem("visited", "true");
                } else {
                    sessionStorage.removeItem("visited");
                }
            }, isCurrentAdmin ? 1800 : 2500);

            return () => {
                clearTimeout(resetTimer);
                clearTimeout(timer);
            };
        }
    }, [pathname]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-black"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/preloaderImg.png"
                            fill
                            priority
                            className="object-cover"
                            alt="Background"
                        />
                        {/* Semi-transparent overlay to help the loader pop */}
                        <div className="absolute inset-0 bg-black/30" />
                    </div>

                    {/* Rotating Loader */}
                    <div className="relative z-10 w-28 h-28 md:w-36 md:h-36">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src="/images/loader.png"
                                fill
                                priority
                                className="object-contain"
                                alt="Loading..."
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PreLoader;