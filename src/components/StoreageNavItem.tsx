"use client";
import { IPropStorageNavItem } from "@/interfaces/propsComponent.interface";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MyTooltip } from "./MyTooltip";
import arrowLeft from "../../public/icons/left-arrow.png";

export function StorageNavItem({ image, name, href }: IPropStorageNavItem) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Row className="mb-8 relative">
      <Col
        className={`rounded-tl-2xl rounded-br-2xl overflow-hidden cursor-pointer bg-gray-second-app ${
          isActive && "bg-primary"
        }`}
      >
        <Link href={href}>
          <MyTooltip title={name} placement="right" color="#04befe">
            <Image src={image} alt={name} width={50} height={50} />
          </MyTooltip>
        </Link>
      </Col>
      {isActive && (
        <Col className="absolute top-1/2 -translate-y-1/2 -right-12">
          <Image
            width={30}
            height={10}
            src={arrowLeft.src}
            alt="icon"
            className="animate-bounce-left object-contain"
          />
        </Col>
      )}
    </Row>
  );
}
