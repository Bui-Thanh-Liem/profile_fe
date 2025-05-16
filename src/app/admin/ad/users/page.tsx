"use server";
import { deleteMulti, findAll } from "@/apis/user.api";
import MyTable from "@/components/table/MyTable";
import { IUser } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import UserAction from "@/layouts/private/ad/user/UserAction";
import { userActionColumns } from "@/layouts/private/ad/user/UserColumn";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function UsersPage({ searchParams }: IPropPage<IUser>) {
  const defaultQueries = handleSetDefaultQueries(searchParams);
  const resUsers = await findAll(defaultQueries);

  return (
    <MyTable
      dataSource={resUsers?.data?.items || []}
      totalDataSource={resUsers?.data?.totalItems || 0}
      columns={userActionColumns}
      actionDataSource={<UserAction />}
      deleteApi={deleteMulti}
      initialPage={Number(defaultQueries.page)}
      initialLimit={Number(defaultQueries.limit)}
    />
  );
}
