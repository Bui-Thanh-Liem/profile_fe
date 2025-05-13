import { findAll } from "@/apis/subject-item.api";
import { ISubjectItem } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import { SubjectLayout } from "@/layouts/public/storage/SubjectLayout";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";
import { Enums, Utils } from "liemdev-profile-lib";

export default async function DataStructurePage({
  searchParams,
}: IPropPage<ISubjectItem>) {
  //
  let queryDefault = handleSetDefaultQueries(searchParams);
  queryDefault = Utils.UtilConvert.addFilterToQuery(queryDefault, {
    type: Enums.ETypeSubject.DATA,
  });

  //
  const res = await findAll(queryDefault);
  const { items, totalItems } = res.data;

  return (
    <main className="flex">
      <div className="m-auto w-[1200px]">
        <SubjectLayout items={items} totalItems={totalItems} />
      </div>
    </main>
  );
}
