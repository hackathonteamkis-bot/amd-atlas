import React from "react";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const roslindale = localFont({
  src: "../../public/roslindale/Roslindale-TextItalic-Testing.ttf",
  variable: "--font-roslindale",
  weight: "400",
  style: "italic",
  display: "swap",
});

// Site configuration
const siteConfig = {
  name: "Nourish",
  description:
    "The first context-aware nutrition assistant that predicts your energy needs and intercepts poor choices before they happen.",
  url: "https://nourish.ai",
  ogImage: "/logo/nourish-og.png",
  keywords: [
    "nutrition assistant",
    "AI health",
    "calorie counting",
    "personalized nutrition",
    "bio-sync",
    "health tech",
    "wearable sync",
    "energy management",
    "smart food choices",
    "AI dietitian",
  ],
  creator: "Nourish Team",
  authors: [{ name: "Nourish Health" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#1e293b" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/nourish-logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/nourish-logo.svg", sizes: "180x180", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: "Nourish - AI-driven health and nutrition assistant",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://accounts.google.com" />
        <link rel="preconnect" href="https://accounts.google.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${jakarta.variable} ${roslindale.variable} antialiased relative font-sans`}
        suppressHydrationWarning
      >
        <SessionProvider session={session}>
          {children}
          <Toaster richColors closeButton position="top-center" />
        </SessionProvider>
      </body>
    </html>
  );
}

