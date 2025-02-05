import { EGender, EBoolean } from "@/enums/model.enum";
import { IBaseModel } from "./base.interface";

export interface IUser extends IBaseModel {
  avatar: string;
  fullName: string;
  gender: EGender;
  email: string;
  phone: string;
  role: string;
  subAdmin: EBoolean;
  block: EBoolean;
}

export interface ICustomer {
  fullName: string;
}

export interface IRole {
  name: string;
}

export interface IFile {
  name: string;
  size: number;
  url: string;
}

export interface IStorageImage {
  name: string;
  size: number;
  url: string;
}
