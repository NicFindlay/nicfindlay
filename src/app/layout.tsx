import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://nicfindlay.com"
  ),
  title: {
    default: "Nic Findlay",
    template: "%s · Nic Findlay",
  },
  description:
    "Full stack developer building side projects. Follow along for updates, experiments, and shipping logs.",
  keywords: [
    "Nic Findlay",
    "Full stack developer",
    "Software engineer",
    "Side projects",
    "Indie hacker",
  ],
  authors: [{ name: "Nic Findlay" }],
  creator: "Nic Findlay",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Nic Findlay",
    description:
      "Full stack developer building side projects. Follow along for updates, experiments, and logs.",
    url: "/",
    siteName: "Nic Findlay",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Nic Findlay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nic Findlay",
    description:
      "Full stack developer building side projects. Follow along for updates, experiments, and logs.",
    images: ["/og.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
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
        {children}
      </body>
    </html>
  );
}
