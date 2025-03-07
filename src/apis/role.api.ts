"use server";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { IRole } from "@/interfaces/model.interface";
import { Constants, InterfaceCommon, Utils } from "liemdev-profile-lib";
import { revalidateTag } from "next/cache";

const tag = {
  role: "role",
  roles: "roles",
};

export async function create(payload: Partial<IRole>) {
  const response = await callApiServerCookie<IRole>({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${Constants.CONSTANT_ROUTE.ROLE}`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(tag.roles);
  return response;
}

export async function update(id: string, payload: Partial<IRole>) {
  const response = await callApiServerCookie<IRole>({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${Constants.CONSTANT_ROUTE.ROLE}/${id}`,
    options: {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(tag.roles);
  return response;
}

export async function findOneById(id: string) {
  const response = await callApiServerCookie<IRole>({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${Constants.CONSTANT_ROUTE.ROLE}/${id}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [tag.role] },
    },
  });
  return response;
}

// export async function findManyByIds(ids: string[]) {
//   const response = await callApiServerCookie<IRole>({
//     url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${Constants.CONSTANT_ROUTE.ROLE}/ids/${ids}`,
//     options: {
//       method: "GET",
//     },
//   });
//   revalidateTag(tag.roles);
//   return response;
// }

// export function findOneByField() {}

export async function findAll(queries: InterfaceCommon.IQueries) {
  const response = await callApiServerCookie<InterfaceCommon.IGetMulti<IRole>>({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${
      Constants.CONSTANT_ROUTE.ROLE
    }${Utils.ConvertObject.convertObjectToString(queries)}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [tag.roles] },
    },
  });
  return response;
}

export async function deleteMulti(payload: string[]) {
  const response = await callApiServerCookie<InterfaceCommon.IGetMulti<IRole>>({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${Constants.CONSTANT_ROUTE.ROLE}`,
    options: {
      method: "DELETE",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(tag.roles);
  return response;
}
