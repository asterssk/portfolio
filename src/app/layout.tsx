import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { HeaderNav } from "@/components/header-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { sps } from "@/lib/supabase/server";

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

export default async function RootLayout({ children }: Props) {
  const supabase = await sps();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
        min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {/* <header className="sticky top-0 backdrop-blur-sm bg-white/80 dark:bg-neutral-950/90 border-b z-10"> */}
          <header className="sticky top-0 bg-background border-b z-10">
            <nav className="flex justify-between items-center container gap-4 px-6 py-3">
              <Link href="/" className="flex items-center gap-2 md:gap-4">
                <Image
                  src="/asterisk.svg"
                  width={32}
                  height={32}
                  alt="Logo"
                  className="dark:bg-white bg-gray-100 text-white rounded-full p-[3px]"
                />

                <span className="hidden md:block self-center text-lg font-semibold whitespace-nowrap dark:text-white">
                  DEXTER JAMES
                </span>

                <span className="md:hidden block self-center text-lg font-semibold whitespace-nowrap dark:text-white">
                  DJ
                </span>
              </Link>

              <HeaderNav isLoggedIn={Boolean(user)} />
            </nav>
          </header>

          {children}

          <footer className="mt-auto text-white bg-stone-950 dark:bg-neutral-950">
            <div className="container flex justify-between items-center py-8 text-sm">
              <span>All rights reserved. &copy;{new Date().getFullYear()}</span>
              <div>
                <a href="https://ko-fi.com/I3I718RZ8J" target="_blank">
                  <Image
                    height={120}
                    width={120}
                    // style="border:0px;height:36px;"
                    src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
                    alt="Buy Me a Coffee at ko-fi.com"
                  />
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
