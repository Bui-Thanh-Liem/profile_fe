"use server";
import { CONSTANT_ROUTE, CONSTANT_TAG_CACHE } from "@/constants";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { ISubject } from "@/interfaces/model.interface";
import { InterfaceCommon, Utils } from "liemdev-profile-lib";
import { revalidateTag } from "next/cache";

export async function create(payload: FormData) {
  const response = await callApiServerCookie<ISubject>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.SUBJECT}`,
    options: {
      method: "POST",
      body: payload,
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.subjects);
  return response;
}

export async function update(id: string, payload: FormData) {
  const response = await callApiServerCookie<ISubject>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.SUBJECT}/${id}`,
    options: {
      method: "PATCH",
      body: payload,
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.subjects);
  return response;
}

export async function findOneById(id: string) {
  const response = await callApiServerCookie<ISubject>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.SUBJECT}/${id}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.subject] },
    },
  });
  return response;
}

export async function findAll(queries: InterfaceCommon.IQueries<ISubject>) {
  const response = await callApiServerCookie<
    InterfaceCommon.IGetMulti<ISubject>
  >({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${
      CONSTANT_ROUTE.SUBJECT
    }${Utils.UtilConvert.convertObjectToString(queries)}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.subjects] },
    },
  });
  return response;
}

export async function deleteMulti(payload: string[]) {
  const response = await callApiServerCookie<
    InterfaceCommon.IGetMulti<ISubject>
  >({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.SUBJECT}`,
    options: {
      method: "DELETE",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.subjects);
  return response;
}
