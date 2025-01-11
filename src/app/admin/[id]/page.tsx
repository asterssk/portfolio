import { AppHeader } from "@/components/app-header";
import { BlogForm } from "./_blog-form";
import { sps } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  let title = "Create Blog";

  if (id.toLowerCase() !== "new") {
    const supabase = await sps();
    const { data } = await supabase
      .from("blog")
      .select("title")
      .limit(1)
      .single();
    if (data) title = data.title;
  }

  return { title: title };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const supabase = await sps();
  const isNew = id.toLowerCase() === "new";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) notFound();

  return (
    <div
      className={`container max-w-3xl px-6 py-10
    flex flex-col gap-8
    `}
    >
      <AppHeader
        title={isNew ? "CREATE BLOG" : `UPDATE this mF`}
        backButton="/admin"
      >
        {isNew ? null : (
          <Button size="sm" variant="destructive" className="rounded-lg">
            <TrashIcon />
            Delete post
          </Button>
        )}
      </AppHeader>

      <BlogForm />
    </div>
  );
}
