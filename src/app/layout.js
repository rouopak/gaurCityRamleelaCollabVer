import "./globals.css";
import Navbar from "@/components/Navbar";
import PreLoader from "@/components/preLoader";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({ 
    subsets: ['latin'],
    variable: '--font-cinzel',
});

export const metadata = {
    title: "Shree RamLeela Seva Trust",
    description: "Gaur City RamLeela",
    icons: {
        icon: "/images/temp_logo.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${cinzel.variable} scroll-smooth`}>
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