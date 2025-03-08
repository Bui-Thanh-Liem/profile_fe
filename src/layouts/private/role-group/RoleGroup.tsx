"use client";
import { CardRoleGroup } from "@/components/cards/CardRoleGroup";
import MyTableToolbar from "@/components/table/MyTableToolbar";
import { IRoleGroup } from "@/interfaces/model.interface";
import { IPropRoleLayout } from "@/interfaces/propsLayout.interface";
import { useState } from "react";
import { v4 } from "uuid";
import RoleGroupAction from "./RoleGroupAction";

export default function RoleGroupLayout({
  items,
  totalItems,
}: IPropRoleLayout<IRoleGroup>) {
  const [open, setOpen] = useState<boolean>(false);
  console.log("role group :::", items);

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
        <CardRoleGroup key={v4()} roleGroup={item} />
      ))}
    </>
  );
}
