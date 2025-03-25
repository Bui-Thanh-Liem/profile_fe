"use client";
import { deleteMulti } from "@/apis/keyword";
import { CardKeyword } from "@/components/cards/CardKeyword";
import MyTableToolbar from "@/components/table/MyTableToolbar";
import { showToast } from "@/helper/show-toast.helper";
import { IKeyWord } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import { Checkbox, CheckboxChangeEvent, Col, Row } from "antd";
import { useState } from "react";
import { KeywordAction } from "./KeywordAction";

export default function KeywordLayout({
  items,
  totalItems,
}: IPropLayout<IKeyWord>) {
  const [open, setOpen] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<IKeyWord | undefined>(undefined);
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const ids = items.map((item) => item.id);

  //
  function onEdit(data: IKeyWord) {
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
      {!!totalItems && (
        <div className="mb-2">
          <Checkbox
            onChange={handleCheckAll}
            checked={activeIds.length === ids.length}
          >
            Check all
          </Checkbox>
        </div>
      )}
      <KeywordAction
        isOpen={open}
        onClose={() => {}}
        setIsOpen={setOpen}
        dataEdit={dataEdit}
      />
      <Row gutter={[16, 24]}>
        {items?.map((item) => (
          <Col span={4} key={item.name}>
            <CardKeyword
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
