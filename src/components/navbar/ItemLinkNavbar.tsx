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
  }, [pathname, props.href]);

  return (
    <Link
      href={props.href}
      className={`inline-block p-1 relative group hover:text-primary ${
        isActive
          ? "border-primary text-primary -top-1.5 transition-all ease-linear duration-200"
          : "border-transparent"
      }`}
    >
      {props.children}
      <div
        className={`absolute w-0 left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300 ease-in-out group-hover:w-full ${
          isActive && "w-[100%]"
        }`}
      ></div>
    </Link>
  );
}
