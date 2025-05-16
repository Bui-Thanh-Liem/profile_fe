import { deleteMulti, findAll } from "@/apis/keyword";
import MyTable from "@/components/table/MyTable";
import { IKeyWord } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import { KeywordAction } from "@/layouts/private/keyword/KeywordAction";
import { keywordActionColumns } from "@/layouts/private/keyword/KeywordColumn";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function KeywordPage({
  searchParams,
}: IPropPage<IKeyWord>) {
  const defaultQueries = handleSetDefaultQueries(searchParams);
  const resKeywords = await findAll(defaultQueries);

  return (
    <MyTable
      dataSource={resKeywords?.data?.items || []}
      totalDataSource={resKeywords?.data?.totalItems || 0}
      columns={keywordActionColumns}
      actionDataSource={<KeywordAction />}
      deleteApi={deleteMulti}
      initialLimit={Number(defaultQueries.limit)}
      initialPage={Number(defaultQueries.page)}
    />
  );
}
