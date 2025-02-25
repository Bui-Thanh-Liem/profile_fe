"use server";
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

  const result: TResponse<T> = await response.json();

  if (response.status === 403) {
    redirect("/auth/login");
  }

  if (response.status === 406) {
    redirect("/storage");
  }

  return result;
};

// khi gọi api trên server component thì phải check hết hạn token hoặc ở middleware
// Chuyển hướng tới trang logout rồi xoá cookie
