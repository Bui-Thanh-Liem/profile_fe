import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // const response = NextResponse.next();
  console.log("pathname:::", pathname);

  const customerCookie = request.cookies.get("customer");
  const userCookie = request.cookies.get("user");
  // const allCookies = request.cookies.getAll();

  // request.cookies.has("nextjs")
  // request.cookies.delete("nextjs");
  // request.cookies.has("nextjs");
  // cookie = response.cookies.get("vercel");
  // response.cookies.set("test1", "fast");
  // response.cookies.set({
  //   name: "test2",
  //   value: "fast",
  //   path: "/",
  // });

  // customer
  if (pathname === "/storage") {
    return NextResponse.next();
  }
  if (pathname.startsWith("/storage") && !customerCookie) {
    return NextResponse.redirect(new URL("/storage", request.url));
  }

  // user
  if (pathname.startsWith("/admin")) {
    if (!userCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // check token
    // return fetch("http://localhost:5000/protected", {
    //   headers: { Authorization: `Bearer ${userCookie}` },
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       response.cookies.set("user", "", { maxAge: 0 });
    //       throw new Error("Token không hợp lệ");
    //     }
    //     return NextResponse.next();
    //   })
    //   .catch(() => NextResponse.redirect(new URL("/login", request.url)));
  }
  if (pathname.startsWith("/login") && userCookie) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/storage/:path*", "/admin/:path*", "/login/:path*"],
};
