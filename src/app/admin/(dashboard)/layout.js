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
            <div className="admin-root">
                <AdminSidebar />
                <main className="admin-main">
                    <div className="admin-content">
                        {children}
                    </div>
                </main>
            </div>
        </SessionProvider>
    );
}
