"use client";
import { IRole, IRoleDataSource } from "@/interfaces/model.interface";
import { TableColumnsType, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { v4 } from "uuid";
import { generatorColor } from "./RoleItemResource";
import { EActionUse } from "@/enums/role/action.enum";

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
            <div key={v4()} className="mb-2 flex items-center">
              <p className="bg-gray-second-app w-40">{dataSource.resource}</p>
              <div className="flex items-center gap-2">
                {dataSource.actions?.map((action) => (
                  <Tag color={generatorColor[action]} key={v4()}>
                    {EActionUse[action]}
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
