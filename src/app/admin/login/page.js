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
        <>
            {/* Mobile Block Screen */}
            <div className="lg:hidden min-h-screen w-full flex flex-col items-center justify-center bg-[#120703] p-6 text-center text-[#F5E9D2]">
                <div className="max-w-sm flex flex-col items-center gap-6">
                    <div className="relative w-20 h-20">
                        <Image src="/images/srst_logo.png" fill className="object-contain" alt="Shree RamLeela Seva Trust" />
                    </div>
                    <h1 className="text-xl font-bold uppercase tracking-wider text-[#b55924]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                        Desktop Only
                    </h1>
                    <p className="text-sm text-[#F5E9D2]/70 leading-relaxed">
                        The Admin Portal is not accessible on mobile or tablet devices. Please switch to a desktop computer to sign in.
                    </p>
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a href="/" className="mt-4 px-6 py-2.5 rounded-xl border border-[#F5E9D2]/10 bg-[#F5E9D2]/5 hover:bg-[#F5E9D2]/10 text-xs font-semibold uppercase tracking-wider">
                        Back to Home
                    </a>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:flex min-h-screen items-center justify-center bg-[#120703] w-full">
                <div className="w-full max-w-md px-6">
                    {/* Logo / Header */}
                    <div className="text-center mb-8">
                        <div className="relative w-20 h-20 mx-auto mb-4">
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <a href="/" className="logo" onClick={() => sessionStorage.removeItem("visited")}>
                                <Image
                                    src="/images/srst_logo.png"
                                    fill
                                    className="object-contain"
                                    alt="Shree RamLeela Seva Trust"
                                />
                            </a>
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
                    <div className="rounded-2xl p-8 border border-[#F5E9D2]/10 bg-[#1c0b02] shadow-xl">
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
                                    className="w-full px-4 py-3 rounded-xl border border-[#F5E9D2]/15 bg-[#F5E9D2]/5 text-[#F5E9D2] placeholder-[#F5E9D2]/30 focus:outline-none focus:border-[#b55924]"
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
                                    className="w-full px-4 py-3 rounded-xl border border-[#F5E9D2]/15 bg-[#F5E9D2]/5 text-[#F5E9D2] placeholder-[#F5E9D2]/30 focus:outline-none focus:border-[#b55924]"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-6 rounded-xl font-semibold text-sm tracking-wider uppercase disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-[#b55924] hover:bg-[#c9652c] text-[#F5E9D2] transition-colors"
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
        </>
    );
}
