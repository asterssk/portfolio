import { LoginForm } from "./_login-form";
import { AppHeader } from "@/components/app-header";
import { BlogTable } from "./_table";
import { sps } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { TBlog } from "@/utils/types";

export const metadata = { title: "Admin" };

export default async function Page() {
  const supabase = await sps();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex-1 flex items-center max-w-sm mx-auto w-full">
        <LoginForm />
      </div>
    );
  }

  const { data } = await supabase.from("blog").select().returns<TBlog[]>();

  return (
    <div className={`container px-6 py-10 flex flex-col gap-8`}>
      <AppHeader title="WELCOME Master!">
        <Link href="/admin/new" passHref>
          <Button size="sm">
            <PlusIcon />
            Create blog post
          </Button>
        </Link>
      </AppHeader>

      <BlogTable data={data ?? []} />
    </div>
  );
}
