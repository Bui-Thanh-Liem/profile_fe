import { findAllForCustomer } from "@/apis/knowledge.api";
import { IKnowledge } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import { KnowledgeLayout } from "@/layouts/public/storage/KnowledgeLayout";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";
import { Enums, Utils } from "liemdev-profile-lib";

export default async function AlgorithmPage({
  searchParams,
}: IPropPage<IKnowledge>) {
  //
  let queryDefault = handleSetDefaultQueries(searchParams);
  queryDefault = Utils.UtilConvert.addFilterToQuery(queryDefault, {
    type: Enums.ETypeKnowledge.ALGORITHM,
  });

  //
  const res = await findAllForCustomer(queryDefault);
  const { items, totalItems } = res.data;

  return (
    <main className="flex">
      <div className="m-auto w-[1200px]">
        <KnowledgeLayout items={items} totalItems={totalItems} />
      </div>
    </main>
  );
}
