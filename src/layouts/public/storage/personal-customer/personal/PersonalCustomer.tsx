"use client";
import { MyAvatar } from "@/components/MyAvatar";
import { MyDrawer } from "@/components/MyDrawer";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, FloatButton, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import useCustomerStore from "../../../../../stores/useCustomerStore";
import { Profile } from "./Profile";
import { Setting } from "./Setting";

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
    extra: "Ctrl + C + P",
  },
  {
    key: "customer/settings",
    label: "Settings",
    icon: <SettingOutlined />,
    extra: "Ctrl + C + S",
  },
  {
    type: "divider",
  },
  {
    key: "customer/logout",
    label: <span className="text-red-600">Logout</span>,
    icon: <LogoutOutlined style={{ color: "red" }} />,
    extra: "Ctrl + C + L",
  },
];

export default function PersonalCustomer() {
  const router = useRouter();
  const iconProfileRef = useRef<HTMLButtonElement>(null);
  const iconSettingRef = useRef<HTMLButtonElement>(null);

  //
  const { isLoggedCustomer, currentCustomer } =
    useCustomerStore();

  //
  const onClickItemMenu: MenuProps["onClick"] = async (info) => {
    if (info.key === "customer/logout") {
      router.push("/logout/customer");
    }

    if (info.key === "customer/settings") {
      iconSettingRef.current?.click();
    }
    if (info.key === "customer/profile") {
      iconProfileRef.current?.click();
    }
  };

  if (!isLoggedCustomer) return null;

  return (
    <>
      {/*  */}
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

      {/*  */}
      <MyDrawer
        handleElement={<button ref={iconProfileRef} className="hidden" />}
        title="My profile"
        header={
          <MyAvatar
            size={36}
            src={currentCustomer?.avatar || ""}
            alt={currentCustomer?.fullName || ""}
            fallbackText={currentCustomer?.fullName || ""}
          />
        }
        content={<Profile />}
      />

      {/*  */}
      <MyDrawer
        handleElement={<button ref={iconSettingRef} className="hidden" />}
        title="My setting"
        header={<SettingOutlined style={{ fontSize: 32 }} />}
        content={<Setting />}
      />
    </>
  );
}
