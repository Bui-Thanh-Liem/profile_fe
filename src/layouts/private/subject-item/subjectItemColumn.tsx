"use client";
import { ParagraphItemTable } from "@/components/table/ParagraphItemTable";
import { TextAreaItemTable } from "@/components/table/TextAreaItemTable";
import { IKeyWord, ISubjectItem } from "@/interfaces/model.interface";
import { setPrefixFile } from "@/utils/setPrefixFile";
import { TableColumnsType, Tag, Typography } from "antd";
import Image from "next/image";
const { Text } = Typography;

export const subjectItemActionColumns: TableColumnsType<ISubjectItem> = [
  {
    title: "Name",
    width: 200,
    dataIndex: "name",
    key: "name",
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
    title: "Code",
    width: 350,
    dataIndex: "code",
    key: "code",
    render: (_) => {
      return !_ ? (
        <span>-</span>
      ) : (
        <Text className="line-clamp-3" code>
          {_}
        </Text>
      );
    },
  },
  {
    title: "Image",
    width: 100,
    dataIndex: "image",
    key: "image",
    render: (_) =>
      !_ ? (
        <span>-</span>
      ) : (
        <Image
          alt="img"
          src={setPrefixFile(_)}
          width={60}
          height={60}
          unoptimized
        />
      ),
  },
  {
    title: "Keywords",
    width: 240,
    dataIndex: "keywords",
    key: "keywords",
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
  {
    title: "Type",
    width: 150,
    dataIndex: "type",
    key: "type",
    render: (_) => {
      return !_ ? <span>-</span> : <Text mark>{_}</Text>;
    },
  },
];
