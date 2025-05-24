"use client";
import { SunOutlined } from "@ant-design/icons";
import { Button } from "antd";
import NetworkSpeed from "./NetworkSpeed";
import { NotificationHeaderAdmin } from "./Notification";
import { ProfileHeaderAdmin } from "./Profile";

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
        <NotificationHeaderAdmin />
        <ProfileHeaderAdmin />
      </div>
    </div>
  );
}
