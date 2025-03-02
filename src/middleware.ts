import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CONSTANT_TOKEN } from "./constants";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // const response = NextResponse.next();
  console.log("pathname:::", pathname);

  const customerCookie = request.cookies.get(
    CONSTANT_TOKEN.TOKEN_NAME_CUSTOMER
  );
  const userCookie = request.cookies.get(CONSTANT_TOKEN.TOKEN_NAME_USER);
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
    // //       response.cookies.set("user", "", { maxAge: 0 }); expires: new Date(0)
    // path: "/", // Đảm bảo xoá trên toàn bộ trang web
    // httpOnly: true, // Bảo mật hơn (cookie không thể bị truy cập từ client-side JS)
    // secure: process.env.NODE_ENV === "production", // Chỉ bật trên HTTPS khi production
    // sameSite: "strict", // Đảm bảo cookie không bị gửi trong yêu cầu từ trang khác
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
