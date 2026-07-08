import "./globals.css";
import Navbar from "@/components/Navbar";
import PreLoader from "@/components/preLoader";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { Cinzel, Yatra_One } from 'next/font/google';
import { headers } from "next/headers";
import SideBar from "@/components/SideBar";
const cinzel = Cinzel({
    subsets: ['latin'],
    variable: '--font-cinzel',
});

const yatra = Yatra_One({
    weight: '400',
    subsets: ['devanagari'],
    variable: '--font-yatra',
});

export const metadata = {
    title: "Shree RamLeela Seva Trust",
    description: "Gaur City RamLeela",
    icons: {
        icon: "/images/srst_logo.png",
    },
};

export default async function RootLayout({ children }) {
    const headersList = await headers();
    const pathname = headersList.get("x-next-pathname") || headersList.get("x-invoke-path") || "";
    const isAdmin = pathname.startsWith("/admin");

    if (isAdmin) {
        return (
            <html lang="en" className={`${cinzel.variable} ${yatra.variable} scroll-smooth`}>
                <body>
                    {children}
                </body>
            </html>
        );
    }

    return (
        <html lang="en" className={`${cinzel.variable} ${yatra.variable} scroll-smooth`}>
            <body>
                <NextTopLoader
                    color="#b55924"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={false}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #ff3e3e,0 0 5px #ff3e3e"
                />
                <PreLoader />
                <SideBar />
                <Navbar />
                <main className="pt-20 md:pt-24 min-h-screen">
                    {children}
                </main>
                <Partners />
                <Footer />
            </body>
        </html>
    );
}