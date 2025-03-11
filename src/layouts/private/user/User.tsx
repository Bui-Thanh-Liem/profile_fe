import { deleteMulti } from "@/apis/user.api";
import MyTable from "@/components/table/MyTable";
import { IUser } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import UserAction from "./UserAction";
import { userActionColumns } from "./UserColumn";

export default function UserLayout({
  items,
  totalItems,
}: IPropLayout<IUser>) {

  return (
    <MyTable
      dataSource={items}
      totalDataSource={totalItems}
      columns={userActionColumns}
      actionDataSource={<UserAction />}
      deleteApi={deleteMulti}
    />
  );
}
