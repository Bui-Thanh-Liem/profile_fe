import { IPropNavbarItemIcon } from "@/interfaces/propsComponent.interface";
import { Button } from "antd";
export function NavbarItemIcon({ icon, href }: IPropNavbarItemIcon) {
  return (
    <Button
      className="hover:scale-125 transition-all ease-linear duration-150 bg-gray-second-app"
      type="text"
      shape="circle"
      size="middle"
      icon={icon}
      href={href}
      target="_blank"
    />
  );
}
