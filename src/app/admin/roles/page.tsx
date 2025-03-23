import { findAll } from "@/apis/role.api";
import { IRole } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import RoleLayout from "@/layouts/private/role/Role";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function RolesPage({ searchParams }: IPropPage<IRole>) {
  const { limit, page } = handleSetDefaultQueries(searchParams);
  const resRoles = await findAll({ limit, page });

  return (
    <RoleLayout
      items={resRoles?.data?.items || []}
      totalItems={resRoles?.data?.totalItems || 0}
    />
  );
}
