"use client";
import { usePushUrl } from "@/hooks/usePushUrl";
import { IBase, IUser } from "@/interfaces/model.interface";
import IPropMyTable from "@/interfaces/propsComponent.interface";
import { showToast } from "@/utils/show-toast.util";
import { DeleteOutlined } from "@ant-design/icons";
import type { TableColumnsType, TablePaginationConfig, TableProps } from "antd";
import { Card, Modal, Table } from "antd";
import { createStyles } from "antd-style";
import React, { useEffect, useState } from "react";
import { Author } from "../Author";
import { MyEmpty } from "../MyEmpty";
import MyTableAction from "./MyTableAction";
import MyTableToolbar from "./MyTableToolbar";

const useStyle = createStyles(({ css }) => {
  return {
    customTable: css`
      .ant-table-body {
        min-height: calc(100vh - 420px);
      }
    `,
  };
});

interface IBaseMyTable extends IBase {
  isAdmin?: boolean;
  fullname?: string;
}

export default function MyTable<T extends IBaseMyTable>({
  dataSource,
  totalDataSource,
  columns,
  actionDataSource,
  deleteApi,
  initialPage = 1,
  initialLimit = 20,
}: IPropMyTable<T>) {
  const { styles } = useStyle();
  const [isOpenActionDataSource, setIsOpenActionDataSource] =
    useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<Partial<T> | null>(null);
  const [checkedIds, setCheckedIds] = useState<Array<string> | []>([]);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const { pushUrl } = usePushUrl();

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
      width: 180,
      render: (record) => {
        const creator = record.createdBy as IUser;
        const createdAt = record.createdAt;
        return <Author user={creator} date={createdAt} />;
      },
    },
    {
      title: "Updated",
      key: "updated",
      width: 180,
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
        const isUserPage = Boolean(record?.fullname || "");
        return (
          <MyTableAction
            isEdit={Boolean(actionDataSource)}
            isDelete={Boolean(deleteApi)}
            isUserPage={isUserPage}
            onEdit={() => onEditItem(record)}
            onDelete={() => onDeleteItem(record.id)}
            onRevoke={() => onRevokeUser(record.id)}
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
    Modal.confirm({
      title: "Are you sure ?",
      content: `You are about to delete 1 item.`,
      async onOk() {
        try {
          if (!deleteApi) return;
          const res = await deleteApi([id]);
          if (res.statusCode !== 200) {
            showToast(res);
            return;
          }
          showToast(res);
        } catch (error) {
          console.error("Deletion error:", error);
        }
      },
      onClose() {},
      okText: "Delete",
      okButtonProps: { danger: true },
      cancelButtonProps: { color: "primary", variant: "outlined" },
      icon: <DeleteOutlined style={{ color: "red" }} />,
    });
  }

  //
  async function onDeleteItems(ids: Array<string>) {
    Modal.confirm({
      title: "Are you sure ?",
      content: `You are about to delete ${ids.length} item${
        ids.length > 1 ? "s" : ""
      }.`,
      async onOk() {
        try {
          if (!deleteApi) return;
          const res = await deleteApi(ids);
          if (res.statusCode !== 200) {
            showToast(res);
            return;
          }
          showToast(res);
          setCheckedIds([]);
        } catch (error) {
          console.error("Deletion error:", error);
        }
      },
      onClose() {},
      okText: "Delete",
      okButtonProps: { danger: true },
      cancelButtonProps: { color: "primary", variant: "outlined" },
      icon: <DeleteOutlined style={{ color: "red" }} />,
    });
  }

  //
  async function onRevokeUser(id: string) {
    console.log("revoke user:::", id);
  }

  //
  function onChangeTable(config: TablePaginationConfig) {
    const { current, pageSize } = config;
    console.log("page:::", current);
    console.log("limit:::", pageSize);

    //
    setPage(current || 0);
    setLimit(pageSize || 0);

    //
    if (current || pageSize) {
      pushUrl({ page: `${current}`, limit: `${pageSize}` });
    }
  }

  return (
    <>
      <MyTableToolbar
        checkedIds={checkedIds}
        onClickAddItem={onAddItem}
        onClickDeleteItems={() => onDeleteItems(checkedIds)}
        totalItems={totalDataSource}
      />

      <div style={{ minHeight: "calc(100vh - 320px)" }}>
        {totalDataSource ? (
          <Card>
            <Table<T>
              rowKey="id"
              columns={baseColumns}
              dataSource={dataSource}
              className={styles.customTable}
              scroll={{ x: "max-content", y: "calc(100vh - 420px)" }}
              rowSelection={rowSelection}
              pagination={{
                current: page,
                pageSize: limit,
                total: totalDataSource,
                showSizeChanger: true,
                pageSizeOptions: [20, 40, 60, 80, 100],
                showTotal: (total, range) =>
                  `Display ${range[0]}-${range[1]} on total record ${total}`,
              }}
              onChange={onChangeTable}
            />
          </Card>
        ) : (
          <MyEmpty />
        )}
      </div>

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
