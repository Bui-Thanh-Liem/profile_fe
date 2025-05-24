"use client";
import { MyAvatar } from "@/components/MyAvatar";
import MyTag from "@/components/MyTag";
import { ParagraphItemTable } from "@/components/table/ParagraphItemTable";
import { ICustomer } from "@/interfaces/model.interface";
import { TableColumnsType } from "antd";

export const customerActionColumns: TableColumnsType<ICustomer> = [
  {
    title: "Avatar",
    width: 150,
    dataIndex: "avatar",
    key: "avatar",
    render: (_, record) => {
      return (
        <MyAvatar
          src={_}
          alt={record?.fullName}
          fallbackText={record?.fullName}
        />
      );
    },
    fixed: "left",
  },
  {
    title: "Full Name",
    width: 150,
    dataIndex: "fullName",
    key: "fullName",
    fixed: "left",
    render: (_) => <ParagraphItemTable str={_} />,
  },
  {
    title: "Email",
    width: 250,
    dataIndex: "email",
    key: "email",
    render: (_) => <a href={`mailto:${_}`}>{_}</a>,
  },
  {
    title: "Phone",
    width: 150,
    dataIndex: "phone",
    key: "phone",
    render: (_) => {
      if (!_) return "-";
      return <a href={`tel:${_}`}>{_}</a>;
    },
  },
  {
    title: "Block & Active",
    width: 120,
    dataIndex: "block",
    key: "block",
    render: (_) => {
      return <MyTag tagName={_ ? "BLOCKED" : "ACTIVE"} />;
    },
  },
];
