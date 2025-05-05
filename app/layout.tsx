import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
import { ServiceWorkerRegister } from "./sw-register";
import { Footer } from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unit Converter | HarunDev",
  description: "A Progressive Web App for converting between different units",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Unit Converter | HarunDev",
  },
  generator: "harundev.com",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout for the Next.js App Router.
 * Provides global theme, font, and service worker registration.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col ">
            <main className="flex-1 flex flex-col pb-[96px] md:pb-12">
              {children}
            </main>
          </div>
          <ServiceWorkerRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
