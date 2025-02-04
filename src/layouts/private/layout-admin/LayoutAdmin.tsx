"use client";
import Logo from "@/components/Logo";
import {
  BarChartOutlined,
  CustomerServiceOutlined,
  FileImageOutlined,
  FileOutlined,
  // TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState } from "react";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href="/admin">Dashboard</Link>, "/admin", <BarChartOutlined />),
  getItem(
    <Link href="/admin/users">Users</Link>,
    "/admin/users",
    <UserOutlined />
  ),
  getItem(
    <Link href="/admin/customers">Customers</Link>,
    "/admin/customers",
    <CustomerServiceOutlined />
  ),
  // getItem("Teams", "teams", <TeamOutlined />, [
  //   getItem(<Link href="/admin/team/1">Team 1</Link>, "6"),
  //   getItem(<Link href="/admin/team/2">Team 2</Link>, "8"),
  // ]),
  getItem(
    <Link href="/admin/files">Files</Link>,
    "/admin/files",
    <FileOutlined />
  ),
  getItem(
    <Link href="/admin/storage-images">Storage Images</Link>,
    "/admin/storage-images",
    <FileImageOutlined />
  ),
];

export default function LayoutAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  console.log("pathname?:::", pathname);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: colorBgContainer }}
        // trigger={
        //   <div >
        //     {collapsed ? <ArrowLeftOutlined /> : <ArrowRightOutlined />}
        //   </div>
        // }
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo size="small" />
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          // theme="dark"
          defaultSelectedKeys={["/admin"]}
          mode="inline"
          items={items}
          selectedKeys={[pathname]}
          style={{ background: colorBgContainer }}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              height: "calc(100vh - 32px)",
              overflow: "auto",
              // background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
