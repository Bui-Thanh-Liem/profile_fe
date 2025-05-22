"use client";
import useCustomerStore from "@/stores/useCustomerStore";
import { BarsOutlined, CalendarOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useRouter } from "next/navigation";
import { Message } from "./Message";
import { Notification } from "./Notification";

export function BenefitCustomer() {
  const { isLoggedCustomer } = useCustomerStore();
  const router = useRouter();

  //
  if (!isLoggedCustomer) return null;

  return (
    <>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ insetInlineEnd: 44 }}
        icon={<BarsOutlined />}
      >
        <Notification />
        <Message />
        <FloatButton
          onClick={() => router.push("/storage/calendar")}
          icon={<CalendarOutlined />}
        />
      </FloatButton.Group>
    </>
  );
}
