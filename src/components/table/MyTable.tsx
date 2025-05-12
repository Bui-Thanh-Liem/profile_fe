"use client";
import { IBase, IUser } from "@/interfaces/model.interface";
import IPropMyTable from "@/interfaces/propsComponent.interface";
import type { TableColumnsType, TableProps } from "antd";
import { Card, Table } from "antd";
import { createStyles } from "antd-style";
import React, { useEffect, useState } from "react";
import { Author } from "../Author";
import MyTableAction from "./MyTableAction";
import MyTableToolbar from "./MyTableToolbar";
import { showToast } from "@/utils/show-toast.util";

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

  console.log("Boolean(actionDataSource):::", Boolean(actionDataSource));

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
      key: "created",
      width: 200,
      render: (record) => {
        const creator = record.createdBy as IUser;
        const createdAt = record.createdAt;
        return <Author user={creator} date={createdAt} />;
      },
    },
    {
      title: "Updated",
      key: "updated",
      width: 200,
      render: (record) => {
        const editor = record.updatedBy as IUser;
        const updatedAt = record.updatedAt;
        return <Author user={editor} date={updatedAt} />;
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
            isEdit={Boolean(actionDataSource)}
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
    console.log("res delete :::", res);

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
        totalItems={totalDataSource}
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
              `Display ${range[0]}-${range[1]} on total record ${total}`,
          }}
        />
      </Card>
      {React.cloneElement(actionDataSource || <></>, {
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
