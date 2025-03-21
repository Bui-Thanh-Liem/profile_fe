"use server";
import { cookies } from "next/headers";

export async function clearCookie(key: string) {
  try {
    cookies().delete(key);
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
}
