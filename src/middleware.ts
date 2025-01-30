import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let token = request.cookies.get("token");
  let cookie = request.cookies.get("token");
  // console.log("cookie:::", cookie);
  const allCookies = request.cookies.getAll();
  // console.log(allCookies);

  request.cookies.has("nextjs"); // => true
  request.cookies.delete("nextjs");
  request.cookies.has("nextjs"); // => false

  const response = NextResponse.next();
  response.cookies.set("vercel", "fast");
  response.cookies.set({
    name: "vercel",
    value: "fast",
    path: "/",
  });
  cookie = response.cookies.get("vercel");
  // console.log(cookie);

  //
  // if (pathname === "/storage") {
  //   return NextResponse.next();
  // }
  // if (pathname.startsWith("/storage")) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/storage", request.url));
  //   }
  // }

  return response;
}

export const config = {
  matcher: ["/storage/:path*"],
};
