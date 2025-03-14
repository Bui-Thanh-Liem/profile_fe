"use client";
import { Avatar, Dropdown, MenuProps } from "antd";
import { IoIosLogOut } from "react-icons/io";
import { RiSettings4Line, RiUser2Line } from "react-icons/ri";
import liem from "../../../../public/me.png";
import useCustomerStore from "../../../stores/useCustomerStore";
import { useRouter } from "next/navigation";

const userItems: MenuProps["items"] = [
  {
    key: "customer/my-account",
    label: "My Account",
    disabled: true,
  },
  {
    type: "divider",
  },
  {
    key: "customer/profile",
    label: "Profile",
    icon: <RiUser2Line />,
    extra: "Ctrl + P",
  },
  {
    key: "customer/settings",
    label: "Settings",
    icon: <RiSettings4Line />,
    extra: "Ctrl + S",
  },
  {
    type: "divider",
  },
  {
    key: "customer/logout",
    label: <span className="text-red-600">Logout</span>,
    icon: <IoIosLogOut color="#dc2626" />,
    extra: "Ctrl + O",
  },
];

export default function PersonalCustomer() {
  const router = useRouter();
  const { logout } = useCustomerStore();
  const onClickItemMenu: MenuProps["onClick"] = (info) => {
    console.log("info.key:::", info.key);

    if (info.key === "customer/logout") {
      logout();
      router.push("/");
    }
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
