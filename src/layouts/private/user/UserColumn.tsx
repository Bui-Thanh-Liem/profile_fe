"use client";
import MyTag from "@/components/MyTag";
import { EBoolean } from "@/enums/model.enum";
import { IRole, IUser } from "@/interfaces/model.interface";
import { Avatar, TableColumnsType } from "antd";
import { v4 } from "uuid";

export const userActionColumns: TableColumnsType<IUser> = [
  {
    title: "Avatar",
    width: 150,
    dataIndex: "avatar",
    key: "avatar",
    render: (_) => {
      return <Avatar className="w-14 h-14" src={_} alt="avatar" />;
    },
  },
  {
    title: "Full Name",
    width: 150,
    dataIndex: "fullName",
    key: "fullName",
    fixed: "left",
  },
  {
    title: "Gender",
    width: 150,
    dataIndex: "gender",
    key: "gender",
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
    render: (_) => <a href={`tel:${_}`}>{_}</a>,
  },
  {
    title: "Role",
    width: 250,
    dataIndex: "role",
    key: "role",
    render: (_) => {
      if (!_?.length) {
        return "-";
      }
      return _.map((role: IRole) => <p key={v4()}>{role.name}</p>);
    },
  },
  {
    title: "Sub Admin",
    width: 150,
    dataIndex: "subAdmin",
    key: "subAdmin",
    render: (_) => {
      return <MyTag tagName={_ ? EBoolean.YES : EBoolean.NO} />;
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
