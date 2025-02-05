"use client";
import type { TableColumnsType, TableProps } from "antd";
import { Card, Table } from "antd";
import { createStyles } from "antd-style";
import React from "react";
import TableAction from "./TableAction";
import TableToolbar from "./TabelToolbar";
import IPropMyTable from "@/interfaces/propsComponent.interface";
import { IUser } from "@/interfaces/model.interface";
import { UserOutlined } from "@ant-design/icons";

const useStyle = createStyles(({ css, token }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { antCls } = token as any;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
          .${antCls}-table-cell-with-append {
            display: flex;
            align-items: center;
          }
        }
      }
    `,
  };
});

interface IHasRole {
  role: string;

  //
  createdAt: Date;
  updatedAt: Date;
  createdBy: IUser;
  updatedBy: IUser;
}

export default function MyTable<T extends IHasRole>({
  columns,
  dataSource,
}: IPropMyTable<T>) {
  const { styles } = useStyle();

  const baseColumns: TableColumnsType<T> = [
    {
      // title: "Checkbox",
      width: 50,
      fixed: "left",
      render: () => null,
    },
    ...columns,
    {
      title: "Created",
      key: "created",
      width: 250,
      render: (_, record) => {
        const formattedDate = new Intl.DateTimeFormat("sv-SE").format(record.createdAt);
        const formattedTime = record.createdAt.toLocaleTimeString("en-GB");
        return (
          <>
            <p>{record.createdBy.fullName || <UserOutlined />}</p>
            <p>{`${formattedDate}, ${formattedTime}`}</p>
          </>
        );
      },
    },
    {
      title: "Updated",
      key: "updated",
      width: 250,
      render: (_, record) => {
        const formattedDate = new Intl.DateTimeFormat("sv-SE").format(record.updatedAt);
        const formattedTime = record.updatedAt.toLocaleTimeString("en-GB");
        return (
          <>
            <p>{record.updatedBy.fullName || <UserOutlined />}</p>
            <p>{`${formattedDate}, ${formattedTime}`}</p>
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => <TableAction dataAction={record} />,
    },
  ];

  const rowSelection: TableProps<T>["rowSelection"] = {
    type: "checkbox",
    onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: T) => ({
      disabled: record.role === "admin",
      name: record.role,
    }),
  };

  return (
    <>
      <Card className="mb-4">
        <TableToolbar />
      </Card>
      <Card>
        <Table<T>
          columns={baseColumns}
          dataSource={dataSource}
          className={styles.customTable}
          scroll={{ x: "max-content", y: "calc(100vh - 360px)" }}
          rowSelection={rowSelection}
          // pagination={{
          //   pageSize: 20,
          //   showSizeChanger: true,
          //   pageSizeOptions: [20, 40, 60, 80, 100],
          //   showTotal: (total, range) =>
          //     `Hiển thị ${range[0]}-${range[1]} trên tổng ${total} bản ghi`,
          // }}
        />
      </Card>
    </>
  );
}
