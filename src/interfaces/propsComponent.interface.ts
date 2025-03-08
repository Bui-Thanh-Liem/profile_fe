import { AvatarProps, ButtonProps, InputProps, TableColumnsType } from "antd";
import { ChangeEvent, ReactElement, ReactNode } from "react";
import { TResponse } from "./response.interface";
import { IRoleGroup } from "./model.interface";

export interface IPropIconNavbar {
  src: string;
  alt: string;
}

export interface IPropItemLinkNavbar {
  href: string;
  children: string | ReactNode;
}

export interface IPropButtonPrimary extends ButtonProps {
  children: string | ReactNode;
}

export interface IPropAnimatedText {
  children: string | ReactNode;
}

export interface IPropEnterTextAnimated {
  texts: Array<string>;
}

export interface IPropCardSkill {
  name: string;
  image: string;
  progress: number;
  link?: string;
}

export interface IPropCardRoleGroup {
  roleGroup: IRoleGroup;
}

export interface IPropCardPercentAdmin {
  value: number;
  title: string;
  percent: number;
  link?: string;
}

export interface IPropCardStorage extends IPropCardSkill {
  href: string;
  status?: {
    name: string;
    color: string;
  };
}

export interface IPropInputPrimary extends InputProps {
  value: string;
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export interface IPropInputPassword {
  label?: string;
  value: string;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IPropLogo {
  size?: "small" | "medium" | "large";
}

export interface IPropCaptcha {
  handleCheck: (isCheck: boolean) => void;
}

export default interface IPropMyTable<T> {
  columns: TableColumnsType<T>;
  dataSource: Array<T>;
  totalDataSource: number;
  actionDataSource: ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteApi: (ids: string[]) => Promise<TResponse<any>>;
}

export interface IPropTableAction {
  onEdit: () => void;
  onDelete: () => void;
}

export interface IPropsMyTableToolbar {
  onClickAddItem: () => void;
  onClickDeleteItems: () => void;
  checkedIds: Array<string>;
}

export interface IPropMyTag {
  tagName: string;
}

export interface IPropMyEditor {
  content: string;
}

export interface IPropMyAvatar extends AvatarProps {
  src?: string;
  alt: string;
  fallbackText: string;
}
