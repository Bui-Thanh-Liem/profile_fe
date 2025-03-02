"use server";
import { CONSTANT_ENV } from "@/constants";
import { TResponse } from "@/interfaces/response.interface";
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

  const setCookieHeader = response.headers.get("set-cookie");
  if (setCookieHeader) {
    console.log("Set-Cookie từ nest API:", setCookieHeader); // Debug
    const [name, value] = setCookieHeader.split(";")[0].split("=");
    cookies().set(name, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === CONSTANT_ENV.NODE_ENV.PROD,
      sameSite: "lax", // Khớp với BE
    });
  }

  const result: TResponse<T> = await response.json();

  if (result.statusCode === 403) {
    // Call api logout hoặc refresh token
    redirect("/auth/login");
  }

  if (result.statusCode === 406) {
    redirect("/storage");
  }

  return result;
};

// khi gọi api trên server component thì phải check hết hạn token hoặc ở middleware
// Chuyển hướng tới trang logout rồi xoá cookie

// Khi gọi api tới nestjs từ use server của next thì resquest thự hiện từ server-side không phải từ trình duyệt
