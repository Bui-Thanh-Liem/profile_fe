"use client";
import Logo from "@/components/Logo";
import {
  AlertOutlined,
  BarChartOutlined,
  CustomerServiceOutlined,
  FileImageOutlined,
  ReconciliationOutlined,
  KeyOutlined,
  RadiusSettingOutlined,
  TeamOutlined,
  UserOutlined,
  GroupOutlined,
  UngroupOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { HeaderAdmin } from "./HeaderAdmin";

const { Content, Sider, Header } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  disabled?: boolean
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    disabled,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href="/admin">Dashboard</Link>, "/admin", <BarChartOutlined />),
  { type: "divider" },
  getItem(
    <Link href="/admin/skills">Skills</Link>,
    "/admin/skills",
    <AlertOutlined />
  ),
  getItem(
    <Link href="/admin/about">About</Link>,
    "/admin/about",
    <AlertOutlined />
  ),
  { type: "divider" },
  getItem("Administrator", "administrator", <TeamOutlined />, [
    getItem(
      <Link href="/admin/users">Users</Link>,
      "/admin/users",
      <UserOutlined />
    ),
    getItem(
      <Link href="/admin/roles">Roles</Link>,
      "/admin/roles",
      <RadiusSettingOutlined />
    ),
    getItem(
      <Link href="/admin/role-groups">Role Groups</Link>,
      "/admin/role-groups",
      <RadiusSettingOutlined />
    ),
  ]),
  getItem(
    <Link href="/admin/customers">Customers</Link>,
    "/admin/customers",
    <CustomerServiceOutlined />
  ),
  { type: "divider" },
  getItem(
    <Link href="/admin/keywords">Keywords</Link>,
    "/admin/keywords",
    <KeyOutlined />
  ),
  { type: "divider" },
  getItem(
    <Link href="/admin/subjects">Subjects</Link>,
    "/admin/subjects",
    <ReconciliationOutlined />
  ),
  getItem(
    <Link href="/admin/subject-groups">Subject groups</Link>,
    "/admin/subject-group",
    <GroupOutlined />
  ),
  getItem(
    <Link href="/admin/subject-items">Subject items</Link>,
    "/admin/subject-group",
    <UngroupOutlined />
  ),
  getItem(
    <Link href="/admin/images-storage">Images Storage</Link>,
    "/admin/images-storage",
    <FileImageOutlined />
  ),
];

export default function LayoutAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname();
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
        <Header className="bg-white flex items-center justify-between">
          <HeaderAdmin />
        </Header>
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              height: "calc(100vh - 32px - 64x)",
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
