"use client";
import useCustomerStore from "@/stores/useCustomerStore";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown, FloatButton, MenuProps } from "antd";

export function BenefitCustomer() {
  const { isLoggedCustomer } = useCustomerStore();

  //
  const notificationItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex flex-col">
          <span className="font-bold">New Comment</span>
          <span className="text-gray-500 text-sm">
            Someone commented on your post Someone commented on your post
          </span>
          <span className="text-gray-400 text-xs">2 minutes ago</span>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div className="flex flex-col">
          <span className="font-bold">New Like</span>
          <span className="text-gray-500 text-sm">
            Your post got a new like
          </span>
          <span className="text-gray-400 text-xs">10 minutes ago</span>
        </div>
      ),
    },
  ];

  //
  if (!isLoggedCustomer) return null;

  return (
    <>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ insetInlineEnd: 44 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton
          icon={
            <Badge count={2} className="mt-2">
              <Dropdown
                menu={{ items: notificationItems }}
                arrow={{ pointAtCenter: true }}
                placement="topRight"
              >
                <NotificationOutlined />
              </Dropdown>
            </Badge>
          }
        />
        <FloatButton icon={<NotificationOutlined />} />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
    </>
  );
}
