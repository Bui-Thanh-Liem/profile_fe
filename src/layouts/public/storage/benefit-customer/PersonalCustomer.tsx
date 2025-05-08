"use client";
import { MyAvatar } from "@/components/MyAvatar";
import { Dropdown, FloatButton, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import useCustomerStore from "../../../../stores/useCustomerStore";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

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
    icon: <UserOutlined />,
    extra: "Ctrl + P",
  },
  {
    key: "customer/settings",
    label: "Settings",
    icon: <SettingOutlined />,
    extra: "Ctrl + S",
  },
  {
    type: "divider",
  },
  {
    key: "customer/logout",
    label: <span className="text-red-600">Logout</span>,
    icon: <LogoutOutlined style={{ color: "red" }} />,
    extra: "Ctrl + O",
  },
];

export default function PersonalCustomer() {
  const router = useRouter();
  const { isLoggedCustomer, logoutCustomer, currentCustomer } =
    useCustomerStore();
  const onClickItemMenu: MenuProps["onClick"] = (info) => {
    console.log("info.key:::", info.key);

    if (info.key === "customer/logout") {
      logoutCustomer();
      router.push("/");
    }
  };

  if (!isLoggedCustomer) return null;

  return (
    <FloatButton.Group style={{ insetInlineEnd: 100 }}>
      <Dropdown
        menu={{ items: userItems, onClick: onClickItemMenu }}
        arrow={{ pointAtCenter: true }}
        placement="top"
        trigger={["hover"]}
      >
        <span>
          <MyAvatar
            src={currentCustomer?.avatar || ""}
            alt={currentCustomer?.fullName || ""}
            fallbackText={currentCustomer?.fullName || ""}
          />
        </span>
      </Dropdown>
    </FloatButton.Group>
  );
}
