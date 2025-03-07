import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  IssuesCloseOutlined,
} from "@ant-design/icons";
import { Card, Dropdown, MenuProps, Space } from "antd";

export function CardRoleGroup() {
  const items: MenuProps["items"] = [
    {
      key: "Edit",
      label: "Edit",
      icon: <EditOutlined />,
      extra: "⌘E",
    },
    {
      key: "Details",
      label: "Details",
      icon: <IssuesCloseOutlined />,
      extra: "⌘B",
    },
    {
      type: "divider",
    },
    {
      danger: true,
      key: "Delete",
      label: "Delete",
      icon: <DeleteOutlined color="red" />,
      extra: "⌘D",
    },
  ];
  return (
    <Card
      title="Default size card"
      extra={
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              More
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      }
      style={{ width: 300 }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
}
