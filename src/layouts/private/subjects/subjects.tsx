"use client";
import { deleteMulti } from "@/apis/image-storage";
import { CardImageStorage } from "@/components/cards/CardImageStorage";
import MyTableToolbar from "@/components/table/MyTableToolbar";
import { showToast } from "@/helper/show-toast.helper";
import { ISubject } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import { Checkbox, CheckboxChangeEvent, Col, Row } from "antd";
import { useState } from "react";
import ImageStorageAction from "./subjectsAction";

export default function SubjectAdminLayout({
  items,
  totalItems,
}: IPropLayout<ISubject>) {
  const [open, setOpen] = useState<boolean>(false);
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [dataEdit, setDataEdit] = useState<ISubject | undefined>(undefined);
  const ids = items.map((item) => item.id);

  //
  function onEdit(data: ISubject) {
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
    const res = await deleteMulti(ids);
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
        totalItems={totalItems}
      />
      {!!items.length && (
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
        <ImageStorageAction
          isOpen={open}
          onClose={() => {
            setDataEdit(undefined);
          }}
          setIsOpen={setOpen}
          dataEdit={dataEdit}
        />
      )}
      <Row gutter={[16, 24]}>
        {items?.map((item) => (
          <Col span={5} key={item.label}>
            <CardImageStorage
              item={item}
              actives={activeIds}
              onClickEdit={onEdit}
              onClickDelete={onDeleteMulti}
              onClickActive={() => handleClickActive(item.id)}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
