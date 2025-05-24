import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, MenuProps } from "antd";

export function NotificationHeaderAdmin() {
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
    <Dropdown
      menu={{ items: notificationItems, onClick: onClickItemMenu }}
      arrow={{ pointAtCenter: true }}
      placement="topRight"
    >
      <Badge count={5}>
        <Button shape="circle" type="text">
          <BellOutlined style={{ fontSize: 24 }} />
        </Button>
      </Badge>
    </Dropdown>
  );
}
