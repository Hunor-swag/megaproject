import { NextRequest, NextResponse } from "next/server";
import { isLocalhost } from "lib";
import { hasSubdomain } from "lib";

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host");
  console.log("hostname: ", hostname);

  if (isLocalhost(hostname!)) {
    return NextResponse.next();
  }

  if (hasSubdomain(hostname!)) {
    const subdomain = hostname!.split(".")[0];
    return NextResponse.rewrite(new URL(`/${subdomain}`, req.url));
  }
}

export const config = {
  matcher: "/",
};
