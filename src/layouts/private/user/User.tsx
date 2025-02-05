import MyTable from "@/components/table/MyTable";
import UserAction from "./UserAction";
import { userActionColumns } from "./UserColumn";
import { mock_admin, mock_users } from "@/mocks/user";

export default function UserLayout() {

  return (
    <MyTable
      columns={userActionColumns}
      dataSource={[mock_admin, ...mock_users]}
      actionDataSource={<UserAction />}
    />
  );
}
