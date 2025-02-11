"use server";
import { CONST_METHODS, CONST_VALUES } from "@/constants";
import { IErrorResponse } from "@/interfaces/common/IResponse.interface";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IOptions {
  url: string;
  options: RequestInit;
}

export const api = async <TypeResult>({
  url,
  options,
}: IOptions): Promise<TypeResult & IErrorResponse> => {
  let headers: HeadersInit;

  if (options.body instanceof FormData) {
    headers = {
      ...options.headers,
      Cookie: cookies().toString(),
    };
  } else {
    headers = {
      ...options.headers,
      "Content-Type": "application/json", // Set appropriate content type
      Cookie: cookies().toString(),
    };
  }

  const dataOptions: RequestInit = {
    ...options,
    headers,
    credentials: "include",
  };

  const response = await fetch(url, dataOptions);

  let result: TypeResult & IErrorResponse = await response.json();

  if (result.statusCode == 406) {
    cookies().set(), )delete(CONST_VALUES.TOKEN);
    redirect("/auth/login");
  }

  return result;
};
