"use server";
import { CONSTANT_ROUTE, CONSTANT_TAG_CACHE } from "@/constants";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { IKnowledge } from "@/interfaces/model.interface";
import { InterfaceCommon, Utils } from "liemdev-profile-lib";
import { revalidateTag } from "next/cache";

export async function create(payload: FormData) {
  const response = await callApiServerCookie<IKnowledge>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.KNOWLEDGE}`,
    options: {
      method: "POST",
      body: payload,
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.knowledge_s);
  return response;
}

export async function update(id: string, payload: FormData) {
  const response = await callApiServerCookie<IKnowledge>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.KNOWLEDGE}/${id}`,
    options: {
      method: "PATCH",
      body: payload,
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.knowledge_s);
  return response;
}

export async function like(id: string) {
  const response = await callApiServerCookie<IKnowledge>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.KNOWLEDGE}/like/${id}`,
    options: {
      method: "PATCH",
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.knowledge_s);
  return response;
}

export async function findOneById(id: string) {
  const response = await callApiServerCookie<IKnowledge>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.KNOWLEDGE}/${id}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.knowledge] },
    },
  });
  return response;
}

export async function findOneByIdForCustomer(id: string) {
  const response = await callApiServerCookie<IKnowledge>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.KNOWLEDGE}/for-customer/${id}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.knowledge] },
    },
  });
  return response;
}

export async function findAll(
  queries: InterfaceCommon.IQueries<Partial<IKnowledge>>
) {
  const response = await callApiServerCookie<
    InterfaceCommon.IGetMulti<IKnowledge>
  >({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${
      CONSTANT_ROUTE.KNOWLEDGE
    }${Utils.UtilConvert.convertObjectToString(queries)}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.knowledge_s] },
    },
  });
  return response;
}

export async function findAllForCustomer(
  queries: InterfaceCommon.IQueries<Partial<IKnowledge>>
) {
  const response = await callApiServerCookie<
    InterfaceCommon.IGetMulti<IKnowledge>
  >({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${
      CONSTANT_ROUTE.KNOWLEDGE
    }/for-customer${Utils.UtilConvert.convertObjectToString(queries)}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.knowledge_s] },
    },
  });
  return response;
}

export async function deleteMulti(payload: string[]) {
  const response = await callApiServerCookie<
    InterfaceCommon.IGetMulti<IKnowledge>
  >({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.KNOWLEDGE}`,
    options: {
      method: "DELETE",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.knowledge_s);
  return response;
}
