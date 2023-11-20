import { NextRequest, NextResponse } from "next/server";

function hasSubdomain(hostname: string) {
  const parts = hostname.split(".");

  console.log(parts.length);

  return parts.length > 2;
}

function isLocalhost(hostname: string) {
  return hostname.includes("localhost");
}

function localhostHasSubdomain(hostname: string) {
  const parts = hostname.split(".");

  return parts.length > 1;
}

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host");
  console.log(hostname);

  if (!hostname) return NextResponse.next();

  let domain, subdomain;

  if (isLocalhost(hostname) && localhostHasSubdomain(hostname)) {
    subdomain = req.headers.get("host")?.split(".")[0];
    domain = req.headers.get("host")?.split(".")[1];
  }

  if (hasSubdomain(hostname)) {
    subdomain = req.headers.get("host")?.split(".")[0];
    domain = req.headers.get("host")?.split(".")[1];

    console.log("hostname: ", hostname);
    console.log("subdomain: ", subdomain);
    console.log("domain: ", domain);

    return NextResponse.rewrite(new URL(`/${domain}`, req.url));
  }

  domain = hostname.split(".")[0];
  console.log("subdomain: ", subdomain);
  console.log("domain: ", domain);

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
