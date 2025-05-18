import { MyDrawer } from "@/components/MyDrawer";
import { NotificationOutlined } from "@ant-design/icons";
import { Badge, Dropdown, FloatButton, MenuProps } from "antd";
import { useRef } from "react";

export function Notification() {
  const iconNotificationRef = useRef<HTMLButtonElement>(null);

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
  const onClickItemMenu: MenuProps["onClick"] = async (info) => {
    console.log("info:::", info);
  };

  return (
    <>
      <Badge count={2}>
        <FloatButton
          icon={
            <Dropdown
              menu={{ items: notificationItems, onClick: onClickItemMenu }}
              arrow={{ pointAtCenter: true }}
              placement="topRight"
            >
              <NotificationOutlined
                onClick={() => iconNotificationRef.current?.click()}
              />
            </Dropdown>
          }
        />
      </Badge>

      {/*  */}
      <MyDrawer
        handleElement={<button ref={iconNotificationRef} className="hidden" />}
        title="Notification"
        header={<NotificationOutlined style={{ fontSize: 32 }} />}
        content={<div>Notification content</div>}
      />
    </>
  );
}
