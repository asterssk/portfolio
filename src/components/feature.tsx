import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; image?: string; className?: string };

export function FeatureBlock({ children, image, className }: Props) {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ height: "clamp(18rem, 32vw, 38rem)" }}
    >
      <Image
        src={image ?? "/placeholder.svg"}
        fill
        alt="background"
        className={cn(
          "object-cover",
          image ? "" : "dark:brightness-[0.15] dark:grayscale"
        )}
        priority
        placeholder="blur"
        // tsk
        blurDataURL={image ?? "/placeholder.svg"}
        quality={80}
      />

      {children}
    </div>
  );
}
