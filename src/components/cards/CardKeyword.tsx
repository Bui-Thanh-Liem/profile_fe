import { IKeyWord } from "@/interfaces/model.interface";
import { IPropCardItem } from "@/interfaces/propsComponent.interface";
import { Card, Space, Tag } from "antd";
import { ItemAction } from "../ItemAction";

export function CardKeyword({
  item,
  actives,
  onClickEdit,
  onClickDelete,
  onClickActive,
}: IPropCardItem<IKeyWord>) {
  const { id, name, color } = item;
  const isActive = actives.includes(id);

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
            onDelete={() => onClickDelete([id])}
            onEdit={() => onClickEdit(item)}
          />
        </Space>
      }
    >
      <p style={{ color }} className="line-clamp-2 text-lg font-bold">
        {name}
      </p>
    </Card>
  );
}
