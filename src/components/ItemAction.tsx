import { IPropTableAction } from "@/interfaces/propsComponent.interface";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

export function ItemAction({ onDelete, onEdit }: IPropTableAction) {
  //
  const items: MenuProps["items"] = [
    {
      key: "Edit",
      label: "Edit",
      icon: <EditOutlined />,
      extra: "⌘E",
      onClick: onEdit,
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
      onClick: onDelete,
    },
  ];

  return (
    <Dropdown menu={{ items }} arrow={true} trigger={["click"]}>
      <Button shape="circle">
        <MoreOutlined className="text-xl font-bold" />
      </Button>
    </Dropdown>
  );
}
