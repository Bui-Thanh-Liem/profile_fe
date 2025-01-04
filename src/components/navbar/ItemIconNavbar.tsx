import Image from "next/image";

//
import { IPropIconNavbar } from "@/interfaces/propsComponent.interface";

//
function ItemIconNavbar(props: IPropIconNavbar) {
  const { src, alt } = props;

  return (
    <div className="rounded-full hover:bg-primary relative hover:-top-1 transition-all ease-linear duration-150">
      <Image width={28} height={28} src={src} alt={alt || "icon navbar"} />
    </div>
  );
}

export default ItemIconNavbar;
