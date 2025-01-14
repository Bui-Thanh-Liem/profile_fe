import { IPropCardStorage } from "@/interfaces/propsComponent.interface";
import Image from "next/image";
import Link from "next/link";

export default function CardStorage(props: IPropCardStorage) {
  const { iconUrl, name, href } = props;

  return (
    <Link
      href={href || "/"}
      className="h-64 w-96 border-4 bg-gradient-to-tr from-primary rounded-tl-3xl rounded-br-3xl flex items-center justify-center"
    >
      <Image width={200} height={200} src={iconUrl} alt={name} />
      {/* {name} */}
    </Link>
  );
}
