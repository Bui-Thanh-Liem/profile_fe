"use client";
import { deleteMulti } from "@/apis/image-storage";
import { CardImageStorage } from "@/components/cards/CardImageStorage";
import MyTableToolbar from "@/components/table/MyTableToolbar";
import { showToast } from "@/helper/show-toast.helper";
import { IImageStorage } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import { useState } from "react";
import ImageStorageAction from "./ImageStorageAction";

export default function ImageStorageLayout({
  items,
  totalItems,
}: IPropLayout<IImageStorage>) {
  const [open, setOpen] = useState<boolean>(false);
  const [checkedIds, setCheckedIds] = useState<string[] | []>([]);
  const [dataEdit, setDataEdit] = useState<IImageStorage | undefined>(
    undefined
  );

  //
  function onEdit(data: IImageStorage) {
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
      <ImageStorageAction
        isOpen={open}
        onClose={() => {}}
        setIsOpen={setOpen}
        dataEdit={dataEdit}
      />
      <div className="grid grid-cols-5 gap-8">
        {items?.map((item) => (
          <CardImageStorage
            key={item.label}
            imageStorage={item}
            onClickEdit={onEdit}
            onChangeChecked={onChangeChecked}
          />
        ))}
      </div>
    </>
  );
}
