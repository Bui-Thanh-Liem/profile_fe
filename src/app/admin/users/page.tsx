import { findAll } from "@/apis/user.api";
import { IPropPage } from "@/interfaces/propsPage.interface";
import UserLayout from "@/layouts/private/user/User";

export default async function UsersPage({ searchParams }: IPropPage) {
  const { limit, page } = searchParams;
  const resUser = await findAll({ limit, page });
  console.log("resUser:::", resUser);

  return (
    <UserLayout
      items={resUser?.data?.items || []}
      totalItems={resUser?.data?.totalItems || 0}
    />
  );
}
