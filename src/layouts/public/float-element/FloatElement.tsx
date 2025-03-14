"use client";
import { usePathname } from "next/navigation";
import { ContactMe } from "./ContactMe";

export function FloatElement() {
  const pathname = usePathname();
  const isStorage = pathname.startsWith("storage");
  return <ContactMe />;
}
