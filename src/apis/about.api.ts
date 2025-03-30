"use server";
import { CONSTANT_ROUTE, CONSTANT_TAG_CACHE } from "@/constants";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { IAbout } from "@/interfaces/model.interface";
import { revalidateTag } from "next/cache";

export async function update(payload: FormData) {
  const response = await callApiServerCookie<IAbout>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.ABOUT}`,
    options: {
      method: "PATCH",
      body: payload,
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.about);
  return response;
}

export async function find() {
  const response = await callApiServerCookie<IAbout>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.ABOUT}`,
    options: {
      method: "GET",
      next: { tags: [CONSTANT_TAG_CACHE.about], revalidate: 3600 },
    },
  });
  return response;
}

// cache: "force-cache" -> Static site generation (SSG)           // chỉ gọi data lên build thôi
// revalidate: 3600     -> Incremental Static Regeneration (ISR)  // gọi data lên build và đồng thời set thời gian để gọi lại api cập nhật data mới
