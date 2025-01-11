"use server";

import { sps } from "@/lib/supabase/server";
import { ActionResponse } from "@/utils/types";
import { revalidatePath } from "next/cache";

export async function login(
  pre: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  console.log("Previous", pre);

  try {
    const supabase = await sps();
    const passcode = formData.get("passcode") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email: "dexterjames998@gmail.com",
      password: passcode,
    });

    if (error) console.error(error.message);

    revalidatePath("/admin", "page");

    return {
      success: Boolean(error),
      message: error ? "Invalid login code" : "Login success",
    };
  } catch {
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function logout() {
  const supabase = await sps();

  const { error } = await supabase.auth.signOut();

  revalidatePath("/", "layout");

  if (error) return error.message;
}
