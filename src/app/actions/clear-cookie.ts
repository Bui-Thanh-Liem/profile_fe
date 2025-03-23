"use server";
import { cookies } from "next/headers";

export async function clearCookieBrowser(key: string) {
  try {
    cookies().delete(key);
  } catch (error) {
    console.log("clearCookie error", error);
    return false;
  }
}
