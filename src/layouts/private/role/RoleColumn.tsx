"use client";
import { ParagraphItemTable } from "@/components/table/ParagraphItemTable";
import { TextAreaItemTable } from "@/components/table/TextAreaItemTable";
import { IRoleDataResource } from "@/interfaces/common.interface";
import { IRole } from "@/interfaces/model.interface";
import { generatorColor } from "@/utils/generatorColorRole";
import { TableColumnsType, Tag } from "antd";
import { v4 } from "uuid";

export const RoleActionColumns: TableColumnsType<IRole> = [
  {
    title: "Name",
    width: 150,
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
    title: "DataSources",
    width: 250,
    dataIndex: "dataSources",
    key: "dataSources",
    render: (_: Array<IRoleDataResource>) => {
      return (
        <>
          {_?.map((dataSource) => (
            <div key={v4()} className="mb-2 flex items-center">
              <p className="bg-gray-second-app w-40">{dataSource.resource}</p>
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
