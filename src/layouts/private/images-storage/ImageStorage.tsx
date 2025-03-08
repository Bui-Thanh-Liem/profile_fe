"use client";
import { CardRoleGroup } from "@/components/cards/CardRoleGroup";
import MyTableToolbar from "@/components/table/MyTableToolbar";
import { IImage } from "@/interfaces/model.interface";
import { IPropRoleLayout } from "@/interfaces/propsLayout.interface";
import { useState } from "react";
import { v4 } from "uuid";
import RoleGroupAction from "./RoleGroupAction";

export default function ImageStorageLayout({
  items,
  totalItems,
}: IPropRoleLayout<IImage>) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <MyTableToolbar
        checkedIds={[]}
        onClickAddItem={() => setOpen(true)}
        onClickDeleteItems={() => {}}
      />
      <RoleGroupAction isOpen={open} onClose={() => {}} setIsOpen={setOpen} />
      {/* <div className="grid grid-cols-5 gap-8">
        {items?.map((item) => (
          <CardRoleGroup key={v4()} roleGroup={item} onClickEdit={onEdit} />
        ))}
      </div> */}
    </>
  );
}
