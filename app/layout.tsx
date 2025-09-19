import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SessionProvider } from "@/components/auth/session-provider";
import { ChatbotWrapper } from "@/components/chatbot-wrapper";
import { SidebarNavigation } from "@/components/sidebar-navigation";
import { SOSWrapper } from "@/components/sos-wrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jharkhand Tourism - Explore Nature's Paradise",
  description:
    "Explore the beauty and culture of Jharkhand - India's mineral-rich state with stunning waterfalls, tribal heritage, and natural wonders. Plan your perfect trip with our comprehensive guide.",
  generator: "v0.app",
  keywords: "Jharkhand tourism, waterfalls, tribal culture, national parks, travel guide, India tourism",
  authors: [{ name: "Jharkhand Tourism" }],
  creator: "Jharkhand Tourism",
  publisher: "Jharkhand Tourism",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Jharkhand Tourism",
  },
  openGraph: {
    title: "Jharkhand Tourism - Explore Nature's Paradise",
    description: "Discover stunning waterfalls, rich tribal culture, and natural wonders in Jharkhand, India.",
    type: "website",
    siteName: "Jharkhand Tourism",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#16a34a",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mobile-scroll">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} mobile-text-adjust touch-manipulation antialiased`}>
        <SessionProvider>
          {children}
          <SidebarNavigation />
          <SOSWrapper />
          <ChatbotWrapper />
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
