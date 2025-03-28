"use server";
import { CONSTANT_ROUTE, CONSTANT_TAG_CACHE } from "@/constants";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { IImageStorage } from "@/interfaces/model.interface";
import { InterfaceCommon, Utils } from "liemdev-profile-lib";
import { revalidateTag } from "next/cache";

export async function create(payload: FormData) {
  const response = await callApiServerCookie<IImageStorage>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.IMAGE_STORAGE}`,
    options: {
      method: "POST",
      body: payload,
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.imageStorages);
  return response;
}

export async function update(id: string, payload: FormData) {
  const response = await callApiServerCookie<IImageStorage>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.IMAGE_STORAGE}/${id}`,
    options: {
      method: "PATCH",
      body: payload,
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.imageStorages);
  return response;
}

export async function findOneById(id: string) {
  const response = await callApiServerCookie<IImageStorage>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.IMAGE_STORAGE}/${id}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.imageStorage] },
    },
  });
  return response;
}

export async function findAll(
  queries: InterfaceCommon.IQueries<IImageStorage>
) {
  const response = await callApiServerCookie<
    InterfaceCommon.IGetMulti<IImageStorage>
  >({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${
      CONSTANT_ROUTE.IMAGE_STORAGE
    }${Utils.UtilConvert.convertObjectToString(queries)}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.imageStorages] },
    },
  });
  return response;
}

export async function deleteMulti(payload: string[]) {
  const response = await callApiServerCookie<
    InterfaceCommon.IGetMulti<IImageStorage>
  >({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.IMAGE_STORAGE}`,
    options: {
      method: "DELETE",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.imageStorages);
  return response;
}
