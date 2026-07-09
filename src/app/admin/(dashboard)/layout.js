import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import { SessionProvider } from "next-auth/react";
import "./admin.css";

export const metadata = {
    title: "Admin | Shree RamLeela Seva Trust",
    description: "Content Management System for Shree RamLeela Seva Trust",
};

export default async function AdminLayout({ children }) {
    const session = await auth();

    // Double-check auth in layout (proxy handles redirect, this is a safety net)
    if (!session) {
        redirect("/admin/login");
    }

    return (
        <SessionProvider session={session}>
            <div className="admin-root min-h-screen">
                {/* Mobile Block Screen */}
                <div className="lg:hidden fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a0a00] p-6 text-center text-[#F5E9D2]"
                    style={{ background: "linear-gradient(135deg, #1a0a00 0%, #2d1400 30%, #4d1700 60%, #811915 100%)" }}>
                    <div className="relative z-10 max-w-sm flex flex-col items-center gap-6">
                        <div className="relative w-20 h-20">
                            <img src="/images/srst_logo.png" className="object-contain w-20 h-20" alt="Logo" />
                        </div>
                        <h1 className="text-xl font-bold uppercase tracking-wider text-[#b55924]" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                            Desktop Only
                        </h1>
                        <p className="text-sm text-[#F5E9D2]/70 leading-relaxed">
                            The Admin Portal is not accessible on mobile or tablet devices. Please switch to a desktop computer.
                        </p>
                        <a href="/" className="mt-4 px-6 py-2.5 rounded-xl border border-[#F5E9D2]/10 bg-[#F5E9D2]/5 hover:bg-[#F5E9D2]/10 text-xs font-semibold uppercase tracking-wider transition-all duration-300">
                            Back to Home
                        </a>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden lg:flex w-full">
                    <AdminSidebar />
                    <main className="admin-main">
                        <div className="admin-content">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </SessionProvider>
    );
}
