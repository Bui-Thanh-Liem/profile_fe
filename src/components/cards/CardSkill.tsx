"use client";
import { ISkill } from "@/interfaces/model.interface";
import { IPropCardItem } from "@/interfaces/propsComponent.interface";
import { Card, Slider, Space, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { ItemAction } from "../ItemAction";
import { useEffect, useState } from "react";

//
export function CardSkill({
  item,
  actives,
  onClickEdit,
  onClickDelete,
  onClickActive,
}: IPropCardItem<ISkill>) {
  const { id, name, image, progress } = item;
  const isActive = actives.includes(id);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  //
  if (!isMounted) return <p>loading...</p>;

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
        <div className="w-48 h-48 flex">
          <Image
            height={200}
            width={200}
            alt={name}
            src={image}
            className="object-contain m-auto"
          />
        </div>
      }
    >
      <Meta
        title={name}
        description={
          <div className="px-2">
            <Slider
              value={progress}
              tooltip={{ open: true, color: "#04befe" }}
            />
          </div>
        }
      />
    </Card>
  );
}
