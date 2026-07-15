import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./lib/session";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.redirect(new URL("/login", request.url));
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/admin/:path*", "/cart/:path*", "/cart"],
};
