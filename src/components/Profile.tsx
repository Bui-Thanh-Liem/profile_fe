"use client";
import { Dropdown, Avatar, MenuProps } from "antd";
import { RiUser2Line, RiSettings4Line } from "react-icons/ri";
import liem from "../../public/me.png";

const userItems: MenuProps["items"] = [
  {
    key: "1",
    label: "My Account",
    disabled: true,
  },
  {
    type: "divider",
  },
  {
    key: "user/profile",
    label: "Profile",
    icon: <RiUser2Line />,
    extra: "Ctrl + P",
  },
  {
    key: "user/settings",
    label: "Settings",
    icon: <RiSettings4Line />,
    extra: "Ctrl + S",
  },
];

export default function Profile() {
  const onClickItemMenu: MenuProps["onClick"] = (info) => {
    console.log("info.key:::", info.key);
  };

  return (
    <Dropdown
      menu={{ items: userItems, onClick: onClickItemMenu }}
      arrow={{ pointAtCenter: true }}
      placement="bottomRight"
    >
      <Avatar size="large" src={liem.src} className="border border-gray-200" />
    </Dropdown>
  );
}
