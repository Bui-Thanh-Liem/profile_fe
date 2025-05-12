"use server";
import { CONSTANT_ROUTE, CONSTANT_TAG_CACHE } from "@/constants";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { ICustomer } from "@/interfaces/model.interface";
import { InterfaceCommon, Utils } from "liemdev-profile-lib";

export async function verifyLoginGoogle() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await callApiServerCookie<any>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.CUSTOMER}/verify-login-google`,
    options: {
      method: "GET",
    },
  });
  return response;
}

export async function login() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await callApiServerCookie<any>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.CUSTOMER}`,
    options: {
      method: "POST",
    },
  });
  return response;
}

export async function findAll(queries: InterfaceCommon.IQueries<ICustomer>) {
  const response = await callApiServerCookie<
    InterfaceCommon.IGetMulti<ICustomer>
  >({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${
      CONSTANT_ROUTE.CUSTOMER
    }${Utils.UtilConvert.convertObjectToString(queries)}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.customers] },
    },
  });
  return response;
}
