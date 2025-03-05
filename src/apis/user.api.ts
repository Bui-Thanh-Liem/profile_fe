import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { IUser } from "@/interfaces/model.interface";
import { Constants, InterfaceCommon, Utils } from "liemdev-profile-lib";
import { revalidateTag } from "next/cache";

const tag = {
  user: "user",
  users: "users",
};

export async function create(payload: Partial<IUser>) {
  const response = await callApiServerCookie<InterfaceCommon.IGetMulti<IUser>>({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${Constants.CONSTANT_ROUTE.USER}`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(tag.users);
  return response;
}

export function update() {}

export function findOneById() {}

export function findOneByField() {}

export async function findAll(queries: InterfaceCommon.IQueries) {
  const response = await callApiServerCookie<InterfaceCommon.IGetMulti<IUser>>({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${
      Constants.CONSTANT_ROUTE.USER
    }${Utils.ConvertObject.convertObjectToString(queries)}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [tag.users] },
    },
  });
  return response;
}

export function deleteMulti() {}
