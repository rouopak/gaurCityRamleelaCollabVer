"use client";

import { useEffect, useRef, useState } from "react";
import OMEx from "../../components/models/contact/OMEx"


const EmailUs = () => {
    const [isMobile, setIsMobile] = useState(false);
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        setIsMobile(mediaQuery.matches);
        const handleMediaQueryChange = (event) => setIsMobile(event.matches);
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate network request
        setTimeout(() => {
            setLoading(false);
            setForm({ name: "", email: "", message: "" });
            setShowPopup(true);
        }, 1200);
    };

    return (
        <section id="contact" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <h1 className="font-semibold md:text-5xl text-3xl text-center">
                    How Can we Help You?
                </h1>
                <div className="grid-12-cols mt-16">
                    <div className="xl:col-span-5">
                        <div className="flex-center border border-[#4d1700]/20 bg-[#fbf3e6] rounded-xl p-10 shadow-md">
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col gap-7"
                            >
                                <div>
                                    <label htmlFor="name" className="block text-[#4d1700] mb-2 font-medium">Your name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="What’s your good name?"
                                        className="w-full px-4 py-4 md:text-base text-sm placeholder:text-[#4d1700]/40 bg-[#fffaf0] border border-[#4d1700]/20 rounded-md text-[#4d1700] focus:outline-none focus:border-[#811915]/50 transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-[#4d1700] mb-2 font-medium">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="What’s your email address?"
                                        className="w-full px-4 py-4 md:text-base text-sm placeholder:text-[#4d1700]/40 bg-[#fffaf0] border border-[#4d1700]/20 rounded-md text-[#4d1700] focus:outline-none focus:border-[#811915]/50 transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-[#4d1700] mb-2 font-medium">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="How can We help you?"
                                        rows="5"
                                        className="w-full px-4 py-4 md:text-base text-sm placeholder:text-[#4d1700]/40 bg-[#fffaf0] border border-[#4d1700]/20 rounded-md text-[#4d1700] focus:outline-none focus:border-[#811915]/50 transition-colors resize-none"
                                        required
                                    />
                                </div>

                                <button type="submit" className="contact-btn group w-full md:w-fit justify-center cursor-pointer">
                                    <span>{loading ? "Sending..." : "Send"}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                    {!isMobile && <div className="xl:col-span-7 min-h-96">
                        <div className="bg-[#edd0a4] border border-[#4d1700]/15 w-full h-full hover:cursor-grab rounded-3xl overflow-hidden shadow-md">
                            <OMEx />
                        </div>
                    </div>}
                </div>
            </div>

            {/* Success Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/35 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-[#fffaf0] border border-[#4d1700]/20 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center text-center gap-5 transform scale-100 transition-all duration-300">
                        {/* Golden/Divine Ring with Checkmark */}
                        <div className="w-16 h-16 rounded-full bg-[#fbf3e6] border border-[#811915]/30 flex items-center justify-center text-[#811915] text-3xl font-bold shadow-sm">
                            ✓
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#4d1700] mb-2" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                                Message Sent!
                            </h3>
                            <p className="text-sm text-[#4d1700]/80 leading-relaxed">
                                Thank you for getting in touch. Your message has been sent successfully. We will get back to you shortly.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="contact-btn group w-full justify-center py-3 text-xs font-bold tracking-widest cursor-pointer"
                        >
                            <span>Close</span>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default EmailUs;
