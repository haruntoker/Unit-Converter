import { BottomNav } from "@/components/bottom-nav";
import { ConverterTabProvider } from "@/components/converter";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./globals.css";
import { ServiceWorkerRegister } from "./sw-register";
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
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Unit Converter | HarunDev",
              description:
                "A Progressive Web App for converting between different units",
              applicationCategory: "FinanceApplication",
              operatingSystem: "All",
              url: "https://unit-converter.harundev.com",
            }),
          }}
        />
      </head>
      <body className={inter.className} aria-label="App Body">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConverterTabProvider>
            <div className="flex flex-col bg-background min-h-screen">
              <main
                className="flex-1 flex flex-col max-w-screen-md mx-auto w-full px-2 pb-[80px]"
                aria-label="Main Content"
              >
                {/* ErrorBoundary for catching runtime errors */}
                <ErrorBoundary
                  fallback={
                    <div
                      role="alert"
                      className="p-8 text-center text-destructive bg-destructive/10 rounded-lg"
                      aria-live="assertive"
                    >
                      An unexpected error occurred. Please refresh or try again
                      later.
                    </div>
                  }
                >
                  <Suspense
                    fallback={
                      <div className="p-8 text-center" aria-busy="true">
                        Loading…
                      </div>
                    }
                  >
                    {children}
                    <Footer />
                  </Suspense>
                </ErrorBoundary>
              </main>
              <ServiceWorkerRegister />
              <BottomNav />
            </div>
          </ConverterTabProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
