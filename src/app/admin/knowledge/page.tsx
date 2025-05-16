import { deleteMulti, findAll } from "@/apis/knowledge.api";
import MyTable from "@/components/table/MyTable";
import { IKnowledge } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import { KnowledgeAction } from "@/layouts/private/knowledge/KnowledgeAction";
import { knowledgeActionColumns } from "@/layouts/private/knowledge/knowledgeColumn";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function KnowledgePage({
  searchParams,
}: IPropPage<IKnowledge>) {
  const defaultQueries = handleSetDefaultQueries(searchParams);
  const resKnowledge = await findAll(defaultQueries);

  return (
    <MyTable
      dataSource={resKnowledge?.data?.items || []}
      totalDataSource={resKnowledge?.data?.totalItems || 0}
      columns={knowledgeActionColumns}
      actionDataSource={<KnowledgeAction />}
      deleteApi={deleteMulti}
      initialLimit={Number(defaultQueries.limit)}
      initialPage={Number(defaultQueries.page)}
    />
  );
}
