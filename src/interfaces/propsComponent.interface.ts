import { ButtonProps } from "antd";
import { ReactNode } from "react";

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
  icon?: ReactNode;
}
