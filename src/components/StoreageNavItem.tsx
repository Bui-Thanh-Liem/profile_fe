"use client";
import { IPropStorageNavItem } from "@/interfaces/propsComponent.interface";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MyTooltip } from "./MyTooltip";

export function StorageNavItem({ image, name, href }: IPropStorageNavItem) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Row
      className={`mb-8 rounded-tl-2xl rounded-br-2xl overflow-hidden cursor-pointer ${
        isActive ? "bg-primary -translate-x-6 transition-all" : "bg-slate-200"
      }`}
    >
      <Col>
        <Link href={href}>
          <MyTooltip title={name} placement="right" color="#04befe">
            <Image src={image} alt={name} width={50} height={50} />
          </MyTooltip>
        </Link>
      </Col>
    </Row>
  );
}
