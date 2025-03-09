"use server";
import { CONSTANT_ROUTE, CONSTANT_TAG_CACHE } from "@/constants";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { IImage } from "@/interfaces/model.interface";
import { InterfaceCommon, Utils } from "liemdev-profile-lib";
import { revalidateTag } from "next/cache";

export async function uploadSingle(payload: FormData) {
  const response = await callApiServerCookie<IImage>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.IMAGE}/single`,
    options: {
      method: "POST",
      body: payload,
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.images);
  return response;
}

export async function update(id: string, payload: FormData) {
  const response = await callApiServerCookie<IImage>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.IMAGE}/single/${id}`,
    options: {
      method: "PATCH",
      body: payload,
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.images);
  return response;
}

export async function findOneById(id: string) {
  const response = await callApiServerCookie<IImage>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.IMAGE}/${id}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.image] },
    },
  });
  return response;
}

export async function findAll(queries: InterfaceCommon.IQueries) {
  const response = await callApiServerCookie<InterfaceCommon.IGetMulti<IImage>>(
    {
      url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${
        CONSTANT_ROUTE.IMAGE
      }${Utils.ConvertObject.convertObjectToString(queries)}`,
      options: {
        method: "GET",
        cache: "force-cache",
        next: { tags: [CONSTANT_TAG_CACHE.images] },
      },
    }
  );
  return response;
}

export async function findAllKey(queries: InterfaceCommon.IQueries) {
  const response = await callApiServerCookie<
    InterfaceCommon.IGetMulti<Pick<IImage, "key">>
  >({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${
      CONSTANT_ROUTE.IMAGE
    }${Utils.ConvertObject.convertObjectToString(queries)}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [`${CONSTANT_TAG_CACHE.images}-keys`] },
    },
  });
  return response;
}

export async function deleteMulti(payload: string[]) {
  const response = await callApiServerCookie<InterfaceCommon.IGetMulti<IImage>>(
    {
      url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.IMAGE}`,
      options: {
        method: "DELETE",
        body: JSON.stringify(payload),
      },
    }
  );
  revalidateTag(CONSTANT_TAG_CACHE.images);
  return response;
}
