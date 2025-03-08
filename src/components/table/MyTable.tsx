"use client";
import { useToast } from "@/hooks/useToast";
import { IBase, IUser } from "@/interfaces/model.interface";
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

interface IBaseMyTable extends IBase {
  isAdmin?: boolean;
}

export default function MyTable<T extends IBaseMyTable>({
  dataSource,
  totalDataSource,
  columns,
  actionDataSource,
  deleteApi,
}: IPropMyTable<T>) {
  const { styles } = useStyle();
  const [isOpenActionDataSource, setIsOpenActionDataSource] =
    useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<Partial<T> | null>(null);
  const [checkedIds, setCheckedIds] = useState<Array<string> | []>([]);

  //
  const { showToast, contextHolder } = useToast();

  //
  useEffect(() => {
    if (!isOpenActionDataSource) {
      setDataEdit(null);
    }
  }, []);

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
      key: "created",
      width: 200,
      render: (record) => {
        const creator = record.createdBy as IUser;
        const createdAt = record.createdAt;
        const date = new Date(createdAt);

        const formattedDate = new Intl.DateTimeFormat("sv-SE").format(
          new Date(createdAt)
        );
        const formattedTime = date.toLocaleTimeString("en-GB");

        //
        return (
          <>
            <p>{creator?.fullName || <UserOutlined />}</p>
            <p>{`${formattedDate}, ${formattedTime}`}</p>
          </>
        );
      },
    },
    {
      title: "Updated",
      key: "updated",
      width: 200,
      render: (record) => {
        const editor = record.updatedBy as IUser;
        const updatedAt = record.updatedAt;
        const date = new Date(updatedAt);

        //
        const formattedDate = new Intl.DateTimeFormat("sv-SE").format(
          new Date(updatedAt)
        );
        const formattedTime = date.toLocaleTimeString("en-GB");

        //
        return (
          <>
            <p>{editor?.fullName || <UserOutlined />}</p>
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
  async function onDeleteItem(id: string) {
    const res = await deleteApi([id]);
    showToast(res);
  }

  //
  async function onDeleteItems(ids: Array<string>) {
    const res = await deleteApi(ids);
    if (res.statusCode !== 200) {
      showToast(res);
      return;
    }
    setCheckedIds([]);
  }

  return (
    <>
      <MyTableToolbar
        checkedIds={checkedIds}
        onClickAddItem={onAddItem}
        onClickDeleteItems={() => onDeleteItems(checkedIds)}
      />
      <Card>
        <Table<T>
          rowKey="id"
          columns={baseColumns}
          dataSource={dataSource}
          className={styles.customTable}
          scroll={{ x: "max-content", y: "calc(100vh - 420px)" }}
          rowSelection={rowSelection}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            pageSizeOptions: [20, 40, 60, 80, 100],
            showTotal: (total, range) =>
              `${totalDataSource} - Display ${range[0]}-${range[1]} on total record ${total}`,
          }}
        />
        {contextHolder}
      </Card>
      {React.cloneElement(actionDataSource, {
        isOpen: isOpenActionDataSource,
        setIsOpen: setIsOpenActionDataSource,
        dataEdit,
        onClose: () => {
          setDataEdit(null);
        },
      })}
    </>
  );
}
