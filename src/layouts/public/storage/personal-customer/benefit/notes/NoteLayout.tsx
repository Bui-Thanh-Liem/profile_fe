"use client";
import { INote } from "@/interfaces/model.interface";
import { IPropComponentLayout } from "@/interfaces/propsComponent.interface";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import { useState } from "react";
import "./CalendarLayout.css"; // Đảm bảo đường dẫn đúng
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
            <li key={item.id}>
              <Badge
                status={item.status.toLocaleLowerCase() as BadgeProps["status"]}
                text={item.title}
              />
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
    setIsOpenAction(true);
    console.log("Ngày được chọn:", value.format("MM-DD-YYYY"));
  };

  return (
    <>
      <h1 className="text-center text-5xl">My Notes</h1>
      <Calendar
        cellRender={cellRender}
        onSelect={handleSelect}
        className="mt-12 rounded-xl px-3 border border-primary shadow-md shadow-primary"
        onPanelChange={onPanelChange}
      />

      {/*  */}
      <NoteAction
        dataEdit={{}}
        isOpen={isOpenAction}
        onClose={() => setIsOpenAction(false)}
      />
    </>
  );
}
