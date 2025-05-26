import { block, revoke } from "@/apis/user.api";
import { IBaseMyTable } from "@/interfaces/common.interface";
import { IPropTableAction } from "@/interfaces/propsComponent.interface";
import useAuthStore from "@/stores/useAuthStore";
import { showMessage } from "@/utils/show-message.util";
import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

export default function MyTableAction<T extends IBaseMyTable>({
  record,
  onEdit,
  onDelete,
  isEdit = false,
  isDelete = false,
}: IPropTableAction<T>) {
  const { currentUser } = useAuthStore();
  const isUserAndCustomer = Boolean(record.fullName || "");
  const isAdmin = currentUser?.isAdmin
    ? false
    : record.isAdmin || record.isSubAdmin; // user page

  //
  if (isAdmin || (currentUser?.isAdmin && currentUser.id === record.id))
    return null;

  //
  function onConfirmEdit() {
    onEdit();
  }

  //
  function onConfirmDelete() {
    onDelete();
  }

  //
  async function onConfirmRevoke() {
    if (record?.id) {
      const res = await revoke({ userIds: [record?.id] });
      showMessage(res);
      if (res.statusCode !== 200) return;
    }
  }

  //
  async function onConfirmToggleBlock() {
    if (record?.id) {
      const res = await block(record.id);
      showMessage(res);
      if (res.statusCode !== 200) return;
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Popconfirm
        title="Sure to edit?"
        icon={<EditOutlined style={{ color: "orange" }} />}
        onConfirm={onConfirmEdit}
      >
        <Button
          size="small"
          color="primary"
          variant="outlined"
          disabled={!isEdit}
        >
          <EditOutlined />
        </Button>
      </Popconfirm>

      <Popconfirm
        title="Sure to delete?"
        icon={<DeleteOutlined style={{ color: "red" }} />}
        okButtonProps={{ danger: true }}
        onConfirm={onConfirmDelete}
      >
        <Button size="small" danger disabled={!isDelete}>
          <DeleteOutlined />
        </Button>
      </Popconfirm>

      {isUserAndCustomer && !isAdmin && (
        <>
          <Popconfirm
            title="Sure to revoke?"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            okButtonProps={{ danger: true }}
            onConfirm={onConfirmRevoke}
          >
            <Button size="small" danger>
              <MinusCircleOutlined />
            </Button>
          </Popconfirm>

          {record?.block ? (
            <Popconfirm
              title="Sure to unblock?"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              okButtonProps={{ danger: true }}
              onConfirm={onConfirmToggleBlock}
            >
              <Button size="small" color="primary" variant="outlined">
                <StopOutlined />
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Sure to block?"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              okButtonProps={{ danger: true }}
              onConfirm={onConfirmToggleBlock}
            >
              <Button size="small" danger>
                <StopOutlined />
              </Button>
            </Popconfirm>
          )}
        </>
      )}
    </div>
  );
}
