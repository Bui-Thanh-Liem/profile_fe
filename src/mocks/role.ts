import { EAction } from "@/enums/role/action.enum";
import { EBlock, EGender } from "@/enums/model.enum";
import { EResource } from "@/enums/role/resource.enum";
import { IRole, IUser } from "@/interfaces/model.interface";

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
  subAdmin: false,
  isAdmin: true,

  id: "admin",
  createdAt: new Date(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdBy: "" as any,
  updatedAt: new Date(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedBy: "" as any,
  roleGroups: [],
};

export const mock_roles: Array<IRole> = [
  {
    id: "customer",
    name: "customer",
    desc: "customer",
    createdAt: new Date(),
    createdBy: mock_admin,
    updatedAt: new Date(),
    updatedBy: mock_admin,
    dataSource: [
      {
        resource: EResource.Customer,
        actions: [EAction.GET, EAction.PATCH, EAction.POST, EAction.DELETE],
      },
      {
        resource: EResource.Customer,
        actions: [EAction.GET, EAction.PATCH, EAction.POST, EAction.DELETE],
      },
    ],
  },
  {
    id: "file",
    name: "file",
    desc: "file",
    createdAt: new Date(),
    createdBy: mock_admin,
    updatedAt: new Date(),
    updatedBy: mock_admin,
    dataSource: [
      {
        resource: EResource.File,
        actions: [EAction.GET, EAction.PATCH],
      },
    ],
  },
  {
    id: "image",
    name: "image",
    desc: "image",
    createdAt: new Date(),
    createdBy: mock_admin,
    updatedAt: new Date(),
    updatedBy: mock_admin,
    dataSource: [
      {
        resource: EResource.IImage,
        actions: [EAction.GET, EAction.PATCH, EAction.POST, EAction.DELETE],
      },
    ],
  },
];
