import { findAll } from "@/apis/keyword";
import { IKeyWord } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import KeywordLayout from "@/layouts/private/keyword/Keyword";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function KeywordPage({
  searchParams,
}: IPropPage<IKeyWord>) {
  const resKeywords = await findAll(handleSetDefaultQueries(searchParams));

  return (
    <KeywordLayout
      items={resKeywords?.data?.items || []}
      totalItems={resKeywords?.data?.totalItems || 0}
    />
  );
}
