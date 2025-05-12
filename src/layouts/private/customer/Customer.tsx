import { deleteMulti } from "@/apis/user.api";
import MyTable from "@/components/table/MyTable";
import { ICustomer } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import { customerActionColumns } from "./CustomerColumn";

export default function CustomerLayout({
  items,
  totalItems,
}: IPropLayout<ICustomer>) {
  return (
    <MyTable
      dataSource={items}
      totalDataSource={totalItems}
      columns={customerActionColumns}
      deleteApi={deleteMulti}
    />
  );
}
