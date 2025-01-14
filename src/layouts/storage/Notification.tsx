import { Badge, Dropdown, MenuProps } from "antd";
import { FaRegBell } from "react-icons/fa";

export default function Notification() {
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

  return (
    <Badge count={5} className="mt-2">
      <Dropdown
        menu={{ items: notificationItems }}
        arrow={{ pointAtCenter: true }}
      >
        <FaRegBell size={24} />
      </Dropdown>
    </Badge>
  );
}
