import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import AdhkarService from "@/components/AdhkarService";
import { CursorGlow } from "@/components/ui/CursorGlow";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATOMIC | The Global Standard in Learning",
  description: "Experience the next generation of study planning with AI-driven insights, liquid glass aesthetics, and premium productivity tools.",
  manifest: "/manifest.json",
  keywords: ["study planner", "AI learning", "productivity", "student tools", "liquid glass", "ATOMIC"],
  authors: [{ name: "Saged gafer" }],
  openGraph: {
    title: "ATOMIC | The Global Standard in Learning",
    description: "Next-gen study planning with AI insights and premium design.",
    type: "website",
    locale: "en_US",
    siteName: "ATOMIC",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATOMIC | The Global Standard in Learning",
    description: "Next-gen study planning with AI insights and premium design.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-primary/30`}>
        <div className="liquid-bg">
          <div className="liquid-blob w-[700px] h-[700px] top-[-15%] left-[-10%]" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)', animationDuration: '28s' }} />
          <div className="liquid-blob w-[600px] h-[600px] bottom-[-10%] right-[-8%]" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%)', animationDuration: '22s', animationDelay: '-8s' }} />
          <div className="liquid-blob w-[500px] h-[500px] top-[35%] left-[25%]" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)', animationDuration: '35s', animationDelay: '-14s' }} />
          <div className="liquid-blob w-[350px] h-[350px] top-[60%] right-[20%]" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', animationDuration: '20s', animationDelay: '-5s' }} />
        </div>

        <CursorGlow />

        <AppProvider>
          <div className="relative z-10 min-h-screen flex flex-col page-transition-wrapper">
            {children}
          </div>
          <AdhkarService />
        </AppProvider>
      </body>
    </html>
  );
}
