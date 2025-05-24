import { InterfaceCommon } from "liemdev-profile-lib";
import { IBase } from "./model.interface";

export type IRoleDataResource = InterfaceCommon.IRoleDataResource;
export type IQueries<T> = InterfaceCommon.IQueries<T>;

export interface ErrorValidateFromServer {
  field: string;
  error: { [key: string]: string };
}

export type ISendMail = InterfaceCommon.ISendMail;

export interface IBaseMyTable extends IBase {
  isAdmin?: boolean;
  isSubAdmin?: boolean;
  fullName?: string;
  block?: boolean;
}
