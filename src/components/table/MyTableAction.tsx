import { Button, Popconfirm } from "antd";
import { IPropTableAction } from "@/interfaces/propsComponent.interface";
import { Pencil, Trash2 } from "lucide-react";

export default function MyTableAction({ onEdit, onDelete }: IPropTableAction) {
  //
  function onConfirmEdit() {
    onEdit();
  }

  //
  function onConfirmDelete() {
    onDelete();
  }

  return (
    <div className="flex items-center gap-2">
      <Popconfirm
        title="Sure to edit?"
        icon={<Pencil color="orange" />}
        onConfirm={onConfirmEdit}
      >
        <Button size="small" color="primary" variant="outlined">
          <Pencil />
        </Button>
      </Popconfirm>
      <Popconfirm
        title="Sure to delete?"
        icon={<Trash2 color="red" />}
        okButtonProps={{ danger: true }}
        onConfirm={onConfirmDelete}
      >
        <Button size="small" danger>
          <Trash2 />
        </Button>
      </Popconfirm>
    </div>
  );
}
