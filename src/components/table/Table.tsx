"use client";
import type { TableColumnsType, TableProps } from "antd";
import { Table } from "antd";
import { createStyles } from "antd-style";
import React from "react";
import TableAction from "./TableAction";

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

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    // title: "Checkbox",
    width: 50,
    fixed: "left",
    render: () => null,
  },
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    width: 100,
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Column 1",
    dataIndex: "address",
    key: "1",
    width: 150,
  },
  {
    title: "Column 2",
    dataIndex: "address",
    key: "2",
    width: 150,
  },
  {
    title: "Column 3",
    dataIndex: "address",
    key: "3",
    width: 150,
  },
  {
    title: "Column 4",
    dataIndex: "address",
    key: "4",
    width: 150,
  },
  {
    title: "Column 5",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Column 6",
    dataIndex: "address",
    key: "6",
    width: 150,
  },
  {
    title: "Column 7",
    dataIndex: "address",
    key: "7",
    width: 150,
  },
  { title: "Column 8", dataIndex: "address", key: "8" },
  { title: "Column 9", dataIndex: "address", key: "9" },
  { title: "Column 10", dataIndex: "address", key: "10" },
  { title: "Column 11", dataIndex: "address", key: "11" },
  { title: "Column 12", dataIndex: "address", key: "12" },
  { title: "Column 13", dataIndex: "address", key: "13" },
  { title: "Column 14", dataIndex: "address", key: "14" },
  { title: "Column 15", dataIndex: "address", key: "15" },
  { title: "Column 16", dataIndex: "address", key: "16" },
  { title: "Column 17", dataIndex: "address", key: "17" },
  { title: "Column 18", dataIndex: "address", key: "18" },
  { title: "Column 19", dataIndex: "address", key: "19" },
  { title: "Column 20", dataIndex: "address", key: "20" },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    width: 100,
    render: (_, record) => <TableAction dataAction={record} />,
  },
];

const dataSource = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));

export default function MyTable() {
  const { styles } = useStyle();

  const rowSelection: TableProps<DataType>["rowSelection"] = {
    type: "checkbox",
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "admin", // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Table<DataType>
      columns={columns}
      dataSource={dataSource}
      className={styles.customTable}
      scroll={{ x: "max-content", y: 55 * 5 }}
      rowSelection={rowSelection}
      // pagination={{
      //   pageSize: 20,
      //   showSizeChanger: true,
      //   pageSizeOptions: [20, 40, 60, 80, 100],
      //   showTotal: (total, range) =>
      //     `Hiển thị ${range[0]}-${range[1]} trên tổng ${total} bản ghi`,
      // }}
    />
  );
}
