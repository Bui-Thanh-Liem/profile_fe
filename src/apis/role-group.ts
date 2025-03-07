"use server";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { IRoleGroup } from "@/interfaces/model.interface";
import { Constants, InterfaceCommon, Utils } from "liemdev-profile-lib";
import { revalidateTag } from "next/cache";

const tag = {
  roleGroup: "role-group",
  roleGroups: "role-groups",
};

export async function create(payload: Partial<IRoleGroup>) {
  const response = await callApiServerCookie<IRoleGroup>({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${Constants.CONSTANT_ROUTE.ROLE_GROUP}`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(tag.roleGroups);
  return response;
}

export async function update(id: string, payload: Partial<IRoleGroup>) {
  const response = await callApiServerCookie<IRoleGroup>({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${Constants.CONSTANT_ROUTE.ROLE_GROUP}/${id}`,
    options: {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(tag.roleGroups);
  return response;
}

export async function findOneById(id: string) {
  const response = await callApiServerCookie<IRoleGroup>({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${Constants.CONSTANT_ROUTE.ROLE_GROUP}/${id}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [tag.roleGroup] },
    },
  });
  return response;
}

// export async function findManyByIds(ids: string[]) {
//   const response = await callApiServerCookie<IRoleGroup>({
//     url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${Constants.CONSTANT_ROUTE.ROLE_GROUP}/ids/${ids}`,
//     options: {
//       method: "GET",
//     },
//   });
//   revalidateTag(tag.roleGroups);
//   return response;
// }

// export function findOneByField() {}

export async function findAll(queries: InterfaceCommon.IQueries) {
  const response = await callApiServerCookie<
    InterfaceCommon.IGetMulti<IRoleGroup>
  >({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${
      Constants.CONSTANT_ROUTE.ROLE_GROUP
    }${Utils.ConvertObject.convertObjectToString(queries)}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [tag.roleGroups] },
    },
  });
  return response;
}

export async function deleteMulti(payload: string[]) {
  const response = await callApiServerCookie<
    InterfaceCommon.IGetMulti<IRoleGroup>
  >({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${Constants.CONSTANT_ROUTE.ROLE_GROUP}`,
    options: {
      method: "DELETE",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(tag.roleGroups);
  return response;
}
