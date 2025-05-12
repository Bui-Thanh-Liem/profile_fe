"use client";
import { deleteMulti } from "@/apis/subject-item.api";
import MyTable from "@/components/table/MyTable";
import { ISubjectItem } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import { subjectItemActionColumns } from "./subjectItemColumn";
import SubjectItemActionAction from "./SubjectItemAction";

export default function SubjectItemLayout({
  items,
  totalItems,
}: IPropLayout<ISubjectItem>) {
  return (
    <MyTable
      dataSource={items}
      totalDataSource={totalItems}
      columns={subjectItemActionColumns}
      actionDataSource={<SubjectItemActionAction />}
      deleteApi={deleteMulti}
    />
  );
}
