import { ButtonProps, InputProps, TableColumnsType } from "antd";
import { ChangeEvent, ReactElement, ReactNode } from "react";

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
  icon: string;
  link?: string;
  status?: {
    name: string;
    color: string;
  };
}

export interface IPropCardStorage extends IPropCardSkill {
  href: string;
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
  actionDataSource: ReactElement;
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
