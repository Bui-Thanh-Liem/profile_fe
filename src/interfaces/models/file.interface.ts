import { IBaseModel } from "../base.interface";

export interface IFile extends IBaseModel {
  name: string;
  size: number;
  url: string;
}
