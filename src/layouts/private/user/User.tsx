import MyTable from "@/components/table/MyTable";
import { IUser } from "@/interfaces/model.interface";
import { IPropUserLayout } from "@/interfaces/propsLayout.interface";
import UserAction from "./UserAction";
import { userActionColumns } from "./UserColumn";

export default function UserLayout({
  items,
  totalItems,
}: IPropUserLayout<IUser>) {
  return (
    <MyTable
      columns={userActionColumns}
      dataSource={items || []}
      // dataSource={[mock_admin, ...mock_users]}
      actionDataSource={<UserAction />}
    />
  );
}
