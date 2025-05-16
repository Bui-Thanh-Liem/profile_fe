import {
  AvatarProps,
  ButtonProps,
  DrawerProps,
  InputProps,
  TableColumnsType,
  TooltipProps,
} from "antd";
import { ChangeEvent, ReactElement, ReactNode } from "react";
import { IUser } from "./model.interface";
import { TResponse } from "./response.interface";

export interface IPropNavbarItemIcon {
  icon: ReactNode;
}

export interface IPropNavbarItemLink {
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

export interface IPropCardPercentAdmin {
  value: number;
  title: string;
  percent: number;
  link?: string;
}

export interface IPropCardItemAdmin<T> {
  item: T;
  actives?: string[];
  onClickEdit?: (dataEdit: T) => void;
  onClickDelete?: (ids: string[]) => void;
  onClickActive?: () => void;
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
  actionDataSource?: ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteApi?: (ids: string[]) => Promise<TResponse<any>>;
  initialPage: number;
  initialLimit: number;
}

export interface IPropTableAction {
  isEdit?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export interface IPropsMyTableToolbar {
  onClickAddItem: () => void;
  onClickDeleteItems: (ids: string[]) => void;
  checkedIds: Array<string>;
  totalItems: number;
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

export interface IPropMyDrawer extends DrawerProps {
  handleElement?: ReactNode;
  title: string;
  header: ReactNode;
  content: ReactNode;
}

export interface IPropStorageNavItem {
  icon: ReactNode;
  name: string;
  href: string;
}

export type IPropMyTooltip = TooltipProps & {
  children: ReactNode;
};

export interface IPropMyUpload {
  values: string[];
  onChangeUpload: (files: File[]) => void;
  length?: number;
  aspect?: number;
}

export interface IPropAuthor {
  user: IUser;
  date: Date;
  detail?: boolean;
}

export interface IPropImageCarousel {
  images: string[];
  alt: string;
}

export interface IPropComponentLayout<T> {
  items: Array<T>;
  totalItems: number;
}
