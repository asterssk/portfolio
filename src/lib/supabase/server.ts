import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function sps() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },

      //   cookies: {
      //     getAll: async () => (await cookieStore).getAll(),
      //     setAll: async (set) => {
      //       try {
      //         set.forEach(async ({ name, value, options }) => {
      //           return (await cookieStore).set(name, value, options);
      //         });
      //       } catch {
      //         //     // The `setAll` method was called from a Server Component.
      //         //     // This can be ignored if you have middleware refreshing
      //         //     // user sessions.
      //       }
      //     },
      //   },
    }
  );
}
