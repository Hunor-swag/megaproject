import { getValidSubdomain } from "lib";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import type { SystemType } from "types";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const host = req.headers.get("host");
  const subdomain = getValidSubdomain(host);
  // console.log("dev subdomain: ", subdomain);

  if (subdomain && subdomain !== "www") {
    if (subdomain === "dev1") {
      url.pathname = `/test${url.pathname}`;
      return NextResponse.rewrite(url);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/systems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const systems = await res.json();

    const system = systems.find(
      (system: SystemType) => system.slug === subdomain
    );

    if (!system) {
      return NextResponse.rewrite(new URL("/not-found", req.url));
    }

    url.pathname = `/${system.slug}${url.pathname}`;
  }

  if ((!subdomain || subdomain === "www") && url.pathname !== "/") {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }
  return NextResponse.rewrite(url);
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
