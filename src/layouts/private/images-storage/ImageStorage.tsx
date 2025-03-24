"use client";
import { deleteMulti } from "@/apis/image-storage";
import { CardImageStorage } from "@/components/cards/CardImageStorage";
import MyTableToolbar from "@/components/table/MyTableToolbar";
import { showToast } from "@/helper/show-toast.helper";
import { IImageStorage } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import { useState } from "react";
import ImageStorageAction from "./ImageStorageAction";
import { Col, Row } from "antd";

export default function ImageStorageLayout({
  items,
  totalItems,
}: IPropLayout<IImageStorage>) {
  const [open, setOpen] = useState<boolean>(false);
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [dataEdit, setDataEdit] = useState<IImageStorage | undefined>(
    undefined
  );

  //
  function onEdit(data: IImageStorage) {
    setDataEdit(data);
    setOpen(true);
  }

  //
  function handleClick(id: string) {
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
  async function onDeleteMulti() {
    const res = await deleteMulti(activeIds);
    if (res.statusCode !== 200) {
      showToast(res);
      return;
    }
    showToast(res);
    setActiveIds([]);
  }

  return (
    <>
      <MyTableToolbar
        checkedIds={activeIds}
        onClickAddItem={() => setOpen(true)}
        onClickDeleteItems={onDeleteMulti}
      />
      <ImageStorageAction
        isOpen={open}
        onClose={() => {}}
        setIsOpen={setOpen}
        dataEdit={dataEdit}
      />
      <Row>
        {items?.map((item) => (
          <Col span={4} key={item.label} onClick={() => handleClick(item.id)}>
            <CardImageStorage
              imageStorage={item}
              onClickEdit={onEdit}
              actives={activeIds}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
