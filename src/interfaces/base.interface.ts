import { IUser } from "./model.interface";

export interface IBaseModel {
  id: string;
  createdAt: Date;
  createdBy: IUser;
  updatedAt: Date;
  updatedBy: IUser;
}
