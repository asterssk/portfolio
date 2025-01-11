"use server";

import { sps } from "@/lib/supabase/server";
import { blogSchema } from "@/utils/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function saveBlog(
  values: z.infer<typeof blogSchema>,
  id?: string | null
) {
  const suapbase = await sps();
  let errorMessage: string | undefined = undefined;

  if (id) {
  } else {
    const { error } = await suapbase.from("blog").insert({
      image: values.image_path,
      title: values.title,
      content: values.content,
      categories: values.categories,
      is_published: values.is_published,
    });

    if (error) errorMessage = error.message;
  }

  if (!errorMessage) {
    revalidatePath("/admin", "page");
    redirect("/admin");
  }

  return errorMessage;
}
