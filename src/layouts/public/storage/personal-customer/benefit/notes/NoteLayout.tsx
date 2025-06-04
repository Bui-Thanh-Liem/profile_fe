"use client";
import { INote } from "@/interfaces/model.interface";
import { IPropComponentLayout } from "@/interfaces/propsComponent.interface";
import { countNotesByStatus } from "@/utils/countNotesByStatus";
import type { CalendarProps } from "antd";
import { Badge, Calendar, Tag } from "antd";
import type { Dayjs } from "dayjs";
import { useMemo, useRef, useState } from "react";
import { NoteAction } from "./NoteAction";
import NoteView from "./NoteView";

// const getMonthData = (value: Dayjs) => {
//   if (value.month() === 8) {
//     return 1394;
//   }
// };

export default function NoteLayout({
  items,
  totalItems,
}: IPropComponentLayout<INote>) {
  const [isOpenAction, setIsOpenAction] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());
  const [itemSelected, setItemSelected] = useState<INote | undefined>(
    undefined
  );
  const { errCount, processingCount, successCount, warningCount } = useMemo(
    () => countNotesByStatus(items),
    [items]
  );
  const isPanelChangeRef = useRef(false);

  // const monthCellRender = (value: Dayjs) => {
  //   const num = getMonthData(value);
  //   return num ? (
  //     <div className="notes-month">
  //       <section>{num}</section>
  //       <span>Backlog number</span>
  //     </div>
  //   ) : null;
  // };

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
              className="mb-1"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSelectNoteItem(value, item);
              }}
            >
              <Tag
                color={item.status?.toLocaleLowerCase()}
                className={`${item.isOutStand && "animate-bounce"}`}
              >
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
    // if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const onPanelChange = (newValue: Dayjs) => {
    isPanelChangeRef.current = true;
    console.log("newValue :::", newValue);
  };

  const handleSelectDate = (value: Dayjs) => {
    if (isPanelChangeRef.current) {
      isPanelChangeRef.current = false;
      return;
    }
    setIsOpenAction(true);
    setSelectDate(new Date(value.toDate()));
  };

  const handleSelectNoteItem = (date: Dayjs, data: INote) => {
    setItemSelected(data);
    setSelectDate(new Date(date.toDate()));
  };

  function handleClose() {
    setItemSelected(undefined);
    setIsOpenAction(false);
  }

  return (
    <>
      <div className="mb-3">
        <Tag color="error">Error {errCount}</Tag>
        <Tag color="processing">Processing {processingCount}</Tag>
        <Tag color="warning">Warning {warningCount}</Tag>
        <Tag color="success">Success {successCount}</Tag>
        <span>/ </span>
        <Tag>Total {totalItems}</Tag>
      </div>

      {/*  */}
      <Calendar
        cellRender={cellRender}
        onSelect={handleSelectDate}
        className="rounded-xl px-3 border border-primary shadow-md shadow-primary"
        onPanelChange={onPanelChange}
      />

      {/*  */}
      {itemSelected && (
        <NoteView
          note={itemSelected}
          onclickEdit={() => {
            setIsOpenAction(true);
          }}
          onCloseModal={handleClose}
        />
      )}

      {/*  */}
      <NoteAction
        dataEdit={itemSelected}
        date={selectDate}
        isOpen={isOpenAction}
        onClose={handleClose}
        setIsOpen={(val) => setIsOpenAction(val)}
      />
    </>
  );
}
