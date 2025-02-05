"use client";
import MyTag from "@/components/MyTag";
import { IUser } from "@/interfaces/model.interface";
import { Avatar, TableColumnsType } from "antd";

export const userActionColumns: TableColumnsType<IUser> = [
  {
    title: "Avatar",
    width: 150,
    dataIndex: "avatar",
    key: "avatar",
    render: (_) => {
      return <Avatar src={_} alt="avatar" />;
    },
  },
  {
    title: "Full Name",
    width: 150,
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Email",
    width: 250,
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Gender",
    width: 250,
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Phone",
    width: 250,
    dataIndex: "phone",
    key: "phone",
    render: (_) => <a href={`tel:${_}`}>{_}</a>,
  },
  {
    title: "Role",
    width: 250,
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Sub Admin",
    width: 100,
    dataIndex: "subAdmin",
    key: "subAdmin",
    render: (_) => {
      return <MyTag tagName={_} />;
    },
  },
  {
    title: "Block",
    width: 100,
    dataIndex: "block",
    key: "block",
    render: (_) => {
      return <MyTag tagName={_} />;
    },
  },
];
