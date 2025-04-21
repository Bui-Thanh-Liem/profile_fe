import { IPropTableAction } from "@/interfaces/propsComponent.interface";
import { Button, Dropdown, MenuProps } from "antd";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";

export function ItemAction({ onDelete, onEdit }: IPropTableAction) {
  //
  const items: MenuProps["items"] = [
    {
      key: "Edit",
      label: "Edit",
      icon: <Pencil />,
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
      icon: <Trash2 color="red" />,
      extra: "⌘D",
      onClick: onDelete,
    },
  ];

  return (
    <Dropdown menu={{ items }} arrow={true} trigger={["click"]}>
      <Button shape="circle">
        <Ellipsis className="text-xl font-bold" />
      </Button>
    </Dropdown>
  );
}
