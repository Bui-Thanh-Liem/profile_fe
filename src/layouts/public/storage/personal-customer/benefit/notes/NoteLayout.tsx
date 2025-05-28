"use client";
import { INote } from "@/interfaces/model.interface";
import { IPropComponentLayout } from "@/interfaces/propsComponent.interface";
import type { CalendarProps } from "antd";
import { Badge, Calendar, Tag } from "antd";
import type { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
import { NoteAction } from "./NoteAction";

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export default function NoteLayout({
  items,
  totalItems,
}: IPropComponentLayout<INote>) {
  const [isOpenAction, setIsOpenAction] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());
  const [edit, setEdit] = useState<INote | undefined>(undefined);
  const isClickOnDateCell = useRef(false);
  console.log("totalItems:::", totalItems);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Xác định nếu phần tử được click là 1 cell ngày
      isClickOnDateCell.current =
        target.closest(".ant-picker-cell-inner") !== null;
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const DInCalendar = value.date();
    const MInCalendar = value.month() + 1;
    const YInCalendar = value.year();

    return (
      <ul className="events">
        {items.map((item) => {
          const dateInNote = new Date(item.date);
          const DInNote = dateInNote.getDate();
          const MInNote = dateInNote.getMonth() + 1;
          const YInNote = dateInNote.getFullYear();

          //
          if (
            DInCalendar !== DInNote ||
            MInCalendar !== MInNote ||
            YInCalendar !== YInNote
          ) {
            return null;
          }
          return (
            <li
              key={item.id}
              className={`note-item mb-1 ${item.shape}`}
              onClick={() => handleSelectNoteItem(item)}
            >
              <Tag color={item.status?.toLocaleLowerCase()}>
                <Badge
                  color={item.color}
                  text={item.title}
                  className="max-w-[116px] overflow-x-hidden"
                />
              </Tag>
            </li>
          );
        })}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const onPanelChange = (newValue: Dayjs) => {
    console.log("newValue:::", newValue);
  };

  const handleSelect = (value: Dayjs) => {
    if (!isClickOnDateCell.current) {
      return; // Nếu không click vào cell ngày thì không mở
    }

    setIsOpenAction(true);
    setSelectDate(new Date(value.toDate()));
  };

  const handleSelectNoteItem = (data: INote) => {
    setEdit(data);
  };

  const handleClose = () => {
    setEdit(undefined);
    setIsOpenAction(false);
  };

  return (
    <>
      <h1 className="text-center text-5xl">My Notes</h1>
      {/* <p className="mt-10">
        You have {items?.length || 0}/{totalItems} events this month
      </p> */}
      <Calendar
        cellRender={cellRender}
        onSelect={handleSelect}
        className="mt-12 rounded-xl px-3 border border-primary shadow-md shadow-primary"
        onPanelChange={onPanelChange}
      />

      {/*  */}
      <NoteAction
        dataEdit={edit}
        date={selectDate}
        isOpen={isOpenAction}
        onClose={handleClose}
        setIsOpen={(val) => setIsOpenAction(val)}
      />
    </>
  );
}
