"use server";
import { findAll } from "@/apis/user.api";
import { IUser } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import UserLayout from "@/layouts/private/user/User";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function UsersPage({ searchParams }: IPropPage<IUser>) {
  const { limit, page } = handleSetDefaultQueries(searchParams);
  const resUsers = await findAll({ limit, page });

  return (
    <UserLayout
      items={resUsers?.data?.items || []}
      totalItems={resUsers?.data?.totalItems || 0}
    />
  );
}
