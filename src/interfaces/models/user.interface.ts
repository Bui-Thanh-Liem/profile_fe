import { EBlock, EGender } from "@/enums/model.enum";
import { IBaseModel } from "../base.interface";
import { IRole, IRoleGroup } from "./role.interface";

export interface IUser extends IBaseModel {
  fullName: string;
  avatar: string;
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