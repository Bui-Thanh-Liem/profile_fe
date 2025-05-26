"use client";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import "./CalendarLayout.css"; // Đảm bảo đường dẫn đúng
import { NoteAction } from "./NoteAction";
import { useState } from "react";

const getListData = (value: Dayjs) => {
  let listData: { type: string; content: string }[] = [];

  if (value.date() === 8) {
    listData = [
      { type: "warning", content: "Sự kiện kéo dài 2 ngày (Ngày 1)" },
      { type: "success", content: "This is usual event." },
    ];
  } else if (value.date() === 9) {
    listData = [
      { type: "warning", content: "Sự kiện kéo dài 2 ngày (Ngày 2)" },
      { type: "success", content: "This is usual event." },
    ];
  } else {
    switch (value.date()) {
      case 10:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
          { type: "error", content: "This is error event." },
        ];
        break;
      case 15:
        listData = [
          { type: "warning", content: "This is warning event" },
          { type: "success", content: "This is very long usual event......" },
          { type: "error", content: "This is error event 1." },
          { type: "error", content: "This is error event 2." },
          { type: "error", content: "This is error event 3." },
          { type: "error", content: "This is error event 4." },
        ];
        break;
      default:
    }
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export default function NoteLayout() {
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
    const listData = getListData(value);
    const isMultiDayEvent = value.date() === 8 || value.date() === 9; // Ví dụ sự kiện từ ngày 8-9

    return (
      <ul className={`events ${isMultiDayEvent ? "event-span" : ""}`}>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
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
