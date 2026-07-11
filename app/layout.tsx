import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PhoneTone - Find Your Next Phone",
  description:
    "Discover the latest smartphones, compare specs, and find the perfect phone for your needs at PhoneTone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
        cz-shortcut-listen="true"
      >
        {children}
        <Toaster position="top-right" richColors theme="light" />
      </body>
    </html>
  );
}
