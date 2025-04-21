"use client";
import { IPropStorageNavItem } from "@/interfaces/propsComponent.interface";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MyTooltip } from "./MyTooltip";

export function StorageNavItem({ icon, name, href }: IPropStorageNavItem) {
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
            <Button
              type={isActive ? "primary" : "text"}
              shape="circle"
              size="middle"
              icon={icon}
            />
          </MyTooltip>
        </Link>
      </Col>
      {isActive && (
        <Col className="absolute top-1/2 -translate-y-1/2 -right-12">
          <ArrowLeftOutlined color="red" />
        </Col>
      )}
    </Row>
  );
}
