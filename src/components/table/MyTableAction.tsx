import { Button, Popconfirm } from "antd";
import { IPropTableAction } from "@/interfaces/propsComponent.interface";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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
        icon={<EditOutlined style={{ color: "orange" }} />}
        onConfirm={onConfirmEdit}
      >
        <Button size="small" color="primary" variant="outlined">
          <EditOutlined />
        </Button>
      </Popconfirm>
      <Popconfirm
        title="Sure to delete?"
        icon={<DeleteOutlined style={{ color: "red" }} />}
        okButtonProps={{ danger: true }}
        onConfirm={onConfirmDelete}
      >
        <Button size="small" danger>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    </div>
  );
}
