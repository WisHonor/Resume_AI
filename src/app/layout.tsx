import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";
import SyncUser from "@/modules/users/components/sync-user";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Resume Analyser",
  description: "An AI-powered tool that scores and analyzes resumes based on job titles and descriptions to help candidates improve their applications.",
    icons: {
        icon: "/logo.png",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ClerkProvider>
    <TRPCReactProvider>
      
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >

            <Toaster/>
            <SyncUser/>
            {children}
          </body>
        </html>
      </TRPCReactProvider>
  </ClerkProvider>
    
  );
}
