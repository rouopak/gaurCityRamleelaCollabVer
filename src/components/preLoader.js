"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const PreLoader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user has already visited in this session to show only on first load
        const hasVisited = sessionStorage.getItem("visited");
        if (hasVisited) {
            setLoading(false);
            return;
        }

        // Run the loader for 2.5 seconds, then set visited and close it
        const timer = setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("visited", "true");
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

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