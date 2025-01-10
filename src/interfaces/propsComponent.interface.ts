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
  iconUrl: string;
}

export interface IPropInputPrimary extends InputProps {
  value: string;
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export interface IPropInputPassword {
  value: string;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
}
