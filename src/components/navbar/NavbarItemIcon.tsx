import Image from "next/image";

//
import { IPropNavbarItemIcon } from "@/interfaces/propsComponent.interface";

//
export function NavbarItemIcon(props: IPropNavbarItemIcon) {
  const { src, alt } = props;

  return (
    <div className="rounded-full relative hover:-top-1 transition-all ease-linear duration-150">
      <Image width={28} height={28} src={src} alt={alt || "icon navbar"} />
    </div>
  );
}
