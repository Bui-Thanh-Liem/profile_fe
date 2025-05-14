import { findAll } from "@/apis/knowledge.api";
import { IKnowledge } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import { KnowledgeLayout } from "@/layouts/private/knowledge/Knowledge";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function KnowledgePage({
  searchParams,
}: IPropPage<IKnowledge>) {
  const resKnowledge = await findAll(handleSetDefaultQueries(searchParams));

  return (
    <KnowledgeLayout
      items={resKnowledge?.data?.items || []}
      totalItems={resKnowledge?.data?.totalItems || 0}
    />
  );
}
