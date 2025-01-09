import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center py-32 flex-1">
      <Loader2 className="animate-spin" />
      <p className="text-center text-sm">Please wait...</p>
    </div>
  );
}
