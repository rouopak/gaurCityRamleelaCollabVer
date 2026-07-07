import React from 'react'

const landing = () => {
    return (
        <section className="flex flex-col items-center justify-center text-center px-6 py-20 min-h-[70vh] bg-transparent">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#4d1700] mb-6">
                Shree RamLeela Seva Trust
            </h1>
            <p className="text-xl md:text-2xl text-[#4d1700]/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                Celebrating and preserving the divine saga of Ramayana through cultural devotion, community engagement, and spiritual events in Gaur City.
            </p>
            <h2 className="text-xl md:text-2xl text-[#4d1700]/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                <span>+91 96439 76677</span>
                <br />
                <span>shreeramleela.gnw@gmail.com</span>
            </h2>
            <div className="flex gap-4 justify-center">
                <a href="#contact" className="px-6 py-3 bg-[#4d1700] text-[#fffaf0] rounded-lg font-semibold shadow hover:bg-[#4d1700]/90 transition duration-300">
                    Email Us
                </a>
            </div>
        </section>
    )
}

export default landing