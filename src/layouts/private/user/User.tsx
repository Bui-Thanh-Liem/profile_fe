import MyTable from "@/components/table/Table";
import { EBoolean, EGender } from "@/enums/model.enum";
import { IUser } from "@/interfaces/model.interface";
import { userActionColumns } from "./UserColumn";

export default function UserLayout() {
  const admin: IUser = {
    avatar: `https://randomuser.me/api/portraits/men/0.jpg`,
    block: EBoolean.NO,
    email: `admin@example.com`,
    fullName: `admin`,
    gender: EGender.MALE,
    phone: `0375255073`,
    role: "admin",
    subAdmin: EBoolean.NO,

    id: "0",
    createdAt: new Date(),
    createdBy: "" as any,
    updatedAt: new Date(),
    updatedBy: "" as any,
  };

  const demoUsers: Array<IUser> = Array.from({ length: 100 }, (_, index) => ({
    avatar: `https://randomuser.me/api/portraits/men/${index % 50}.jpg`,
    block: index % 2 === 0 ? EBoolean.YES : EBoolean.NO,
    email: `user${index}@example.com`,
    fullName: `User ${index}`,
    gender: index % 2 === 0 ? EGender.MALE : EGender.FEMALE, // Chia đều nam/nữ
    phone: `0901234${String(index).padStart(2, "0")}`,
    role: index % 10 === 0 ? "Admin" : "User", // Mỗi 10 người sẽ có 1 admin
    subAdmin: index % 5 === 0 ? EBoolean.YES : EBoolean.NO, // Mỗi 5 người có 1 subAdmin

    id: index.toString(),
    createdAt: new Date(),
    createdBy: admin,
    updatedAt: new Date(),
    updatedBy: admin,
  }));

  return (
    <MyTable columns={userActionColumns} dataSource={[admin, ...demoUsers]} />
  );
}
