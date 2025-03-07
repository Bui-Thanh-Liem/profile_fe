import MyTable from "@/components/table/MyTable";
import { IUser } from "@/interfaces/model.interface";
import { IPropUserLayout } from "@/interfaces/propsLayout.interface";
import UserAction from "./UserAction";
import { userActionColumns } from "./UserColumn";
import { deleteMulti } from "@/apis/user.api";

export default function UserLayout({
  items,
  totalItems,
}: IPropUserLayout<IUser>) {
  console.log("items:::", items);

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
