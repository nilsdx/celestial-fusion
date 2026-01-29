import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/header/TopBar";
import Footer from "../components/footer/Footer";
import SearchBar from "../components/header/SearchBar";

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
        <TopBar/>
        <div className="min-h-screen mx-16 my-2 flex flex-col text-white">
          <SearchBar/>
          <div className="flex">
            <Sidebar/>
            <div className="border border-white w-full rounded-lg">
              {children}
            </div>
          </div>
        </div>
        <Footer/>
      </body>
    </html>
  );
}
