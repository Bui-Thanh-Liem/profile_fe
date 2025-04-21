import { IPropNavbarItemIcon } from "@/interfaces/propsComponent.interface";
import { Button } from "antd";
export function NavbarItemIcon({ icon }: IPropNavbarItemIcon) {
  return (
    <div className="rounded-full relative hover:-top-1 transition-all ease-linear duration-150">
      <Button
        type="text"
        shape="circle"
        size="middle"
        icon={icon}
        // className="hover:-translate-y-1 transition-all duration-150"
      />
    </div>
  );
}
