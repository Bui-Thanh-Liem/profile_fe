import { IKeyWord, IUser } from "@/interfaces/model.interface";
import { IPropCardItemAdmin } from "@/interfaces/propsComponent.interface";
import { Card, Space, Tag } from "antd";
import { Author } from "../Author";
import { ItemAction } from "../ItemAction";

export function CardKeyword({
  item,
  actives,
  onClickEdit,
  onClickDelete,
  onClickActive,
}: IPropCardItemAdmin<IKeyWord>) {
  const { id, name, color, createdAt, createdBy, updatedAt, updatedBy } = item;
  const isActive = actives?.includes(id);

  return (
    <Card
      hoverable
      title={""}
      className="w-full"
      extra={
        <Space className="flex items-center">
          <Tag
            bordered={false}
            color={isActive ? "error" : ""}
            onClick={onClickActive}
          >
            Checked
          </Tag>
          <ItemAction
            onDelete={() => {
              if (onClickDelete) onClickDelete([id]);
            }}
            onEdit={() => {
              if (onClickEdit) onClickEdit(item);
            }}
          />
        </Space>
      }
      actions={[
        <Author
          key={"created"}
          user={createdBy as IUser}
          date={createdAt}
          detail={false}
        />,
        <Author
          key={"created"}
          user={updatedBy as IUser}
          date={updatedAt}
          detail={false}
        />,
      ]}
    >
      <p
        style={{ backgroundColor: color }}
        className="line-clamp-2 text-lg font-bold text-white inline"
      >
        {name.toLocaleUpperCase()}
      </p>
    </Card>
  );
}
