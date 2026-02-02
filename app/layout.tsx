import type { Metadata } from "next";
import { Playfair_Display, Lato, Great_Vibes } from "next/font/google";
import "./globals.css";

// 1. Elegant Serif for Headings (The "Vogue" look)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// 2. Clean Sans for Body text (Easy to read)
const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

// 3. Cursive for accents (The "Love Letter" look)
const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-cursive",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : "https://your-project-name.vercel.app";

export const metadata: Metadata = {
  // --- Basic SEO ---
  metadataBase: new URL(baseUrl),
  title: {
    default: "For Naomi ❤️ | A Special Question",
    template: "%s | Valentine's Surprise",
  },
  description: "I have a story to tell you and a very important question to ask. Made with ❤️.",
  keywords: ["Valentine", "Love", "Surprise", "Interactive Story"],
  authors: [{ name: "Osi" }], // Change this to your name
  creator: "Osi",

  // --- Open Graph (Facebook, WhatsApp, LinkedIn, Discord) ---
  openGraph: {
    title: "For Naomi ❤️ | A Special Question",
    description: "I have a story to tell you and a very important question to ask. Click to unlock.",
    url: baseUrl,
    siteName: "Valentine's Surprise",
    images: [
      {
        url: "/og-image.jpg", // You must add this image to your public folder
        width: 1200,
        height: 630,
        alt: "A special message for you",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // --- Twitter / X ---
  twitter: {
    card: "summary_large_image",
    title: "For Naomi ❤️ | A Special Question",
    description: "I have a story to tell you and a very important question to ask.",
    creator: "@Osi", // Optional
    images: ["/og-image.jpg"],
  },

  // --- Icons (Favicons) ---
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // --- Robots (Ensure it's visible or hidden if you want it private) ---
  robots: {
    index: true, // Set to false if you want to keep it hidden from Google
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        className={`${playfair.variable} ${lato.variable} ${greatVibes.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
