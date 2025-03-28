"use server";
import { CONSTANT_ROUTE, CONSTANT_TAG_CACHE } from "@/constants";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { IRoleGroup } from "@/interfaces/model.interface";
import { InterfaceCommon, Utils } from "liemdev-profile-lib";
import { revalidateTag } from "next/cache";

export async function create(payload: Partial<IRoleGroup>) {
  const response = await callApiServerCookie<IRoleGroup>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.ROLE_GROUP}`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.roleGroups);
  return response;
}

export async function update(id: string, payload: Partial<IRoleGroup>) {
  const response = await callApiServerCookie<IRoleGroup>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.ROLE_GROUP}/${id}`,
    options: {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.roleGroups);
  return response;
}

export async function findOneById(id: string) {
  const response = await callApiServerCookie<IRoleGroup>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.ROLE_GROUP}/${id}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.roleGroup] },
    },
  });
  return response;
}

export async function findAll(queries: InterfaceCommon.IQueries<IRoleGroup>) {
  const response = await callApiServerCookie<
    InterfaceCommon.IGetMulti<IRoleGroup>
  >({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${
      CONSTANT_ROUTE.ROLE_GROUP
    }${Utils.UtilConvert.convertObjectToString(queries)}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.roleGroups] },
    },
  });
  return response;
}

export async function deleteMulti(payload: string[]) {
  const response = await callApiServerCookie<
    InterfaceCommon.IGetMulti<IRoleGroup>
  >({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.ROLE_GROUP}`,
    options: {
      method: "DELETE",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.roleGroups);
  return response;
}
