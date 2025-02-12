import { EAction } from "@/enums/role/action.enum";
import { EBlock, EGender } from "@/enums/model.enum";
import { EResource } from "@/enums/role/resource.enum";
import { IBaseModel } from "./base.interface";

export interface IRole extends IBaseModel {
  name: string;
  desc: string;
  dataSource: Array<IRoleDataSource>;
}

export interface IRoleGroup extends IBaseModel {
  name: string;
  desc: string;
  roles: Array<IRole>;
}

export interface IUser extends IBaseModel {
  avatar: string;
  fullName: string;
  gender: EGender;
  email: string;
  password: string;
  phone: string;
  role: Array<IRole>;
  roleGroups: Array<IRoleGroup>;
  subAdmin: boolean;
  isAdmin: boolean;
  block: EBlock;
}

export interface ICustomer {
  fullName: string;
}

export interface IRoleDataSource {
  actions: ReadonlyArray<EAction>;
  resource: EResource;
}

export interface IFile {
  name: string;
  size: number;
  url: string;
}

export interface IImage {
  name: string;
  size: number;
  url: string;
}
