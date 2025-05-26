import { findAll } from "@/apis/note";
import { INote } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import NoteLayout from "@/layouts/public/storage/personal-customer/benefit/notes/NoteLayout";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function NotePage({ searchParams }: IPropPage<INote>) {
  //
  const queryDefault = handleSetDefaultQueries(searchParams);

  //
  const res = await findAll(queryDefault);
  const { items, totalItems } = res.data;

  return <NoteLayout items={items} totalItems={totalItems} />;
}
