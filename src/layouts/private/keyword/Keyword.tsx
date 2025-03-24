"use client";
import { deleteMulti } from "@/apis/keyword";
import MyTableToolbar from "@/components/table/MyTableToolbar";
import { showToast } from "@/helper/show-toast.helper";
import { IKeyWord } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import { EditOutlined } from "@ant-design/icons";
import { Button, Checkbox, CheckboxChangeEvent, Col, Row } from "antd";
import { MouseEvent, useState } from "react";
import { KeywordAction } from "./KeywordAction";

function KeywordItem({
  keyword,
  actives,
  handleEdit,
}: {
  keyword: IKeyWord;
  actives: string[];
  handleEdit: (keyword: IKeyWord) => void;
}) {
  const { id, name, color } = keyword;
  const isActive = actives.includes(id);

  //
  function handleClick(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
    handleEdit(keyword);
  }

  return (
    <p
      className="px-2 py-1 cursor-pointer rounded-sm font-bold text-white border border-transparent relative group"
      style={{
        backgroundColor: color,
        borderColor: isActive ? "red" : "transparent",
      }}
    >
      {name}
      <Button
        size="small"
        shape="circle"
        icon={<EditOutlined />}
        className="absolute -bottom-3 -right-2 hidden group-hover:block"
        onClick={handleClick}
      />
    </p>
  );
}

export default function KeywordLayout({
  items,
}: // totalItems,
IPropLayout<IKeyWord>) {
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
  function handleCheckAll(e: CheckboxChangeEvent) {
    if (e.target.checked) {
      setActiveIds(ids);
    } else {
      setActiveIds([]);
    }
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
      <div className="mb-2">
        <Checkbox
          onChange={handleCheckAll}
          checked={activeIds.length === ids.length}
        >
          Check all
        </Checkbox>
        <span className="font-bold">{activeIds.length}</span>
      </div>

      <KeywordAction
        isOpen={open}
        onClose={() => {}}
        setIsOpen={setOpen}
        dataEdit={dataEdit}
      />
      <Row gutter={[16, 24]}>
        {items?.map((item) => (
          <Col key={item.name} onClick={() => handleClick(item.id)}>
            <KeywordItem
              keyword={item}
              actives={activeIds}
              handleEdit={onEdit}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
