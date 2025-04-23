"use client";
import { IImageStorage, IKeyWord } from "@/interfaces/model.interface";
import { Input, TableColumnsType, Tag } from "antd";
import Image from "next/image";
const { TextArea } = Input;

export const imageStorageActionColumns: TableColumnsType<IImageStorage> = [
  {
    title: "Label",
    width: 200,
    dataIndex: "label",
    key: "label",
    fixed: "left",
  },
  {
    title: "Description",
    width: 250,
    dataIndex: "desc",
    key: "desc",
    render: (_) => {
      if (!_) return <span>-</span>;
      return <TextArea rows={3} readOnly value={_} />;
    },
  },
  {
    title: "Images",
    width: 250,
    dataIndex: "images",
    key: "name",
    fixed: "left",
    render: (_) => {
      const imgs = _ as string[];

      if (!imgs?.length) return <span>-</span>;

      return (
        <div className="flex flex-wrap gap-2">
          {imgs?.map((img) => (
            <Image key={img} alt="img" src={img} width={60} height={60} />
          ))}
        </div>
      );
    },
  },
  {
    title: "Keywords",
    width: 250,
    dataIndex: "name",
    key: "name",
    fixed: "left",
    render: (_) => {
      const keys = _ as IKeyWord[];

      if (!keys?.length) return <span>-</span>;

      return (
        <div className="flex flex-wrap gap-2">
          {keys?.map((key) => (
            <Tag key={key.name} color={key.color}>
              {key.name}
            </Tag>
          ))}
        </div>
      );
    },
  },
];
