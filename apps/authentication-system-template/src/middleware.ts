import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // const subdomain = req.headers.get("host")?.split(".")[0];
  // const domain = req.headers.get("host")?.split(".")[1];
  // if (domain === "localhost:3000") {
  //   return NextResponse.next();
  // }
  // console.log(subdomain);
  // return NextResponse.rewrite(new URL(`/${domain}`, req.url));
}

export const config = {
  matcher: "/",
};
