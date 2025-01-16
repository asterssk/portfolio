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
    const { error } = await suapbase
      .from("blog")
      .update({
        image_path: values.image_path,
        title: values.title,
        content: values.content,
        categories: values.categories,
        official_date: values.official_date,
        is_published: values.is_published,
      })
      .eq("id", id);

    if (error) errorMessage = error.message;
  } else {
    const { error } = await suapbase.from("blog").insert({
      image_path: values.image_path,
      title: values.title,
      content: values.content,
      categories: values.categories,
      official_date: values.official_date,
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

export async function deleteBlog(id?: string) {
  const suapbase = await sps();
  const { error } = await suapbase.from("blog").delete().eq("id", id);

  if (!error) {
    revalidatePath("/admin", "page");
    redirect("/admin");
  }

  return error?.message;
}
