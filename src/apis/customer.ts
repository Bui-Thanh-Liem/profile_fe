"use server";
import { CONSTANT_ROUTE } from "@/constants";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";

export async function loginByGoogle() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await callApiServerCookie<any>({
    url: `${process.env.SERVER_HOST}/api/v1/${CONSTANT_ROUTE.CUSTOMER}/google/login`,
    options: {
      method: "GET",
    },
  });
  return response;
}

export async function login() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await callApiServerCookie<any>({
    url: `${process.env.SERVER_HOST}/api/v1/${CONSTANT_ROUTE.CUSTOMER}`,
    options: {
      method: "POST",
    },
  });
  return response;
}
