import { EBlock, EGender } from "@/enums/model.enum";
import { IUser } from "@/interfaces/model.interface";
import { mock_roles } from "./role";
import { mock_roleGroups } from "./roleGroup";

export const mock_admin: IUser = {
  avatar: `https://randomuser.me/api/portraits/men/0.jpg`,
  block: EBlock.ACTIVE,
  email: `admin@example.com`,
  password: "admin",
  fullName: `admin`,
  gender: EGender.MALE,
  phone: `0375255073`,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  role: [],
  roleGroups: [],
  subAdmin: false,
  isAdmin: true,

  id: "admin",
  createdAt: new Date(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdBy: "" as any,
  updatedAt: new Date(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedBy: "" as any,
};

export const mock_users: Array<IUser> = Array.from(
  { length: 100 },
  (_, index) => ({
    avatar: `https://randomuser.me/api/portraits/men/${index % 50}.jpg`,
    block: index % 2 === 0 ? EBlock.BLOCKED : EBlock.ACTIVE,
    email: `user${index}@example.com`,
    password: "user",
    fullName: `User ${index}`,
    gender: index % 2 === 0 ? EGender.MALE : EGender.FEMALE,
    phone: `0901234${String(index).padStart(2, "0")}`,
    role: mock_roles,
    roleGroups: mock_roleGroups,
    subAdmin: index % 5 === 0 ? true : false,
    isAdmin: false,
    id: index.toString(),
    createdAt: new Date(),
    createdBy: mock_admin,
    updatedAt: new Date(),
    updatedBy: mock_admin,
  })
);
