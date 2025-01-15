import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { uuid } from "./utils/helpers";
import { machineIdCookieKey } from "./lib/constants";

// This function can be marked `async` if using `await` inside
export async function middleware() {
  const cookieStore = await cookies();
  const machineId = cookieStore.has(machineIdCookieKey);

  if (!machineId) {
    cookieStore.set(machineIdCookieKey, uuid(), {
      path: "/",
      maxAge: 31536000, // 1 year expiration
    });
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
