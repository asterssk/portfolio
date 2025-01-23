import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { HeaderNav } from "@/components/header-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { sps } from "@/lib/supabase/server";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

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
          {/* <header className="sticky top-0 backdrop-blur-xs bg-white/80 dark:bg-neutral-950/90 border-b z-10"> */}
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

          <main className="flex-1 flex flex-col">
            <div className="relative flex-1 bg-background border-b">
              {children}
            </div>

            <footer
              className={cn(
                "sticky -z-10 bottom-0 left-0 w-full h-32",
                "bg-stone-950 dark:bg-neutral-950",
                "flex items-center"
              )}
            >
              <div className="container flex flex-wrap justify-center md:justify-between gap-4 md:gap-10 items-center px-6">
                <span className="text-sm text-white">
                  All rights reserved. &copy;{new Date().getFullYear()}
                </span>
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

              {/* <div className="relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12 text-[#ff5941]">
                <div className="flex flex-row space-x-12 sm:pace-x-16  md:space-x-24 text-sm sm:text-lg md:text-xl">
                  <ul>
                    <li className="hover:underline cursor-pointer">Home</li>
                    <li className="hover:underline cursor-pointer">Docs</li>
                    <li className="hover:underline cursor-pointer">Comps</li>
                  </ul>
                  <ul>
                    <li className="hover:underline cursor-pointer">Github</li>
                    <li className="hover:underline cursor-pointer">
                      Instagram
                    </li>
                    <li className="hover:underline cursor-pointer">
                      X (Twitter)
                    </li>
                  </ul>
                </div>
                <h2 className="absolute bottom-0 left-0  translate-y-1/3 sm:text-[192px]  text-[80px] text-[#ff5941] font-calendas">
                  fancy
                </h2>
              </div> */}
            </footer>
          </main>

          {/* <footer className={cn(`text-white bg-stone-950 dark:bg-neutral-950`)}>
            <div className="container flex flex-wrap justify-between items-center py-8 text-sm">
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
          </footer> */}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
