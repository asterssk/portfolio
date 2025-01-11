"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="flex-1 flex flex-col items-center justify-center">
      <h2>Not Found</h2>
      <p className="text-sm text-muted-foreground">
        Could not find requested resource
      </p>

      <Button
        size="sm"
        variant="transparent"
        className="mt-4"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon />
        Go back
      </Button>
    </section>
  );
}
