import { deleteMulti } from "@/apis/role.api";
import MyTable from "@/components/table/MyTable";
import { IRole } from "@/interfaces/model.interface";
import { IPropRoleLayout } from "@/interfaces/propsLayout.interface";
import RoleAction from "./RoleAction";
import { userActionColumns } from "./RoleColumn";

export default function RoleLayout({
  items,
  totalItems,
}: IPropRoleLayout<IRole>) {
  console.log("role :::", items);
  return (
    <MyTable
      dataSource={items}
      totalDataSource={totalItems}
      columns={userActionColumns}
      actionDataSource={<RoleAction />}
      deleteApi={deleteMulti}
    />
  );
}
