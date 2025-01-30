import { IPropLogo } from "@/interfaces/propsComponent.interface";
import Link from "next/link";

const Logo = ({ size = "medium" }: IPropLogo) => {
  let sizeIn = "p-2 text-lg rounded-tl-[15px] rounded-br-[15px]";
  switch (size) {
    case "small":
      sizeIn = "p-1 text-sm rounded-tl-[10px] rounded-br-[10px]";
      break;
    case "large":
      sizeIn = "p-3 text-xl rounded-tl-[20px] rounded-br-[20px]";
  }

  return (
    <Link
      href="/"
      className={`bg-foreground text-background font-bold ${sizeIn}`}
    >
      .LiemDev
    </Link>
  );
};

export default Logo;
