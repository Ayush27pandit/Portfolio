import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Ayush Pandit | Software Engineer",
  description: "Portfolio of Ayush Pandit, a software engineer specializing in high-performance backend systems and distributed architectures.",
  icons: {
    icon: process.env.NEXT_PUBLIC_ICON_IMAGE,
    shortcut: process.env.NEXT_PUBLIC_ICON_IMAGE,
    apple: process.env.NEXT_PUBLIC_ICON_IMAGE,
  },
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(sans.variable, heading.variable, "font-sans")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
