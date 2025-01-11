"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useTransition } from "react";
import { Button } from "./ui/button";
import { ArrowLeftIcon, Loader2 } from "lucide-react";

type Props = {
  title: string;
  className?: string;
  backButton?: boolean | string;
  children?: ReactNode;
  //   sticky?: boolean;
  //   top?: number;
};

export function AppHeader({ title, backButton, children }: Props) {
  const router = useRouter();
  const [loading, startTransition] = useTransition();

  const handleClientBack = () => {
    startTransition(() => {
      router.back();
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between gap-4">
        {backButton ? (
          typeof backButton === "string" ? (
            <Link href={backButton} passHref>
              <Button size="icon" variant="transparent">
                <ArrowLeftIcon />
              </Button>
            </Link>
          ) : (
            <Button
              size="icon"
              variant="transparent"
              disabled={loading}
              onClick={() => handleClientBack()}
            >
              {loading ? <Loader2 className="animate-spin" /> : null}

              <ArrowLeftIcon />
            </Button>
          )
        ) : null}

        <h1 className="text-xl">{title}</h1>
      </div>

      {children}
    </div>
  );
}
