"use server";
import { CONSTANT_ROUTE, CONSTANT_TAG_CACHE } from "@/constants";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { INote } from "@/interfaces/model.interface";
import { InterfaceCommon, Utils } from "liemdev-profile-lib";
import { revalidateTag } from "next/cache";

export async function create(payload: Partial<INote>) {
  const response = await callApiServerCookie<INote>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.KEYWORD}`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.keywords);
  return response;
}

export async function update(id: string, payload: Partial<INote>) {
  const response = await callApiServerCookie<INote>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.KEYWORD}/${id}`,
    options: {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.keywords);
  revalidateTag(CONSTANT_TAG_CACHE.knowledge_s);
  return response;
}

export async function findOneById(id: string) {
  const response = await callApiServerCookie<INote>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.KEYWORD}/${id}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.keyword] },
    },
  });
  return response;
}

export async function findAll(queries: InterfaceCommon.IQueries<INote>) {
  const response = await callApiServerCookie<InterfaceCommon.IGetMulti<INote>>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${
      CONSTANT_ROUTE.KEYWORD
    }${Utils.UtilConvert.convertObjectToString(queries)}`,
    options: {
      method: "GET",
      cache: "no-cache",
      next: { tags: [CONSTANT_TAG_CACHE.keywords] },
    },
  });
  return response;
}

export async function deleteMulti(payload: string[]) {
  const response = await callApiServerCookie<InterfaceCommon.IGetMulti<INote>>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.KEYWORD}`,
    options: {
      method: "DELETE",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.keywords);
  revalidateTag(CONSTANT_TAG_CACHE.knowledge_s);
  return response;
}
