import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthWrapper from "@/components/AuthWrapper";
import RoomBookingLoader from "@/components/RoomBookingLoader";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Booking Room",
  description: "Book meeting or conference rooms for team meetings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
      >
        <ToastContainer />
        <AuthWrapper>
          <Header />
          <main className="mx-auto max-w-screen-2xl px-2 py-4 sm:px-4 lg:px-4 flex-grow content-center">
            <Suspense fallback={<RoomBookingLoader />}>
              {children}
            </Suspense>
          </main>
          <Footer />
        </AuthWrapper>
      </body>
    </html>
  );
}