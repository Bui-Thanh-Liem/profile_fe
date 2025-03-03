import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { IUser } from "@/interfaces/model.interface";
import { Constants, InterfaceCommon } from "liemdev-profile-lib";

const tag = {
  user: "user",
  users: "users",
};

export function create() {}

export function update() {}

export function findOneById() {}

export function findOneByField() {}

export async function findAll(queries: InterfaceCommon.IQueries) {
  const response = await callApiServerCookie<InterfaceCommon.IGetMulti<IUser>>({
    url: `${Constants.CONSTANT_ROUTE.V1_DOMAIN_DEV}/${Constants.CONSTANT_ROUTE.USER}`,
    options: {
      method: "GET",
      cache: "force-cache",
      next: { tags: [tag.users] },
    },
  });
  return response;
}

export function deleteMulti() {}
