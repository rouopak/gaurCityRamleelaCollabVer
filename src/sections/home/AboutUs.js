"use client";

import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    // Animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -5 },
        visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, ease: "backOut" } }
    };

    return (
        <section className="py-20 md:py-32 bg-[#fffcf5] overflow-hidden relative" id="about">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f5e9d2] rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#f5e9d2] rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* Left Side - Text Content */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-col items-start"
                    >
                        {/* Subtitle */}
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                            <div className="h-[2px] w-12 bg-[#98221b]"></div>
                            <span className="text-[#98221b] tracking-[0.2em] text-xs md:text-sm font-bold uppercase">
                                About Us
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.div variants={fadeUp} className="mb-6">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#3b271a]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                                <span className="text-[#98221b] font-bold">Shri Ramleela Seva Trust</span><br />
                                <span className="font-medium">Greater Noida West</span>
                            </h2>
                        </motion.div>

                        {/* Paragraphs in Hindi */}
                        <motion.p variants={fadeUp} className="text-[#5c4a40] text-sm md:text-base leading-relaxed mb-4">
                            प्रारंभ में मित्रों का एक समूह जुड़ता है, आपस में चर्चा करता है और उसके बाद ग्रेटर नोएडा वेस्ट के और भी निवासी जुड़ते जाते हैं। फिर एक ट्रस्ट का गठन होता है और एक विचार महीनों की मेहनत के बाद अंततः मूर्त रूप ले लेता है।
                        </motion.p>

                        <motion.p variants={fadeUp} className="text-[#5c4a40] text-sm md:text-base leading-relaxed mb-4">
                            राम कथा का मंचन मात्र ही रामलीला नहीं है। अपितु मर्यादा पुरूषोत्तम श्री राम के जीवन के आदर्शो का सन्देश जन सामान्य व अगली पीढ़ी तक आसानी से पहुंचाना ही इसका मुख्य उद्देश्य होता है।
                        </motion.p>

                        <motion.p variants={fadeUp} className="text-[#5c4a40] text-sm md:text-base leading-relaxed mb-8">
                            अतः सांस्कृतिक सन्देश को अगली पीढ़ी तक पहुंचाने में और भगवान राम का सन्देश जन-जन तक प्रसारित करने में रामलीला एक उपयोगी उपक्रम है।
                        </motion.p>

                        {/* Bottom Actions */}
                        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6 md:gap-10 mt-2">
                            <a href="#about" className="bg-[#811915] text-[#F5E9D2] px-8 py-3.5 rounded text-sm tracking-widest font-bold uppercase hover:bg-[#6b1411] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                Learn More
                            </a>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#f5e9d2] flex items-center justify-center text-[#811915] shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-[#5c4a40] font-medium uppercase tracking-wider mb-1">Need help?</p>
                                    <a href="tel:+919643976677" className="text-lg md:text-xl font-bold text-[#3b271a] hover:text-[#98221b] transition-colors" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                                        +91 96439 76677
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Image Collage */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative h-[500px] md:h-[600px] w-full mt-10 lg:mt-0 z-10 flex items-center justify-center"
                    >
                        {/* Decorative Background Shape */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="absolute w-[80%] h-[80%] bg-[#98221b] rounded-full opacity-10 blur-[60px]"
                        ></motion.div>

                        <div className="relative w-full max-w-[500px] h-full flex items-center justify-center">
                            {/* Image 3 (Top Right - 140x215) */}
                            <motion.div
                                variants={imageVariants}
                                transition={{ delay: 0.2 }}
                                className="absolute top-[5%] right-[5%] w-[35%] aspect-[140/215] rounded-2xl overflow-hidden shadow-xl border-[6px] border-[#fffcf5] z-10 group"
                            >
                                <img src="https://www.srstrust.com/assets/images/about-two-img-3.jpg" alt="Ramleela Actors" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                            </motion.div>

                            {/* Image 1 (Main/Left - 440x440) */}
                            <motion.div
                                variants={imageVariants}
                                className="absolute top-[15%] left-0 w-[65%] aspect-square rounded-2xl overflow-hidden shadow-2xl border-[8px] border-[#fffcf5] z-20 group"
                            >
                                <img src="https://www.srstrust.com/assets/images/about-two-img-1.jpg" alt="Ravana Actor" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                            </motion.div>

                            {/* Image 2 (Bottom Right - 250x250) */}
                            <motion.div
                                variants={imageVariants}
                                transition={{ delay: 0.4 }}
                                className="absolute bottom-[5%] right-[10%] w-[45%] aspect-square rounded-2xl overflow-hidden shadow-2xl border-[6px] border-[#fffcf5] z-30 group"
                            >
                                <img src="https://www.srstrust.com/assets/images/about-two-img-2.jpg" alt="Ram, Laxman, Sita on boat" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                            </motion.div>

                            {/* Experience Badge */}
                            <motion.div
                                variants={fadeUp}
                                transition={{ delay: 0.6 }}
                                className="absolute bottom-[10%] left-[-5%] md:left-[-10%] bg-[#811915] text-[#F5E9D2] py-4 px-6 md:py-5 md:px-8 rounded-xl shadow-2xl z-40 border-2 border-[#a3322a] flex flex-col items-center justify-center transform hover:-translate-y-1 transition-transform duration-300"
                            >
                                <span className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-cinzel), serif" }}>SRST</span>
                                <span className="text-[10px] md:text-xs uppercase tracking-widest mt-1 font-medium">Greater Noida</span>
                            </motion.div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;