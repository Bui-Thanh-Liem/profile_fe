import { CONSTANT_ROUTE } from "@/constants";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { IUser } from "@/interfaces/model.interface";
import { InterfaceCommon, Utils } from "liemdev-profile-lib";

export async function login(payload: Partial<IUser>) {
  const response = await callApiServerCookie<
    InterfaceCommon.IResponseLogin<IUser>
  >({
    url: `${process.env.SERVER_HOST}/api/v1/${CONSTANT_ROUTE.AUTH}/${"login"}`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
  return response;
}

export async function refresh() {
  const response = await callApiServerCookie<boolean>({
    url: `${process.env.SERVER_HOST}/api/v1/${
      CONSTANT_ROUTE.AUTH
    }/${"refresh"}`,
    options: {
      method: "POST",
      // body: JSON.stringify(""),
    },
  });
  return response;
}

export async function logout() {
  const response = await callApiServerCookie<boolean>({
    url: `${process.env.SERVER_HOST}/api/v1/${CONSTANT_ROUTE.AUTH}/${"logout"}`,
    options: {
      method: "POST",
    },
  });
  return response;
}

export async function enterEmail(payload: { email: string }) {
  const response = await callApiServerCookie<boolean>({
    url: `${process.env.SERVER_HOST}/api/v1/${
      CONSTANT_ROUTE.AUTH
    }/${"enter-email"}`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
  return response;
}

export async function configOtp({
  otp,
  token,
}: {
  token: string;
  otp: string;
}) {
  const response = await callApiServerCookie<{ token: string }>({
    url: `${process.env.SERVER_HOST}/api/v1/${
      CONSTANT_ROUTE.AUTH
    }/${"confirm-otp"}/${token}`,
    options: {
      method: "POST",
      body: JSON.stringify({ otp }),
    },
  });
  return response;
}

export async function resetPassword({
  token,
  password,
}: {
  token: string;
  password: string;
}) {
  const response = await callApiServerCookie<boolean>({
    url: `${process.env.SERVER_HOST}/api/v1/${
      CONSTANT_ROUTE.AUTH
    }/${"reset-password"}${Utils.UtilConvert.convertObjectToString({
      token,
    })}`,
    options: {
      method: "POST",
      body: JSON.stringify({ password }),
    },
  });
  return response;
}

export async function getMe() {
  const response = await callApiServerCookie<IUser>({
    url: `${process.env.SERVER_HOST}/api/v1/${CONSTANT_ROUTE.AUTH}/${"me"}`,
    options: {
      method: "GET",
    },
  });
  return response;
}
