"use client";
import { deleteMulti } from "@/apis/role-group";
import { CardRoleGroupAdmin } from "@/components/cards/CardRoleGroupAdmin";
import MyTableToolbar from "@/components/table/MyTableToolbar";
import { showMessage } from "@/utils/show-message.util";
import { IRoleGroup } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import { Checkbox, CheckboxChangeEvent, Col, Modal, Row } from "antd";
import { useState } from "react";
import RoleGroupAction from "./RoleGroupAction";
import { DeleteOutlined } from "@ant-design/icons";
import { MyEmpty } from "@/components/MyEmpty";

export default function RoleGroupLayout({
  items,
  totalItems,
}: IPropLayout<IRoleGroup>) {
  const [open, setOpen] = useState<boolean>(false);
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [dataEdit, setDataEdit] = useState<IRoleGroup | undefined>(undefined);
  const ids = items.map((item) => item.id);
  const isLength = items.length || 0;

  //
  function onEdit(data: IRoleGroup) {
    setDataEdit(data);
    setOpen(true);
  }

  //
  function handleClickActive(id: string) {
    let result = [...activeIds];
    const isExist = activeIds.includes(id);
    if (isExist) {
      result = result.filter((activeId) => id !== activeId);
    } else {
      result.push(id);
    }
    setActiveIds(result);
  }

  //
  function handleCheckAll(e: CheckboxChangeEvent) {
    if (e.target.checked) {
      setActiveIds(ids);
    } else {
      setActiveIds([]);
    }
  }

  //
  async function onDeleteMulti(ids: string[]) {
    Modal.confirm({
      title: "Are you sure ?",
      content: `You are about to delete ${ids.length} item${
        ids.length > 1 ? "s" : ""
      }.`,
      async onOk() {
        try {
          const res = await deleteMulti(ids);
          if (res.statusCode !== 200) {
            showMessage(res);
            return;
          }
          showMessage(res);
          setActiveIds([]);
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

  return (
    <>
      <MyTableToolbar
        checkedIds={activeIds}
        onClickAddItem={() => setOpen(true)}
        onClickDeleteItems={onDeleteMulti}
        totalItems={totalItems}
      />

      {!!isLength && (
        <div className="mb-2">
          <Checkbox
            onChange={handleCheckAll}
            checked={activeIds.length === ids.length}
          >
            Check all
          </Checkbox>
        </div>
      )}

      {open && (
        <RoleGroupAction
          isOpen={open}
          onClose={() => {}}
          setIsOpen={setOpen}
          dataEdit={dataEdit}
        />
      )}

      {!!isLength ? (
        <Row gutter={[16, 24]}>
          {items?.map((item) => (
            <Col span={6} key={item.name}>
              <CardRoleGroupAdmin
                item={item}
                actives={activeIds}
                onClickEdit={onEdit}
                onClickDelete={onDeleteMulti}
                onClickActive={() => handleClickActive(item.id)}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <MyEmpty />
      )}
    </>
  );
}
