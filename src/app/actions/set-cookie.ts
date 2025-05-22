"use server";
import { cookies } from "next/headers";

export async function setCookieBrowser(
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  maxAge: number
) {
  try {
    cookies().set(key, value, { maxAge: maxAge });
  } catch (error) {
    console.log("setCookie error", error);
    return false;
  }
}
