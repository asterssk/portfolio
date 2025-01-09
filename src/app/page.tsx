// export const metadata = { title: "Portfolio" };

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontalIcon } from "lucide-react";

export default function Home() {
  return (
    <section>
      <div className="container px-6 py-10">
        <form className="flex flex-col gap-2">
          <Label htmlFor="message">Message me</Label>
          <Textarea id="message" placeholder="Start typing..." rows={4} />
          <Button className="self-end mt-1" type="submit">
            Send
            <SendHorizontalIcon />
          </Button>
        </form>
      </div>
    </section>
  );
}
