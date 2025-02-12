import { IBaseModel } from "../base.interface";

export interface IImage extends IBaseModel {
  name: string;
  size: number;
  url: string;
}
