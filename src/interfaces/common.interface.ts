import { InterfaceCommon } from "liemdev-profile-lib";

export type IRoleDataResource = InterfaceCommon.IRoleDataResource;
export type IQueries<T> = InterfaceCommon.IQueries<T>;

export interface ErrorValidateFromServer {
  field: string;
  error: { [key: string]: string };
}

export type ISendMail = InterfaceCommon.ISendMail;
