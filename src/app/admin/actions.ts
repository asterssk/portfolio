"use server";

import { sps } from "@/lib/supabase/server";
import { ActionResponse } from "@/utils/types";

export async function login(
  pre: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  console.log("Previous", pre);

  try {
    const supabase = await sps();
    const passcode = formData.get("passcode") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email: "jamescoles0704@gmail.com",
      password: passcode,
    });

    return { success: Boolean(error), message: "Invalid login code" };
  } catch {
    return { success: false, message: "An unexpected error occurred" };
  }
}
