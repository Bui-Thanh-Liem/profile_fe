"use client";
import { IPropItemLinkNavbar } from "@/interfaces/propsComponent.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ItemLinkNavbar(props: IPropItemLinkNavbar) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const page = pathname?.split("/").slice(1, 2).join("");
    setIsActive(() => {
      if (page === "" && props.href === "/") {
        return true;
      }
      return page === props.href;
    });
  }, [pathname]);

  return (
    <Link
      href={props.href}
      className={`pb-1 border-b-2 ${
        isActive ? "border-primary" : "border-transparent"
      }`}
    >
      {props.children}
    </Link>
  );
}
