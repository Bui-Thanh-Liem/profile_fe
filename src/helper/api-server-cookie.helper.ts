"use server";
import { logout, refresh } from "@/apis/auth.api";
import { clearCookieBrowser } from "@/app/actions/clear-cookie";
import { CONSTANT_ENV } from "@/constants";
import { TResponse } from "@/interfaces/response.interface";
import { handleStringCookie } from "@/utils/handleString.util";
import { Constants, Utils } from "liemdev-profile-lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IOptions {
  url: string;
  options?: RequestInit;
}

export const callApiServerCookie = async <T>({
  url,
  options = {},
}: IOptions): Promise<TResponse<T>> => {
  //
  let headers: HeadersInit = {
    ...options.headers,
    Cookie: cookies().toString(), // Server component không tự động gửi cookie như trình duyệt
    "User-Agent": "Next.js Server", // // Thêm nếu BE yêu cầu
  };

  //
  if (!(options.body instanceof FormData)) {
    headers = {
      ...headers,
      "Content-Type": "application/json",
    };
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  // Chuyển tiếp cookie từ nest server -> next server -> client (trình duyệt)
  const cookieFromServer = response.headers.get("set-cookie");
  if (cookieFromServer) {
    const { access, refresh } = handleStringCookie(cookieFromServer);
    cookies().set(access[0], access[1], {
      httpOnly: true,
      secure: process.env.NODE_ENV === CONSTANT_ENV.NODE_ENV.PROD,
      sameSite: "lax", // Khớp với BE
      maxAge: Utils.UtilConvert.convertToSecond("DAY", 3),
    });
    cookies().set(refresh[0], refresh[1], {
      httpOnly: true,
      secure: process.env.NODE_ENV === CONSTANT_ENV.NODE_ENV.PROD,
      sameSite: "lax", // Khớp với BE
      maxAge: Utils.UtilConvert.convertToSecond("DAY", 7),
    });
  }

  let result: TResponse<T> = await response.json();

  //
  if (result.statusCode === 401 && result.message === "Token is expired") {
    // Refresh token rồi gọi lại fetch 1 lần nữa
    await refresh();
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    //
    const cookieFromServer = response.headers.get("set-cookie");
    if (cookieFromServer) {
      const { access, refresh } = handleStringCookie(cookieFromServer);
      cookies().set(access[0], access[1], {
        httpOnly: true,
        secure: process.env.NODE_ENV === CONSTANT_ENV.NODE_ENV.PROD,
        sameSite: "lax", // Khớp với BE
        maxAge: Utils.UtilConvert.convertToSecond("DAY", 3),
      });
      cookies().set(refresh[0], refresh[1], {
        httpOnly: true,
        secure: process.env.NODE_ENV === CONSTANT_ENV.NODE_ENV.PROD,
        sameSite: "lax", // Khớp với BE
        maxAge: Utils.UtilConvert.convertToSecond("DAY", 7),
      });
    }
    result = await response.json();
  }

  //
  if (result.statusCode === 403) {
    // Call api logout
    await clearCookieBrowser(Constants.CONSTANT_TOKEN.TOKEN_NAME_USER);
    await logout();
    redirect("/auth/logout");
  }

  //
  if (result.statusCode === 406) {
    // Call api logout
    await clearCookieBrowser(Constants.CONSTANT_TOKEN.TOKEN_NAME_CUSTOMER);
    redirect("/storage");
  }

  return result;
};

// khi gọi api trên server component thì phải check hết hạn token hoặc ở middleware
// Chuyển hướng tới trang logout rồi xoá cookie

// Khi gọi api tới nestjs từ use server của next thì resquest thực hiện từ server-side không phải từ trình duyệt
