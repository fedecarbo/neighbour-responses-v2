import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FilterProvider } from "@/context/FilterContext";
import { TabNavigationProvider } from "@/context/TabNavigationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UK Planning Officer - Neighbor Responses",
  description: "Tab-based navigation for planning application analysis",
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
        <FilterProvider>
          <TabNavigationProvider>
            {children}
          </TabNavigationProvider>
        </FilterProvider>
      </body>
    </html>
  );
}
