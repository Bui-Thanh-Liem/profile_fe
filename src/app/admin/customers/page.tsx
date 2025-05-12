import { findAll } from "@/apis/customer.api";
import { ICustomer } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import CustomerLayout from "@/layouts/private/customer/Customer";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function CustomerPage({
  searchParams,
}: IPropPage<ICustomer>) {
  const { limit, page } = handleSetDefaultQueries(searchParams);
  const resUsers = await findAll({ limit, page });

  return (
    <CustomerLayout
      items={resUsers?.data?.items || []}
      totalItems={resUsers?.data?.totalItems || 0}
    />
  );
}
