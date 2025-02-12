
import { EAction } from "@/enums/role/action.enum";
import { EResource } from "@/enums/role/resource.enum";
import { IBaseModel } from "../base.interface";

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

export interface IRoleDataSource {
  actions: ReadonlyArray<EAction>;
  resource: EResource;
}
