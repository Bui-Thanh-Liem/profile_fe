import { findAll } from "@/apis/role-group";
import { IRoleGroup } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import RoleGroupLayout from "@/layouts/private/role-group/RoleGroup";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function RoleGroupsPage({
  searchParams,
}: IPropPage<IRoleGroup>) {
  const { limit, page } = handleSetDefaultQueries(searchParams);
  const resRoleGroups = await findAll({ limit, page });

  return (
    <RoleGroupLayout
      items={resRoleGroups?.data?.items || []}
      totalItems={resRoleGroups?.data?.totalItems || 0}
    />
  );
}
