"use client";
import MyTableToolbar from "@/components/table/MyTableToolbar";
import { IRoleGroup } from "@/interfaces/model.interface";
import { IPropRoleLayout } from "@/interfaces/propsLayout.interface";
import RoleGroupAction from "./RoleGroupAction";
import { useState } from "react";
import { CardRoleGroup } from "@/components/cards/CardRoleGroup";
import { v4 } from "uuid";

export default function RoleGroupLayout({
  items,
  totalItems,
}: IPropRoleLayout<IRoleGroup>) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <MyTableToolbar
        checkedIds={[]}
        onClickAddItem={() => setOpen(true)}
        onClickDeleteItems={() => {}}
      />
      <RoleGroupAction
        isOpen={open}
        onClose={() => {}}
        setIsOpen={setOpen}
        // dataEdit={}
      />
      {items?.map((item) => (
        <CardRoleGroup key={v4()} />
      ))}
    </>
  );
}
