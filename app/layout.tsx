
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const headingFont = localFont({
  src: "./fonts/LeagueSpartan-ExtraBold.ttf",
  variable: "--font-league-spartan",
  weight: "800",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SHOP.CO | Find Your Style",
    template: "%s | SHOP.CO",
  },
  description:
    "Discover new arrivals, everyday essentials, and clothing that matches your style.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(satoshi.variable, headingFont.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
