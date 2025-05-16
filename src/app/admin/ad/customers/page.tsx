import { findAll } from "@/apis/customer.api";
import MyTable from "@/components/table/MyTable";
import { ICustomer } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import { customerActionColumns } from "@/layouts/private/ad/customer/CustomerColumn";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function CustomerPage({
  searchParams,
}: IPropPage<ICustomer>) {
  const defaultQueries = handleSetDefaultQueries(searchParams);
  const resUsers = await findAll(defaultQueries);

  return (
    <MyTable
      dataSource={resUsers?.data?.items || []}
      totalDataSource={resUsers?.data?.totalItems || 0}
      columns={customerActionColumns}
      initialPage={Number(defaultQueries.page)}
      initialLimit={Number(defaultQueries.limit)}
    />
  );
}
