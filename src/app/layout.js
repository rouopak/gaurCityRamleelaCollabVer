import "./globals.css";
import Navbar from "@/components/Navbar";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
    title: "Shree RamLeela Seva Trust",
    description: "Gaur City RamLeela",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <NextTopLoader
                    color="#ff3e3e"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={false}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #ff3e3e,0 0 5px #ff3e3e"
                />
                <Navbar />
                <main className="pt-20 md:pt-24 min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}