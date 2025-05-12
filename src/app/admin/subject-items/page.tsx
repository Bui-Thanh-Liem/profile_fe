import { findAll } from "@/apis/subject-item.api";
import { ISubjectItem } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import SubjectItemLayout from "@/layouts/private/subject-item/SubjectItem";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function SubjectItemPage({
  searchParams,
}: IPropPage<ISubjectItem>) {
  const resSubjectItems = await findAll(handleSetDefaultQueries(searchParams));

  return (
    <SubjectItemLayout
      items={resSubjectItems?.data?.items || []}
      totalItems={resSubjectItems?.data?.totalItems || 0}
    />
  );
}
