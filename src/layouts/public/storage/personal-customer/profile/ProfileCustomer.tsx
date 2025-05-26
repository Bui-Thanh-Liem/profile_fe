"use client";
import { MyAvatar } from "@/components/MyAvatar";
import { MyDrawer } from "@/components/MyDrawer";
import { UserOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useRef } from "react";
import useCustomerStore from "../../../../../stores/useCustomerStore";
import CustomerProfile from "./ProfileDetail";

export default function ProfileCustomer() {
  const iconProfileRef = useRef<HTMLButtonElement>(null);

  //
  const { isLoggedCustomer, currentCustomer } = useCustomerStore();

  //
  function onClick() {
    iconProfileRef.current?.click();
  }

  if (!isLoggedCustomer) return null;

  return (
    <>
      {/*  */}
      <FloatButton.Group style={{ insetInlineEnd: 100 }}>
        <MyAvatar
          src={currentCustomer?.avatar || ""}
          alt={currentCustomer?.fullName || ""}
          fallbackText={currentCustomer?.fullName || ""}
          onClick={onClick}
          className="cursor-pointer"
          size="large"
        />
      </FloatButton.Group>

      {/*  */}
      <MyDrawer
        handleElement={<button ref={iconProfileRef} className="hidden" />}
        title="My profile"
        header={<UserOutlined style={{ fontSize: 32 }} />}
        content={<CustomerProfile />}
        width={740}
      />
    </>
  );
}
