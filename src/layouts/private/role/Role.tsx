import MyTable from "@/components/table/MyTable";
import { mock_roles } from "@/mocks/role";
import RoleAction from "./RoleAction";
import { userActionColumns } from "./RoleColumn";

export default function RoleLayout() {

  return (
    <MyTable
      columns={userActionColumns}
      dataSource={mock_roles}
      actionDataSource={<RoleAction />}
    />
  );
}
