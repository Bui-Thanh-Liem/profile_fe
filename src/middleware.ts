import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CONSTANT_TOKEN } from "./constants";
import { callApiServerCookie } from "./helper/api-server-cookie.helper";
import { IUser } from "./interfaces/model.interface";
import { Constants } from "liemdev-profile-lib";
import { clearCookieBrowser } from "./app/actions/clear-cookie";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // const response = NextResponse.next();

  //
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
  const pathStorage = "/storage";
  if (pathname === pathStorage) {
    return NextResponse.next();
  }
  if (pathname.startsWith(pathStorage) && !customerCookie) {
    return NextResponse.redirect(new URL(pathStorage, request.url));
  }

  // user
  if (pathname.startsWith("/admin")) {
    if (!userCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      // check token
      return callApiServerCookie<IUser>({
        url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/protected`,
        options: {
          method: "GET",
        },
      })
        .then(async (res) => {
          //
          if (res?.statusCode !== 200) {
            //
            console.log("Nếu vào đây là token gửi từ client có vấn để");
            await clearCookieBrowser(Constants.CONSTANT_TOKEN.TOKEN_NAME_USER);
            await clearCookieBrowser(
              Constants.CONSTANT_TOKEN.TOKEN_NAME_USER_RF
            );

            //
            return NextResponse.redirect(new URL("/login", request.url));
          }

          //
          const { data: user } = res;

          if (
            !user.isSubAdmin &&
            !user.isAdmin &&
            pathname.startsWith("/admin/ad/")
          ) {
            console.log("middleware user ko admin ::", user);
            return NextResponse.redirect(new URL("/forbidden", request.url));
          }

          //
          return NextResponse.next();
        })
        .catch(() => NextResponse.redirect(new URL("/login", request.url)));
    }
  }

  // logged
  if (pathname.startsWith("/login") && userCookie) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/storage/:path*",
    "/admin/:path*",
    "/admin/ad/:path*",
    "/login/:path*",
  ],
};
