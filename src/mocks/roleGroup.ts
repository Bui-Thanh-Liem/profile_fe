import { EBlock, EGender } from "@/enums/model.enum";
import { IRoleGroup, IUser } from "@/interfaces/model.interface";
import { mock_roles } from "./role";

const mock_admin: IUser = {
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

export const mock_roleGroups: Array<IRoleGroup> = [
  {
    id: "roleGroup_1",
    name: "roleGroup_1",
    desc: "roleGroup_1",
    createdAt: new Date(),
    createdBy: mock_admin,
    updatedAt: new Date(),
    updatedBy: mock_admin,
    roles: mock_roles,
  },
  {
    id: "roleGroup_2",
    name: "roleGroup_2",
    desc: "roleGroup_2",
    createdAt: new Date(),
    createdBy: mock_admin,
    updatedAt: new Date(),
    updatedBy: mock_admin,
    roles: mock_roles,
  },
  {
    id: "roleGroup_3",
    name: "roleGroup_3",
    desc: "roleGroup_3",
    createdAt: new Date(),
    createdBy: mock_admin,
    updatedAt: new Date(),
    updatedBy: mock_admin,
    roles: mock_roles,
  },
];
