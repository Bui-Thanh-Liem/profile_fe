import { findAll } from "@/apis/role-group";
import { IPropPage } from "@/interfaces/propsPage.interface";
import RoleGroupLayout from "@/layouts/private/role-group/RoleGroup";

export default async function RoleGroupsPage({ searchParams }: IPropPage) {
  const { limit, page, search } = searchParams;
  const resRoleGroups = await findAll({ limit, page, search });

  return (
    <RoleGroupLayout
      items={resRoleGroups?.data?.items || []}
      totalItems={resRoleGroups?.data?.totalItems || 0}
    />
  );
}
