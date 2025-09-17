import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { ChatbotWrapper } from "@/components/chatbot-wrapper";
import { SidebarNavigation } from "@/components/sidebar-navigation";
import { SessionProvider } from "@/components/auth/session-provider";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jharkhand Tourism",
  description:
    "Explore the beauty and culture of Jharkhand - India's mineral-rich state with stunning waterfalls, tribal heritage, and natural wonders.",
  generator: "v0.app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <SessionProvider>
          {children}
          <SidebarNavigation />
          <ChatbotWrapper />
        </SessionProvider>
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
