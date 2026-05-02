import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/header/TopBar";
import Footer from "../components/Footer";
import SearchBar from "../components/header/SearchBar";
import Image from 'next/image'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Celestial Fusion",
  description: "Unofficial database for the Destiny Phantasy Star Online Blue Burst private server",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <div className="fixed inset-0 -z-20">
            <Image
              src="/images/background.png"
              alt="Background"
              fill
              priority
              className="object-cover"
            />
          </div>
          <TopBar/>
            <div className="flex min-h-screen text-white">
              <Sidebar/>
              <div className="border-2 border-sky-600 bg-gray-900 backdrop-blur-xs w-full mx-4 sm:mx-16 my-12">
                {children}
              </div>
            </div>
          <Footer/>
      </body>
    </html>
  );
}
