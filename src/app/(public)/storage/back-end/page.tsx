import { findAll } from "@/apis/subject-item.api";
import { ISubjectItem } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import { SubjectLayout } from "@/layouts/public/storage/SubjectLayout";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";
import { Enums } from "liemdev-profile-lib";

export default async function BackEndPage({
  searchParams,
}: IPropPage<Partial<ISubjectItem>>) {
  //
  const queryDefault = handleSetDefaultQueries(searchParams);

  //
  queryDefault.filters = JSON.stringify({
    type: Enums.ETypeSubject.BACK_END,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;

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
