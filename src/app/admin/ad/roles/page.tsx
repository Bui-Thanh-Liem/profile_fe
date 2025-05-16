import { deleteMulti, findAll } from "@/apis/role.api";
import MyTable from "@/components/table/MyTable";
import { IRole } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import RoleAction from "@/layouts/private/ad/role/RoleAction";
import { RoleActionColumns } from "@/layouts/private/ad/role/RoleColumn";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function RolesPage({ searchParams }: IPropPage<IRole>) {
  const defaultQueries = handleSetDefaultQueries(searchParams);
  const resRoles = await findAll(defaultQueries);

  return (
    <MyTable
      dataSource={resRoles?.data?.items || []}
      totalDataSource={resRoles?.data?.totalItems || 0}
      columns={RoleActionColumns}
      actionDataSource={<RoleAction />}
      deleteApi={deleteMulti}
      initialLimit={Number(defaultQueries.limit)}
      initialPage={Number(defaultQueries.page)}
    />
  );
}
