"use client";
import { deleteMulti } from "@/apis/role-group";
import { CardRoleGroup } from "@/components/cards/CardRoleGroup";
import MyTableToolbar from "@/components/table/MyTableToolbar";
import { showToast } from "@/helper/show-toast.helper";
import { IRoleGroup } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import { useState } from "react";
import RoleGroupAction from "./RoleGroupAction";

export default function RoleGroupLayout({
  items,
  // totalItems,
}: IPropLayout<IRoleGroup>) {
  const [open, setOpen] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<IRoleGroup | undefined>(undefined);
  const [checkedIds, setCheckedIds] = useState<string[] | []>([]);

  //
  function onEdit(data: IRoleGroup) {
    setDataEdit(data);
    setOpen(true);
  }

  //
  function onChangeChecked(checked: boolean, id: string) {
    if (checked) {
      setCheckedIds([...checkedIds, id]);
    } else {
      setCheckedIds((prev) => {
        const clone = [...prev];
        return clone.filter((checkedId) => checkedId !== id);
      });
    }
  }

  //
  async function onDeleteMulti() {
    const res = await deleteMulti(checkedIds);
    if (res.statusCode !== 200) {
      showToast(res);
      return;
    }
    showToast(res);
    setCheckedIds([]);
  }

  return (
    <>
      <MyTableToolbar
        checkedIds={checkedIds}
        onClickAddItem={() => setOpen(true)}
        onClickDeleteItems={onDeleteMulti}
      />
      <RoleGroupAction
        isOpen={open}
        onClose={() => {}}
        setIsOpen={setOpen}
        dataEdit={dataEdit}
      />
      <div className="grid grid-cols-5 gap-8 h-96 bg-red-200">
        {items?.map((item) => (
          <CardRoleGroup
            key={item.name}
            roleGroup={item}
            onClickEdit={onEdit}
            onChangeChecked={onChangeChecked}
          />
        ))}
      </div>
    </>
  );
}
