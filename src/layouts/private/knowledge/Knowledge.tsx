"use client";
import { deleteMulti } from "@/apis/knowledge.api";
import MyTable from "@/components/table/MyTable";
import { IKnowledge } from "@/interfaces/model.interface";
import { IPropLayout } from "@/interfaces/propsLayout.interface";
import { KnowledgeAction } from "./KnowledgeAction";
import { knowledgeActionColumns } from "./knowledgeColumn";

export function KnowledgeLayout({
  items,
  totalItems,
}: IPropLayout<IKnowledge>) {
  return (
    <MyTable
      dataSource={items}
      totalDataSource={totalItems}
      columns={knowledgeActionColumns}
      actionDataSource={<KnowledgeAction />}
      deleteApi={deleteMulti}
    />
  );
}
