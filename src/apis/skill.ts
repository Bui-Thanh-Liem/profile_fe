"use server";
import { CONSTANT_ROUTE, CONSTANT_TAG_CACHE } from "@/constants";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { ISkill } from "@/interfaces/model.interface";
import { InterfaceCommon, Utils } from "liemdev-profile-lib";
import { revalidateTag } from "next/cache";

export async function create(payload: FormData) {
  const response = await callApiServerCookie<ISkill>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.SKILL}`,
    options: {
      method: "POST",
      body: payload,
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.skills);
  return response;
}

export async function update(id: string, payload: FormData) {
  const response = await callApiServerCookie<ISkill>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.SKILL}/${id}`,
    options: {
      method: "PATCH",
      body: payload,
    },
  });
  revalidateTag(CONSTANT_TAG_CACHE.skills);
  return response;
}

export async function findOneById(id: string) {
  const response = await callApiServerCookie<ISkill>({
    url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.SKILL}/${id}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [CONSTANT_TAG_CACHE.skill] },
    },
  });
  return response;
}

export async function findAll(queries: InterfaceCommon.IQueries<ISkill>) {
  console.log(
    "process.env.NEXT_PUBLIC_SERVER_HOST:::",
    process.env.NEXT_PUBLIC_SERVER_HOST
  );

  const response = await callApiServerCookie<InterfaceCommon.IGetMulti<ISkill>>(
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${
        CONSTANT_ROUTE.SKILL
      }${Utils.UtilConvert.convertObjectToString(queries)}`,
      options: {
        method: "GET",
        cache: "force-cache",
        next: { tags: [CONSTANT_TAG_CACHE.skills] },
      },
    }
  );
  return response;
}

export async function deleteMulti(payload: string[]) {
  const response = await callApiServerCookie<InterfaceCommon.IGetMulti<ISkill>>(
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/${CONSTANT_ROUTE.SKILL}`,
      options: {
        method: "DELETE",
        body: JSON.stringify(payload),
      },
    }
  );
  revalidateTag(CONSTANT_TAG_CACHE.skills);
  return response;
}
