"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "antd";

import { IPropCardStorage } from "@/interfaces/propsComponent.interface";

export default function CardStorage(props: IPropCardStorage) {
  const { image, name, href, status } = props;

  return (
    <Badge.Ribbon text={status?.name} color={status?.color}>
      <Link
        href={href || "/"}
        className="h-64 w-96 border-4 bg-gradient-to-tr from-primary rounded-tl-3xl rounded-br-3xl flex items-center justify-center relative overflow-hidden group"
      >
        <Image width={200} height={200} src={image} alt={name} />
        <div className="absolute bg-sky-600/75 h-full w-0 flex text-center skew-x-[150deg] group-hover:w-full transition-all ease-linear duration-300 overflow-hidden">
          <p className="m-auto text-4xl font-bold -skew-x-[150deg] text-background whitespace-nowrap">
            {name}
          </p>
        </div>
      </Link>
    </Badge.Ribbon>
  );
}
