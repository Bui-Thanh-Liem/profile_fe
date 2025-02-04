import { ButtonProps, InputProps } from "antd";
import { ChangeEvent, ReactNode } from "react";

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

export interface IPropTableAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataAction: any;
}
