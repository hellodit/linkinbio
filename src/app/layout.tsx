import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from "@/lib/theme-context";
import { NavBar } from "./components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://codingtengahmalam.com"),
  title: {
    default: "Coding Tengah Malam",
    template: "%s | Coding Tengah Malam",
  },
  description:
    "Link in Bio untuk Coding Tengah Malam - Portal member, produk digital, artikel, dan resource developer",
  applicationName: "Coding Tengah Malam",
  generator: "Next.js",
  keywords: [
    "coding tengah malam",
    "link in bio",
    "produk digital",
    "artikel pemrograman",
    "developer indonesia",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Coding Tengah Malam",
    title: "Coding Tengah Malam",
    description:
      "Portal produk digital, artikel, dan resource untuk developer Indonesia.",
    url: "/",
    images: [
      {
        url: "/images/avatar.png",
        width: 800,
        height: 800,
        alt: "Coding Tengah Malam",
      },
    ],
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    site: "@codingtengahmalam",
    creator: "@codingtengahmalam",
    title: "Coding Tengah Malam",
    description:
      "Portal produk digital, artikel, dan resource untuk developer Indonesia.",
    images: ["/images/avatar.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <NavBar />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
