"use client";
import { MyAvatar } from "@/components/MyAvatar";
import { MyDrawer } from "@/components/MyDrawer";
import useAuthStore from "@/stores/useAuthStore";
import { Dropdown, MenuProps, Space } from "antd";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { ProfileCurrentUser } from "./ProfileCurrentUser";
import { SettingCurrentUser } from "./SettingCurrentUser";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
export function HeaderAdmin() {
  //
  const router = useRouter();
  const { currentUser } = useAuthStore();
  const iconProfileRef = useRef<HTMLButtonElement>(null);
  const iconSettingRef = useRef<HTMLButtonElement>(null);

  //
  function onClickProfile() {
    iconProfileRef.current?.click();
  }

  //
  function onClickSetting() {
    iconSettingRef.current?.click();
  }

  //
  async function onClickLogout() {
    router.replace("/logout");
  }

  //
  const items: MenuProps["items"] = [
    {
      key: "Profile",
      label: "Profile",
      icon: <UserOutlined />,
      extra: "⌘P",
      onClick: onClickProfile,
    },
    {
      key: "Setting",
      label: "Setting",
      icon: <SettingOutlined />,
      extra: "⌘S",
      onClick: onClickSetting,
    },
    {
      type: "divider",
    },
    {
      danger: true,
      key: "Logout",
      label: "Logout",
      icon: <LogoutOutlined style={{ color: "red" }} />,
      extra: "⌘L",
      onClick: onClickLogout,
    },
  ];

  //
  return (
    <>
      <h2 className="leading-none m-0 text-xl font-bold">Analytics</h2>
      <div className="flex items-center gap-6">
        <div>
          <p className="leading-none font-bold text-lg mb-1">
            {currentUser?.fullName}
          </p>
          <p className="leading-none text-gray-app">{currentUser?.email}</p>
        </div>
        <Dropdown menu={{ items }} arrow={true} trigger={["click"]}>
          <Space>
            <MyAvatar
              className="cursor-pointer"
              src={currentUser?.avatar || ""}
              alt={currentUser?.fullName || ""}
              fallbackText={currentUser?.fullName || ""}
            />
          </Space>
        </Dropdown>
      </div>

      {/*  */}
      <MyDrawer
        handleElement={<button ref={iconProfileRef} className="hidden" />}
        title="My profile"
        header={
          <MyAvatar
            size={24}
            src={currentUser?.avatar || ""}
            alt={currentUser?.fullName || ""}
            fallbackText={currentUser?.fullName || ""}
          />
        }
        content={<ProfileCurrentUser />}
      />

      {/*  */}
      <MyDrawer
        handleElement={<button ref={iconSettingRef} className="hidden" />}
        title="My setting"
        header={<SettingOutlined />}
        content={<SettingCurrentUser />}
      />
    </>
  );
}
