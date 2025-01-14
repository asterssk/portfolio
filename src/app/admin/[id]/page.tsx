import { AppHeader } from "@/components/app-header";
import { BlogForm } from "./_blog-form";
import { sps } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { z } from "zod";
import { blogSchema } from "@/utils/schema";
import { DeleteBlogButton } from "./_delete-blog-button";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  let title = "Create Blog";

  if (id.toLowerCase() !== "new") {
    const supabase = await sps();
    const { data } = await supabase
      .from("blog")
      .select("title")
      .eq("id", id)
      .limit(1)
      .single();
    if (data) title = data.title;
  }

  return { title: title };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const supabase = await sps();

  let toEdit: z.infer<typeof blogSchema> | undefined;
  const isNew = id.toLowerCase() === "new";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) notFound();

  if (!isNew) {
    const { data } = await supabase
      .from("blog")
      .select()
      .eq("id", id)
      .limit(1)
      .single<z.infer<typeof blogSchema>>();

    if (data) toEdit = data;
  }

  return (
    <div
      className={`container max-w-3xl px-6 py-10
    flex flex-col gap-8
    `}
    >
      <AppHeader
        title={isNew ? "CREATE BLOG" : `UPDATE ${toEdit?.title ?? "BLOG"}`}
        backButton="/admin"
      >
        {isNew ? null : <DeleteBlogButton id={id} />}
      </AppHeader>

      <BlogForm initialValue={toEdit} />
    </div>
  );
}
