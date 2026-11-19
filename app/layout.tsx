import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SimpleKaj | Outsource Daily Errands Across Dhaka",
  description:
    "Dhaka's hyperlocal task marketplace. Connect with vetted, NID-verified neighbors for grocery runs, queue standing, parcel drops, and tech help.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScrollProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#CCFF00] focus:text-[#0D0D0D] focus:font-semibold focus:rounded-lg focus:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
          >
            Skip to main content
          </a>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
