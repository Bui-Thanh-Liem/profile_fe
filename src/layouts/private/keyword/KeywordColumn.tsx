"use client";
import { IKeyWord, ISubjectItem } from "@/interfaces/model.interface";
import { Dropdown, MenuProps, TableColumnsType, Tag } from "antd";

export const keywordActionColumns: TableColumnsType<IKeyWord> = [
  {
    title: "Name",
    width: 150,
    dataIndex: "name",
    key: "name",
    fixed: "left",
    render: (_, record) => {
      return <Tag color={record.color}>{_}</Tag>;
    },
  },
  {
    title: "Subject items",
    width: 400,
    dataIndex: "subjectItems",
    key: "subjectItems",
    render: (_) => {
      const items: MenuProps["items"] = (_ as ISubjectItem[])?.map((item) => ({
        key: item.id,
        label: item.name,
      }));

      if (!items.length) return <span>-</span>;

      return (
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <p>
            Have <strong>{items.length}</strong> subject items
          </p>
        </Dropdown>
      );
    },
  },
];
