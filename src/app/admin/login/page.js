"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/admin";
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push(callbackUrl);
                router.refresh();
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1a0a00 0%, #2d1400 30%, #4d1700 60%, #811915 100%)" }}>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle, #F5E9D2 0%, transparent 70%)" }} />
                <div className="absolute -bottom-60 -left-40 w-96 h-96 rounded-full opacity-8"
                    style={{ background: "radial-gradient(circle, #b55924 0%, transparent 70%)" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
                    style={{ background: "radial-gradient(circle, #F5E9D2 0%, transparent 60%)" }} />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                        <Image
                            src="/images/srst_logo.png"
                            fill
                            className="object-contain"
                            alt="Shree RamLeela Seva Trust"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-[#F5E9D2] tracking-wide"
                        style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        Admin Portal
                    </h1>
                    <p className="text-[#F5E9D2]/50 text-sm mt-1">
                        Shree RamLeela Seva Trust
                    </p>
                </div>

                {/* Login Card */}
                <div className="rounded-2xl p-8 shadow-2xl border border-[#F5E9D2]/10"
                    style={{
                        background: "linear-gradient(145deg, rgba(245,233,210,0.08) 0%, rgba(245,233,210,0.03) 100%)",
                        backdropFilter: "blur(20px)",
                    }}>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-300 text-sm flex items-center gap-2">
                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#F5E9D2]/70 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="w-full px-4 py-3 rounded-xl border border-[#F5E9D2]/15 bg-[#F5E9D2]/5 text-[#F5E9D2] placeholder-[#F5E9D2]/30 focus:outline-none focus:border-[#b55924] focus:ring-1 focus:ring-[#b55924]/50 transition-all duration-300"
                                placeholder="admin@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#F5E9D2]/70 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="w-full px-4 py-3 rounded-xl border border-[#F5E9D2]/15 bg-[#F5E9D2]/5 text-[#F5E9D2] placeholder-[#F5E9D2]/30 focus:outline-none focus:border-[#b55924] focus:ring-1 focus:ring-[#b55924]/50 transition-all duration-300"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-6 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            style={{
                                background: loading
                                    ? "#4d1700"
                                    : "linear-gradient(135deg, #811915 0%, #b55924 100%)",
                                color: "#F5E9D2",
                                boxShadow: loading ? "none" : "0 4px 15px rgba(181, 89, 36, 0.3)",
                            }}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-[#F5E9D2]/30 text-xs mt-6">
                    Protected access for authorized administrators only.
                </p>
            </div>
        </div>
    );
}
