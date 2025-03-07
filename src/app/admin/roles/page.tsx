import { findAll } from "@/apis/role.api";
import { IPropPage } from "@/interfaces/propsPage.interface";
import RoleLayout from "@/layouts/private/role/Role";

export default async function UsersPage({ searchParams }: IPropPage) {
  const { limit, page, search } = searchParams;
  const resRoles = await findAll({ limit, page, search });
  return (
    <RoleLayout
      items={resRoles?.data?.items || []}
      totalItems={resRoles?.data?.totalItems || 0}
    />
  );
}
