import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { HeaderNav } from "@/components/header-nav";
import { ThemeProvider } from "@/components/theme-provider";

type Props = { children: React.ReactNode };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { template: "DJ: %s", default: "DJ: Portfolio" },
  description: "My personal portfolio website",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <header className="sticky top-0 backdrop-blur-sm bg-inherit/30 border-b">
            <nav className="px-6 py-3">
              <div className="flex flex-wrap justify-between items-center container gap-4">
                <Link href="/" className="flex items-center gap-4">
                  <Image
                    src="/asterisk.svg"
                    width={32}
                    height={32}
                    alt="Logo"
                    className="dark:bg-white bg-gray-100 text-white rounded-full p-[3px]"
                  />

                  <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
                    DEXTER JAMES
                  </span>
                </Link>

                <HeaderNav />
              </div>
            </nav>
          </header>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
