import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/general/theme-provider";
import { Toaster } from "sonner";
import Footer from "@/components/general/Footer";
import Navbar from "@/components/general/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "job lynk",
  description: "job lynk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-w-7xl mx-auto md:px-6 lg:px-8">
            <div className="fixed top-0 left-0 right-0 z-50 pl-5 md:px-20 bg-background shadow-md">
              <Navbar />
            </div>
          </div>
          {children}
          <Footer />
          <Toaster closeButton richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
