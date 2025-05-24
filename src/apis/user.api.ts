"use server";
import { CONSTANT_ROUTE } from "@/constants";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { IUser } from "@/interfaces/model.interface";
import { InterfaceCommon, Utils } from "liemdev-profile-lib";
import { revalidateTag } from "next/cache";
import { CONSTANT_TAG_CACHE } from "@/constants";

export async function create(payload: Partial<IUser>) {
  const response = await callApiServerCookie<IUser>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.USER}`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.users);
  return response;
}

export async function update(id: string, payload: Partial<IUser>) {
  const response = await callApiServerCookie<IUser>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.USER}/${id}`,
    options: {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.users);
  return response;
}

export async function block(id: string) {
  const response = await callApiServerCookie<IUser>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.USER}/block/${id}`,
    options: {
      method: "PATCH",
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.users);
  return response;
}

export async function revoke(payload: { userIds: string[] }) {
  const response = await callApiServerCookie<IUser>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.USER}/revoke`,
    options: {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.users);
  return response;
}

export async function findOneById(id: string) {
  const response = await callApiServerCookie<IUser>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.USER}/${id}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.user] },
    },
  });
  return response;
}

// export async function findManyByIds(ids: string[]) {
//   const response = await callApiServerCookie<IUser>({
//     url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.USER}/ids/${ids}`,
//     options: {
//       method: "GET",
//     },
//   });
//   revalidateTag(CONSTANT_TAG_CACHE.users);
//   return response;
// }

// export function findOneByField() {}

export async function findAll(queries: InterfaceCommon.IQueries<IUser>) {
  const response = await callApiServerCookie<InterfaceCommon.IGetMulti<IUser>>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${
      CONSTANT_ROUTE.USER
    }${Utils.UtilConvert.convertObjectToString(queries)}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.users] },
    },
  });
  return response;
}

export async function deleteMulti(payload: string[]) {
  const response = await callApiServerCookie<InterfaceCommon.IGetMulti<IUser>>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.USER}`,
    options: {
      method: "DELETE",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.users);
  return response;
}
