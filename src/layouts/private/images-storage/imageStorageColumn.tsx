"use client";
import { ParagraphItemTable } from "@/components/table/ParagraphItemTable";
import { TextAreaItemTable } from "@/components/table/TextAreaItemTable";
import { IImageStorage, IKeyWord } from "@/interfaces/model.interface";
import { setPrefixFile } from "@/utils/setPrefixFile";
import { TableColumnsType, Tag } from "antd";
import Image from "next/image";

export const imageStorageActionColumns: TableColumnsType<IImageStorage> = [
  {
    title: "Label",
    width: 200,
    dataIndex: "label",
    key: "label",
    fixed: "left",
    render: (_) => <ParagraphItemTable str={_} />,
  },
  {
    title: "Description",
    width: 250,
    dataIndex: "desc",
    key: "desc",
    render: (_) => <TextAreaItemTable str={_} />,
  },
  {
    title: "Images",
    width: 300,
    dataIndex: "images",
    key: "name",
    fixed: "left",
    render: (_) => {
      const imgs = _ as string[];

      if (!imgs?.length) return <span>-</span>;

      return (
        <div className="flex gap-2">
          {imgs?.map((img) => (
            <Image
              key={img}
              alt="img"
              src={setPrefixFile(img)}
              width={60}
              height={60}
              unoptimized
            />
          ))}
        </div>
      );
    },
  },
  {
    title: "Keywords",
    width: 240,
    dataIndex: "keywords",
    key: "keywords",
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
