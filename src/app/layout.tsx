import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { CoinProvider } from "./contexts/CoinContext";
import { ProgressProvider } from "./contexts/ProgressContext";

// Define the Manrope font
const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

// Define the metadata
export const metadata: Metadata = {
    title: "Penny",
    description: "invnesnting annappp",
};

// Define the RootLayout component
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={manrope.className}>
                <div className="antialiased sm:hidden">
                    <CoinProvider>
                        <ProgressProvider>
                            <Header />
                            {children}
                        </ProgressProvider>
                    </CoinProvider>
                </div>
                <div className="hidden sm:block">
                    <p className="text-3xl">This is a mobile app, unavailable on desktop.</p>
                </div>
            </body>
        </html>
    );
}
