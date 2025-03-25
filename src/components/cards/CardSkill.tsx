import { ISkill } from "@/interfaces/model.interface";
import { IPropCardItem } from "@/interfaces/propsComponent.interface";
import { Card, Slider, Space, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { ItemAction } from "../ItemAction";

//
export function CardSkill({
  item,
  actives,
  onClickEdit,
  onClickDelete,
  onClickActive,
}: IPropCardItem<ISkill>) {
  const { id, name, image } = item;
  const isActive = actives.includes(id);

  //
  return (
    <Card
      hoverable
      style={{ width: 300 }}
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
            onEdit={() => onClickEdit(item)}
            onDelete={() => onClickDelete([id])}
          />
        </Space>
      }
      cover={
        <Image
          height={200}
          width={200}
          alt={name}
          src={image}
          className="object-contain"
        />
      }
    >
      <Meta
        title={name}
        description={
          <Slider defaultValue={0} tooltip={{ open: true, color: "#04befe" }} />
        }
      />
    </Card>
  );
}
