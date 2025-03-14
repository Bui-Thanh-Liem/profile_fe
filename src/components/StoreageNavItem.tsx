"use client";
import { IPropStorageNavItem } from "@/interfaces/propsComponent.interface";
import { Col, Row, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function StorageNavItem({ image, name, href }: IPropStorageNavItem) {
  const pathname = usePathname();
  const isActive = href === pathname;
  const color = "#04befe";
  console.log("pathname:::", pathname);
  console.log("href:::", href);
  console.log("isActive:::", isActive);

  return (
    <Row
      className={`mb-8 rounded-tl-2xl rounded-br-2xl overflow-hidden cursor-pointer ${
        isActive ? "bg-primary -translate-x-6 transition-all" : "bg-slate-200"
      }`}
    >
      <Col>
        <Link href={href}>
          <Tooltip title={name} placement="right" color={color}>
            <Image src={image} alt={name} width={50} height={50} />
          </Tooltip>
        </Link>
      </Col>
    </Row>
  );
}
