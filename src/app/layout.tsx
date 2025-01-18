import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { CoinProvider } from "./contexts/CoinContext";
import { ProgressProvider } from "./contexts/ProgressContext";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

export const metadata: Metadata = {
    title: "Penny",
    description: "invnesnting annappp",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${manrope.className} antialiased sm:hidden`}>
                <CoinProvider>
                    <ProgressProvider>
                        <Header />
                        {children}
                    </ProgressProvider>
                </CoinProvider>
            </body>
            <p className="text-3xl max-sm:hidden">This is a mobile app, unavailable on desktop.</p>
        </html>
    );
}
