import { EGender } from "@/enums/model.enum";

export interface IUser {
  fullName: string;
  gender: EGender;
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
