import { Card, Dropdown, MenuProps, Space } from "antd";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";

export function RoleGroupItem() {
  const items: MenuProps["items"] = [
    {
      key: "Edit",
      label: "Edit",
      icon: <SettingOutlined />,
      extra: "⌘E",
    },
    {
      type: "divider",
    },
    {
      key: "Delete",
      label: "Delete",
      icon: <SettingOutlined />,
      extra: "⌘D",
    },
    {
      key: "Details",
      label: "Details",
      icon: <SettingOutlined />,
      extra: "⌘B",
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
