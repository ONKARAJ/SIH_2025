import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { ChatbotWrapper } from "@/components/chatbot-wrapper";
import { SidebarNavigation } from "@/components/sidebar-navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jharkhand Tourism",
  description:
    "Explore the beauty and culture of Jharkhand - India's mineral-rich state with stunning waterfalls, tribal heritage, and natural wonders.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <SidebarNavigation />
        <ChatbotWrapper />
        <Analytics />
      </body>
    </html>
  );
}
