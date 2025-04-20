"use client";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";

export function BenefitCustomer() {
  return (
    <>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ insetInlineEnd: 44 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton icon={<NotificationOutlined />} />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
    </>
  );
}
