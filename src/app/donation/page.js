"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const DonationPage = () => {
    const [isEnlarged, setIsEnlarged] = useState(false);

    return (
        <section className="py-12 md:py-24 bg-gradient-to-b from-[#fffaf3] to-white min-h-screen relative overflow-hidden">
            {/* Background elements to make it look premium */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#fa4b1c] opacity-[0.03] rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 -left-40 w-[30rem] h-[30rem] bg-[#b55924] opacity-[0.04] rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#fa4b1c] font-semibold uppercase tracking-wider text-sm md:text-base">Donate Now</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 font-[family-name:var(--font-cinzel)] text-[#b55924]">Support Our Cause</h2>
                    <div className="w-24 h-1 bg-[#fa4b1c] mx-auto mt-4 rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
                    {/* Left side text content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6 text-gray-800 text-lg leading-relaxed bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100"
                    >
                        <p className="font-medium text-gray-700">
                            We sincerely appreciate your consideration and support. Every donation, no matter the size, makes a significant difference in Shree Ramleela Trust&apos;s ability to achieve our goals.
                        </p>
                        
                        <div className="bg-[#fffaf3] p-6 rounded-xl border-l-4 border-[#b55924]">
                            <p className="font-bold text-[#b55924] font-[family-name:var(--font-cinzel)] text-xl">
                                Thanks & Regards,<br/> 
                                <span className="text-[#fa4b1c]">Shree Ramleela Sewa Trust, Greater Noida (West)</span>
                            </p>
                        </div>

                        <div className="text-base bg-gray-50 p-5 rounded-lg text-gray-600">
                            <span className="font-bold text-gray-800">Note:</span> Please do the payment online, send the payment details along with your personal information to E-mail ID: 
                            <a href="mailto:shreeramleela.gnw@gmail.com" className="text-[#fa4b1c] font-semibold hover:underline ml-1 break-all">
                                shreeramleela.gnw@gmail.com
                            </a>. Our member will connect you and provide your Payment Receipt.
                        </div>
                    </motion.div>

                    {/* Right side Bank Details & QR */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col space-y-8"
                    >
                        {/* Bank Details */}
                        <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
                            <h3 className="text-2xl font-bold font-[family-name:var(--font-cinzel)] text-[#b55924] mb-4">
                                SHREE RAMLEELA SEWA TRUST <br />
                                <span className="text-[#fa4b1c] text-xl">GREATER NOIDA WEST</span>
                            </h3>
                            
                            <div className="space-y-3 text-lg text-gray-700">
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="font-semibold text-gray-900">Bank:</span>
                                    <span>State Bank of India</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="font-semibold text-gray-900">A/c No:</span>
                                    <span className="font-mono tracking-wider font-bold">37870384117</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="font-semibold text-gray-900">IFSC:</span>
                                    <span className="font-mono font-bold">SBIN0018934</span>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <span className="font-semibold text-gray-900 shrink-0">Branch:</span>
                                    <span className="text-right">Gaur City 1 Greater Noida West</span>
                                </div>
                            </div>
                        </div>

                        {/* QR Code */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ 
                                type: "spring",
                                stiffness: 100,
                                damping: 12,
                                delay: 0.6 
                            }}
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0px 15px 30px rgba(181, 89, 36, 0.2)"
                            }}
                            className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgb(0,0,0,0.15)] border-2 border-[#b55924]/30 flex flex-col items-center justify-center relative overflow-hidden group"
                        >
                            {/* Glowing background effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#fa4b1c]/5 to-[#b55924]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <motion.h4 
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-xl font-bold text-[#b55924] mb-6 uppercase tracking-widest relative z-10"
                            >
                                Scan to Donate
                            </motion.h4>

                            <motion.div 
                                className="relative w-full max-w-[380px] aspect-[8/9] rounded-2xl overflow-hidden shadow-inner bg-white flex items-center justify-center border-4 border-gray-50/80 z-10 cursor-pointer"
                                whileHover={{ rotate: [-1, 1, -1, 0], transition: { duration: 0.5 } }}
                                onClick={() => setIsEnlarged(true)}
                            >
                                <Image 
                                    src="/images/donate-now.jpg" 
                                    alt="Donate QR Code" 
                                    fill
                                    className="object-contain p-2"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                                {/* Overlay hint */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </motion.div>
                            
                            <p className="mt-6 text-base text-gray-600 font-semibold bg-gray-50 py-2 px-6 rounded-full relative z-10 border border-gray-100">
                                Accepts all UPI payment apps
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Fullscreen Lightbox Modal */}
            <AnimatePresence>
                {isEnlarged && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsEnlarged(false)}
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
                    >
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-[600px] aspect-[8/9] bg-white rounded-3xl p-4 shadow-2xl cursor-default"
                            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
                        >
                            <Image 
                                src="/images/donate-now.jpg" 
                                alt="Donate QR Code Enlarged" 
                                fill
                                className="object-contain p-4"
                                sizes="100vw"
                            />
                            {/* Close Button */}
                            <button 
                                onClick={() => setIsEnlarged(false)}
                                className="absolute top-6 right-6 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full p-2 transition-colors z-10 shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default DonationPage;