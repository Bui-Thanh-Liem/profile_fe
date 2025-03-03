import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { IUser } from "@/interfaces/model.interface";
import { Constants } from "liemdev-profile-lib";

export async function login(payload: Partial<IUser>) {
  const response = await callApiServerCookie<IUser>({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${
      Constants.CONSTANT_ROUTE.AUTH
    }/${"login"}`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
  return response;
}

export async function refresh() {
  const response = await callApiServerCookie<IUser>({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${
      Constants.CONSTANT_ROUTE.AUTH
    }/${"refresh"}`,
    options: {
      method: "POST",
      // body: JSON.stringify(""),
    },
  });
  return response;
}

export function logout() {}

export function enterEmail() {}

export function configOtp() {}

export function resetPassword() {}

export function getMe() {}
