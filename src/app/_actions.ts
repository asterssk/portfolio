"use server";

import { machineIdCookieKey } from "@/lib/constants";
import { sps } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function sendMessage(message?: string) {
  const cookieStore = await cookies();
  const supabase = await sps();

  const { error } = await supabase.from("messages").upsert({
    id: cookieStore.get(machineIdCookieKey)?.value,
    message: message,
  });

  if (error) return error.message;
}
