import { deleteMulti } from "@/apis/role.api";
import MyTable from "@/components/table/MyTable";
import { IRole } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import RoleAction from "./RoleAction";
import { RoleActionColumns } from "./RoleColumn";

export default function RoleLayout({
  items,
  totalItems,
}: IPropLayout<IRole>) {
  return (
    <MyTable
      dataSource={items}
      totalDataSource={totalItems}
      columns={RoleActionColumns}
      actionDataSource={<RoleAction />}
      deleteApi={deleteMulti}
    />
  );
}
