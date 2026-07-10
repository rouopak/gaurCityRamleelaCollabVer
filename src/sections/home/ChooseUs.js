"use client";

import React from "react";
import { motion } from "framer-motion";

const chooseUsData = [
  {
    id: 1,
    title: "Our Guest",
    description: "We are honored to welcome our esteemed guests, whose presence adds grace to our occasion. Your support and participation make this event truly special.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "#98221b", // Deep Red Theme
  },
  {
    id: 2,
    title: "Our Sponsors",
    description: "We sincerely thank our sponsors for their unwavering support and partnership. Their contribution drives the success and spirit of our event.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
        <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
        <path d="m2 16 6 6" />
        <circle cx="16" cy="9" r="2.9" />
        <circle cx="6" cy="5" r="3" />
      </svg>
    ),
    color: "#b55924", // Warm Orange/Brown Theme
  },
  {
    id: 3,
    title: "Media",
    description: "We thank our media partners for amplifying our voice and expanding our reach. Your coverage adds value and visibility to our efforts.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    ),
    color: "#3b271a", // Deep Brown Theme
  },
  {
    id: 4,
    title: "Major Attraction",
    description: "Get ready to experience the highlights that make this event truly unforgettable. Our major attractions promise excitement, engagement, and lasting memories.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
      </svg>
    ),
    color: "#d4af37", // Elegant Gold Theme
  },
];

export default function ChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Hexagon shape for the icon container
  const Hexagon = ({ color, children }) => (
    <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 shrink-0 group-hover:scale-110 transition-transform duration-500">
      <div 
        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
        style={{
          backgroundColor: color,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
        }}
      />
      <div 
        className="absolute inset-[4px] sm:inset-[5px]"
        style={{
          backgroundColor: color,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
        }}
      />
      <div className="relative z-10 text-white drop-shadow-sm">
        {children}
      </div>
    </div>
  );

  return (
    <section className="py-20 md:py-28 bg-[#fffcf5] overflow-hidden relative" id="why-choose-us">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f5e9d2] rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#f5e9d2] rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-8 bg-[#98221b]"></div>
            <span className="text-[#98221b] tracking-[0.2em] text-xs md:text-sm font-bold uppercase">
              Why
            </span>
            <div className="h-[2px] w-8 bg-[#98221b]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#3b271a]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
            CHOOSE <span className="text-[#98221b]">US</span>
          </h2>
          <div className="w-20 h-[3px] bg-[#98221b]/80 mt-4 rounded-full"></div>
        </div>

        {/* Grid of Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {chooseUsData.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="group bg-[#fcfaf8] p-6 sm:p-8 rounded-2xl border border-slate-200/60 shadow-md hover:shadow-xl hover:border-[#98221b]/30 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 sm:gap-8 cursor-default relative overflow-hidden"
            >
              {/* Traditional Ornate Corner Frames - Animated on hover */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#98221b]/20 group-hover:border-[#98221b] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all duration-300"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#98221b]/20 group-hover:border-[#98221b] group-hover:translate-x-[2px] group-hover:translate-y-[-2px] transition-all duration-300"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#98221b]/20 group-hover:border-[#98221b] group-hover:translate-x-[-2px] group-hover:translate-y-[2px] transition-all duration-300"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#98221b]/20 group-hover:border-[#98221b] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-300"></div>

              <Hexagon color={item.color}>
                {item.icon}
              </Hexagon>
              
              <div className="flex-1 mt-2 sm:mt-0 relative z-10">
                <h3 className="text-xl font-bold text-[#3b271a] mb-3 group-hover:text-[#98221b] transition-colors duration-300" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                  {item.title}
                </h3>
                <p className="text-[#5c4a40] leading-relaxed text-sm sm:text-[15px]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}