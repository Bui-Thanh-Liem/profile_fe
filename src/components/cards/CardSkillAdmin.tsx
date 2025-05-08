"use client";
import { ISkill } from "@/interfaces/model.interface";
import { IPropCardItemAdmin } from "@/interfaces/propsComponent.interface";
import { Card, Progress, Space, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ActionCard } from "../ActionCard";

//
export function CardSkillAdmin({
  item,
  actives,
  onClickEdit,
  onClickDelete,
  onClickActive,
}: IPropCardItemAdmin<ISkill>) {
  const { id, name, image, progress } = item;
  const isActive = actives?.includes(id);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  //
  if (!isMounted) return <p>loading...</p>;

  //
  return (
    <Card
      hoverable
      style={{ width: "100%" }}
      extra={
        <Space className="flex items-center">
          <Tag
            bordered={false}
            color={isActive ? "error" : ""}
            onClick={onClickActive}
          >
            Checked
          </Tag>
          <ActionCard
            onEdit={() => {
              if (onClickEdit) onClickEdit(item);
            }}
            onDelete={() => {
              if (onClickDelete) onClickDelete([id]);
            }}
          />
        </Space>
      }
    >
      <Meta
        title={
          <div className="flex justify-between items-center">
            <Image
              width={24}
              height={24}
              alt={name}
              src={image}
              className="object-contain"
              unoptimized
            />
            <p>{name}</p>
            <Progress type="circle" size={40} percent={progress} />
          </div>
        }
      />
    </Card>
  );
}
