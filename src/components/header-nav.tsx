"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Button } from "./ui/button";
import { MenuIcon, MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const navs = [
  { label: "Resume", value: "resume" },
  { label: "Blog", value: "blog" },
];

export function HeaderNav() {
  const { theme, setTheme } = useTheme();
  const segment = useSelectedLayoutSegment();

  return (
    <div className="flex items-center gap-6">
      <ul className="hidden md:flex items-center gap-6 text-sm -mb-[1px]">
        {navs.map((nav) => (
          <li key={nav.value}>
            <Link
              href={`/${nav.value}`}
              className={cn(
                "transition-all font-semibold",
                segment === nav.value ? "text-primary" : "hover:text-primary"
              )}
            >
              {nav.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="md:hidden"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[90%]">
            <SheetHeader>
              <SheetTitle>
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
              </SheetTitle>

              <SheetDescription className="sr-only">
                Mobile navigation
              </SheetDescription>
            </SheetHeader>

            <ul className="flex flex-col gap-4 text-sm mt-8">
              {navs.map((nav) => (
                <li key={nav.value}>
                  <Link
                    href={`/${nav.value}`}
                    className={cn(
                      "transition-all",
                      segment === nav.value
                        ? "text-primary"
                        : "hover:text-primary"
                    )}
                  >
                    {nav.label}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "dark" ? <SunIcon /> : <MoonStarIcon />}
        </Button>
      </div>
    </div>
  );
}
