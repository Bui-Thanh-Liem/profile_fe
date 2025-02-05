"use client";
import { IRole, IRoleDataSource } from "@/interfaces/model.interface";
import { TableColumnsType, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { v4 } from "uuid";
import { generatorColor } from "./RoleItemResource";

export const userActionColumns: TableColumnsType<IRole> = [
  {
    title: "Name",
    width: 150,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Description",
    width: 250,
    dataIndex: "desc",
    key: "desc",
    render: (_) => {
      return <TextArea rows={3} readOnly value={_} />;
    },
  },
  {
    title: "Datasource",
    width: 250,
    dataIndex: "dataSource",
    key: "dataSource",
    render: (_: Array<IRoleDataSource>) => {
      return (
        <>
          {_.map((dataSource) => (
            <div key={v4()} className="mb-2">
              <p className="mb-1 bg-gray-second-app inline-block">
                {dataSource.resource}
              </p>
              <div className="flex items-center gap-2">
                {dataSource.actions?.map((action) => (
                  <Tag color={generatorColor[action]} key={v4()}>
                    {action}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </>
      );
    },
  },
];
