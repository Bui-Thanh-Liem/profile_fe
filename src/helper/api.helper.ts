"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IOptions {
  url: string;
  options: RequestInit;
}

export const callApi = async <TypeResult>({
  url,
  options,
}: IOptions): Promise<TypeResult> => {
  let headers: HeadersInit;

  // header
  if (options.body instanceof FormData) {
    headers = {
      ...options.headers,
      Cookie: cookies().toString(),
    };
  } else {
    headers = {
      ...options.headers,
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    };
  }

  // options
  const dataOptions: RequestInit = {
    headers,
    ...options,
    credentials: "include", // send cookie
  };

  const response = await fetch(url, dataOptions);
  const result = await response.json();

  if (response.status == 403) {
    cookies().set("user", "", { maxAge: 0, path: "/" });
    redirect("/auth/login");
  }

  if (result.statusCode == 406) {
    cookies().set("customer", "", { maxAge: 0 });
    redirect("/storage");
  }

  return result;
};

//  { cache: "force-cache" }, next: { tags: ["products"] }  -> luôn lấy từ cache, nếu revalidateTag mới gọi api
//  { cache: "no-store" }                                   -> không lưu cache
//  { next: { revalidate: 60, tags: ["products"] } }        -> lấy từ cache theo mặc định, nếu revalidateTag mới gọi api
//  revalidateTag("products");                              -> dùng cho api update, create, delete
