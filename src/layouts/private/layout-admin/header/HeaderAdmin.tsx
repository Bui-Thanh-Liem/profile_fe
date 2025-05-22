"use client";
import { BellOutlined, SunOutlined } from "@ant-design/icons";
import { Badge, Button } from "antd";
import { ProfileHeaderAdmin } from "./Profile";
import NetworkSpeed from "./NetworkSpeed";

export function HeaderAdmin() {
  //
  return (
    <div className="flex items-center justify-between">
      <h2 className="leading-none text-xl font-bold">Dashboard</h2>
      <NetworkSpeed />
      <div className="flex items-center gap-9">
        <Button shape="circle" type="text">
          <SunOutlined style={{ fontSize: 24 }} />
        </Button>
        <Badge count={5}>
          <Button shape="circle" type="text">
            <BellOutlined style={{ fontSize: 24 }} />
          </Button>
        </Badge>
        <ProfileHeaderAdmin />
      </div>
    </div>
  );
}
