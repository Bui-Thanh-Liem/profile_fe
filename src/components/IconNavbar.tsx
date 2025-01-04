import Image from "next/image";

//
import { IPropIconNavbar } from "@/interfaces/propsComponent.interface";

//
function IconNavbar(props: IPropIconNavbar) {
  const { src, alt } = props;

  return <Image width={28} height={28} src={src} alt={alt || "icon navbar"} />;
}

export default IconNavbar;
