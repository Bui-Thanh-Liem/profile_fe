"use client";
import { deleteMulti } from "@/apis/keyword";
import MyTable from "@/components/table/MyTable";
import { IKeyWord } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import { KeywordAction } from "./KeywordAction";
import { keywordActionColumns } from "./KeywordColumn";

export default function KeywordLayout({
  items,
  totalItems,
}: IPropLayout<IKeyWord>) {
  return (
    <MyTable
      dataSource={items}
      totalDataSource={totalItems}
      columns={keywordActionColumns}
      actionDataSource={<KeywordAction />}
      deleteApi={deleteMulti}
    />
  );
}
