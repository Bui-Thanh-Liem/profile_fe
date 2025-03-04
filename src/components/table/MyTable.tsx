"use client";
import { IBaseModel } from "@/interfaces/base.interface";
import IPropMyTable from "@/interfaces/propsComponent.interface";
import { UserOutlined } from "@ant-design/icons";
import type { TableColumnsType, TableProps } from "antd";
import { Card, Table } from "antd";
import { createStyles } from "antd-style";
import React, { useEffect, useState } from "react";
import MyTableAction from "./MyTableAction";
import MyTableToolbar from "./MyTableToolbar";

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

interface IUserBase extends IBaseModel {
  isAdmin?: boolean;
}

export default function MyTable<T extends IUserBase>({
  columns,
  dataSource,
  actionDataSource,
}: IPropMyTable<T>) {
  const { styles } = useStyle();
  const [isOpenActionDataSource, setIsOpenActionDataSource] =
    useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<T | null>(null);
  const [checkedIds, setCheckedIds] = useState<Array<string> | []>([]);

  //
  useEffect(() => {
    if (!isOpenActionDataSource) {
      setDataEdit(null);
    }
  }, [isOpenActionDataSource]);

  //
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
      key: "createdAt",
      width: 200,
      render: (_, record) => {
        const date = new Date(_);
        const formattedDate = new Intl.DateTimeFormat("sv-SE").format(
          new Date()
        );
        const formattedTime = date.toLocaleTimeString("en-GB");
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
      key: "updatedAt",
      width: 200,
      render: (_, record) => {
        const date = new Date(_);
        const formattedDate = new Intl.DateTimeFormat("sv-SE").format(
          new Date()
        );
        const formattedTime = date.toLocaleTimeString("en-GB");
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
      render: (_, record) => {
        if (record.isAdmin) return null;
        return (
          <MyTableAction
            onEdit={() => onEditItem(record)}
            onDelete={() => onDeleteItem(record.id)}
          />
        );
      },
    },
  ];

  //
  const rowSelection: TableProps<T>["rowSelection"] = {
    type: "checkbox",
    onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => {
      const ids = selectedRowKeys.map((key) => key.toString());
      setCheckedIds(ids);
      console.log("selectedRows: ", selectedRows);
    },
    getCheckboxProps: (record: T) => ({
      disabled: record.isAdmin,
      // name: record.isAdmin,
    }),
  };

  //
  function onAddItem() {
    setIsOpenActionDataSource(true);
  }

  //
  function onEditItem(data: T) {
    setDataEdit(data);
    setIsOpenActionDataSource(true);
  }

  //
  function onDeleteItem(id: string) {
    console.log("delete item have id :::", id);
  }

  //
  function onDeleteItems(ids: Array<string>) {
    console.log("delete item have ids :::", ids);
    setCheckedIds([]);
  }

  return (
    <>
      <Card className="mb-4">
        <MyTableToolbar
          checkedIds={checkedIds}
          onClickAddItem={onAddItem}
          onClickDeleteItems={() => onDeleteItems(checkedIds)}
        />
      </Card>
      <Card>
        <Table<T>
          rowKey="id"
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
      {React.cloneElement(actionDataSource, {
        isOpen: isOpenActionDataSource,
        setIsOpen: setIsOpenActionDataSource,
        dataEdit,
      })}
    </>
  );
}
